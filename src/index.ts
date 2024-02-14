// server/src/index.ts
import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Bridge Robot Server');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
