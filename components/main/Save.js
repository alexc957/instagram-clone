import React, { useState } from 'react'
import { Image, TextInput, View, Button } from 'react-native'
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore');
require('firebase/firebase-storage');
export default function Save({ route, navigation }) {
    console.log(route.params.image);
    const [caption, setCaption] = useState('')
    const uploadImage = async () => {
        const response = await fetch(route.params.image);
        const blob = await response.blob();

        const task = firebase.storage()
                            .ref()
                            .child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
                            .put(blob)

        const  taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }                 
        
        const taskCompleted = () => {
            task.ref.getDownloadURL().then((snapshot)=>{
                savePost(snapshot)
                console.log(snapshot);
            })

        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_change",taskProgress,taskError,taskCompleted);

    }
    const savePost =(downloadURL) => {
        firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(){
            navigation.popToTop();
        })
    }
    return (
        <View style={{flex:1}}>
            <Image source={{uri: route.params.image}} style={{flex: 1}}/>
            <TextInput
                placeholder="Writea caption"
                onChangeText ={(caption) => setCaption(caption)}
             />

             <Button 
               title="Save"  onPress={()=> uploadImage()}/> 
            
        </View>
    )
}
