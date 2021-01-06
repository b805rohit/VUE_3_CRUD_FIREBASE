import firebase from 'firebase'
import { ref,onUnmounted } from 'vue'
import { config as env } from './env'

const config={
    apiKey: env.VUE_APP_apikey,
    authDomain: env.VUE_APP_authDomain,
    projectId: env.VUE_APP_projectId,
    storageBucket: env.VUE_APP_storageBucket,
    messagingSenderId: env.VUE_APP_messagingSenderId,
    appId: env.VUE_APP_appId,
    measurementId: env.VUE_APP_measurementId
}

const firebaseApp= firebase.initializeApp(config)

const db=firebaseApp.firestore()
const userCollection=db.collection('users')

export const createUser=async user=>{
    await userCollection.add(user)
}

export const getUser=async id=>{
    const user=await userCollection.doc(id).get()
    return user
}

export const deleteUser=async id=>{
    await userCollection.doc(id).delete()
}

export const updateUser=async(id,user)=>{
    await userCollection.doc(id).update(user)
}

export const useLoadUser=()=>{
    const users = ref([])
    const observer=userCollection.onSnapshot(snapShot=>{
        users.value=snapShot.docs.map(doc=>({id:doc.id,...doc.data()}))
    })
    onUnmounted(observer)
    return users
}