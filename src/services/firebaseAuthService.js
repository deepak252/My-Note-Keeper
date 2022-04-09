import { auth,db } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {doc,setDoc,getDoc} from "firebase/firestore";


const signInUsingEmailAndPassword = async (email,password) =>{
    try{
        const res = await signInWithEmailAndPassword(auth,email,password);
        console.log("Signed in successfully");
    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const signUpUsingEmailAndPassword = async (data) =>{
    try{
        // const {password,confirmPassword, ...userData} = data;
        const {name,email,password} = data;
        // console.log({...userData});
        const res = await createUserWithEmailAndPassword(auth,email,password);
        console.log("Account created successfully...");
        // Adding user data to firestore USERS collection
        let user = res.user;
        const userDocRef = doc(db,"users",user.uid);
        await setDoc(userDocRef,{
            uid: user.uid,
            name,
            email

        },{merge: true});
        console.log("Userdata added to firestore");

    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const signOutUser = async () =>{
    try{
        await signOut(auth);
    }catch(e){
        console.log(e);
        alert(e.message);
    }
}

const getUserData = async (userId) =>{
    try{
        const userDocRef = doc(db,"users",userId);
        const docSnapshot =await getDoc(userDocRef);
        if(!docSnapshot.exists){
            console.log("User data not found!")
            alert("ERROR : User data not found!");
            return null;
        }

        return docSnapshot.data();

    }catch(e){
        console.log(e);
        alert(e.message);
    }
}


export {
    signInUsingEmailAndPassword, 
    signUpUsingEmailAndPassword, 
    signOutUser,
    getUserData
};





// import {auth} from "../firebase";
// import {db} from "../firebase";
// import UserInfo from "../models/UserInfo";
// import {
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword

// } from "firebase/auth";

// import {
//     collection, doc, 
//     setDoc, addDoc, updateDoc, deleteDoc, 
//     getDocs, onSnapshot,
//     Timestamp,
//     query, orderBy,where,

// } from "firebase/firestore";

// class FirebaseAuthService{
    
//     static signupUsingEmailAndPassword = async (name, email,password) =>{
//         try{
//             const res = await createUserWithEmailAndPassword(auth,email,password);
//             const userCreds = res.user;
//             console.log("User created successfully : ", userCreds);
//             const userDocRef = doc(db,"users", userCreds.uid);
//             await setDoc(userDocRef,{
//                 uid : userCreds.uid,
//                 name : name , 
//                 email : email
//             },{merge : true});
//         }catch(e){
//             console.log("signupWithEmailAndPassword error : ",e);
//             alert(e.message);
//         }
//     }

// }

// export default FirebaseAuthService;