import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'
import TabNav from './TabNav'

const Stack = createNativeStackNavigator();


export default class MainNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen 
                name='login' 
                component={Login} 
                options={{
                    headerShown: false
                }} 
            />
            <Stack.Screen 
            name='register' 
            component={Register}
            options={{
                headerShown: false
            }} 
            />
            <Stack.Screen
            options={{
                headerShown:false
            }} 
            name='tabnav' component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}