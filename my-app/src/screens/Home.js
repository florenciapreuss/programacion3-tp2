import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posteo from '../components/Posteo/Posteo'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: []
        }
    }

  

    componentDidMount() {
        db.collection("posteos")
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
            let posteosObtenidos = []
            docs.forEach((doc) => {
                posteosObtenidos.push({
                    id:doc.id,
                    data: doc.data()
            });
            })

            this.setState(
                { posteos: posteosObtenidos}, () => {
                console.log(this.state.posteos)})
        })
    }
  

    render() {
        return (
            <View>
                <Text style={styles.title}>Home</Text>
                <FlatList
                
                    style={styles.flatList}
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Posteo post={item} />}
                    
                />
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

