// Create web server 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Set up the template engine
app.set('view engine', 'ejs');

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments
let comments = [];

// Read comments from file
fs.readFile('comments.json', (err, data) => {
  if (err) throw err;
  comments = JSON.parse(data);
});

// Render comments
app.get('/', (req, res) => {
  res.render('index', { comments: comments });
});

// Add comment
app.post('/addComment', (req, res) => {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    console.log('Comment saved!');
  });
  res.redirect('/');
});

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));