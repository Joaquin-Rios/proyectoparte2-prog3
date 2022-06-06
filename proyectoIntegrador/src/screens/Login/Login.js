import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { auth } from "../../firebase/config";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: null
        }
    }

    onSubmit(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => this.setState({loggedIn: true}, ()=>console.log(this.state.loggedIn) ))
        .catch(error => this.setState({error: 'Fallo en las credenciales'}, ()=>console.log(error)))
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
                
                <TouchableOpacity onPress={() => this.onSubmit()} >
                    <Text style={style.boton}>Loguearme</Text>
                </TouchableOpacity>

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

    }
});

export default Login;