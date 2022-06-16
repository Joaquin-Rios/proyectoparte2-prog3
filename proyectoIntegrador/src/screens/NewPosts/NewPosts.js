import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config';


class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            description:'',
        }
    }
    
    newPosts(post){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.description,
            likes:[],
            comments:[]
            
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    render(){

        return (
            <View>
              <Text>Descripcion de la foto:</Text>
            <TextInput 
              style={styles.textarea}
              onChangeText= {(text)=> this.setState({
                  description: text
              })}
              value={this.state.description}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    this.newPosts(this.state.description)
                    this.setState({
                        description:''
                    })
                    this.props.navigation.navigate('Home')

                }}
            >
              <Text>Publicar Posteo</Text>
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    textarea:{
        borderWidth:1,
        borderColor:'#c3c3c3',
        height:'auto',
        minHeight:60,
        marginTop:10
    },
    btn:{
        marginTop:16,
        borderColor:'red',
        borderWidth:1
    }
})

export default NewPosts