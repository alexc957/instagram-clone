import * as firebase from 'firebase';
import 'firebase/firestore';
import {USER_STATE_CHANGE} from '../constants/index'
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
                dispacth({type: USER_STATE_CHANGE, currentUser: snapshot.data})
            } else{
                console.log('does not exist');
            }
        })
    })
}