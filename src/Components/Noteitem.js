import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Noteitem = (props) => {
  const { note, updateNote, handleview } = props;
  const context = useContext(noteContext);
  const { isChecked } = context;
  const [bgc, setBgc] = useState("ecf0f3");

  useEffect(() => {
    setBgc(isChecked ? "E0F4FF" : "ecf0f3");
  }, [isChecked]);

  const { deleteNote } = context;

  return (
    <div className="col-md-5 mx-auto mb-4" >
      <div className="card mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: `#${bgc}` }}>
        <div className="card-body">
          <h5 className="card-title" style={{ textAlign: 'center' }}>{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">
            <small className="text-muted">{note.tag}</small>
          </p>
          <div className="d-flex justify-content-end">
            <FontAwesomeIcon className="text-secondary mx-1" icon={faEye} style={{ cursor: 'pointer' }} onClick={() => { handleview(note); }} />
            <i
              className="far fa-trash-alt mx-4 text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert('Note Deleted', 'warning');
              }}
            ></i>
            <i
              className="far fa-edit mx-2 text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
