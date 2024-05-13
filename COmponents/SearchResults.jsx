import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; 
import { setSearchResults } from './redux/Actions';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './App.css';

const handleHome = (navigate) => {
  navigate('/home');
};

function SearchResults() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const [searchResults, setSearchResultsLocally] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();
  const observer = useRef();

  useEffect(() => {
    const storedResults = localStorage.getItem('searchResults');
    if (storedResults) {
      setSearchResultsLocally(JSON.parse(storedResults));
    }
  }, [query]);

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults]);

  useEffect(() => {
    setPage(1);
    loadResults();
  }, [query]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (observer.current && loading) {
      const loadMoreTrigger = document.querySelector('#loadMoreTrigger');
      if (loadMoreTrigger) {
        observer.current.observe(loadMoreTrigger);
      }
    }
  }, [loading]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMoreResults();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}&page=${page}`);
      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const newSearchResults = parseSearchResults(xmlDoc);
      const totalPagesFromResponse = parseInt(xmlDoc.querySelector('search > total-results').textContent);
      setTotalPages(Math.ceil(totalPagesFromResponse / 100)); 

      setSearchResultsLocally(prevResults => [...prevResults, ...newSearchResults]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading search results:', error);
      setLoading(false);
    }
  };

  const parseSearchResults = (xmlDoc) => {
    const bookNodes = xmlDoc.querySelectorAll('work');
    const books = Array.from(bookNodes).map(bookNode => {
      const id = bookNode.querySelector('best_book > id')?.textContent || 'Unknown Id';
      const title = bookNode.querySelector('best_book > title')?.textContent || 'Unknown Title';
      const author = bookNode.querySelector('best_book > author > name')?.textContent || 'Unknown Author';

      return {
        id,
        title,
        author,
      };
    });

    return books;
  };

  const loadMoreResults = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-side">
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          Jazaa Book Search
        </div>
        <div className="right-side">
          <Button variant="contained" style={{ marginRight: '8px' }} onClick={() => handleHome(navigate)}>Home</Button>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <div>
        <h1>Search Results for "{query}"</h1>
        {loading && <p>Loading results for "{query}"...</p>}
        
        <button id="loadMoreTrigger" style={{ display: 'none' }} onClick={loadMoreResults}></button>
        
        {searchResults.map((result) => (
          <div key={result.id}>
            <Link to={`/book/${encodeURIComponent(result.id)}`}>
              <p>{result.title} by {result.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResults;
