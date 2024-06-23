import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            error: '',
            loading: true, 
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('tabnav'); 
            } else {
                this.setState({ loading: false }); 
            }
        });
    }

    onSubmit(email, password) {
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({ error: 'Invalid email' });
            return false;
        }
        if (password === null || password === '') {
            this.setState({ error: 'Invalid password' });
            return false;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                this.props.navigation.navigate('Main');
            })
            .catch(err => {
                if (err.code === 'auth/internal-error') {
                    this.setState({ error: 'Incorrect password or invalid email' });
                }
            });
    }

    redirectRegister() {
        this.props.navigation.navigate('Register');
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                </View>
            );
        }

        const isButtonDisabled = this.state.email === '' || this.state.password === '';

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ email: text, error: '' })}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ password: text, error: '' })}
                    value={this.state.password}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={() => this.onSubmit(this.state.email, this.state.password)}
                    style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Do you not have an account yet?
                        <TouchableOpacity onPress={() => this.redirectRegister()}>
                            <Text style={styles.registerLink}> Click here</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                {this.state.error !== '' ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : null}
            </View>
        );
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
    buttonDisabled: {
        backgroundColor: '#aaa',
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
