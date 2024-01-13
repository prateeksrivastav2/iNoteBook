import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";

const Edit = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, editNote } = context;
    const { isChecked } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const { id } = useParams();

    useEffect(() => {
        const foundNote = notes.find(note => note._id === id);

        if (foundNote) {
            setNote({
                title: foundNote.title,
                description: foundNote.description,
                tag: foundNote.tag
            });
        }
    }, [id, notes]);
    let [bg, setBg] = useState("F3F8FF");
    const [bgc, setBgc] = useState("ecf0f3");

    useEffect(() => {
        setBgc(isChecked ? "B4D4FF" : "ecf0f3");
        setBg(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        updateNote(note);
        props.showAlert("Note Updated Successfully", "primary");
        navigate('/');
    }

    const onBack = (e) => {
        e.preventDefault();
        props.showAlert("No Changes made", "primary");
        navigate('/');
    }

    const updateNote = async (currentNote) => {
        setNote(currentNote);
        editNote(id, currentNote.title, currentNote.description, currentNote.tag);
    }

    return (
        <div style={{backgroundColor:`#${bg}`,paddingTop:'5%'}}>
            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <div style={{
                        ...formStyle,
                        backgroundColor: `#${bgc}`,
                    }}>
                        <label htmlFor="etitle" className="form-label" style={{ fontSize: '1.8rem' }}>Edit Your Note</label>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required placeholder='Main Idea' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <textarea className="form-control" id="edescription" name="description" value={note.description} onChange={onChange} rows="5" minLength={5} placeholder='Update Your Note Here!' required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name="tag" value={note.tag} placeholder='Category' onChange={onChange} />
                        </div>
                        <button disabled={note.description.length < 10 || note.title.length < 5} type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
                        <button type="submit" className="btn btn-primary " onClick={onBack} style={{ marginLeft: "70%" }}>Back</button>
                    </div>
                </div>
                <div style={imageContainerStyle}>
                    <img src="https://media.giphy.com/media/SuHqIFtD9gbBQXoxt3/giphy.gif" alt="" style={{...imageStyle,backgroundColor:`#${bgc}`}} />
                </div>
            </div>
        </div>
    );
}

export default Edit;

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '20px auto 0',
    // marginTop:'5%'
    
};

const formContainerStyle = {
    flex: 1,
    maxWidth: '70%',
};

const formStyle = {
    maxWidth: '90%',
    minHeight: '425px',
    margin: '20px auto',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageContainerStyle = {
    flex: 1,
    maxWidth: '30%',
    marginTop: '15px',
};

const imageStyle = {
    width: '75%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: "83%",
   
};
