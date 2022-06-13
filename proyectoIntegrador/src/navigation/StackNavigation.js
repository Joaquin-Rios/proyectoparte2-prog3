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



const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            errorMessage:'Error1'
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

        }
        )
        .then(response => this.setState({loggedIn: true}))
        .catch(error => this.setState({errorMessage:error.message}))
    }


    signIn(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({
                loggedIn:true
            })
        })
        .catch(error =>this.setState({errorMessage: error.message}))
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
                                    errorMessage: this.errorMessage
                                }
                            }
                            />
                           
                        </Stack.Group>
                        :
                        <Stack.Group>
                            <Stack.Screen 
                                name='Register' 
                                children={
                                    (props)=> <Register 
                                    signUp={(email, password, username)=> this.signUp(email, password, username)}
                                    errorMessage={this.state.errorMessage}
                                    {...props}
                                    />
                    
                                }
                                options={{
                                    headerShown:false
                                }}
                            />
                            <Stack.Screen 
                            name='Login' 
                            component={Login}
                            initialParams={{
                                signIn: (email, password)=> this.signIn(email, password)
                            }}
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