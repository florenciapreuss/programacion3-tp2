import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.title}>Comments</Text>
        {
          this.state.arrayDeComments.length === 0 ? (
            <Text style={styles.noComments}>No comments yet</Text>
          ) : (
            <FlatList
              data={this.state.arrayDeComments}
              keyExtractor={item => item.createdAt.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  {console.log('item', item)}
                  <Text style={styles.commentText}>{item.email} : {item.comment}</Text>
                </View>
              )}
            />
          )
        }
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write your comment"
            style={styles.input}
            keyboardType='default'
            onChangeText={string => this.setState({ comentario: string })}
            value={this.state.comentario}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.enviarComments(this.state.comentario)}>
            <Text style={styles.buttonText}>Send comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.volverAlHome()}>
            <Text style={styles.buttonText}>Go back to home page</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noComments: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  commentText: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Comments;
