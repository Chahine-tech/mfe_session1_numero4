import React from 'react';

const Player = () => {
  return (
    <div className="video-player" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <video
        controls
        width="100%"
        style={{ 
          backgroundColor: '#000',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <source 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          type="video/mp4" 
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};

export default Player; 