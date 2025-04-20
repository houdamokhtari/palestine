const express = require('express');
const bodyParser =require( 'body-parser');
const askPalestine =require( './routes/routes/ask-palestine.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // مجلد يحتوي على HTML و JS
app.use('/api/ask-palestine', askPalestine);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
