import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../../firebase/config'




class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      info:[],
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(
      (docs)=>{
        let users = []
        docs.forEach(
          doc => {
            users.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          info:users,
        })
  
      }
    )
  }

  render(){
    return(
      <View style={style.container}>
        <Text>{auth.currentUser.email}</Text>
        <TouchableOpacity onPress={()=> props.route.params.logout()}>
          <Text style={style.boton}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

  




const style = StyleSheet.create({
  container:{ 
      padding: 10,
      marginTop: 20
  },
  field: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: '#ccc',
      borderStyle: 'solid',
      marginVertical: 10
  },
  boton:{
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      backgroundColor: '#28a745',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#28a745'
  },
  texto:{
      textAlign: 'left',
      padding: 5,
      fontFamily: 'Arial'

  }
});
 

export default Profile