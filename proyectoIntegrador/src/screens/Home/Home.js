import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../../firebase/config'
import Posts from '../../components/Posts/Posts'

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      info:[],
      loading:true
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt','desc').onSnapshot(
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
          info:posts,
          loading:false
        })

      }
    )
  }


  render(){
    return (
      <View style={style.container}>
       
        {
         this.state.loading ?
         <ActivityIndicator size={32} color='red'/>
         : 
         <FlatList
         data={this.state.info}
         keyExtractor={item => item.id.toString()}
         renderItem={({ item }) => <Posts info={item} navigation={this.props.navigation}/>}
         />
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 2,
    padding:3,
    //borderWidth: 1,
    //borderRadius: 4,
    textAlign: 'center'
  },
})

export default Home