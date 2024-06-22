/* import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import {storage, auth} from '../../firebase/config'

export default class Camara extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dioPermiso: false,
            urlTemporal: ''
        }
        this.metodosCamara = null
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState({ dioPermiso: true }))
            .catch(() => console.log("No nos dio los permisos de Camara"))
    }


    render() {
        return (
            <View style={styles.contenedor}>
               { 
               this.state.dioPermiso ?
                    this.state.urlTemporal === '' ?
                    <Camera
                        type= {Camera.Constants.Type.back}
                        style= {styles.camara}
                        ref= {(metodos)=> this.metodosCamara = metodos}
                    />
                    :
                    <>
                    <Image />
                    </>
               :
               <Text>No diste permisos para usar la Camara</Text>
               
               }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex:1
    },
    camara:{
        height:400
    }
});
 */