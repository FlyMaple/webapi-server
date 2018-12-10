const express = require('express');
const cors = require('cors');
const app = express();
const bodyParse = require('body-parser');

const heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
    { id: 21, name: 'Skye' },
];

app.use(cors({
    origin: '*',
    credentials: false,
}));

// app.use(bodyParse({
//     type: ''
// }));

app.get('/api/heroes', (req, res) => {
    res.json(heroes);
});

app.get('/api/hero/:heroId', (req, res) => {
    const heroId = +req.params.heroId;

    res.json(heroes.find(hero => hero.id === heroId));
});

app.listen(3000, () => {
    console.log('Web API Server start up.');
});