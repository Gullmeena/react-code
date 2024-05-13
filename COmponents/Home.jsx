import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import goodreads from './assets/download.jpg';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { productSearch } from './redux/Actions';
import './App.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Home() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.productData);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showSearchData, setShowSearchData] = useState(true);
  const [searchWidth, setSearchWidth] = useState(0);
  const inputRef = useRef(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setSearchWidth(inputRef.current.clientWidth);
  }, [query]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        timeoutId = null;
      }, delay);
    };
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const search = (value) => {
    dispatch(productSearch(value));
    localStorage.setItem('lastSearchQuery', value);
    localStorage.setItem('searchResults', JSON.stringify(data));
  };

  const debouncedSearch = debounce(search, 300);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleBookSelect = (book) => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      navigate(`/book/${encodeURIComponent(book.id)}`);
    }
  };
  const handleSearchButtonClick = () => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      if (query.trim() === '') {
        inputRef.current.focus();
      } else {
        navigate(`/search-results/${encodeURIComponent(query)}`);
      }
    }
  };
  const handleDropdownClick = () => {
        setShowSearchData(prevShowSearchData => !prevShowSearchData);
    if (!showSearchData) {
      setQuery('');
    }
  };

  return (
    <div>
      <div className="header">
        <div className="left-side">
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          Jazaa Book Search
        </div>
        <div className="right-side">
          <Button variant="contained" style={{ marginRight: '8px' }}>Home</Button>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <div className='body'>
        <img src={goodreads} alt="Goodreads logo" />
        <div className="search-container">
          <div className="input-container">
            <InputBase
              style={{ width: '500px' }}
              ref={inputRef}
              placeholder="GoogleReadsSearch"
              className="search-input"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              endAdornment={<IconButton onClick={handleDropdownClick}><ExpandMoreIcon /></IconButton>}
            />
            <ButtonGroup className="search-button-group" variant="contained" aria-label="split button">
              <Button className="search-button" onClick={handleSearchButtonClick} style={{ padding: '12px' }}>
                Search
              </Button>
            </ButtonGroup>
          </div>
          {showSearchData && (
            <div className="search-results-container" style={{ width: searchWidth, textAlign: 'left' }}>
              <div className="search-results" >
                {data.map((book) => (
                  <div
                    key={book.title}
                    onClick={() => handleBookSelect(book)}
                    className="search-result-item"
                  >
                    <div>{book.title} by {book.author}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
