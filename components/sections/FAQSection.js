
import React, {useState} from "react";
import Link from "next/link";
import {Plane, Send, SendIcon} from "lucide-react";


const FAQSection = () => {
  const faqs = [
    {
      question: "What is EventMappr?",
      answer:
        "EventMappr is an interactive map-based platform that helps you discover and share local community events happening around you.",
    },
    {
      question: "How do I add an event to the map?",
      answer:
        "Simply click on the location on the map where your event will take place, and fill out the event details in the form that appears.",
    },
    {
      question: "Is EventMappr free to use?",
      answer:
        "Yes, EventMappr is completely free for both event organizers and attendees.",
    },
    {
      question: "Can I filter events by category?",
      answer:
        "Absolutely! You can filter events by various categories like Music, Tech, Volunteering, Markets, and Art events.",
    },
    {
      question: "Does EventMappr work on mobile devices?",
      answer:
        "Yes, EventMappr is fully responsive and works great on smartphones, tablets, and desktop computers.",
    },
    {
      question: "How accurate is the location data?",
      answer:
        "Our location data is based on OpenStreetMap, providing accurate geolocation for all events. You can also manually adjust the pin location when adding an event.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Find answers to common questions about EventMappr
        </p>

        <div className="faq-container">
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                key={index}
              >
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span className="question-text">{faq.question}</span>
                  <span className="faq-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={activeIndex === index ? "M4 8H12" : "M4 8H12M8 4V12"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-get-in-touch">
          <div className="faq-get-in-touch-left">
            <img
              src="https://www.blogsaays.com/wp-content/uploads/2022/11/android-gif-banner-2.gif"
              alt="Get in Touch"
              className="get-in-touch-illustration"
            />
          </div>
          <div className="faq-get-in-touch-right">
            <h3 className="get-in-touch-title">Still Questions?</h3>
            <form
              className="get-in-touch-form"
              onSubmit={(e) => {
                e.preventDefault(); /* handle form submit here */
              }}
            >
              <input
                type="text"
                className="get-in-touch-input"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                className="get-in-touch-input"
                placeholder="Email Address"
                required
              />
              <textarea
                className="get-in-touch-input"
                placeholder="Type your Message"
                required
                rows={3}
              />
              <button type="submit" className="get-in-touch-send-btn">
                <span className="send-label">
                  Send
                  <span className="send-icon">
                    <SendIcon size={20} color="#000" />
                  </span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-get-in-touch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          margin-top: 3rem;
          background: var(--background-alt, #181b2a);
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
          padding: 2.5rem 2rem;
        }
        :global(body.light) .faq-get-in-touch {
          background: #fff !important;
        }
        .get-in-touch-title {
          font-size: 2.4rem;
          font-weight: 900;
          margin-bottom: 1.2rem;
          background: linear-gradient(90deg, #b16cea 0%, #ff5e69 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .get-in-touch-input {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border-radius: 8px;
          border: none
          outline: none;
          background: var(--input-bg);
          color: var(--input-color);
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }

        .faq-get-in-touch-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
        }
        .get-in-touch-illustration {
          max-width: 320px;
          width: 100%;
          height: 340px;
          min-height: 220px;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          background: #fff;
          object-fit: cover;
        }
        .faq-get-in-touch-right {
          flex: 1;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .get-in-touch-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          color: #fff;
        }
        .get-in-touch-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        :global(body.light) .get-in-touch-form {
          background: #ffffff !important;
          color: #181b2a !important;
          border: 1px solid #e0e6ed;
        }

        .get-in-touch-send-btn {
          width: 100%;
          padding: 0.9rem 1.2rem;
          background: linear-gradient(90deg, #b16cea 0%, #ff5e69 100%);
          color: #fff;
          font-weight: 600;
          font-size: 1.15rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: background 0.2s;
        }
        .get-in-touch-send-btn:hover {
          background: linear-gradient(90deg, #ff5e69 0%, #b16cea 100%);
        }
        .send-icon {
          font-size: 1.3em;
        }
        @media (max-width: 900px) {
          .faq-get-in-touch {
            flex-direction: column;
            padding: 2rem 1rem;
            gap: 1.5rem;
          }
          .faq-get-in-touch-left,
          .faq-get-in-touch-right {
            min-width: 0;
            width: 100%;
          }
          .get-in-touch-illustration {
            max-width: 100%;
          }
        }

        .faq-section {
          padding: 5rem 0;
          background: linear-gradient(to left, var(--contrast1), var(--contrast2), var(--contrast3));
          position: relative;
          overflow: hidden;
        }

        .section-title {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 2.2rem;
          position: relative;
          color: var(--text);
        }

        .section-title:after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--primary),
            var(--primary-light)
          );
          border-radius: 2px;
        }

        .section-subtitle {
          text-align: center;
          max-width: 600px;
          margin: 1.5rem auto 3rem;
          color: var(--text-light);
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .faq-grid {
          display: grid;
          // grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /*this vreating error */
          gap: 1.5rem;
        }

        .faq-item {
          background-color: var(--background);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(var(--primary-rgb), 0.08);
        }

        .faq-item:hover {
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .faq-item.active {
          box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.15);
          border-color: rgba(var(--primary-rgb), 0.2);
        }

        .faq-question {
          padding: 1rem 1.25rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
          color: var(--text);
          position: relative;
          z-index: 2;
        }

        .faq-item.active .faq-question {
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
        }

        .question-text {
          font-size: 1rem;
          padding-right: 1rem;
        }

        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .faq-item.active .faq-answer {
          max-height: 200px;
          padding: 0.75rem 1.25rem 1.25rem;
        }

        .faq-answer p {
          margin: 0;
          color: var(--text-light);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .faq-cta {
          text-align: center;
          margin-top: 8rem;
        }

        .faq-cta p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: var(--text-light);
        }

        .bubble-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1.25rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
          text-decoration: none;
          border: none;
        }

        .primary-bubble {
          background: linear-gradient(
            135deg,
            var(--primary),
            var(--primary-dark)
          );
          color: white;
          box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.3);
        }

        .bubble-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 50%
          );
          transform: translateX(-100%) rotate(45deg);
          transition: transform 0.6s ease;
          z-index: -1;
        }

        .bubble-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(var(--primary-rgb), 0.4);
        }

        .bubble-btn:hover::before {
          transform: translateX(100%) rotate(45deg);
        }

        .btn-icon {
          margin-right: 0.35rem;
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .bubble-btn:hover .btn-icon {
          transform: scale(1.05);
        }

        .btn-text {
          position: relative;
        }

        .btn-text::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .bubble-btn:hover .btn-text::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 1.8rem;
          }
        }

        .get-in-touch-send-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem; /* space between text and icon */
          padding: 0.6rem 1.2rem;
          border: none;
          background: var(--primary);
          color: white;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .get-in-touch-send-btn:hover {
          background: var(--primary-dark);
        }

        .send-label {
          display: inline-flex;
          align-items: center;
        }

        .send-icon {
          display: inline-flex;
          margin-left: 0.4rem;
          position: relative;
          top: 1px; /* adjust vertically if needed */
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
