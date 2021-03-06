import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            comentarios:[],
            nuevoComentario:''
        } 
    }

    componentDidMount(){
        const id = this.props.route.params.id
        db.collection('posts').doc(id).onSnapshot(doc => {
                this.setState({
                    comentarios:doc.data().comentarios
                    
                })
            })
            console.log(this.state.comentarios)
    }

    comentar(mensaje){
        const comment ={
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: mensaje
        }

        if(mensaje !== ''){
            db.collection('posts').doc(this.props.route.params.id).update({
                comentarios:firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(response => this.setState({nuevoComentario:''}))
            .catch(error => console.log(error))
        }

    }
    
    render(){
        console.log(this.state.comentarios)
        return (
          <View style={styles.container}>
            
            {
             // this.state.comentarios.length !== 0 ?
                    <FlatList
                        data={this.state.comentarios}
                        keyExtractor={( item ) => item.createdAt.toString()}
                        renderItem={ ( {item} ) => <View style={styles.containerComment}>
                        <Text style={styles.nombre}>{item.owner}</Text>
                        <Text>{item.description}</Text>
                        </View>}
                    />
                
              //:
               //    <View><Text>Se el primero en comentar</Text></View>   
            }

            <View>
                <TextInput
                placeholder='Agrega tu comentario'
                onChangeText={
                    (text) => this.setState({nuevoComentario : text})
                }
                value={this.state.nuevoComentario}
                keyboardType='default'
                style={styles.container}
                />
                <TouchableOpacity 
                onPress={()=> this.comentar(this.state.nuevoComentario)}
                style={styles.boton}
                >
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 2,
        padding:3,
        textAlign: 'center'
    },
    comment:{
        marginTop:30
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
    nombre:{
        fontWeight: 600,
        
    }
  })

export default Comments