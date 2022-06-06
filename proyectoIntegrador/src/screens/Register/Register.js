import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { auth, db } from "../../firebase/config";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            register: false,
            error: null
        }
    }

    componentDidMount(){
    }

    /*onSubmit(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => this.setState({register: true}, ()=>console.log(this.state.register) ))
        .catch(error => this.setState({error: 'Fallo el registro'}, ()=>console.log(error)))
    }
    */


    render(){
        return(
            <View style={style.container}>
                <Text>Register</Text>
                <TextInput style={style.field}
                    keyboardType='email-address'
                    placeholder="email"
                    onChangeText={ text => this.setState({email:text})} />

                <TextInput style={style.field}
                    keyboardType='default'
                    placeholder="username"
                    onChangeText={ text => this.setState({username:text})} />
                
                <TextInput style={style.field}
                    keyboardType='default'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({password:text})} />
                
                <TouchableOpacity onPress={() => this.props.route.params.register(this.state.email, this.state.password)} >
                    <Text style={style.boton}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login') } >
                    <Text style={style.texto}>Ya tenes una cuenta?</Text>
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

export default Register;