import {db,auth} from "../firebase";
import {
    collection, doc, 
    setDoc, addDoc, updateDoc, deleteDoc, 
    getDocs, onSnapshot,
    Timestamp,
    query, orderBy,where,

} from "firebase/firestore";
import Note from "../models/Note";
/**Firebase firestore CRUD operations for Notes.*/
class FirestoreService{
    
    // note : type(Note)
    static addNote = async (note, userId) =>{  
        try{
            const notesCollectionRef = collection(db,`users/${userId}/notes`);
            /*** Method 1  ***/
            // const docRef = await addDoc(notesCollectionRef,note.toJson());
            // console.log(`Note added successfully : ${docRef.id}`)

            /*** Method 2  ***/
            const docRef = doc(notesCollectionRef);
            note.id=docRef.id;
            note = {
                ...note,
                id: docRef.id,
                timeStamp : Timestamp.fromDate(new Date()),
                bookmarked : false,
                deleted : false
            };
            console.log(note);
            setDoc(docRef,note);
            

            console.log(`Note added successfully : ${docRef.id}`)
        }catch(e){
            console.log(`add note error : ${e}`);
        }
    }

    static updateNote = async (note, userId) =>{  
        try{
            const docRef = doc(db,`users/${userId}/notes`,note.id);
            updateDoc(docRef,note);
            console.log(`Note updated successfully : ${docRef.id}`)
        }catch(e){
            console.log(`update note error : ${e}`);
        }
    }

    static fetchNotes = async (userId) =>{  
        try{
            const notesCollectionRef = collection(db,`users/${userId}/notes`);
            return new Promise(async (resolve,reject)=>{

                const q = query(notesCollectionRef,orderBy("timeStamp","desc"))
                const querySnapshot = await getDocs(q);
                /*** Method 1  ***/
                let notes = querySnapshot.docs.map((doc)=>{
                    return Note.fromJson(doc.data());
                });
                // console.log(notes);
                resolve(notes);
                reject("rejection for fetch notes");
            })
            /*** Method 2  ***/
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());
            // });

        }catch(e){
            console.log(`fetch notes error : ${e}`);
        }
    }
    
    static streamNotes=async(callbackFunxn,onError, userId)=>{
        console.log("USER ID ", userId);
        const notesCollectionRef = collection(db,`users/${userId}/notes`);
        var q=query(notesCollectionRef,orderBy("deleted"),orderBy("timeStamp","desc"),where("deleted", "!=", true), );
        // var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("deleted", "==", true), );
        // var q=query(notesCollectionRef,orderBy("timeStamp","desc") );

        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }

    static streamBookmarkedNotes=async(callbackFunxn,onError, userId)=>{
        const notesCollectionRef = collection(db,`users/${userId}/notes`);
        // var q=query(notesCollectionRef,orderBy("bookmarked"),orderBy("timeStamp","desc"),where("bookmarked", "==", "true"), );
        var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("bookmarked", "==", true), );
        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }
    static streamDeletedNotes=async(callbackFunxn,onError, userId)=>{
        const notesCollectionRef = collection(db,`users/${userId}/notes`);
        var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("deleted", "==", true), );
        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }

    // static deleteNote=async(noteId, userId)=>{
    //     try{
    //         const noteDocRef = doc(db,`users/${userId}/notes`,noteId);
    //         await deleteDoc(noteDocRef);
    //         console.log("Note deleted successfully");
    //     }catch(e){
    //         console.log("Delete Note error : ",e);
    //     }
    // }


    static bookmarkNote=async({isBookmarked,noteId, userId})=>{
        try{
            const noteDocRef = doc(db,`users/${userId}/notes`,noteId);
            await updateDoc(noteDocRef,{
                bookmarked : isBookmarked,
            })
            console.log("Bookmarks updated successfully");
        }catch(e){
            console.log("bookmarkNote error : ",e);
        }
    }

    static trashNote = async({isDeleted,noteId, userId})=>{
        try{
            const noteDocRef = doc(db,`users/${userId}/notes`,noteId);
            await updateDoc(noteDocRef,{
                deleted : isDeleted
            })
            console.log("trash updated successfully");
        }catch(e){
            console.log("trashNote error : ",e);
        }
    }

    static deleteNote = async({noteId, userId})=>{
        try{
            const noteDocRef = doc(db,`users/${userId}/notes`,noteId);
            await deleteDoc(noteDocRef)
            console.log("note deleted successfully");
        }catch(e){
            console.log("deleteNote error : ",e);
        }
    }

}

export default FirestoreService;