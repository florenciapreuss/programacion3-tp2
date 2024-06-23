import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../firebase/config';
import Posteo from '../components/Posteo/Posteo'; 
import { AntDesign } from '@expo/vector-icons';

class FriendProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userPosts: []
        };
    }

    componentDidMount() {
        const email = this.props.route.params.email;
        console.log(email);

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
            },
            error => {
                console.error("Error fetching user data: ", error);
            }
        );

        db.collection('posteos').where('owner', '==', email).onSnapshot(
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
            },
            error => {
                console.error("Error fetching posts data: ", error);
            }
        );
    }

    render() {
        const { user, userPosts } = this.state;

        return (
            <View style={styles.container}>
                {user ? (
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: user.data.profilePic }} style={styles.profileImage} />
                        <View style={styles.profileDetails}>
                            <Text style={styles.name}>{user.data.name}</Text>
                            <Text style={styles.bio}>{user.data.bio}</Text>
                            <Text style={styles.email}>{user.data.email}</Text>
                            <Text style={styles.postsCount}>Posts: {userPosts.length}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.loading}>Loading...</Text>
                )}

                <FlatList
                    data={userPosts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Posteo
                            post={item}
                            navigation={this.props.navigation}
                        />
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
    loading: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
    postsCount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default FriendProfile;
