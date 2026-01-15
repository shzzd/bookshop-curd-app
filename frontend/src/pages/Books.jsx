import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Books() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
                const responseData = response.data
                setBooks(responseData.data)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }

        fetchBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            window.location.reload()
            // Optionally, you can refresh the book list here
        } catch (err) {
            alert('Error deleting book!')
        }
    }

    return (
        <div>
            <h1>My Book Shop</h1>
            <div className="books">
                {books &&
                    books.map((book) => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt={book.title} />}
                            <h2>{book.title}</h2>
                            <p>{book.desc}</p>
                            <span>${book.price}</span>
                            <button className="delete" onClick={() => handleDelete(book.id)}>
                                Delete
                            </button>
                            <button className="update">
                                <Link to={`/update/${book.id}`}>Update</Link>
                            </button>
                        </div>
                    ))}
            </div>

            <Link to="/add">
                <button className="addBtn">Add Book</button>
            </Link>
        </div>
    )
}
