import React from 'react';
import "./Home.scss"
import { NoteCard } from '../components/noteCard/NoteCard.jsx';
import FirestoreService from '../services/FirestoreService';
import { useEffect, useState} from 'react';
import { CreateNoteModal } from '../components/createNoteModal/CreateNoteModal';
import Note from '../models/Note';

export const Home = () => {

    const [notes, setNotes] = useState([]);
    const [createNoteModalVisibility, setCreateNoteModalVisibility] = useState(false);

    useEffect(async ()=>{
        // setNotes([
        //     Note.fromJson({
        //         description: "adfdaf",
        //         id: "XY1m3Cx2789zMnWhaQ0h",
        //         timeStamp: 1452508763895,
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
        }
        );


        // const tempNotes = await FirestoreService.fetchNotes();
        // console.log("fetched notes : ",tempNotes);
        // setNotes(tempNotes);
        // return unsubscribe;
    },[])
    
    return (
        <div id="Home">
            <h1 className="Heading">Your Notes</h1>
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
                +
            </button>
        </div>
    )
}
