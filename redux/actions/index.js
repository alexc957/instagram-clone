import * as firebase from 'firebase';
import 'firebase/firestore';
import {USER_STATE_CHANGE,USER_POST_STATE_CHANGE} from '../constants/index'
export function fetchUser() {
    return  ((dispacth)=> {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot)=>{
            //console.log(snapshot);
            if(snapshot.exists){
                console.log(snapshot);
                dispacth({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            } else{
                console.log('does not exist');
            }
        })
    })
}


export function fetchUserPosts() {
    return  ((dispacth)=> {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creation','asc')
        .get()
        .then((snapshot)=>{
            //console.log(snapshot);
           let posts = snapshot.docs.map(doc => {
               const data = doc.data();
               const id = doc.id;
               return {id, ...data}
           })
           console.log('posts,',posts);
           dispacth({type: USER_POST_STATE_CHANGE, posts})

        })
    })
}