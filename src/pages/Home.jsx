import React from 'react';
import "./Home.scss"
import { NoteCard } from '../components/noteCard/NoteCard.jsx';
import FirestoreService from '../services/firestoreService';
import { useEffect, useState} from 'react';
import { CreateNoteModal } from '../components/createNoteModal/CreateNoteModal';
import Note from '../models/Note';
import { FaPlus} from 'react-icons/fa';
import {useNavigate} from "react-router";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { getUserData } from '../services/firebaseAuthService';
import BtnLogOut from '../components/common/BtnLogOut';
// import { Timestamp } from '@firebase/firestore';


const Home = () => {

    const [notes, setNotes] = useState([]);
    const [createNoteModalVisibility, setCreateNoteModalVisibility] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(async () => {
        setLoading(true);
        console.log("Current user = ",user);
        console.log("loadingAuthState = ", loadingAuthState);
        if (loadingAuthState) return;
        if (!user){
            console.log("User not signed in");
            return navigate("/signin");
        }
        
        const userData = await getUserData(user.uid);
        setUserInfo(userData);
        setLoading(false);
  
    }, [user, loadingAuthState]);

    useEffect(()=>{
        // setNotes([
        //     Note.fromJson({
        //         description: "adfdaf",
        //         id: "XY1m3Cx2789zMnWhaQ0h",
        //         timeStamp: Timestamp.fromDate(new Date()),
        //         title: "Hello 2"

        //     })
        // ]);

        const unsubscribe = FirestoreService.streamNotes((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                console.log(doc.data());
            })     
            let tmpNotes = querySnapshot.docs.map((doc)=>{
                return Note.fromJson(doc.data());
            }); 
            setNotes(tmpNotes);
        },
        (error)=>{
            console.log("streamNotes error : ", error);
        });

        // const tempNotes = await FirestoreService.fetchNotes();
        // console.log("fetched notes : ",tempNotes);
        // setNotes(tempNotes);
        
        return unsubscribe;
    },[])
    
    return (
        <div id="Home">
            <div className="Top">
                <h1 className="Heading">Your Notes</h1>
                <BtnLogOut />
            </div>
            {
                createNoteModalVisibility&&
                <CreateNoteModal setModalVisibility={setCreateNoteModalVisibility}/>
            }
            <div className="Notes-Container">
                {
                    notes.map((note)=>{
                        return <NoteCard note={note} key={note.id} />
                        
                    })
                }
            </div>
            <button id="Btn-Add-Note" onClick={()=>{setCreateNoteModalVisibility(true)}}>
                <FaPlus />
            </button>
        </div>
    )
}

export default Home;