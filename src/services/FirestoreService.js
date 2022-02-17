import {db} from "../firebase";
import {
    collection, doc, 
    setDoc, addDoc, updateDoc, deleteDoc, 
    getDocs, onSnapshot,
    Timestamp,
    query, orderBy,where,

} from "firebase/firestore";
import Note from "../models/Note";
/**Class for firebase CRUD operations.*/
class FirestoreService{
    // note : type(Note)
    static addNote = async (note) =>{  
        try{
            const notesCollectionRef = collection(db,"notes");
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

    static fetchNotes = async () =>{  
        try{
            const notesCollectionRef = collection(db,"notes");
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
    
    static streamNotes=async(callbackFunxn,onError)=>{
        const notesCollectionRef = collection(db,"notes");
        var q=query(notesCollectionRef,orderBy("deleted"),orderBy("timeStamp","desc"),where("deleted", "!=", true), );
        // var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("deleted", "==", true), );
        // var q=query(notesCollectionRef,orderBy("timeStamp","desc") );

        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }

    static streamBookmarkedNotes=async(callbackFunxn,onError)=>{
        const notesCollectionRef = collection(db,"notes");
        // var q=query(notesCollectionRef,orderBy("bookmarked"),orderBy("timeStamp","desc"),where("bookmarked", "==", "true"), );
        var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("bookmarked", "==", true), );
        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }
    static streamDeletedNotes=async(callbackFunxn,onError)=>{
        const notesCollectionRef = collection(db,"notes");
        var q=query(notesCollectionRef,orderBy("timeStamp","desc"),where("deleted", "==", true), );
        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }

    static deleteNote=async(noteId)=>{
        try{
            const noteDocRef = doc(db,"notes",noteId);
            await deleteDoc(noteDocRef);
            console.log("Note deleted successfully");
        }catch(e){
            console.log("Delete Note error : ",e);
        }
    }

    static markNoteAsBookmark=async({isBookmarked,noteId})=>{
        try{
            const noteDocRef = doc(db,"notes",noteId);
            await updateDoc(noteDocRef,{
                bookmarked : isBookmarked,
            })
            console.log("Note marked as bookmarked successfully");
        }catch(e){
            console.log("markNoteAsBookmark error : ",e);
        }
    }

    static markNoteAsDelete = async({isDeleted,noteId})=>{
        try{
            const noteDocRef = doc(db,"notes",noteId);
            await updateDoc(noteDocRef,{
                deleted : isDeleted
            })
            console.log("Note marked as deleted successfully");
        }catch(e){
            console.log("markNoteAsDelete error : ",e);
        }
    }

}

export default FirestoreService;