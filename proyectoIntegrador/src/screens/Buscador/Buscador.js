import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from "react-native"
import {db} from "../../firebase/config";
import Posts from "../../components/Posts/Posts"

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state= {
            postFiltrado:[],
            dataFiltrada:'',
            resultado: false

        }
    }


    buscador(dataFiltrada){
        db.collection('posts').where('owner', '==',dataFiltrada ).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        postFiltrado: posts,
                        resultado: true
                    })
                })
            }
        )
    }

    

    render(){
        return(
            <View style={styles.section1}>
                        <Text style={styles.h1}>Buscador</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='Buscar Usuario por email'
                            value={this.state.dataFiltrada}
                            onChangeText={(text) => this.setState({ dataFiltrada: text })}
                            style={styles.formulario}
                        />
                        <TouchableOpacity style={styles.botonForm} onPress={()=>this.buscador(this.state.dataFiltrada)}>
                            <Text style={styles.textoBoton}>Buscar</Text>
                        </TouchableOpacity>
                    {
                        this.state.resultado ?

                            <View style={styles.section2}>
                            <Text>Resultados de: {this.state.dataFiltrada}</Text>
                            <FlatList
                                data={this.state.postFiltrado}
                                keyExtractor={(item)=> item.id.toString()}
                                renderItem={({item}) => <Posts info={item}></Posts>}
                            />
                            </View>
                        :
                        <Text>El usuario no existe o no hay posteos del mismo</Text>
                    }
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#909f43',
    },
    cover: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        minWidth: 400
    },
    formulario: {
        backgroundColor: '#FFFFFF',
        width: 300,
        height: 50,
        textAlign: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 4
    },
    botonForm: {
        backgroundColor: '#030303',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        padding: 5,
        margin: 10,
        marginHorizontal: 100
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 'large'
    },
    section1:{
        flex: 1,
    },
    section2:{
        backgroundColor: 'gray',
        flex: 2,
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center'
    },
    h1: {
        color: '#FFFFFF',
        fontSize: 50,
        textAlign: 'center'
    },
})
export default Buscador;