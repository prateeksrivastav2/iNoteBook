import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AaddNote from './Aaddnote'
import Vieew from './vieew';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const { showAlert } = props;
    const [no, setNo] = useState({ title: '', description: '', tag: '' });
    const [isVieewVisible, setIsVieewVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, [navigate, getNotes]);

    const updateNote = (note) => {
        navigate(`/edit-note/${note._id}`);
        props.showAlert("Here you can edit your note", "success");
    }

    const handleview = (note) => {
        setNo({ title: note.title, description: note.description, tag: note.tag });
        setIsVieewVisible(true);
    };

    const hideVieew = () => {
        setIsVieewVisible(false);
    };

    return (
        <div>
            <AaddNote showAlert={showAlert} />
            {isVieewVisible && <Vieew no={no} handleview={handleview} hideVieew={hideVieew} isVieewVisible={isVieewVisible}/>}
            <div className='row my-3'>
                <h3 style={{ marginTop: "2%" ,textAlign:'center'}}>Your Notes</h3>
                <div className="container" style={{textAlign:'center'}}>
                    {notes && notes.length === 0 && 'No notes to display'}
                </div>
                {Array.isArray(notes) &&
                    notes.map((note) => (
                        <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} handleview={handleview} />
                    ))}
            </div>
        </div>
    );
}

export default Notes;
