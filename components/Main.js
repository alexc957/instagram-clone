import React, { Component } from 'react'
import {View, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser, fetchUserPosts} from '../redux/actions/index';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from './main/feed'

import Profile from './main/Profile';
import { event } from 'react-native-reanimated';
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen =()  => {
    return (null)
}
class Main extends Component {
    
    componentDidMount(){
        this.props.fetchUser()
        this.props.fetchUserPosts()

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
                 <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({color, size})=>(
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    )
                }} />
            </Tab.Navigator>
     
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);