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
            <View style={styles.container}>
                        
                        <TextInput style={styles.formulario}
                            keyboardType='default'
                            placeholder='Buscar Usuario por email'
                            value={this.state.dataFiltrada}
                            onChangeText={(text) => this.setState({ dataFiltrada: text })}
                            
                        />
                        <TouchableOpacity style={styles.boton} onPress={()=>this.buscador(this.state.dataFiltrada)}>
                            <Text>Buscar</Text>
                        </TouchableOpacity>
                    {
                        this.state.resultado ?

                            <View style={styles.container}>
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
        alignItems: 'center',
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
    },
})
export default Buscador;