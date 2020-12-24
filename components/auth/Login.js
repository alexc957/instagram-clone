import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'
import firebase from 'firebase'
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            

        }
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(){
        const { email, password, name } = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((result)=> {
                console.log(result);
                
            })
            .catch((err)=>{
                console.log(err);
            })

    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                
                <TextInput 
                    placeholder="email"
                    onChangeText={(email)=>this.setState({...this.state, email})} />

                <TextInput 
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({...this.state, password})} />        
            
                <Button title="Sign up" onPress={()=> this.onLogin()} />	
            </View>
        )
    }
}
