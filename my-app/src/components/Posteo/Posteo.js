// Mostrar la tarjeta del posteo
import react, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            
        }
    }
    
    render() {
        console.log(this.props);
    
        return (
          <View style={styles.postContainer}>
            <View >
              <Image style={styles.imagen} source={{ uri: this.props.post.data.imagen }}
                
              />
            </View>
            <Text > {this.props.post.data.descripcion}</Text>
    
            
    
           
          </View>
        );
    }
}

export default Posteo;







const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    imagen: {
        width: '100%',
        aspectRatio: 1, // Mantener la relación de aspecto de la imagen
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    postDescripcion: {
        padding: 10,
        fontSize: 16,
    },
});
