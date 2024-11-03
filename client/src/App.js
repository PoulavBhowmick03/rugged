import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  const [outcomeVideo, setOutcomeVideo] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [pendingWin, setPendingWin] = useState(false);
  const bgVideoRef = useRef(null);

  const handleClick = () => {
    setIsClicked(true);
    setIsHovered(false);
    const random = Math.random();
    const isWin = random <= 0.3;
    const videoPath = isWin ? '/videos/win.mp4' : '/videos/lose.mp4';
    setOutcomeVideo(videoPath);
    setShowOutcome(true);
    setPendingWin(isWin);
  };

  const handleMouseEnter = () => {
    if (!isClicked) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
  };

  const handleOutcomeEnd = () => {
    if (pendingWin) {
      setWins(prev => prev + 1);
    } else {
      setLosses(prev => prev + 1);
    }
    setTotalGames(prev => prev + 1);
    
    setShowOutcome(false);
    setOutcomeVideo('');
    setPendingWin(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = false;
      bgVideoRef.current.play();
    }
  };

  return (
    <div className="App">
      <div className="media-container">
        <video
          ref={bgVideoRef}
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        <div className="content-container">
          <img 
            src="/images/screen.png"
            alt="Screen"
            className="screen-image"
          />
          <img 
            src={isHovered ? "/images/playhover.png" : "/images/play.png"}
            alt="Play Button"
            className="play-button"
          />
          <svg 
            className="button-svg"
            viewBox="0 0 2048 1152"
            preserveAspectRatio="xMidYMid slice"
          >
            <g transform="scale(1)" className="svg-group">
              <rect className="button-container" width="2048" height="1152" />
              <path 
                className="button-path" 
                d="M1197,704c0-9.128,5.19-9,9-9h84c5.13,0,11,1.027,11,11v65c0,10.313-8.05,11-11,11h-76c-7.89,0-15-2.564-15-11C1199,761.18,1197,713.128,1197,704Z"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              >
                <title>I'm a cripto jeenyus!</title>
              </path>
            </g>
          </svg>

          <svg 
            className="text-window"
            viewBox="0 0 2048 1152"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <clipPath id="text-clip">
                <path d="M732,694l390,2v76.513H729.7Z" />
              </clipPath>
            </defs>
            <rect className="text-container" width="2048" height="1152"/>
            <foreignObject x="732" y="694" width="390" height="78.513" clipPath="url(#text-clip)">
              <div xmlns="http://www.w3.org/1999/xhtml" className="scrolling-text">
                <span>
                  Wins - {wins} &nbsp;&nbsp;&nbsp;&nbsp; Losses - {losses} &nbsp;&nbsp;&nbsp;&nbsp; Total games played - {totalGames} &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>
                  Wins - {wins} &nbsp;&nbsp;&nbsp;&nbsp; Losses - {losses} &nbsp;&nbsp;&nbsp;&nbsp; Total games played - {totalGames} &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>
                  Wins - {wins} &nbsp;&nbsp;&nbsp;&nbsp; Losses - {losses} &nbsp;&nbsp;&nbsp;&nbsp; Total games played - {totalGames} &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </foreignObject>
          </svg>
        </div>

        {showOutcome && (
          <video
            className="outcome-video"
            autoPlay
            playsInline
            onEnded={handleOutcomeEnd}
          >
            <source src={outcomeVideo} type="video/mp4" />
          </video>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <p>Rugged is a high risk trading symulator.</p>
              <p>Rugged does not offer financial advice.</p>
              <p>Rugged dont giv a fuq if u lose it all!</p>
              <p className="connect-text">Connect wallet below if you are a degenerate gambler.</p>
              <button onClick={handlePopupClose}>I'm a cripto jeenyus!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;