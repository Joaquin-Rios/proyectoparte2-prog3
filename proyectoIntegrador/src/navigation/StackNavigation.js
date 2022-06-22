import React, {Component} from 'react'
import { auth, db } from '../firebase/config';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import Register from "../screens/Register/Register";
import { StatusBar } from 'expo-status-bar';
import TabNavigation from './TabNavigation';
import Profile from '../screens/Profile/Profile';
import Comments from '../screens/Comments/Comments';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            errorRegister: '',
            errorLogin: ''
        }
    }
    

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true})
            }
        })
    }

    logout(){
        auth.signOut()
        .then(response => this.setState({loggedIn: false}))
        .catch(error => console.log(error))
    }

    
    signUp(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            db.collection('users').add({
                owner: email,
                username: username,
                createdAt: Date.now()
            })
            .then(res => console.log('termina el add'))
            .catch(error => console.log(error))
        })
        .then(response => this.setState({loggedIn: true}))
        .catch(error => this.setState({errorRegister:error.message}))

    }


    signIn(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({
                loggedIn:true
            })
        })
        .catch(error =>this.setState({errorLogin: error.message}))
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.state.loggedIn ?
                        <Stack.Group>
                            <Stack.Screen 
                            name='TabNavigation' 
                            component={TabNavigation}
                            options={{
                                headerShown:false
                            }}
                            initialParams={
                                {
                                    logout: () => this.logout(),
                                }
                            }
                            />
                            <Stack.Screen
                            name='Comments'
                            component={Comments}
                            />
                           
                        </Stack.Group>
                        :
                        <Stack.Group>
                            <Stack.Screen 
                                name='Register' 
                                children={
                                    (props)=> <Register signUp={(email, password, username)=> this.signUp(email, password, username)}
                                    errorRegister={this.state.errorRegister}
                                    {...props}
                                    />
                                }
                                options={{
                                    headerShown:false
                                }}
                            />
                            <Stack.Screen 
                            name='Login' 
                             
                            children={
                                (props)=> <Login signIn={(email, password)=> this.signIn(email, password)}
                                errorLogin={this.state.errorLogin}
                                {...props}
                                />
                            }    
                            options={{
                                headerShown:false
                            }}
                            />

                            
                        </Stack.Group>
                    }      
                </Stack.Navigator>
            </NavigationContainer>

        )
    }

}

export default StackNavigation