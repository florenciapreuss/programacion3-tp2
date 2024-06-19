import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { auth } from '../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            password:'',
            email:'',
            error: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) =>{
            if(user){
                console.log('logged email',auth.currentUser.email)
            }
        })
    }

    onSubmit(email, password){
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'Invalid email'})
            return false
        }
        if(
            password === null || password === ''
        ){
            this.setState({error: 'Invalid password'})
            return false
        }
        
        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            this.props.navigation.navigate('tabnav')
        })
        .catch(err => {
            if(err.code === 'auth/internal-error'){
                this.setState({error: 'Incorrect password or invalid email'})
            }
        })

    }

    redirectRegister(){
        this.props.navigation.navigate('register')
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({password: text, error: ''})}
                    value={this.state.password}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={()=> this.onSubmit(this.state.email, this.state.password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Do you not have an account yet?
                        <TouchableOpacity
                            onPress={()=> this.redirectRegister()}
                        >
                            <Text style={styles.registerLink}> Click here</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                {
                    this.state.error !== '' ?
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                    : 
                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
    },
    registerLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        textAlign: 'center',
    }
});

export default Login
