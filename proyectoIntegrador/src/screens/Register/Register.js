import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { auth, db } from "../../firebase/config";
import { AntDesign } from '@expo/vector-icons'; 

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
        }
    }

    componentDidMount(){
    }


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

                {this.state.email !== '' && this.state.username !== '' && this.state.password !== '' ?
                    <TouchableOpacity onPress={() => this.props.signUp(this.state.email, this.state.password, this.state.username)} >
                    <Text style={style.boton}>Registrarme</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={style.bloquearBoton}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>

                }
                
                <View style={this.props.errorRegister ? style.errorContainerShow : style.errorContainerHide}>
                    <AntDesign name="exclamationcircle" size={24} color="white" />
                    <Text style={style.errorText}>{this.props.errorRegister}</Text>
                </View>
                

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
    errorContainerHide:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EF476F',
        borderRadius: 4,
        padding: 10,
        gap: 5,
        opacity: 0
    },
    errorContainerShow:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EF476F',
        borderRadius: 4,
        padding: 10,
        gap: 5,
    },
    errorText: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
    }
});

export default Register;