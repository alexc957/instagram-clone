import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'

import {connect} from 'react-redux';


 function Profile(props) {
    const {currentUser, posts} = props;
    console.log('profile');
    console.log({currentUser, posts});
    return (
        <View  style={styles.container}>
            <View style={styles.containerInfo}>
                <Text> {currentUser.name}</Text>
                <Text> {currentUser.email}</Text>
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                numColumns={3} 
                horizontal={false}
                data={posts}
                renderItem={({item})=>(
                 <View style={styles.containerImage}>   
                    <Image 
                        source={{uri: item.downloadURL}}
                        style={styles.image}    
                    />
                  </View>  
                ) }
                  />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 40
    },
    containerInfo: {
        margin: 10
    },
    containerGallery: {

    },
    containerImage: {
        flex: 1/3
    }
    ,
    image: {
        flex:1,
        aspectRatio: 1/1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
}) 

export default connect(mapStateToProps,null)(Profile)