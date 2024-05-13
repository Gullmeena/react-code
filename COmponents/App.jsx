
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import BookDetails from './BookDetails.jsx';
import SearchResults from './SearchResults.jsx'; 
import ProtectedRoute from './ProtectedRoute.jsx'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <ProtectedRoute
            path='/home'
            element={<Home />}
            isLoggedIn={isLoggedIn} 
          />
          <Route path='/search-results/:query' element={<SearchResults />} /> 
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
