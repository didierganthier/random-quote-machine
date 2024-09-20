import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect } from 'react';

const QuoteMachine = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [bgColorIndex, setBgColorIndex] = useState(0);

    const colors = [
        '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c',
        '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99',
        '#77B1A9', '#73A857'
    ];

    const fetchQuote = async () => {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        setBgColorIndex(Math.floor(Math.random() * colors.length));
        document.querySelector('body').style.backgroundColor = colors[bgColorIndex];
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <main style={{ backgroundColor: colors[bgColorIndex] }}>
            <div className='wrapper'>
                <div id="quote-box" style={{ color: colors[bgColorIndex] }}>
                    <p id="text">
                        <FontAwesomeIcon icon={faQuoteLeft} /> {quote} <FontAwesomeIcon icon={faQuoteRight} />
                    </p>
                    <p id="author">- {author}</p>
                    <div className="buttons">
                        <div>
                            <FontAwesomeIcon style={{ height: '30', width: '30' }} icon={faTwitterSquare} onClick={() => window.open(`https://twitter.com/intent/tweet?text=${quote} - ${author}`, '_blank')} />
                            <FontAwesomeIcon style={{ height: '30', width: '30' }} icon={faTumblrSquare} onClick={() => window.open(`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`, '_blank')} />
                        </div>
                        <button id="new-quote" onClick={fetchQuote} style={{ backgroundColor: colors[bgColorIndex] }}>New Quote</button>
                    </div>
                </div>
                <p>by didierganthier</p>
            </div>
        </main>
    );
};

export default QuoteMachine;
