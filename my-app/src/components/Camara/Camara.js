import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera/legacy'
import {storage, auth} from '../../firebase/config'

export default class Camara extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dioPermiso: false,
            urlTempo: ''
        }
        this.metodosCamara = null
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState({ dioPermiso: true }))
            .catch(() => console.log("no nos dio los permisos de camara"))
    }

    // metodo para tomar la imagen
    tomarImagen(){
        this.metodosCamara.takePictureAsync()
        .then((urlTemp)=> this.setState({urlTempo: urlTemp.uri}))
        .catch((err)=> console.log(err))
    }

    // metodo para descartar la imagen
    descartarImagen(){
        this.setState({
            urlTempo:''
        })
    }

    // metodo para guardar la imagen
    guardarImagen(){
        fetch(this.state.urlTempo)
        .then((img)=> img.blob())
        .then((imgProcesada)=>{
            const ref = storage.ref(`imagenesPost/${Date.now()}.jpeg`)
            ref.put(imgProcesada)
            .then((url)=> {
                ref.getDownloadURL()
                .then(url => this.props.actualizarimg(url))
            })
        })
        .catch((err)=> console.log(err))
    }

    render() {
        return (
            <View style={styles.contenedor}>
                {
                    this.state.dioPermiso ?
                        this.state.urlTempo === '' ?
                        <>
                            <View style={styles.cameraWrapper}>
                            <Camera
                                type={Camera.Constants.Type.back}
                                style={styles.camara}
                                ref = {(metodos) => this.metodosCamara = metodos}
                            /> </View>
                            <TouchableOpacity 
                            style={styles.button}
                            onPress={()=> this.tomarImagen()}>
                                <Text style={styles.buttonText}>Tomar foto</Text>
                            </TouchableOpacity> </>
                            :
                            <>
                                <Image style={styles.imagen}
                                    source={{uri: this.state.urlTempo}}
                                />
                                <TouchableOpacity style={styles.button} onPress={()=> this.guardarImagen()}>
                                    <Text style={styles.buttonText}>Aceptar foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}  onPress={()=> this.descartarImagen()}>
                                    <Text style={styles.buttonText}>Rechazar foto</Text>
                                </TouchableOpacity>
                            </>
                        :
                        <Text style={styles.buttonText}> Tenes que dar permiso para usar la camara </Text>                    
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'rgb(146, 205, 147)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    camara: {
        height: 400,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    cameraWrapper: {
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imagen: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#93CD93',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});