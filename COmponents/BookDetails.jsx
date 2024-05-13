import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './App.css';

function BookDetails() {
    const { bookId } = useParams();
    const productData = useSelector(state => state.productData);
    const [book, setBook] = useState(null);

    useEffect(() => {
        // Attempt to retrieve book details from local storage
        const storedBookDetails = localStorage.getItem('bookDetails');
        if (storedBookDetails) {
            setBook(JSON.parse(storedBookDetails));
        }
    }, []);

    useEffect(() => {
        // Store book details in local storage whenever book changes
        if (book) {
            localStorage.setItem('bookDetails', JSON.stringify(book));
        }
    }, [book]);

    useEffect(() => {
        // Find the book with matching id from productData
        if (productData) {
            const foundBook = productData.find(book => book.id === bookId);
            if (foundBook) {
                setBook(foundBook);
            }
        }
    }, [productData, bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    console.log('Book Details:', book);

    return (
        <>
        <header className='detailsheader'></header>
        <div className='bookdetails'>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Average Rating: {book.averageRating}</p>
            <img src={book.image} alt={book.title} />
        </div>
        </>
    );
}
export default BookDetails;
