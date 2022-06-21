import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config';
import MyCamera from '../../components/MyCamera/MyCamera';


class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            description:'',
            mostrarComponenteCamara: true,
            urlFoto:''
        }
    }

    cuandoSubaLaImagen(url){
        console.log(url)
        this.setState({
            mostrarComponenteCamara:false,
            urlFoto: url
        })
    }
    
    newPosts(post){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.description,
            likes:[],
            comentarios: [],
            photo: this.state.urlFoto
            
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    render(){

        return (
            <>
            {
                 this.state.mostrarComponenteCamara ?
                 <MyCamera cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                 :
                 <View>
                    <Text> Descripción de la foto:</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        description: text
                    })}
                    value={this.state.description}
                    />
                    <TouchableOpacity
                        style={styles.boton}
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

            }
            </>
            
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

export default NewPosts