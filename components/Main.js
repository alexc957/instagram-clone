import React, { Component } from 'react'
import {View, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser, fetchUserPosts, fetchUserFollowing} from '../redux/actions/index';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from './main/feed'
import Search from  './main/Search'
import Profile from './main/Profile'

import firebase from 'firebase';
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen =()  => {
    return (null)
}
class Main extends Component {
    
    componentDidMount(){
        this.props.fetchUser()
        this.props.fetchUserPosts()
        this.props.fetchUserFollowing()

    }
    render() {
      
        return (
    
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={Feed} options={{
                    tabBarIcon: ({color, size})=>(
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }} />
                 <Tab.Screen
                    listeners={({navigation})=>({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate('Add')
                        }
                    })} 
                    name="MainAdd" component={EmptyScreen} options={{
                    tabBarIcon: ({color, size})=>(
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    )
                }} />
                 <Tab.Screen name="Profile"
                     component={Profile} 
                     listeners={({navigation})=>({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate('Profile', {uid: firebase.auth().currentUser.uid})
                        }
                    })} 
                    
                    options={{
                    tabBarIcon: ({color, size})=>(
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    )
                }} />

                <Tab.Screen name="Search" component={Search} navigation={this.props.navigation} options={{
                    tabBarIcon: ({color, size})=>(
                        <MaterialCommunityIcons name="account-search-outline" color={color} size={26} />
                    )
                }} />
            </Tab.Navigator>
     
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
   
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);