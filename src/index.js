import { initializeApp } from 'firebase/app';
import { getFirestore, 
 collection, 
 getDocs,
 addDoc,
 deleteDoc,
 doc,
 onSnapshot,
query,
where,
orderBy,
serverTimestamp
 } from 'firebase/firestore';

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

const bookList = document.querySelector('#books');

//collection ref
const colRef = collection(db, 'books');
console.clear();

//queries
const q = query(colRef,where("author","==","Frederick Forsyth"), orderBy("title"));


//get colection data

 onSnapshot(colRef, (snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
          books.push({  ...doc.data(),id: doc.id});
         })
        bookList.innerHTML = books.map((book) => {
            return `<li>${book.title} by ${book.author}`
        })
       })


    //add docs
    const addBook = document.querySelector('.add');
    addBook.addEventListener('submit', (e) => {
        e.preventDefault();
        addDoc(colRef, {
         title: addBook.title.value,
         author: addBook.author.value,
         createdAt: serverTimestamp()
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
      
  
   
