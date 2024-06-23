import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posteo from '../components/Posteo/Posteo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: []
        };
    }

    componentDidMount() {
        db.collection("posteos")
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                let posteosObtenidos = [];
                docs.forEach((doc) => {
                    posteosObtenidos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ posteos: posteosObtenidos }, () => {
                    console.log(this.state.posteos);
                });
            });
    }

    render() {
        return (
<<<<<<< HEAD
            <View>
                <Text style={styles.title}>PicShot</Text>
=======
            <View style={styles.container}>
                <Text style={styles.title}>Feed</Text>
>>>>>>> 1d3721040cd9f0ac9d3133abd571e81c202f0f9b
                <FlatList
                    style={styles.flatList}
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Posteo
                            post={item}
                            navigation={this.props.navigation}
                        />
                    )}
                />
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },
    flatList: {
        flex: 1,
    },
});
