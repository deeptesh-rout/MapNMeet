import React, { useState, useEffect } from 'react';

export default function LoadingSpinner({ fullPage = false }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Función para detectar el tema actual
    const getCurrentTheme = () => {
      // Primero intentar obtener el tema del atributo data-theme
      const dataTheme = document.documentElement.getAttribute('data-theme');
      if (dataTheme) {
        return dataTheme === 'dark';
      }
      
      // Si no hay data-theme, usar el tema del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches;
    };

    // Establecer el tema inicial
    setIsDarkMode(getCurrentTheme());

    // Observar cambios en el atributo data-theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setIsDarkMode(getCurrentTheme());
        }
      });
    });

    // Observar cambios en el document.documentElement
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // También escuchar cambios del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      // Solo actualizar si no hay tema manual establecido
      if (!document.documentElement.getAttribute('data-theme')) {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <div className={fullPage ? 'spinner-fullpage' : 'spinner-overlay'}>
      <div className="splash-container">
        <div className="splash-content">
          <div className="spinner-container">
            <div className="spinner-ring"></div>
            <img 
              src={isDarkMode ? "/loggd.svg" : "/logg.svg"} 
              alt="Logo" 
              className="spinner-logo" 
            />
          </div>
          <div className="splash-text">
            <div className="splash-title">EventMappr</div>
            <div className="splash-subtitle">Discover Local Events</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .spinner-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(19, 19, 26, 0.95) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)'
          };
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: background 0.4s ease;
        }
        .spinner-fullpage {
          min-height: 100vh;
          width: 100vw;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(19, 19, 26, 0.95) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)'
          };
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.4s ease;
        }
        .splash-container {
          background: ${isDarkMode 
            ? 'rgba(26, 26, 35, 0.95)' 
            : 'rgba(255, 255, 255, 0.9)'
          };
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 32px;
          padding: 2.5rem;
          box-shadow: ${isDarkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 16px 48px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(90, 144, 255, 0.08)'
            : '0 8px 32px rgba(0, 0, 0, 0.02), 0 16px 48px rgba(0, 0, 0, 0.03), inset 0 0 40px rgba(52, 152, 219, 0.05)'
          };
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 320px;
          max-width: 480px;
          height: 320px;
          transition: all 0.3s ease;
          border: 1px solid ${isDarkMode 
            ? 'rgba(90, 144, 255, 0.2)' 
            : 'rgba(255, 255, 255, 0.1)'
          };
          position: relative;
          overflow: hidden;
        }
        .splash-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 0%,
            ${isDarkMode 
              ? 'rgba(90, 144, 255, 0.08)' 
              : 'rgba(52, 152, 219, 0.05)'
            } 50%,
            transparent 100%
          );
          animation: shine 8s infinite;
          z-index: 1;
        }
        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }
        .spinner-container {
          position: relative;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spinner-ring {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 5px solid ${isDarkMode 
            ? 'rgba(90, 144, 255, 0.2)' 
            : 'rgba(52, 152, 219, 0.2)'
          };
          border-top: 5px solid ${isDarkMode 
            ? '#5a90ff' 
            : '#3498db'
          };
          border-bottom: 5px solid ${isDarkMode 
            ? '#7aa5ff' 
            : '#6ec1e4'
          };
          border-radius: 50%;
          animation: spin 1.4s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
          box-shadow: ${isDarkMode
            ? '0 0 48px 0 rgba(90, 144, 255, 0.25), 0 0 80px 0 rgba(90, 144, 255, 0.15)'
            : '0 0 48px 0 rgba(52, 152, 219, 0.15), 0 0 80px 0 rgba(52, 152, 219, 0.08)'
          };
          background: transparent;
        }
        .spinner-logo {
          width: 112px;
          height: 112px;
          border-radius: 28px;
          background: ${isDarkMode ? '#1a1a23' : 'white'};
          box-shadow: ${isDarkMode
            ? '0 12px 48px rgba(90, 144, 255, 0.15), 0 6px 24px rgba(0, 0, 0, 0.1)'
            : '0 12px 48px rgba(52, 152, 219, 0.1), 0 6px 24px rgba(0, 0, 0, 0.03)'
          };
          z-index: 2;
          object-fit: contain;
          padding: 16px;
          transition: transform 0.3s ease;
        }
        .splash-text {
          text-align: center;
          position: relative;
        }
        .splash-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: ${isDarkMode ? '#f0f0f0' : '#3498db'};
          letter-spacing: -0.6px;
          margin-bottom: 0.6rem;
          text-shadow: ${isDarkMode
            ? '0 2px 12px rgba(90, 144, 255, 0.2)'
            : '0 2px 12px rgba(52, 152, 219, 0.15)'
          };
          position: relative;
          z-index: 2;
        }
        .splash-subtitle {
          font-size: 1.2rem;
          color: ${isDarkMode ? '#b0b0b0' : '#666'};
          opacity: 0.9;
          position: relative;
          z-index: 2;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shine {
          0% {
            transform: rotate(0deg) translate(-50%, -50%);
          }
          100% {
            transform: rotate(360deg) translate(-50%, -50%);
          }
        }
        @media (max-width: 600px) {
          .splash-container {
            padding: 2rem;
            min-width: 280px;
            height: 280px;
          }
          .spinner-container {
            width: 140px;
            height: 140px;
          }
          .spinner-ring {
            width: 140px;
            height: 140px;
          }
          .spinner-logo {
            width: 96px;
            height: 96px;
          }
          .splash-title {
            font-size: 2rem;
          }
          .splash-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
