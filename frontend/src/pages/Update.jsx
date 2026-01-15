import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Update() {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        cover: '',
        price: null,
    })

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/books/${id}`, book)
            alert('Book has been updated.')
            navigate('/')
        } catch (err) {
            console.log(err)
            alert('Error updating book!')
        }
    }

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input type="text" placeholder="Title" onChange={(e) => handleChange(e)} name="title" />
            <input type="text" placeholder="Description" onChange={(e) => handleChange(e)} name="desc" />
            <input type="number" placeholder="Price" onChange={(e) => handleChange(e)} name="price" />
            <input type="text" placeholder="Cover URL" onChange={(e) => handleChange(e)} name="cover" />
            <button className="formBtn" onClick={(e) => handleUpdate(e)}>
                Update
            </button>
        </div>
    )
}
