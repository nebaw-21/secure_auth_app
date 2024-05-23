import axios from 'axios';
import { APP_URL, APP_URL_2 } from '../../config';
import FAQ from '../commons/FAQ';
import { useState, useEffect } from 'react';
import Loader from '../commons/loader';
const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleImages, setVisibleImages] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/gallery`);
        const result = response.data;

        // Flatten the images array
        const images = result.flatMap(entry =>
          entry.images.map(image => ({
            url: `${APP_URL_2}/gallery/${image.replace('/uploads/gallery/', '')}`,
            description: entry.description,
          }))
       
        );
        setGalleryImages(images);
        setIsLoading(false);

      } catch (error) {
        console.error('Failed to fetch gallery data:', error);

      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleImages(prevVisibleImages => prevVisibleImages + 12);
  };

  if(isLoading){
    return(
 <Loader />

    )
  }

  return (
  
    <section className="flex flex-col items-center gap-20 w-[90%] mb-5">

      <div  class="columns-1 md:columns-2 xl:columns-3 gap-7 ">
        {galleryImages.slice(0, visibleImages).map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg break-inside-avoid mb-8">
            <img
              className="h-auto max-w-full rounded-lg"
              src={image.url}
              alt="gallery"
            />    
          </div>
        ))}
      </div>

      {visibleImages < galleryImages.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 text-center px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          More
        </button>
      )}

    </section>
   
  );
};

export default Gallery;
