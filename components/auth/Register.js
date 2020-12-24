import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'
import firebase from 'firebase'
export default class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''

        }
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp(){
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((result)=> {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            })

    }
    render() {
        return (
            <View>
                <TextInput 
                    placeholder="Name"
                    onChangeText={(name)=>this.setState({...this.state, name})} />
                <TextInput 
                    placeholder="email"
                    onChangeText={(email)=>this.setState({...this.state, email})} />

                <TextInput 
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({...this.state, password})} />        
            
                <Button title="Sign up" onPress={()=> this.onSignUp()} />	
            </View>
        )
    }
}
