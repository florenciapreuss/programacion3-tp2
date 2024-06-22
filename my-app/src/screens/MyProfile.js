import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { getAuth, deleteUser } from "firebase/auth";
/* import Posteo from '../../components/Posteo'; */

class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
            PostsUser: [],
        };
    }

    componentDidMount() {
        db.collection("posts").where("userPost", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let postsDb = [];
                docs.forEach(doc => {
                    postsDb.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                console.log('Posts:', postsDb)
                this.setState({
                    PostsUser: postsDb
                });
            });
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
        db.collection("posts")
            .doc(idSpecificPost)
            .delete()
            .then((res) => console.log(res))
            .catch(e => console.log(e))

    }

    borrarUsuario(id) {
        const SpecificUser = auth.currentUser;
        db.collection('users').doc(id).delete()
            .then(() => {
                SpecificUser.delete()
                    .then(() => {
                        console.log('Removed User');
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
            <View /* style={} */>
                <Image /* style={} *//>
                {
                    this.state.PostsUser.length > 0 ?
                        <FlatList
                            data={this.state.PostsUser}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) =>
                         <View>  <Posteo borrarPosteo={(idPosteo) => this.deleteThePost(idPosteo)} post={item} /> </View>}
                        />
                        :
                        <Text>This user does not have any posts</Text>
                }
                <TouchableOpacity /* style={} */ onPress={() => this.logout()}>
                    <Text /* style={} */>LogOut</Text>
                </TouchableOpacity>
                <TouchableOpacity /* style={} */ onPress={() => (this.borrarUsuario())(this.props.navigation.navigate("Home"))}>
                    <Text /* style={} */>Delete this Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default MyProfile;