import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Picker, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Finder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: '',
            usuariosMostrados: [],
            campoFiltrado: 'name',
        };
    }

    componentDidMount() {
        // Fetch users from Firestore and update state
        db.collection("users").onSnapshot((snap) => {
            let data = [];
            snap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                usuariosMostrados: data
            });
        });
    }

    // Function to navigate to user profile based on email
    usuarioElegido(owner) {
        if (owner === auth.currentUser.email) {
            this.props.navigation.navigate('my-profile');
        } else {
            this.props.navigation.navigate("friend-profile", { email: owner }); // Pasar el email a DetalleUsuario
        }
    }

    render() {
        // Filter users based on campoFiltrado and valorInput
        const usuariosEncontrados = this.state.usuariosMostrados.filter((usuario) =>
            usuario.data[this.state.campoFiltrado]?.toLowerCase().includes(this.state.valorInput.toLowerCase())
        );

        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.campoFiltrado}
                    onValueChange={(itemValue) => this.setState({ campoFiltrado: itemValue })}
                    style={styles.picker}
                >
                    <Picker.Item label="Name" value="name" />
                    <Picker.Item label="Email" value="email" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder={`Search by ${this.state.campoFiltrado}`}
                    value={this.state.valorInput}
                    onChangeText={(text) => this.setState({ valorInput: text })}
                />
                {usuariosEncontrados.length === 0 ? (
                    <Text style={styles.noResultsText}>No hay usuarios que coincidan con tu búsqueda</Text>
                ) : (
                    <FlatList
                        data={usuariosEncontrados}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userItem}
                                onPress={() => this.usuarioElegido(item.data.email)}
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

