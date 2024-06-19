/* import react, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { auth, db, storage } from '../firebase/config';

class FormularioNuevoPosteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagen: "",
            descripcion: "",
            fecha: new Date(),
            email: auth.currentUser.email,
            likes: 0,
            arrayLikes: [],
            comentarios: 0,
            arrayComentarios: []
        }
    }

    handleInputChange = (inputName, inputValue) => {
        this.setState({ [inputName]: inputValue });
    }

    handleSubmit = () => {
        db.collection("posteos").add(this.state)
            .then(() => {
                console.log("Posteo creado");
                this.props.navigation.navigate("Home");
            })
            .catch((error) => {
                console.error("Error al crear el posteo: ", error);
            })
    }

    render() {
        return(
            <View>
                <Text>Imagen</Text> */
                {/*
                    EN CASO DE TENER QUE INCORPORAR CAMARA DE FOTOS HACERLO ACÁ. 
                    TIENE QUE SER UN COMPONENTE CÁMARA QUE SAQUE LA FOTO Y OTRO QUE LA MUESTRE
                */}
               {/*  <TextInput
                    style={styles.input}
                    placeholder="URL de la imagen"
                    onChangeText={(value) => this.handleInputChange("imagen", value)}
                />
                <Text>Descripción</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descripción del posteo"
                    onChangeText={(value) => this.handleInputChange("descripcion", value)}
                />
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => this.handleSubmit()}
                >
                    <Text>Crear posteo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FormularioNuevoPosteo;

const styles = StyleSheet.create({

}) */}