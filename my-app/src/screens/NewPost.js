import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            imageUrl: ''
        };
    }

    onSubmit(descripcion, imageUrl) {
        if (descripcion !== '') {
            db.collection('posteos')
                .add({
                    descripcion: descripcion,
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    imageUrl: imageUrl,
                    likes: [],
                    comments: []
                })
                .then(() => {
                    this.setState({
                        descripcion: '',
                        imageUrl: ''
                    });
                    this.props.navigation.navigate('home');
                })
                .catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TextInput
                    value={this.state.descripcion}
                    onChangeText={(text) => this.setState({ descripcion: text })}
                    placeholder="Describe tu post"
                    style={styles.input}
                />
                <TextInput
                    value={this.state.imageUrl}
                    onChangeText={(text) => this.setState({ imageUrl: text })}
                    placeholder="Agrega el link a tu imagen"
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.descripcion, this.state.imageUrl)}>
                    <Text style={styles.button}>Create Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        color: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        fontSize: 16,
    },
});

