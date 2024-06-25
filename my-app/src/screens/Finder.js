import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Picker, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Finder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InputValue: '',
            Filtered: 'name',
            Users: [],
            
        };
    }

    componentDidMount() {
        db.collection("users").onSnapshot((snap) => {
            let data = [];
            snap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                Users: data
            });
        });
    }

 
    selectedUser(value) {
        if (value === auth.currentUser.email) {
            this.props.navigation.navigate('my-profile');
        } else {
            this.props.navigation.navigate("friend-profile", { email: value }); 
        }
    }

    render() {
        
        const UsersFiltered = this.state.Users.filter((usuario) =>
            usuario.data[this.state.Filtered]?.toLowerCase().includes(this.state.InputValue.toLowerCase())
        );

        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.Filtered}
                    onValueChange={(itemValue) => this.setState({ Filtered: itemValue })}
                    style={styles.picker}
                >
                    <Picker.Item label="Email" value="email" />

                    <Picker.Item label="UserName" value="name" />

                    
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder={`Search by ${this.state.Filtered}`}
                    value={this.state.InputValue}
                    onChangeText={(text) => this.setState({ InputValue: text })}
                />
                {UsersFiltered.length === 0 ? (
                    <Text style={styles.noResultsText}>No hay usuarios que coincidan con tu búsqueda</Text>
                ) : (
                    <FlatList
                        data={UsersFiltered}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userItem}
                                onPress={() => this.selectedUser(item.data.email)}
                            >
                                <Text style={styles.userName}>{item.data.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    picker: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 5,
    },
    input: {
        height: 40,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 5,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#999999',
        marginTop: 20,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    userName: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
});

