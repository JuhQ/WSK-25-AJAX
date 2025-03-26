// vapaavalintainen expressjs server, jakaa staattisia tiedostoja
// voitte myös käyttää liveserveriä vscodessa

import express from 'express';

const app = express();

app.use('/t5', express.static('t5'));
app.use('/lib', express.static('lib'));

app.listen(3000, () => {
  console.log('server running http://localhost:3000');
});
