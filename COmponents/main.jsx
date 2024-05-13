import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import BookDetails from './BookDetails.jsx'; 
import store from './redux/Store';
import SearchResults from './SearchResults.jsx'; 
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/search-results/:query' element={<SearchResults />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);
