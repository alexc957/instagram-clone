import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import * as firebase from 'firebase';
import Register from './components/auth/Register';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import rootReducer from './redux/reducers';

import thunk from 'redux-thunk';

import MainScreen from './components/Main'
import Add from './components/main/Add';
import Login from './components/auth/Login';
import Save from './components/main/Save';
const store = createStore(rootReducer, applyMiddleware(thunk))


var firebaseConfig = {
  apiKey: "AIzaSyAhCMfE4-QSKD678JWkuHVMW0CHUPzgtpU",
  authDomain: "instagram-clone-da7e4.firebaseapp.com",
  projectId: "instagram-clone-da7e4",
  storageBucket: "instagram-clone-da7e4.appspot.com",
  messagingSenderId: "165168660391",
  appId: "1:165168660391:web:b9bcaf1f23fb5a894c8082",
  measurementId: "G-GZQKRSX0Z8"
};
// Initialize Firebase

if(firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
}


const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen}  options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login}  options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register}  options={{headerShown: false}} />
          
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Main' component={MainScreen} options={{headerShown: false}} />
            <Stack.Screen name='Add' component={Add}  navigation={this.props.navigation} />
            <Stack.Screen name='Save' component={Save} navigation={this.props.navigation}  />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
