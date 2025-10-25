import { useState, useEffect } from 'react';

function DogCarousel() {
  const [dogImage, setDogImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Fetch a random dog image
  const fetchDog = async () => {
    console.log('🔵 [DOG CAROUSEL] Starting to fetch new dog...');
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      
      if (data.status === 'success' && data.message) {
        console.log('🟢 [DOG CAROUSEL] Fetched new dog:', data.message);
        setDogImage(data.message);
        setIsLoading(false);
        return data.message;
      }
    } catch (error) {
      console.error('🔴 [DOG CAROUSEL] Error fetching dog:', error);
      setIsLoading(false);
    }
  };

  // Fetch initial dog on mount
  useEffect(() => {
    console.log('🟡 [DOG CAROUSEL] Component mounted, fetching initial dog');
    fetchDog();
  }, []);

  // Auto-refresh every 5 seconds with fade transition
  useEffect(() => {
    console.log('🟡 [DOG CAROUSEL] Setting up 5-second interval');
    const interval = setInterval(async () => {
      console.log('⏰ [DOG CAROUSEL] 5 seconds elapsed, starting transition');
      
      // Start fade out
      console.log('🌑 [DOG CAROUSEL] Fading out (opacity -> 0)');
      setFadeOut(true);
      
      // Wait for fade out to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('📥 [DOG CAROUSEL] Fade out complete, fetching new dog URL');
      
      // Fetch new dog URL from API
      const newDogUrl = await fetchDog();
      
      if (newDogUrl) {
        console.log('🖼️ [DOG CAROUSEL] Got new URL, preloading image...');
        
        // Preload the image before showing it
        const img = new Image();
        img.src = newDogUrl;
        
        // Wait for the image to actually load
        await new Promise((resolve) => {
          img.onload = () => {
            console.log('✅ [DOG CAROUSEL] Image fully loaded in browser, now fading in');
            resolve();
          };
          img.onerror = () => {
            console.log('❌ [DOG CAROUSEL] Image failed to load');
            resolve(); // Still resolve to continue
          };
        });
        
        // Now fade in - image is guaranteed to be loaded
        setFadeOut(false);
      }
      
    }, 5000);

    return () => {
      console.log('🛑 [DOG CAROUSEL] Cleaning up interval');
      clearInterval(interval);
    };
  }, []);

  if (isLoading || !dogImage) {
    return (
      <div className="code-animation">
        <div className="code-line"></div>
        <div className="code-line"></div>
        <div className="code-line"></div>
        <div className="code-line"></div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      overflow: 'hidden',
      border: '5px solid var(--primary-color)',
      boxShadow: '0 10px 40px rgba(255, 107, 0, 0.3)',
      borderRadius: '8px'
    }}>
      {/* Dog Image */}
      <img 
        src={dogImage} 
        alt="Random Jumpstarter dog"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeOut ? 0 : 1
        }}
      />

      {/* Bottom Label */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        padding: '2rem 1.5rem 1rem',
        color: 'white'
      }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          textAlign: 'center',
          letterSpacing: '1px'
        }}>
          🐕 RANDOM JUMPSTARTER DOG
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          opacity: 0.8,
          marginTop: '0.25rem'
        }}>
          REFRESHES EVERY 5 SECONDS
        </div>
      </div>
    </div>
  );
}

export default DogCarousel;

