// import react from "react";
// import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useState } from "react";
import noteContext from "./noteContext";
// useContext use
const NoteState = (props) => {
    const host = "http://localhost:3001";
    const [isChecked, setIsChecked] = useState(false);
    const notesInitial = []
 
    const [notes, setNotes] = useState(notesInitial);
    const getNotes = async () => {
        
            let response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify({ title: title, description: description, tag: tag }),
        });
        const json=await response.json();
        //console.log("getNnotes==>",json);
       setNotes(json);
        
    }
    // add a note 
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title: title, description: description, tag: tag }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const note = await response.json();
            setNotes(notes.concat(note))
            // setNotes((prevNotes) => [...prevNotes, note]);
        } catch (error) {
            console.error("Error adding note:", error.message);
            // Handle the error or show an alert
            // props.showAlert("Error adding note", "error");
        }
    };
    
    // delete a node 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify({ title: title, description: description, tag: tag }),
        });
        const json=response.json();
        //console.log(json);
        //console.log("delete button clicked" + id);
        let newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        // props.showAlert("Note Deleted","warning")
    }
    // edit a note
    const editNote = async (id, title, description, tag) => {
        // const url =""
        // //console.log("id");        
        // //console.log(id);        

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title: title, description: description, tag: tag }),
        });
        const json = response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
        
    }
    return (
        <>
            <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes,setIsChecked,isChecked}}>
                {/* update()}> */}
                {props.children}
            </noteContext.Provider>
        </>

    );
};
export default NoteState;