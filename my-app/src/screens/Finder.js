import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Picker, FlatList} from 'react-native';
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

    usuarioElegido(owner) {
        if (owner === auth.currentUser.email) {
            this.props.navigation.navigate('my-profile');
        } else {
            this.props.navigation.navigate("friend-profile", { email: owner }); // Pasar el email a DetalleUsuario
        }
    }



   
    render() {

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
                    <Picker.Item label="Nombre" value="name" />
                    <Picker.Item label="Email" value="owner" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder={`Busca por ${this.state.campoFiltrado}`}
                    value={this.state.valorInput}
                    onChangeText={(text) => this.setState({ valorInput: text })}
                />
                {usuariosEncontrados.length === 0 ? (
                    <Text>No hay usuarios que coincidan con tu búsqueda</Text>
                ) : (
                    <FlatList
                        data={usuariosEncontrados}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userItem}
                                onPress={() => this.usuarioElegido(item.data.owner)}
                            >
                                <View>
                                    <Text style={styles.userName}>{item.data.name}</Text>
                                </View>
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
        padding: 20,
        backgroundColor: '#93CD93',
    },
    img: {
        height: 70,
        width: 70,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#92CD93',
        color: '#ffffff',
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 5,
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 20,
    },
    userItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#92CD93',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        color: '#333',
    },
});

