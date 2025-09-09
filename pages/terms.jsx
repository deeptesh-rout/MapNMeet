import React from 'react';

function Terms() {
  return (
    <div className="terms-container">
      <div className="terms-page">
        <div className="header-section">
          <div className="icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="title">Terms of Service</h1>
          <p className="subtitle">Your agreement with EventMappr</p>
          <div className="updated-badge">
            <span>Last updated: June 29, 2025</span>
          </div>
        </div>

        <div className="content-grid">
          <section className="section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2>Acceptance of Terms</h2>
            </div>
            <p>
              By using EventMappr, you agree to be bound by these Terms of Service. If you do not agree, you may not access or use the platform.
            </p>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h2>User Responsibilities</h2>
            </div>
            <div className="responsibility-cards">
              <div className="responsibility-card">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <h3>Accurate Information</h3>
                  <p>Provide truthful and up-to-date information</p>
                </div>
              </div>
              <div className="responsibility-card">
                <div className="card-icon">⚖️</div>
                <div className="card-content">
                  <h3>Lawful Use</h3>
                  <p>Use the platform only for legal purposes</p>
                </div>
              </div>
              <div className="responsibility-card">
                <div className="card-icon">🤝</div>
                <div className="card-content">
                  <h3>Respectful Conduct</h3>
                  <p>Interact respectfully with other users</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2>Modification of Terms</h2>
            </div>
            <p>
              We may update these Terms from time to time. Continued use of the platform implies acceptance of any changes. We'll notify you of significant changes through the platform or via email.
            </p>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-number">04</span>
              <h2>Platform Usage</h2>
            </div>
            <div className="usage-grid">
              <div className="usage-item">
                <span className="usage-icon">🎯</span>
                <span>Discover and attend events</span>
              </div>
              <div className="usage-item">
                <span className="usage-icon">📅</span>
                <span>Create and manage events</span>
              </div>
              <div className="usage-item">
                <span className="usage-icon">🌐</span>
                <span>Connect with community</span>
              </div>
              <div className="usage-item">
                <span className="usage-icon">📊</span>
                <span>Access analytics and insights</span>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-number">05</span>
              <h2>Termination</h2>
            </div>
            <p>
              We reserve the right to suspend or terminate your access to EventMappr at any time, without notice, if we believe you have violated these Terms or applicable laws. You may also terminate your account at any time.
            </p>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-number">06</span>
              <h2>Governing Law</h2>
            </div>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. Any disputes will be resolved through binding arbitration or in competent courts.
            </p>
          </section>
        </div>

        <div className="contact-section">
          <div className="contact-card">
            <h3>Questions about our terms?</h3>
            <p>Our support team is ready to help clarify any questions you may have.</p>
            <a href="mailto:support@eventmappr.com" className="contact-button">
              <span>Contact Support</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terms-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .terms-page {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-section {
          text-align: center;
          padding: 3rem 2rem 2rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="90" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }

        .icon-wrapper {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .title {
          position: relative;
          z-index: 1;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }

        .subtitle {
          position: relative;
          z-index: 1;
          font-size: 1.125rem;
          opacity: 0.9;
          margin: 0 0 1.5rem 0;
          font-weight: 400;
        }

        .updated-badge {
          position: relative;
          z-index: 1;
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .content-grid {
          padding: 2rem;
        }

        .section {
          margin-top: -70px;
        }

        .section:last-child {
          margin-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .section-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          color: white;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .section p {
          font-size: 1rem;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        .responsibility-cards {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }

        .responsibility-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .responsibility-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .card-icon {
          font-size: 1.5rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .card-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .card-content p {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .usage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .usage-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          transition: all 0.2s ease;
        }

        .usage-item:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .usage-icon {
          font-size: 1.125rem;
        }

        .contact-section {
          padding: 2rem;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .contact-card {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border-radius: 20px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
        }

        .contact-card h3 {
          position: relative;
          z-index: 1;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .contact-card p {
          position: relative;
          z-index: 1;
          opacity: 0.9;
          margin: 0 0 1.5rem 0;
        }

        .contact-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .contact-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .terms-container {
            padding: 1rem 0.5rem;
          }

          .header-section {
            padding: 2rem 1rem 1.5rem;
          }

          .title {
            font-size: 2rem;
          }

          .content-grid {
            padding: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .responsibility-cards {
            grid-template-columns: 1fr;
          }

          .usage-grid {
            grid-template-columns: 1fr;
          }

          .contact-section {
            padding: 1.5rem;
          }

          .contact-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Terms;