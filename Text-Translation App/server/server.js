import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
 
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', async (req, res) => {
  try {
    const { text, source, target } = req.query;

    if (!text || !source || !target) {
      return res.status(400).send({ error: "Missing parameters" });
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const response = await fetch(url);
    const json = await response.json();

    const translatedText = json.responseData.translatedText || "No translation available";
    res.send({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
