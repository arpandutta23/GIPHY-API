import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './App.css';

function Display() {
  const [gifyLists, setGifyLists] = useState([]);
  const [searchBox, setSearchBox] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [inputBox, setInputBox] = useState('');
  const [selectedGif, setSelectedGif] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(' https://developers.giphy.com/docs/api#quick-start-guide (go on "API QUICKSTART")', {
        params: {
          api_key: 'zkhcohQVCG9TaqEsRr88ipZPXtPufay7',
        },
      })
      .then((response) => {
        setGifyLists(response.data.data);
        setLoading(false);
      });
  }, []);

  const handleSearchGif = (e) => {
    setSearchBox(e.target.value);
    setLoading(true);
    setGifyLists(
      axios
        .get('https://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: 'ChLvdBrqbpePLW4gQfGsggbnOGdVkt26',
            q: searchBox,
          },
        })
        .then((response) => {
          setGifyLists(response.data.data);
          if (gifyLists.length > 0) {
            setLoading(false);
          }
        })
    );
  };

  const handleClick = (gif) => {
    setSelectedGif(gif);
    setShowBtn(false);
  };

  const handleSubmiFormData = (e) => {
    e.preventDefault();
    const formData = {
      id: Number(new Date()),
      inputText: inputBox,
      gifImg: selectedGif,
    };
    console.log(formData);
  };

  return (
    <div className='App'>
      <>
        <form onSubmit={handleSubmiFormData}>
          <input type='text' value={inputBox} onChange={(e) => setInputBox(e.target.value)} />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowBtn(!showBtn);
              setSelectedGif('');
            }}>
            GIF
          </button>
          <button type='submit'>Submit</button>
        </form>
        {showBtn && (
          <>
            <div>
              Search Gif: <input type='text' value={searchBox} onChange={handleSearchGif} />
            </div>

            {loading ? (
              <p>loading...</p>
            ) : (
              gifyLists.length > 0 &&
              gifyLists.map((gify, idx) => {
                return (
                  <>
                    <img
                      src={gify.images.fixed_height.url}
                      alt='gify'
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(gify.images.fixed_height.url);
                      }}
                    />
                  </>
                );
              })
            )}
          </>
        )}
      </>
      <img src={selectedGif} alt='' />
    </div>
  );
}

export default Display;