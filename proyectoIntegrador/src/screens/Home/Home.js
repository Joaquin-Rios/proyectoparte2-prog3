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
    db.collection('posts').onSnapshot(
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
      <View>
       <Text>Estos son los Posts recientes:</Text>

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

export default Home