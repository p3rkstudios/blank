import {firebase} from '@firebase/app' 
import '@firebase/firestore' 
import config from './../util/firebaseConfig' 

!firebase.apps.length ? firebase.initializeApp(config) : ''

const firebaseApp = firebase.app()

const settings = { timestampsInSnapshots: true }
const firestore = firebaseApp.firestore()
firestore.settings(settings)

export default (!firebase.apps.length ? firebase.app().firestore() : firestore)