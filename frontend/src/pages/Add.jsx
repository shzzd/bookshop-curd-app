import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Add() {
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

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, book)
            alert('Book has been added.')
            navigate('/')
        } catch (err) {
            console.log(err)
            alert('Error adding book!')
        }
    }

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={(e) => handleChange(e)} name="title" />
            <input type="text" placeholder="Description" onChange={(e) => handleChange(e)} name="desc" />
            <input type="number" placeholder="Price" onChange={(e) => handleChange(e)} name="price" />
            <input type="text" placeholder="Cover URL" onChange={(e) => handleChange(e)} name="cover" />
            <button className="formBtn" onClick={(e) => handleClick(e)}>
                Add
            </button>
        </div>
    )
}
