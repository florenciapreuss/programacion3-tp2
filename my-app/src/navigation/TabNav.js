import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import StackHome from './StackHome';
import NewPost from '../screens/NewPost'
import MyProfile from '../screens/MyProfile'
import Finder from '../screens/Finder'

import { FontAwesome6 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
            options={{
                headerShown:false,
                tabBarIcon: ()=>  <Entypo name="home" size={24} /> 
       

            }} 
            name='Feed' component={StackHome} 
        />
        <Tab.Screen 
        name='new-post' 
        component={NewPost}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <AntDesign name="camerao" size={24}  />
        }}
        />
        <Tab.Screen 
        name='my-profile' 
        component={MyProfile}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <MaterialCommunityIcons name="human" size={24} />
          
        }}
        />
        <Tab.Screen 
        name='finder' 
        component={Finder}
        options={{
          headerShown:false,
          tabBarIcon: ()=> <FontAwesome name="search" size={24} />
        }}
        />
      </Tab.Navigator>
    )
  }
}

