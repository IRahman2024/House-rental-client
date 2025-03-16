import { useState, useRef } from "react";

const VideoPlayer = () => {
  const videos = [
    "/videos/house entrence.mp4",
    "/videos/dining.mp4",
    "/videos/bedrooms.mp4",
  ]; // Relative paths from the public folder

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <video
        key={currentIndex} // Ensures React reloads the video
        ref={videoRef}
        src={videos[currentIndex]}
        autoPlay
        onEnded={handleVideoEnd}
        className="w-full min-h-screen object-cover"
        // controls
      />
    </div>
  );
};

export default VideoPlayer;
