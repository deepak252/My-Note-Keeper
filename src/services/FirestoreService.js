import {db} from "../firebase";
import {
    collection, doc, 
    setDoc, addDoc, updateDoc, deleteDoc, 
    getDocs, onSnapshot,
    Timestamp,
    query, orderBy,

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
                timeStamp : Timestamp.fromDate(new Date())
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
        console.log("sream");
        const notesCollectionRef = collection(db,"notes");
        const q=query(notesCollectionRef, orderBy("timeStamp","desc"));
        const unsubsribe = onSnapshot(q,callbackFunxn, onError)
        return unsubsribe;
    }

}

export default FirestoreService;