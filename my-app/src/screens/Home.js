import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ListarPosteos from '../components/ListarPosteos/ListarPosteos';

class Home extends Component {
    render() {
        return (
            <View>
                <Text style={styles.title}>Home</Text>
                
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: "black"
    },
})