import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            estaLogueado: false
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({estaLogueado: true})
            }
        })
    }
    cerrarSesion(){
        auth.signOut()
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
    render() {
    return (
      <View>
        <Text>My Profile</Text>
        {
            this.state.estaLogueado ? /* Si esta logueado es true, entonces puede cerrar sesion */
            <TouchableOpacity
                onPress={()=> this.cerrarSesion()}
            >
                <Text>Log out</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}

export default MyProfile