import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaArrowLeft, FaVolumeUp, FaVolumeMute, FaList } from 'react-icons/fa';
import { BiRewind, BiFastForward } from 'react-icons/bi';
import { RiFullscreenFill, RiFullscreenExitFill, RiSpeedFill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import './Player.css';

const Player = ({ 
  title, 
  currentEpisode, 
  description 
}) => {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, time: 0 });
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const previewRef = useRef(null);
  const previewVideoRef = useRef(null);
  const seekTimeout = useRef(null);
  const controlsTimeoutRef = useRef(null);
  let inactivityTimeout = null;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        startInactivityTimer();
        setShowControls(true);
      } else {
        videoRef.current.play();
        clearInactivityTimer();
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
      setPlaying(!playing);
    }
  };

  const handleSeek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleBack = () => {
    // Implement navigation back logic
    console.log('Going back');
  };

  const handleNext = () => {
    // Implement next episode logic
    console.log('Next episode');
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setShowDescription(false);
    setIsMouseActive(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    clearInactivityTimer();
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      if (!playing) {
        startInactivityTimer();
      } else {
        setShowControls(false);
        setIsMouseActive(false);
      }
    }, 3000);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    setIsMouseActive(false);
    if (!playing) {
      startInactivityTimer();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      
      // Update buffered progress
      const video = videoRef.current;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedProgress = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedProgress);
      }
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = (x / width) * 100;
    const time = (percentage / 100) * duration;
    
    videoRef.current.currentTime = time;
    setProgress(percentage);
  };

  const handleProgressHover = (e) => {
    const progressBar = progressRef.current;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = (x / width) * 100;
    const time = (percentage / 100) * duration;
    
    setPreviewPosition({ x, time });
    
    // Update video preview frame
    if (previewVideoRef.current && previewRef.current) {
      const video = previewVideoRef.current;
      const canvas = previewRef.current;
      const context = canvas.getContext('2d');
      
      // Clear any pending seek operations
      if (seekTimeout.current) {
        clearTimeout(seekTimeout.current);
      }

      // Debounce the seek operation
      seekTimeout.current = setTimeout(() => {
        video.currentTime = time;
        video.addEventListener('seeked', () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }, { once: true });
      }, 0);
    }
  };

  const handleProgressLeave = () => {
    setPreviewPosition({ x: 0, time: 0 });
  };

  // Initialize preview video when component mounts
  React.useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.preload = 'auto';
      previewVideoRef.current.muted = true;
      
      // Set playback rate to maximum for faster seeking
      previewVideoRef.current.playbackRate = 16;
      
      // Load the video and keep it ready
      previewVideoRef.current.load();
      previewVideoRef.current.currentTime = 0;
    }
    
    // Cleanup
    return () => {
      if (seekTimeout.current) {
        clearTimeout(seekTimeout.current);
      }
    };
  }, []);

  // Update fullscreen state when exiting with Esc key
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const startInactivityTimer = () => {
    clearInactivityTimer();
    inactivityTimeout = setTimeout(() => {
      setShowDescription(true);
    }, 3000);
  };

  const clearInactivityTimer = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = null;
    }
  };

  // Clean up timers
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    return () => {
      clearInactivityTimer();
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`video-container ${playing && !isMouseActive ? 'cursor-hidden' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="application"
      aria-label="Video player"
    >
      {/* Hidden video element for preview */}
      <video
        ref={previewVideoRef}
        className="preview-video"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        preload="auto"
        tabIndex="-1"
      />

      <button 
        className={`back-button ${isMouseActive ? 'visible' : ''}`}
        onClick={handleBack}
        onKeyUp={handleBack}
        type="button"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>

      <video
        ref={videoRef}
        className="video-player"
        onClick={handlePlayPause}
        onKeyUp={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        tabIndex="0"
        aria-label="Video content"
      >
        <source 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          type="video/mp4" 
        />
        <track 
          kind="captions"
          src="/captions/en.vtt"
          srcLang="en"
          label="English"
          default
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {!showDescription && (
        <div 
          className={`controls-overlay ${showControls ? 'visible' : ''}`}
          role="toolbar"
          aria-label="Video controls"
          tabIndex="0"
        >
          <div className="video-info">
            <h2 className="video-title">{title}</h2>
            <span className="episode-number">{currentEpisode}</span>
          </div>

          <div 
            className="progress-container"
            ref={progressRef}
            onClick={handleProgressClick}
            onKeyUp={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={handleProgressLeave}
            tabIndex="0"
            role="group"
            aria-label="Video progress control"
          >
            <div className="progress-bar">
              <div className="progress-buffer" style={{ width: `${buffered}%` }}></div>
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div 
              className="preview-container"
              style={{ 
                left: `${previewPosition.x}px`,
                display: previewPosition.x ? 'block' : 'none'
              }}
            >
              <canvas 
                ref={previewRef}
                width="160"
                height="90"
                className="preview-canvas"
              />
              <div className="preview-time">{formatTime(previewPosition.time)}</div>
            </div>

            <div className="progress-time">
              <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="controls-buttons">
            <div className="controls-left">
              <button 
                className="control-button" 
                onClick={handlePlayPause}
                onKeyUp={handlePlayPause}
                type="button"
              >
                {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>

              <button className="control-button" onClick={() => handleSeek(-10)} type="button">
                <BiRewind size={44} />
                <span className="seek-label">-10s</span>
              </button>

              <button className="control-button" onClick={() => handleSeek(10)} type="button">
                <BiFastForward size={44} />
                <span className="seek-label">+10s</span>
              </button>

              <div className="volume-control">
                <button className="control-button" onClick={handleMuteToggle} type="button">
                  {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Volume"
                />
              </div>
            </div>

            <div className="controls-right">
              <button className="control-button" onClick={handleNext} type="button">
                <FaStepForward size={24} />
                <span className="seek-label">Next</span>
              </button>

              <button className="control-button" type="button">
                <FaList size={24} />
                <span className="seek-label">Episodes</span>
              </button>

              <div className="speed-control">
                <button 
                  className="control-button" 
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  type="button"
                >
                  <RiSpeedFill size={24} />
                  <span className="seek-label">Speed ({playbackSpeed}x)</span>
                </button>
                {showSpeedMenu && (
                  <div className="speed-menu">
                    {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        className={`speed-option ${playbackSpeed === speed ? 'active' : ''}`}
                        onClick={() => handleSpeedChange(speed)}
                        type="button"
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="control-button" onClick={handleFullscreen} type="button">
                {isFullscreen ? 
                  <RiFullscreenExitFill size={24} /> : 
                  <RiFullscreenFill size={24} />
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description Overlay */}
      {showDescription && !playing && (
        <aside 
          className="description-overlay"
          aria-label="Episode description"
          tabIndex="0"
        >
          <div className="description-content">
            <h1>{title}</h1>
            <h2>{currentEpisode}</h2>
            <p>{description}</p>
          </div>
        </aside>
      )}
    </div>
  );
};

Player.propTypes = {
  title: PropTypes.string,
  currentEpisode: PropTypes.string,
  description: PropTypes.string
};

Player.defaultProps = {
  title: "Big Buck Bunny",
  currentEpisode: "S1:E1",
  description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness."
};

export default Player; 