/* // Listar las tarjetas de cada posteo
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { auth, db, storage } from '../firebase/config';
import Posteo from "../Posteo/Posteo";


class ListarPosteos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection("posteos").onSnapshot((querySnapshot) => {
            let posteos = [];

            querySnapshot.forEach((doc) => {
                posteos.push(doc.data());
            })

            // ordenar los posteos por fecha descendente
            // posteos.map((posteo) => posteo.fecha = posteo.fecha.toDate());
            // posteos.sort((a, b) => b.fecha - a.fecha);

            this.setState({ posteos: posteos }, () => {
                console.log(this.state.posteos)})
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.posteos}
                    renderItem={({ item }) => <Posteo posteo={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

export default ListarPosteos;

const styles = StyleSheet.create({
    
}) */