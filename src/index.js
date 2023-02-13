import {initializeApp} from 'firebase/app'
import {
 getFirestore,
 collection,
 getDocs
} from 'firebase/firestore'


const firebaseConfig = {
 apiKey: "AIzaSyAZt50RND3SOOMrYAwM_LOQYrFcwpbceVU",
 authDomain: "fir-e-fbb26.firebaseapp.com",
 projectId: "fir-e-fbb26",
 storageBucket: "fir-e-fbb26.appspot.com",
 messagingSenderId: "512130125476",
 appId: "1:512130125476:web:2cc5707a3af2b1c7a66031"
};

initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

//get colection data
getDocs(colRef)
.then((snapshot) => {
 console.log(snapshot.docs);
})