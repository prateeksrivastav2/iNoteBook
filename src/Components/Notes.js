import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AaddNote from './Aaddnote'
import Vieew from './vieew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark, faFilter } from '@fortawesome/free-solid-svg-icons';

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
    let [bgc, setBgc] = useState("secondary");
     let navcolor = isChecked ? "light" : "secondary";
    // let DM = isChecked ? "black" : "white";
    useEffect(() => {
        navcolor = isChecked ? "light" : "secondary";
        // DM = isChecked ? "black" : "white";
    }, [isChecked]);

    useEffect(() => {
        // console.log("isChecked");
        setBgc(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);
    useEffect(() => {
        if (filt === false && localStorage.getItem('token')) {
            // console.log("nfilter");
            getNotes();
        } else if (filt === true) {
            // console.log("filter");
            filtergetNotes(searchtit.stitle, notes);
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


    }
    const removefilter = (e) => {
        e.preventDefault();
        setFilt(false);


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
                <div>
                    <form onSubmit={handlefilter}>
                        <div className="form-control" style={{ backgroundColor: `#${bgc}`, border: '0' }}>
                            <div style={{ display: 'flex',marginLeft:'70%',marginBottom:'2%'}}>
                                <input className="form-control" type="text" name="stitle" placeholder='Search Notes...' onChange={onchange} style={{ width: '70%',backgroundColor:'#ecf0f3' }} />
                               { !filt?<FontAwesomeIcon icon={faFilter} className={`text-${navcolor}`} onClick={handlefilter} size='2x' style={{ cursor: 'pointer', marginLeft: '5%' }} />
                               : <FontAwesomeIcon icon={faFilterCircleXmark}  className={`text-${navcolor}`} onClick={removefilter} size='2x' style={{ cursor: 'pointer', marginLeft: '5%' }} />}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="coner" style={{ textAlign: 'center' ,marginBottom:'1%'}}>
                    {notes && notes.length === 0 && 'No notes to display'}
                </div>
                {/* <div>
                    <form onSubmit={handlefilter}>
                        <div className="form-control" style={{ backgroundColor: `#${bgc}`, border: '0' }}>
                            <div style={{ display: 'flex',marginLeft:'70%',marginBottom:'2%'}}>
                                <input className="form-control" type="text" name="stitle" placeholder='Search Notes...' onChange={onchange} style={{ width: '70%',backgroundColor:'#ecf0f3' }} />
                               { !filt?<FontAwesomeIcon icon={faFilter} className={`text-${navcolor}`} onClick={handlefilter} size='2x' style={{ cursor: 'pointer', marginLeft: '5%' }} />
                               : <FontAwesomeIcon icon={faFilterCircleXmark}  className={`text-${navcolor}`} onClick={removefilter} size='2x' style={{ cursor: 'pointer', marginLeft: '5%' }} />}
                            </div>
                        </div>
                    </form>
                </div> */}
                {Array.isArray(notes) &&
                    notes.map((note) => (
                        <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} handleview={handleview} />
                    ))}
            </div>
        </div>
    );
}

export default Notes;
