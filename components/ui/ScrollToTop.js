import React, { useState, useEffect } from 'react';
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top-container ${isVisible ? 'show' : ''}`}>
      <div className="animated-border"></div>
      <button 
        id="scrollToTopBtn" 
        title="Go to top"
        onClick={scrollToTop}
        style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'all' : 'none' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L6 10M12 4L18 10M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <style jsx>{`

        .content {
          padding: 2rem;
          text-align: center;
        }

        .scroll-to-top-container {
          position: fixed;
          bottom: 100px;
          right: 22px;
          width: 60px;
          height: 60px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.8);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .scroll-to-top-container.show {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        #scrollToTopBtn {
          position: absolute;
          width: 60px;
          height: 60px;
          background-color: #4a80f0;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: box-shadow 0.3s ease;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        #scrollToTopBtn:hover {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
          transform: scale(1.1); 
        }

        .animated-border {
          position: absolute;
          width: 70px;
          height: 70px;
          border: 3px solid transparent;
          border-top: 3px solid rgb(50, 110, 230);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          top: -5px;
          left: -5px;
          z-index: 1;
          transition: animation-duration 0.2s ease;
        }

        .scroll-to-top-container:hover .animated-border {
          animation-duration: 0.4s;
        }

        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      
      `}</style>
    </div>
  );
};

export default ScrollToTop; 