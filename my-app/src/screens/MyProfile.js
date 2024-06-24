import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteo from '../components/Posteo/Posteo';

class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
            PostsUser: [],
            user: null,
            data: {} // Initialize data in the state
        };
    }

    componentDidMount() {
        db.collection("posteos").where("owner", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let postsDb = [];
                docs.forEach(doc => {
                    postsDb.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                console.log('Posts:', postsDb);
                this.setState({
                    PostsUser: postsDb
                });
            });

        db.collection('users').where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let userInfo = null;
                docs.forEach(doc => {
                    userInfo = {
                        id: doc.id,
                        data: doc.data()
                    };
                });
                this.setState({
                    user: userInfo,
                    data: userInfo ? userInfo.data : {} // Set data in the state
                });
                console.log(userInfo);
            },
                error => {
                    console.error("Error fetching user data: ", error);
                }
            );
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate("login");
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteThePost(idSpecificPost) {
        db.collection("posteos")
            .doc(idSpecificPost)
            .delete()
            .then((res) => console.log(res))
            .catch(e => console.log(e));
    }

    deleteProfile(id) {
        const SpecificUser = auth.currentUser;
        db.collection('users').doc(id).delete()
            .then(() => {
                SpecificUser.delete()
                    .then(() => {
                        console.log('User Removed');
                        this.props.navigation.navigate("login");
                    })
                    .catch((error) => {
                        console.log('User could not be deleted', error);
                    });
            })
            .catch((error) => {
                console.log('Document not deleted', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.user ? (
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: this.state.user.data.profilePic }} style={styles.profileImage} />
                        <View style={styles.profileDetails}>
                            <Text style={styles.name}>{this.state.user.data.name}</Text>
                            <Text style={styles.bio}>{this.state.user.data.bio}</Text>
                            <Text style={styles.email}>{auth.currentUser.email}</Text>
                            <Text style={styles.postsCount}>Posts: {this.state.PostsUser.length}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noPostsText}>Loading...</Text>
                )}
    
                {this.state.PostsUser.length > 0 ? (
                    <FlatList
                        data={this.state.PostsUser}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>
                                <Posteo borrarPosteo={(idPosteo) => this.deleteThePost(idPosteo)} post={item} />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noPostsText}>This user does not have any posts</Text>
                )}
    
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>LogOut</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.deleteProfile(this.state.user.id)}>
                    <Text style={styles.buttonText}>Delete this Profile</Text>
                </TouchableOpacity>
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
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    profileDetails: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#666',
    },
    postsCount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    postContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    noPostsText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});


export default MyProfile;
