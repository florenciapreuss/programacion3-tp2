import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { auth } from '../firebase/config'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            password:'',
            email:'',
            error: ''
        }
    }

    componentDidMount(){
        console.log('Hizo el didMount y estas son sus props')
        console.log(this.props)
    }

    onSubmit(name, email, password){
        if(
            name === null || name === '' || name.length < 5
        ){
            this.setState({error: 'name needs at least 5 characters'})
            return false
        }
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'El email tiene un formato invalido'})
            return false
        }
        if(

            password === null || password === '' || password.length < 6
        ){
            this.setState({error: 'La password no puede ser menor de 6 caracteres'})
            return false
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                console.log('usuario registrado')
            }
        })
        .catch((err) =>{ 
            if(err.code === "auth/email-already-in-use"){
                this.setState({error:'El email ya se encuentra en uso'})
            }
        })



    }

    redirect(){
        this.props.navigation.navigate('login')
    }

    render(){
        return(
            <View>
                <Text>Registra tu usuario</Text>
                <TextInput
                    onChangeText={(text) => this.setState({name: text, error: ''})}
                    value={this.state.name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Indica tu email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({password: text, error: ''})}
                    value={this.state.password}
                    placeholder='Indica tu password'
                    keyboardType='default'
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
                >
                    <Text style={styles.textBtn}>Registrarme</Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        Ya tienes una cuenta?
                    <TouchableOpacity
                        onPress={()=> this.redirect()}
                    >
                        <Text>Ingresa aqui</Text>
                    </TouchableOpacity>
                    </Text>
                </View>
                {
                    this.state.error !== '' ?
                    <Text>
                        {this.state.error}
                    </Text>
                    : 
                    ''
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius:5,
        marginBottom:16
    },
    btn:{
        backgroundColor:'green',
        textAlign: 'center',
        padding: 10
    },
    textBtn: {
        color: 'white',

    }
})

export default Register