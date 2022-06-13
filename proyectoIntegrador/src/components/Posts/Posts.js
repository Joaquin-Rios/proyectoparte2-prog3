import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../../firebase/config'


class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes:0,
            miLike:false,
            arrayLikes:[],
            //arrSubMessages:[]
        }
    }

    componentDidMount(){
        const documento = this.props.info.data
       // const estaMiLike = documento.likes.includes(auth.currentUser.email)
        
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
            })
        }

        /*
        if(estaMiLike){
            this.setState({
                miLike:true
            })
        }
        */

    }

    /*
    like(){
        const documento = this.props.info
        db.collection('posts').doc(documento).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                miLike:true,
                cantLikes: this.state.cantLikes + 1
            })
        })
        .catch(error=> console.log(error))
    }

    unlike(){
        const documento = this.props.info
        db.collection('posts').doc(documento.data.owner).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
                miLike:false,
                cantLikes: this.state.cantLikes - 1
            })
        )
        .catch(error=> console.log(error))
    }
    */
    


    render(){
        const documento = this.props.info.data
        return (
            <>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.Owner}>{documento.owner}</Text>
                        <Text style={styles.Post}>{documento.description}</Text>
                    </View>
                    <View style={styles.containerLike}>
                        <Text style={styles.likesCounter}>{this.state.cantLikes}</Text>
                        {/*
                            this.state.miLike
                            ?
                            
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red'/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' /> 
                            </TouchableOpacity>

                        */}
                    </View>
                </View>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}
                >
                    <Text>Comentar este mensaje</Text>
                </TouchableOpacity>
            </>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:8,
        paddingHorizontal:6,
        borderRadius:5,
        backgroundColor:'#F5E6E8',
        marginHorizontal:10,
        marginTop:8
    },
    Owner:{
        fontWeight:600
    },
    Post:{
        paddingLeft:8,
        paddingVertical:8
    },
    containerLike:{
        flexDirection:'row',
    },
    likesCounter:{
        marginRight:8,

    }
})

export default Posts