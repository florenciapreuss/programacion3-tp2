import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'; //para ponerles alguna fotito

import StackHome from './StackHome';
import NewPost from '../screens/NewPost'
import MyProfile from '../screens/MyProfile'
import Finder from '../screens/Finder'


import { Entypo } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon: ()=> <Entypo name="Home" size={24} color="#92CD93" /> 
       

            }} 
            name='Feed' component={StackHome} 
        />
        <Tab.Screen 
        name='new-post' 
        component={NewPost}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <Entypo name="New-Post" size={24} color="#92CD93" /> 
        }}
        />
        <Tab.Screen 
        name='my-profile' 
        component={MyProfile}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <Entypo name="MyProfile" size={24} color="#92CD93" /> 
        }}
        />
        <Tab.Screen 
        name='finder' 
        component={Finder}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <Entypo name="Finder" size={24} color="#92CD93" /> 
        }}
        />
      </Tab.Navigator>
    )
  }
}

