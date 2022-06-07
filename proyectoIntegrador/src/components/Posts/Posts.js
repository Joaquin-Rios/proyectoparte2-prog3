import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'


class Posts extends Component {
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
       <Text>Aqui irian los posts</Text>

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn:{
    flex:1,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'#192A51',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
  },
  textBtn:{
    color:'white'
  }
})

export default Posts