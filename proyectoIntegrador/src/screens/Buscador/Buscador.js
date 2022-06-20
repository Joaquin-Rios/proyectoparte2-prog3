import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from "react-native"
import {db} from "../../firebase/config";
import Posts from "../../components/Posts/Posts";

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state= {

        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <Text>Buscador</Text>
        )
    }

}

export default Buscador;