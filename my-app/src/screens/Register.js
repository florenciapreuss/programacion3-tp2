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
        console.log(this.props)
    }

    onSubmit(name, email, password){
        if(
            name === null || name === '' || name.length < 5
        ){
            this.setState({error: 'Name needs at least 5 characters'})
            return false
        }
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'Invalid email'})
            return false
        }
        if(

            password === null || password === '' || password.length < 6
        ){
            this.setState({error: 'Password has to be at least 6 characters long'})
            return false
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                console.log('registered user')
            }
        })
        .catch((err) =>{ 
            if(err.code === "auth/email-already-in-use"){
                this.setState({error:'Email belongs to another user'})
            }
        })



    }

    redirect(){
        this.props.navigation.navigate('login')
    }

    render(){
        return(
            <View>
                <Text>Register</Text>
                <TextInput
                    onChangeText={(text) => this.setState({name: text, error: ''})}
                    value={this.state.name}
                    placeholder='Name'
                    keyboardType='default'
                />
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
                    onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        Do you have an account already?
                    <TouchableOpacity
                        onPress={()=> this.redirect()}
                    >
                        <Text> Click here!</Text>
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

export default Register