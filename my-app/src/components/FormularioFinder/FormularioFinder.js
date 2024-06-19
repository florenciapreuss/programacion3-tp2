/* import react, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from "react-native";
import { auth, db, storage } from '../firebase/config';

import ListarUsuarios from "../ListarUsuarios/ListarUsuarios";

class FormularioFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            usuarios: []
        }
    }

    handleInputChange = (inputName, inputValue) => {
        this.setState({ [inputName]: inputValue });
    }

    handleSubmit = () => {
        db.collection("usuarios").where("email", "==", this.state.busqueda).get()
            .then((querySnapshot) => {
                let usuarios = [];
            
                querySnapshot.forEach((doc) => {
                    usuarios.push(doc.data());
                })

                this.setState({ usuarios: usuarios }, () => {
                    console.log(this.state.usuarios);
                })
            })
            .catch((error) => {
                console.error("Error al buscar el usuario: ", error);
            })

        db.collection("usuarios").where("nombre", "==", this.state.busqueda).get()
            .then((querySnapshot) => {
                let usuarios = this.state.usuarios;
            
                querySnapshot.forEach((doc) => {
                    usuarios.push(doc.data());
                })

                this.setState({ usuarios: usuarios }, () => {
                    console.log(this.state.usuarios);
                })
            })
            .catch((error) => {
                console.error("Error al buscar el usuario: ", error);
            })
    }

    render() {
        return(
            <View>
                <Text>Buscar:</Text>
                <TextInput  
                    style={styles.input}
                    placeholder="Email o nombre del usuario"
                    onChangeText={(value) => this.handleInputChange("busqueda", value)}
                />
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => this.handleSubmit()}
                >
                    <Text>Buscar</Text>
                </TouchableOpacity>
                {
                    this.state.usuarios.length > 0 ?
                    <>
                        <Text>Usuarios encontrados:</Text>
                        <ListarUsuarios usuarios={this.state.usuarios} />            
                    </> :
                    <Text>El email/username no existe.</Text>
                }

            </View>
        )
    }
}

export default FormularioFinder;

const styles = StyleSheet.create({}) */