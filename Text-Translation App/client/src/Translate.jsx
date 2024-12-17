import React, { useState } from 'react';
import languages from './data';

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("hi-IN");

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const handleTranslate = async () => {
    if (!fromText.trim()) return;
    setToText('Translating...');
    try {
      const response = await fetch(
        `http://localhost:5000/?text=${encodeURIComponent(fromText)}&source=${fromLang}&target=${toLang}`
      );
      if (!response.ok) {
        throw new Error("Translation request failed");
      }
      const data = await response.json();
      setToText(data.translatedText || "No translation available");
    } catch (error) {
      console.error("Error during translation:", error);
      setToText('Translation failed');
    }
  };

  return (
    <div className='App'>
      <img src='/banner.jpg' alt='Translate' />
      <div className='text-input'>
        <textarea
          placeholder='Enter text to translate'
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
        />
        <textarea
          readOnly
          placeholder='Translation'
          value={toText}
        />
      </div>
      <div className="language-select">
        <select
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={handleExchange}>~</button>
        <select
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="controls">
        <button className='btn' onClick={handleTranslate}>
          Translate
        </button>
      </div>
    </div>
  );
};

export default Translate;


