const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000; // Fixed port number

app.get('/read-csv', (req, res) => {
  const results = [];
  let rowCount = 0;

  fs.createReadStream('tweets.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (rowCount < 5000) {
        results.push(data);
        rowCount++;
      }
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      res.status(500).send('Error reading the CSV file');
    });
});

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
