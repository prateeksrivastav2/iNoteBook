import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const Aaddnote = (props) => {
  const context = useContext(noteContext);
  let { isChecked } = context;
  let [bgc, setBgc] = useState("ecf0f3");

  useEffect(() => {
    setBgc(isChecked ? "DCF2F1" : "ecf0f3");
  }, [isChecked]);

  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    if (note.description.length < 10) {
      props.showAlert('Description must be of 10 characters', 'info');
    }
    else if (note.title.length < 5) {
      props.showAlert('Title must be of 5 characters', 'danger');
    }
    else if (note.tag.length < 5) {
      props.showAlert('Tag must be of 5 characters', 'danger');
    }
    else {
      addNote(note.title, note.description, note.tag);
      props.showAlert('Note Created', 'info');
      setNote({ title: '', description: '', tag: '' });
    }
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form style={{ width: '80%', paddingTop: '15%' }}>
        <div
          className="f mx-auto"
          style={{
            maxWidth: '90%',
            minHeight: '425px',
            margin: '20px auto',
            padding: '40px',
            backgroundColor: `#${bgc}`,
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              width: '100%',
              display: 'block',
              border: 'none',
              outline: 'none',
              background: 'none',
              fontSize: '1.8rem',
              color: '#11999E',
              marginBottom: '3%',
            }}
          >
            Add a Note
          </h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="titleHelp"
              value={note.title}
              onChange={onchange}
              minLength={5}
              required
              placeholder="Main Idea"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              rows="5"
              placeholder="Type Your Notes Here!!"
              minLength={10}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
              placeholder="Category"
            />
          </div>
          <button
            
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Aaddnote;
