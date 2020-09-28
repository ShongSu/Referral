const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb')
const Issue = require('./issue.js');              

app.use(express.static('public'));
app.use(bodyParser.json());


// const url = 'mongodb://localhost/issuetracker';
// let db;

// async function connectToDb() {
//   const client = new MongoClient(url, { useNewUrlParser: true });
//   await client.connect();
//   console.log('Connected to MongoDB at', url);
//   db = client.db();
// }

// app.get('/hello', (req, res) => {
//   res.send('Hello World');
// });

// app.get('/api/issues', (req, res) => {
//   db.collection('issues').find().toArray().then(issues => {
//     const metadata = { total_count: issues.length };
//     res.json({ _metadata: metadata, records: issues })
//   }).catch(error => {
//     console.log(error);
//     res.status(500).json({ message: `Internal Server Error: ${error}` });
//   });
// });

// async function getNextSequence(name) {
//   const result = await db.collection('counters').findOneAndUpdate(
//     { _id: name },
//     { $inc: { current: 1 } },
//     { returnOriginal: false },
//   );
//   return result.value.current;
// }

// app.post('/api/issues', async (req, res) => {
//   const newIssue = req.body;

//   newIssue.id = await getNextSequence('issues');
//   console.log(newIssue.id);

//   newIssue.created = new Date();
//   if (!newIssue.status)
//     newIssue.status = 'New';

//   const err = Issue.validateIssue(newIssue)
//   if (err) {
//     res.status(422).json({ message: `Invalid requrest: ${err}` });
//     return;
//   }
//   const result = await db.collection('issues').insertOne(newIssue);
//   const savedIssue = await db.collection('issues')
//     .findOne({ _id: result.insertedId });
//   res.json(savedIssue);
// });

(async function () {
  try {
    // await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
