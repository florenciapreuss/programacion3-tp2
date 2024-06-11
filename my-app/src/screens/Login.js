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
            this.setState({error: 'Password needs at leat 6 characters'})
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            this.props.navigation.navigate('tabnav')
        })
        .catch(err => {
            if(err.code === 'auth/internal-error'){
                this.setState({error: 'Incorrect password'})
            }
        })

    }

    redirect(){
        this.props.navigation.navigate('register')
    }

    render(){
        return(
            <View>
                <Text>Login</Text>
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='default'
                />
                <TextInput
                    onChangeText={(text) => this.setState({password: text, error: ''})}
                    value={this.state.password}
                    placeholder='Password'
                    keyboardType='default'
                />
                <TouchableOpacity
                    onPress={()=> this.onSubmit(this.state.email, this.state.password)}
                >
                    <Text>Enter</Text>
                </TouchableOpacity>

                <View>
                    <Text>
                        Do you not have an account yet?
                    <TouchableOpacity
                        onPress={()=> this.redirect()}
                    >
                        <Text>Click here</Text>
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

export default Login