import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {

    const [note, setNote] = useState(null);

    const goback = useNavigate()  // used to navigate back to the home page.. used instead of history

    const {id} = useParams()  // to get the id for each note.

    useEffect(()=>{
        getNote()
    },[id])
    
    let getNote = async () => {
        if( id === 'new') return;
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
            fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
            fetch(`/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        } )
    }


    let deleteNote = async () => {
        await fetch(`/api/notes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        goback('/')
    }

    // determine which event to call when the button is clicked 
    let handleSubmit = () => {

        if ( id !== 'new' && !note.body ){ // if note is not new and the body is empty
            deleteNote()
        }else if (id !== 'new'){ // if note is not new
            updateNote()
        }else if (id === 'new' && note !== null){  // if the note in new and the content is not null
            createNote()
        }

        goback('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    {/* // checks the conditon and detemine which event to call   */}
                    <ArrowLeft onClick={handleSubmit}/>          
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button> // calls the delete event when the button is clicked
                ): (
                    <button onClick={handleSubmit}>Done</button>  // determine which event to call based on the condition
                )}
            </div>
            <textarea autoFocus onChange={(e) => { setNote({...note, 'body': e.target.value}) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage