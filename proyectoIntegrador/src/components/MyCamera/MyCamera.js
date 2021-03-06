import { Camera } from "expo-camera";
import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import { storage } from '../../firebase/config'

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state={
            permisos: false,
            urlFoto:'',
            mostrarCamara: true
        }
        this.metodosDeCamara = undefined
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({permisos: true})
        })
        .catch(error => console.log(error))
        console.log(Camera)
    }

    tomaLaFoto(){
        console.log('Digan Whisky!')
        this.metodosDeCamara.takePictureAsync()
        .then(dataFoto => {
            console.log(dataFoto)
            this.setState({
                urlFoto: dataFoto.uri,
                mostrarCamara:false
            })
        })
        .catch(error => console.log(error))
    }

    guardarFoto(){
        fetch(this.state.urlFoto)
        .then(response => {   
            return response.blob()
        })
        .then(foto => {
            const referenciaDelStorage = storage.ref(`photos/${Date.now()}.jpg`)

            referenciaDelStorage.put(foto)
            .then(()=>{
                referenciaDelStorage.getDownloadURL()
                .then( url => {
                    console.log(url)
                    this.props.cuandoSubaLaImagen(url);
                })
            })
        })
        .catch(error => console.log(error))
    }

    descartarFoto(){
        console.log('Foto descartada')
        this.setState({
            urlFoto: "",
            mostrarCamara: true
        })
    }


  render() {
    return (
        <View style={styles.container}>
        {
            this.state.permisos ?
                this.state.mostrarCamara === false ?
                <>
                    
                    <Image
                    style={styles.camara}
                    source={{uri: this.state.urlFoto}}
                    />
                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=> this.guardarFoto()}>
                            <Text>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=> this.descartarFoto()}>
                            <Text>
                                Rechazar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>

                :
                <View style={styles.container}>
                    <Camera
                        styles={styles.camara}
                        type={Camera.Constants.Type.back}
                        ref={ metodos => this.metodosDeCamara = metodos}
                    />
                    <TouchableOpacity style={styles.button} onPress = {()=> this.tomaLaFoto()}>
                        <Text>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
            :

            <Text>No tienes permisos para usar la C??mara</Text>
        }
        </View>
    )
  }
}

export default MyCamera;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camara:{
      flex:7  
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
})
