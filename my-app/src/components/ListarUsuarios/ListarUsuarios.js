/* import react, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from "react-native";

class ListarUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: props.usuarios
        }
    }

    render() {
        return(
            <View>
                <FlatList
                    data={this.state.usuarios}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                style={styles.imagen}
                                source={{ uri: item.imagen }}
                            />
                            <Text>{item.nombre}</Text>
                            <Text>{item.email}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.email}
                />
            </View>
        )
    }
}

export default ListarUsuarios;

const styles = StyleSheet.create({

}); */