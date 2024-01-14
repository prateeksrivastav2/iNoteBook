import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AaddNote from './Aaddnote'
import Vieew from './vieew';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    // let filt=false;
    const { notes, getNotes, filtergetNotes } = context;
    let { isChecked } = context;
    const { showAlert } = props;
    const [no, setNo] = useState({ title: '', description: '', tag: '' });
    const [searchtit, setSearchtit] = useState({ stitle: '' });
    const [filt, setFilt] = useState(false);
    const [isVieewVisible, setIsVieewVisible] = useState(false);
    let DM = isChecked ? "427D9D" : "11999E";

    useEffect(() => {
        if (filt===false&&localStorage.getItem('token')) {
            // console.log("nfilter");
            getNotes();
        } else if(filt===true){
            // console.log("filter");
            filtergetNotes(searchtit.stitle,notes);
        }
        else {
            navigate('/login');
        }
    }, [navigate, getNotes, filt, searchtit.stitle, notes, filtergetNotes]);

    useEffect(() => {
        DM = isChecked ? "427D9D" : "11999E";
    }, [isChecked]);

    const handlefilter = (e) => {
        e.preventDefault();
        setFilt(true);
        // console.log(filter);
        // filtergetNotes(searchtit.stitle,notes);
        console.log("opoo");
        // console.log(notes);

    }
    const removefilter = (e) => {
        e.preventDefault();
        setFilt(false);
        // console.log(filter);
        // filtergetNotes(searchtit.stitle,notes);
        console.log("opoo");
        // console.log(notes);

    }

    const updateNote = (note) => {
        navigate(`/edit-note/${note._id}`);
        showAlert("Here you can edit your note", "success");
    }

    const handleview = (note) => {
        setNo({ title: note.title, description: note.description, tag: note.tag });
        setIsVieewVisible(true);
    };

    const hideVieew = () => {
        setIsVieewVisible(false);
    };

    const onchange = (e) => {
        setSearchtit({ ...searchtit, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <AaddNote showAlert={showAlert} />
            {isVieewVisible && <Vieew no={no} handleview={handleview} hideVieew={hideVieew} isVieewVisible={isVieewVisible} />}
            <div className='row my-0' style={{ marginBottom: '0px' }}>
                <h3 style={{ marginTop: "10%", textAlign: 'center', color: `#${DM}` }}>Your Notes</h3>
                <div className="coner" style={{ textAlign: 'center' }}>
                    {notes && notes.length === 0 && 'No notes to display'}
                </div>
                <div>
                    <form onSubmit={handlefilter}>
                        <input type="text" name="stitle" onChange={onchange} />
                        <button type='submit'>Filter</button>
                    </form>
                        <button onClick={removefilter}>rFilter</button>
                </div>
                {Array.isArray(notes) &&
                    notes.map((note) => (
                        <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} handleview={handleview} />
                    ))}
            </div>
        </div>
    );
}

export default Notes;
