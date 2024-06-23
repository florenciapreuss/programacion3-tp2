// Mostrar la tarjeta del posteo
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { auth, db } from '../../firebase/config'
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";

class Posteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
          like: false
        }
      }

      componentDidMount(){
        let like = this.props.post.data.likes.includes(auth.currentUser.email)
        if(like){
            this.setState({like:true})
        }
    }

    likePost(){
        db
        .collection('posteos')
        .doc(this.props.post.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> this.setState({like: true}))
    .catch((err)=> console.log(err))
    }

    removeLike(){
        db
        .collection('posteos')
        .doc(this.props.post.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> this.setState({like: false}))
    .catch((err)=> console.log(err))
    }


    render() {
        const { owner, imageUrl, descripcion } = this.props.post.data;

        return (
            <View style={styles.postContainer}>
                {/* Encabezado del Post */}
                <View style={styles.header}>
                    {/* Avatar del propietario (podría ser una imagen circular) */}
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://placekitten.com/200/200' }} // Ejemplo de imagen de avatar
                    />
                    {/* Nombre de usuario */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("friend-profile", { email: owner })}>
                    <Text style={styles.ownerName}>{owner}</Text>
                    </TouchableOpacity>
                </View>

                {/* Imagen del Post */}
                <Image
                    style={styles.image}
                    source={{ uri: imageUrl }}
                />

                {/* Descripción del Post */}
                <Text style={styles.description}>{descripcion}</Text>

                <View>

                <Text>
                    {
                        this.props.post.data.likes.length
                    }
                </Text>
                {
                    this.state.like ?
                <TouchableOpacity onPress={()=> this.removeLike()}>
                    <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.likePost()}>
                    <AntDesign name="hearto" size={24} color="red" />
                </TouchableOpacity>
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20, // Hacer la imagen circular
        marginRight: 10,
    },
    ownerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1, // Mantener la relación de aspecto de la imagen
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    description: {
        padding: 10,
        fontSize: 14,
    },
});

export default Posteo;
