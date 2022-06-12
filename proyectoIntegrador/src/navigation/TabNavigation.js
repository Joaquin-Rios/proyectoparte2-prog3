import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Posts from '../components/Posts/Posts';
import NewPosts from '../screens/NewPosts/NewPosts';

const Tab = createBottomTabNavigator()

export default function TabNavigation(props) {
  const{logout} = props.route.params
  
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}
         options ={
           {tabBarIcon:()=> <AntDesign name="home" size={24} color="black" />}
           }
          />

        <Tab.Screen name='NewPosts' component={NewPosts}
         options ={
           {tabBarIcon:()=> <AntDesign name="instagram" size={24} color="black" />}
           }
          />

        <Tab.Screen name='Profile' component={Profile}
          options ={
            {tabBarIcon:()=> <Ionicons name="person-circle-outline" size={24} color="black" />}
          } 
        initialParams={{
            logout: () => logout()
        }}
        />
        

    </Tab.Navigator>
  )
}