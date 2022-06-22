import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { auth } from "../../firebase/config";
import { MaterialIcons } from '@expo/vector-icons';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
        }
    }


    render(){
        return(
            <View style={style.container}>
                <Text>Login</Text>

                <TextInput style={style.field}
                    keyboardType='email-address'
                    placeholder="email"
                    onChangeText={ text => this.setState({email:text})} />

                <TextInput style={style.field}
                    keyboardType='default'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({password:text})} />

                {this.state.email !== ''  && this.state.password !== '' ?
                
                <TouchableOpacity onPress={() => this.props.signIn(this.state.email, this.state.password)} >
                    <Text style={style.boton}>Loguearme</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={style.bloquearBoton}>
                    <Text>Loguearme</Text>
                </TouchableOpacity>
                
                }

                <View style={this.props.errorLogin ? style.mostrarError : style.ocultarError}>
                    <MaterialIcons name="dangerous" size={24} color="black" />
                    <Text style={style.errorText}>{this.props.errorLogin}</Text>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} >
                    <Text style={style.texto}>No tenes cuenta?</Text>
                </TouchableOpacity>
            </View>
        )
    }

};

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

    },
    bloquearBoton:{
        opacity: 0.5,
        backgroundColor: '#28a745',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745s',
        marginVertical: 10,
    },
    ocultarError:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EF476F',
        borderRadius: 4,
        padding: 10,
        gap: 5,
        opacity: 0
    },
    mostrarError:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffdfd4',
        borderRadius: 4,
        padding: 10,
    },
    errorText: {
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        margin: 2
    }
});

export default Login;