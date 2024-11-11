import React, { useContext, useEffect, useState } from 'react';

import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();

  const { notes, getNotes, editNote } = context;

  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
      props.showAlert("Login Required!!", "danger");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setModalVisible(true);  // Show modal
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag }); // Set current note details
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Save note logic here
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setModalVisible(false); // Close modal after saving //used instead of refClose
    props.showAlert("Updated successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      {/* Modal */}
      {modalVisible && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="close" onClick={() => setModalVisible(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form className='my-3'>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary" >Update Note</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display!'} 
        </div>
        
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
