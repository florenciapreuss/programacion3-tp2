import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FriendProfile from '../screens/FriendProfile'
import Home from '../screens/Home'
import TabNav from './TabNav'

const Stack = createNativeStackNavigator();


export default class StackHome extends Component {
  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='home' 
            component={Home}
            options={{
                headerShown: false
            }} 
            />
            <Stack.Screen 
                name='friend-profile' 
                component={FriendProfile} 
                options={{
                    headerShown: false
                }} 
            />
        </Stack.Navigator>

    )
  }
}

