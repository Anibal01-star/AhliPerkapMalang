import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import businessConfig from '../config/business.js';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!businessConfig.faq || businessConfig.faq.length === 0) return null;

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Pertanyaan Umum</h2>
          <p>Jawaban untuk pertanyaan yang sering diajukan</p>
        </div>

        <div className="faq-list">
          {businessConfig.faq.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {item.question}
                <ChevronDown size={18} />
              </button>
              {openIndex === index && (
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
