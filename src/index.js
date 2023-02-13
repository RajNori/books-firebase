import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs,addDoc,deleteDoc,doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAZt50RND3SOOMrYAwM_LOQYrFcwpbceVU',
    authDomain: 'fir-e-fbb26.firebaseapp.com',
    projectId: 'fir-e-fbb26',
    storageBucket: 'fir-e-fbb26.appspot.com',
    messagingSenderId: '512130125476',
    appId: '1:512130125476:web:2cc5707a3af2b1c7a66031',
};

initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, 'books');
console.clear();
//get colection data
getDocs(colRef)
    .then((snapshot) => {
   let books = [];
     snapshot.forEach((doc) => {
       books.push({ id: doc.id, ...doc.data()});
      })
     console.log(books)
    }).catch((err) => {
        console.log(err)
    })
    //add docs
    const addBook = document.querySelector('.add');
    addBook.addEventListener('submit', (e) => {
        e.preventDefault();
        addDoc(colRef, {
         title: addBook.title.value,
         author: addBook.author.value
        }).then(() => {
         addBook.reset();
        })
       })
      

    //del docs
    const delBook = document.querySelector('.delete');
    delBook.addEventListener('submit', (e) => {
        e.preventDefault();
       const ref = doc(db, 'books', delBook.id.value);
       deleteDoc(ref).then(()=>{
        delBook.reset();
       })      })
      
  
   
