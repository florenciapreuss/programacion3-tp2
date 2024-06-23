import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDeComments: [],
      comentario: "",
    };
  }

  componentDidMount() {
    console.log('props', this.props);
    db.collection("posteos")
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        console.log('antes del setState, comments', doc.data().comments);
        this.setState({
          arrayDeComments: doc.data().comments ? doc.data().comments.sort((a, b) => b.createdAt - a.createdAt) : [],
        }, () => console.log(this.state));
      });
  }

  enviarComments(comentario) {
    const nuevoComment = {
      email: auth.currentUser.email,
      createdAt: Date.now(),
      comment: comentario,
    };

    db.collection("posteos")
      .doc(this.props.route.params.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(nuevoComment),
      })
      .then(() => {
        this.setState({
          comentario: "",
        });
      })
      .catch(err => console.log(err));
  }

  volverAlHome() {
    this.props.navigation.navigate("home"), { id: this.props.post.id };
  }

  render() {
    return (
      <View /* style={} */>
        <Text /* style={} */>Comments:</Text>
        {
          this.state.arrayDeComments.length === 0 ? (
            <Text /* style={} */>No comments yet</Text>
          ) : (
            <FlatList
              data={this.state.arrayDeComments}
              keyExtractor={item => item.createdAt.toString()}
              renderItem={({ item }) => (
                
                <View /* style={} */>
                  {console.log('item', item)}
                  <Text /* style={} */>{item.email} : {item.comment}</Text>
                </View>
              )}
            />
          )
        }
        <View /* style={} */>
          <TextInput
            placeholder="Write your comment"
            /* style={} */
            keyboardType='default'
            onChangeText={string => this.setState({ comentario: string })}
            value={this.state.comentario}
          />
          <TouchableOpacity /* style={} */ onPress={() => this.enviarComments(this.state.comentario)}>
            <Text /* style={} */>Send comment</Text>
          </TouchableOpacity>
          <TouchableOpacity /* style={}  */onPress={() => this.volverAlHome()}>
            <Text /* style={} */>Go back to home page</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default Comments;