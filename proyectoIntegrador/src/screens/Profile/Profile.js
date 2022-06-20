import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../../firebase/config'
import Posts from '../../components/Posts/Posts'




class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user: '',
      userPost: [],
      loading: true,
    }
  }

  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
      (userEncontrado)=>{
        let userFiltrado = []

        userEncontrado.forEach(
          user => {
            userFiltrado.push({
              data: user.data()
            })
          }
        )
        this.setState({
        user: userFiltrado[0].data,
        })
      }
    )

     db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
      (docs)=>{
        let posts = []
        docs.forEach(
          doc => {
            posts.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          userPost:posts,
          loading:false
        })

      })
    
  }

  render(){
    return(
      <View style={style.container}>
        <Text>Email: {this.state.user.owner}</Text>
        <Text>Nombre de usuario: {this.state.user.username}</Text>
        <Text>Ultimo inicio de sesion: {auth.currentUser.metadata.lastSignInTime} </Text>

        <FlatList
          data={this.state.userPost}
          keyExtractor={item => item.id.toString()} 
          renderItem ={({item}) => <Posts info={item} navigation={this.props.navigation}/>
            }
        />

        <TouchableOpacity onPress={()=> this.props.route.params.logout()}>
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