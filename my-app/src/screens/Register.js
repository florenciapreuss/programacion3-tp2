import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { auth, db } from '../firebase/config'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            password:'',
            email:'',
            bio: '',
            profilePic: '',
            error: ''
        }
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
        this.setState({ loading: true, error: '' });

        auth.createUserWithEmailAndPassword(email, password)

        .then(user => {
            db.collection('users').add({
                email: email,
                name: name,
                bio: this.state.bio,
                profilePic: this.state.profilePic,
                createdAt: Date.now()
            })
            .then(()=> {
                this.setState({
                    name:'',
                    email:'',
                    password:'',
                    loading: false
                });
                this.props.navigation.navigate('login')
            })
        })
        .catch(err => this.setState({ error: err.message, loading: false }));
    };
   


    redirect(){
        this.props.navigation.navigate('login')
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    onChangeText={(text) => this.setState({name: text, error: ''})}
                    value={this.state.name}
                    placeholder='Name'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({bio: text, error: ''})}
                    value={this.state.bio}
                    placeholder='Type your bio description'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({profilePic: text, error: ''})}
                    value={this.state.profilePic}
                    placeholder='Paste the url to your profile picture'
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
                    onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Do you have an account already?
                        <TouchableOpacity
                            onPress={()=> this.redirect()}
                        >
                            <Text style={styles.registerLink}> Click here!</Text>
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

export default Register