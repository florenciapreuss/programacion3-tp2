import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, TouchableHighlightBase } from 'react-native'
import { db, auth } from '../firebase/config'
import Camara from '../components/Camara/Camara'

export default class Post extends Component {
    constructor(props) {
        super(props)
     this.state = {
        descripcion: '',
        imageUrl: ''
     }
    }

onSubmit(descripcion,imageUrl){
    if(descripcion != ''){
        db.collection('posteos').add({
            descripcion: descripcion,
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            imageUrl: imageUrl,
            likes:[],
            comments:[],

        })
        .then(()=> {
            this.setState({
                descripcion:'',
                imageUrl: ''
            },
            ()=> this.props.navigation.navigate('home'),
           
        )
            
        })
        .catch((err)=> console.log(err))
    }
}

render(){
    return(
        <View>
            <TextInput 
            value= {this.state.descripcion}
            onChangeText= {(text)=> this.setState({descripcion: text})}
            placeholder= 'Describe tu post'
            style={StyleSheet.input}
            />
            <TextInput
             value= {this.state.imageUrl}
             onChangeText= {(text)=> this.setState({imageUrl: text})}
             placeholder= 'Agrega el link a tu imagen!'
             style={StyleSheet.input}
            />
            <TouchableOpacity onPress={()=>this.onSubmit(this.state.descripcion, this.state.imageUrl)}>
                <Text>Create Post</Text>
            </TouchableOpacity>

        </View>

    )
}
}




const styles = StyleSheet.create({
    input:{
        borderColor: 'green'

    }
})