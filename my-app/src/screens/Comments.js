import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrComments: [],
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
          arrComments: doc.data().comments ? doc.data().comments.sort((a, b) => b.createdAt - a.createdAt) : [],
        }, () => console.log(this.state));
      });
  }

  enviarComentario(comentario) {
    const newComment = {
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      comment: comentario,
    };

    db.collection("posteos")
      .doc(this.props.route.params.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(newComment),
      })
      .then(() => {
        this.setState({
          comentario: "",
        });
      })
      .catch(err => console.log(err));
  }

  regresar() {
    this.props.navigation.navigate("home"), { id: this.props.post.id };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../../assets/logo.jpg')} />
        <Text style={styles.title}>COMENTARIOS</Text>
        {
          this.state.arrComments.length === 0 ? (
            <Text style={styles.noCommentsText}>Aún no hay comentarios</Text>
          ) : (
            <FlatList
              data={this.state.arrComments}
              keyExtractor={item => item.createdAt.toString()}
              renderItem={({ item }) => (
                
                <View style={styles.commentBox}>
                  {console.log('item', item)}
                  <Text style={styles.comment}>{item.owner} : {item.comment}</Text>
                </View>
              )}
            />
          )
        }
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribi tu comentario"
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.enviarComentario(this.state.comentario)}>
            <Text style={styles.buttonText}>Enviar Comentario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.returnButton} onPress={() => this.regresar()}>
            <Text style={styles.returnButtonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Comments;

