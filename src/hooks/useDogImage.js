import { useState, useEffect } from 'react';

export function useDogImage() {
  const [dogImage, setDogImage] = useState({
    url: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dog image');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setDogImage({
            url: data.message,
            loading: false,
            error: null
          });
        } else {
          throw new Error('API returned error status');
        }
      } catch (error) {
        console.error('Dog image fetch error:', error);
        setDogImage({
          url: '',
          loading: false,
          error: error.message
        });
      }
    };

    fetchDogImage();
  }, []); // Empty dependency array means it runs once on mount (new dog each visit)

  return dogImage;
}

