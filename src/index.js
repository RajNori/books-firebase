import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth();

const bookList = document.querySelector('#books');
const newUser = document.querySelector('#user');

//collection ref
const colRef = collection(db, 'books');
console.clear();

//queries
const q = query(
    colRef,
    where('author', '==', 'Frederick Forsyth'),
    orderBy('title')
);

//get colection data

onSnapshot(colRef, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    bookList.innerHTML = books.map((book) => {
        return `<li>${book.title} by ${book.author}`;
    });
});

//add docs
const addBook = document.querySelector('.add');
addBook.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBook.title.value,
        author: addBook.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBook.reset();
    });
});

//del docs
const delBook = document.querySelector('.delete');
delBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', delBook.id.value);
    deleteDoc(docRef).then(() => {
        delBook.reset();
    });
});

//get a single document
const docRef = doc(db, 'books', 'w0bHpCo5ULcsdLq37pIy');
getDoc(docRef).then((doc) => {
    console.log(doc.data(), doc.id);
});

//update a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updateDoc = doc(db, 'books', updateForm.id.value);
    updateDoc(updateDoc, {
        title: 'updated title',
    }).then(() => {
        updateForm.reset();
    });
});

//signup form
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth, email,password)
    .then((cred) => {
        console.log(cred.user);
       newUser.innerHTML = `<p>user created with email: ${cred.user.email}</p>`;
         signupForm.reset();
    }).catch((err) => {
        newUser.innerHTML = `<h4>error: ${err.message}</h4>`;
    })

});
