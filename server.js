const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const firebase = require('./controllers/FirebaseUtils');
const sendEmail = require('./controllers/SendEmail');

const app = express();


const buildPath = path.join(__dirname, '..', 'build');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(buildPath));

app.get('/', (req, res) => {res.send('it is working!!');});

app.get('/lessons', (req, res) => {firebase.retrieveLessons(req, res)});

app.post('/send', (req, res) => {sendEmail.handleEmailSend(req, res)});

app.listen(3001, () => {
    console.log('server is running on port 3001');
})