import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'


class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      info:[],
      loading:true
    }
  }


  render(){
    return (
      <View>
       <Text>Aqui van los datos del perfil </Text>

        
      </View>
    )
  }
}

export default Profile