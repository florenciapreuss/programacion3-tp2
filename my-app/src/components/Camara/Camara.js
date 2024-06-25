import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { storage } from '../../firebase/config';

export default class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dioPermiso: false,
            urlTemporal: ''
        };
        this.metodosCamara = null;
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(({ status }) => {
                if (status === 'granted') {
                    this.setState({ dioPermiso: true });
                } else {
                    console.log('No se otorgaron los permisos de la cámara');
                }
            })
            .catch(() => console.log('No se otorgaron los permisos de la cámara'));
    }

    tomarFoto() {
        this.metodosCamara.takePictureAsync()
            .then((urlTemp) => this.setState({ urlTemporal: urlTemp.uri }))
            .catch((err) => console.log(err));
    }

    descartarFoto() {
        this.setState({
            urlTemporal: ''
        });
    }

    guardarFotoEnFirebase() {
        fetch(this.state.urlTemporal)
            .then((img) => img.blob())
            .then((imgProcesada) => {
                const ref = storage.ref(`fotosPosts/${Date.now()}.jpeg`);
                ref.put(imgProcesada)
                    .then(() =>
                        ref.getDownloadURL()
                            .then(url => this.props.actualizarImgUrl(url))
                    );
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.contenedor}>
                {
                    this.state.dioPermiso ?
                        this.state.urlTemporal === '' ?
                            <>
                                <Camera
                                    style={styles.camara}
                                    ref={(metodos) => (this.metodosCamara = metodos)}
                                    type={Camera.Constants.Type.back}
                                    ratio="16:9"
                                />
                                <TouchableOpacity
                                    style={styles.boton}
                                    onPress={() => this.tomarFoto()}
                                >
                                    <Text style={styles.textoBoton}>Take photo</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <Image
                                    style={styles.imagen}
                                    source={{ uri: this.state.urlTemporal }}
                                    resizeMode="contain"
                                />

                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity
                                        style={[styles.boton, styles.botonSecundario]}
                                        onPress={() => this.descartarFoto()}
                                    >
                                        <Text style={styles.textoBoton}>Retake</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.boton, styles.botonPrincipal]}
                                        onPress={() => this.guardarFotoEnFirebase()}
                                    >
                                        <Text style={styles.textoBoton}>Use</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        : (
                            <Text>You haven't given permission to use your camera</Text>
                        )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camara: {
        height: '60%',
        width: '100%',
        aspectRatio: 16 / 9,
    },
    imagen: {
        height: '60%',
        width: '100%',
        aspectRatio: 16 / 9,
    },
    boton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    botonPrincipal: {
        backgroundColor: '#4CAF50',
    },
    botonSecundario: {
        backgroundColor: '#FF5722',
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});
