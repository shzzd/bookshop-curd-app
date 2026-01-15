// const express = require("express");
import express from 'express'
const app = express()
import cors from 'cors'
// const db = require("./config/db");
import db from './config/db.js'
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

// middleware

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API is running...')
})

// run server
app.listen(process.env.PORT || 5000, (error) => {
    if (error) throw error
    console.log('Server is running on port', process.env.PORT || 5000)
})

app.get('/api/books', (req, res) => {
    const q = 'SELECT * FROM books ORDER BY id DESC'
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json({ data })
    })
})

app.post('/api/books', (req, res) => {
    const q = 'INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)'
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json('Book has been created successfully.')
    })
})

app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = 'DELETE FROM books WHERE id = ?'
    db.query(q, [bookId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json('Book has been deleted successfully.')
    })
})

app.put('/api/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = 'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?'
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json('Book has been updated successfully.')
    })
})
