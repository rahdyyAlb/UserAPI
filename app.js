const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const dotenv = require('dotenv');
const userAPIRoute = require('./rootes/userAPIRoute');
const app = express();

dotenv.config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/user',userAPIRoute)

mongoose.connect(process.env.Mongo_Connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(8090, () => {
    console.log('Serveur démarré sur le port 8090');
});