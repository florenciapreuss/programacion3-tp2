/* // Mostrar la tarjeta del posteo
import react, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteo: props.posteo
        }
    }

    render() {
        return (
            <View>
                <Image
                    style={styles.imagen} // tiene que tener el alto de la caja
                    source={{ uri: this.state.posteo.imagen }}
                />
                <Text style={styles.posteo}>{this.state.posteo.descripcion}</Text>
            </View>
        );
    }
}

export default Posteo;

const styles = StyleSheet.create({
    imagen: {
        
    },
}) */