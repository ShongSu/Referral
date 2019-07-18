const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello World');
});


const issues = [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel',
  },
];

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  due: 'optional',
  title: 'required',
};


function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return `${field} is required                                                                                                          .`;
    }
  }

  if (!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status.`;

  return null;
}

app.get('/api/issues', (req, res) => {
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';

  const err = validateIssue(newIssue)
  if (err) {
    res.status(422).json({ message: `Invalid requrest: ${err}` });
    return;
  }
  issues.push(newIssue);

  res.json(newIssue);
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});