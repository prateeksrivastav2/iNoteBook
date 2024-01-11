import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Aaddnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert('Note Created', 'info');
    setNote({ title: '', description: '', tag: '' });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3
        style={{
          textAlign:'center',
          width: '100%',
          display: 'block',
          border: 'none',
          outline: 'none',
          background: 'none',
          fontSize: '1.8rem',
          color: '#666',
          padding: '10px 15px 10px 10px',
        }}
      >
        Add a Note
      </h3>
      <form>
        <div
          className="f"
          style={{
            maxWidth: '90%',
            minHeight: '425px',
            margin: '20px auto',
            padding: '40px',
            backgroundColor: '#ecf0f3',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
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
            disabled={note.description.length < 10 || note.title.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Aaddnote;