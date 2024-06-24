import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { storage, auth } from '../../firebase/config';

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
        // Request camera permissions asynchronously
        console.log('Camera', Camera)
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState({ dioPermiso: true }))
            .catch(() => console.log('No se otorgaron los permisos de la cámara'));
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then((urlTemp)=> this.setState({urlTemporal: urlTemp.uri}) )
        .catch(()=> console.log(err))
    }

    descartarFoto(){
        this.setState({
            urlTemporal: ''
        })
    }

    guardarFotoEnFirebase(){
        fetch(this.state.urlTemporal)
        .then((img)=> img.blob())
        .then((imgProcesada)=>{
            const ref = storage.ref(`fotosPosts/${Date.now()}.jpeg`)
            ref.put(imgProcesada)
            .then((url)=> 
                ref.getDownloadURL()
                .then(url=>this.props.actualizarImgUrl(url))
        
        )
        }
        )
        .catch(err=>console.log(err))
    }


    render() {
        return (
            <View style={styles.contenedor}>
                {
                
                this.state.dioPermiso ? 
                    // Check if urlTemporal is empty to decide whether to render Camera or Image
                    this.state.urlTemporal === '' ? 
                        <>
                        <Camera
                            style={styles .camara}
                            ref={(metodos) => (this.metodosCamara = metodos)}
                            type={Camera.Constants.Type.back} // Set camera type to back
                        />
                        <TouchableOpacity
                            onPress= {( )=>this.tomarFoto()}
                            >
                            <Text>Tomar foto</Text>
                         </TouchableOpacity> 
                       </>
                     : <>

                        <Image
                            style={styles.imagen}
                            source= {{uri: this.state.urlTemporal}}
                            /> 
                        
                        <TouchableOpacity onPress={()=>this.descartarFoto()}>
                            <Text>Rechazar foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.guardarFotoEnFirebase}>
                            <Text>Aceptar foto</Text>
                        </TouchableOpacity>
                            
                       
                        </> 
                 : (
                    // Render this when dioPermiso is false
                    <Text>No diste permisos para usar la cámara</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    camara: {
       height: 400    
    },
    imagen:{
        height: 400,
        width: '100%'
    }
});
