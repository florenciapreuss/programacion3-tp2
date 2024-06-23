import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../firebase/config'; 

class FriendProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userPosts: []
        };
    }

    componentDidMount() {
        const email = this.props.route.params.email;  // asegurarme que coincida con lo que pongo en el navigate de home

        db.collection('users').where('email', '==', email).onSnapshot(
            docs => {
                let userInfo = null;
                docs.forEach(doc => {
                    userInfo = {
                        id: doc.id,
                        data: doc.data()
                    };
                });
                this.setState({
                    user: userInfo,
                });
            }
        );

        db.collection('posteos').where('email', '==', email).onSnapshot( // chequiar que lo que esta entre comillas coincida 
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    userPosts: posts,
                });
            }
        );
    }

    render() {
        const { user, userPosts } = this.state;
        
        return (
            <View style={styles.container}>
                {user ? (
                    <>
                        <Image source={{ uri: user.data.profilePic }} style={styles.profileImage} />
                        <Text style={styles.name}>{user.data.name}</Text>
                        <Text style={styles.bio}>{user.data.bio}</Text>
                        <Text style={styles.email}>{user.data.email}</Text>
                    </>
                ) : (
                    <Text style={styles.loading}>Cargando...</Text>
                )}
                <FlatList
                    data={userPosts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Image source={{ uri: item.data.imageUrl }} style={styles.postImage} /> {/* cambiar .imageUrl por como le hallamos puesto en crearpost */}
                            <Text style={styles.postText}>{item.data.pie}</Text> {/* cambiar .pie por como le hallamos puesto en crearpost */}
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    bio: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    email: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    loading: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
    postContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    postImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
        color: '#333',
    },
});

export default FriendProfile;
