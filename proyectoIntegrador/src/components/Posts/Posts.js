import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../../firebase/config'
import Comments from '../../screens/Comments/Comments'


class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes:0,
            miLike:false,
        }
    }

    componentDidMount(){
        const documento = this.props.info.data
        const estaMiLike = documento.likes.includes(auth.currentUser.email)
        
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
            })
        }

        
        if(estaMiLike){
            this.setState({
                miLike:true
            })
        }
    }

    
    like(){
        const documento = this.props.info.id
        console.log(documento)
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
        const documento = this.props.info.id
        db.collection('posts').doc(documento).update({
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
    
    borrarPost(){
        console.log(this.props.info.data.owner)
        console.log(auth.currentUser.email)
        const document = this.props.info
        db.collection("posts").doc(document.id).delete()
        .then(() => console.log("Imagen eliminada"))
        .catch(error => console.log(error))
    }


    render(){
        const documento = this.props.info.data
        const autorPost = documento.owner
        return (
            <>
                <View style={style.container}>
                    <View>
                        <Text style={style.Owner}>{documento.owner}</Text>
                        <Image style={style.Image}
                            source={{uri: `${documento.photo}`}}
                            resizeMode='contain'
                        />
                        <Text style={style.Post}>{documento.description}</Text>
                    </View>

                    {/*
                         <View style={style.commentContainer}>
                         <FlatList
                             data={this.props.info.data.comentarios.length}
                             keyExtractor={item => item.createdAt.toString()}
                             renderItem={({item})=>
                                 <Comments data={item}/>
                             }
                         />
                     </View>

                            */}
                   

                    <View style={style.containerLike}>
                        <Text style={style.likesCounter}>{this.state.cantLikes}</Text>
                        {
                            this.state.miLike
                            ?
                            
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red'/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' /> 
                            </TouchableOpacity>

                        }
                    </View>

                </View>

                <View style={style.containerBoton}>
                    <TouchableOpacity style={style.boton}
                        onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}
                    >
                        <Text>Comentar</Text>
                    </TouchableOpacity>

                    {autorPost == auth.currentUser.email ?
                        <TouchableOpacity style={style.boton} onPress={() => this.borrarPost()}>
                            <Text>Borrar</Text>
                        </TouchableOpacity>
                    :
                    <></>
                    }

                </View>

                


                
            </>
        )
    }
}

const style= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        //paddingVertical:5,
        paddingHorizontal:5,
        borderRadius:5,
        borderWidth: 1,
        backgroundColor:'#D3D3D3',
        //marginHorizontal:10,
        //marginTop:8
    },
    containerBoton:{
        justifyContent: 'space-between',
        margin: 10,

    },
    Owner:{
        textAlign: 'left',
        fontWeight:600
    },
    Post:{
        //paddingLeft:8,
        paddingVertical:5,
        fontWeight: 600,
    },
    containerLike:{
        flexDirection:'row',
    },
    likesCounter:{
        marginRight:8,

    },
    Image: {
        margin: 10,
        width: 300,
        height: 200,
        
    },
    boton:{
        paddingHorizontal: 5,
        paddingVertical: 6,
        textAlign: 'center',
        backgroundColor: '#28a745',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        margin:2
    }
})

export default Posts