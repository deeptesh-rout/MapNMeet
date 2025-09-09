import { useEffect, useState } from 'react';

function EventGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/event-images') // change to real API
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div>
      <h1>Event Gallery</h1>
      <div className="gallery">
        {images.map(img => (
          <img key={img.id} src={img.url} alt={img.title} />
        ))}
      </div>
    </div>
  );
}

export default EventGallery;
