const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

let heroId = 21;

let heroes = [
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

app.use(bodyParser.json());

const findHeroByName = function (name) {
    return heroes.find(hero => hero.name === name);
};
const findHeroById = function (id) {
    return heroes.find(hero => hero.id === id);
};

app.get('/api/heroes', (req, res) => {
    const term = (req.query.q || '').toLowerCase();

    if (term) {
        return res.json(
            heroes.filter(hero => hero.name.toLowerCase().indexOf(term) !== -1)
        );
    } else {
        res.json(heroes);
    }
});

app.get('/api/hero/:heroId', (req, res) => {
    const heroId = +req.params.heroId;

    res.json(heroes.find(hero => hero.id === heroId));
});

app.post('/api/hero', (req, res) => {
    const name = req.body.name;

    if (findHeroByName(name)) {
        res.json({});
    } else {
        const hero = {
            id: ++heroId,
            name
        };
        heroes.push(hero);
        res.json(hero);
    }
});

app.put('/api/hero/:heroId', (req, res) => {
    const heroId = +req.params.heroId;
    const newHeroName = req.body.name;
    const matchHero = findHeroById(heroId);
    if (matchHero) {
        matchHero.name = newHeroName;
    } 
    res.json({});
});

app.delete('/api/hero/:heroId', (req, res) => {
    const heroId = +req.params.heroId;
    heroes = heroes.filter(hero => hero.id !== heroId);
    res.json({});
});

app.listen(3000, () => {
    console.log('Web API Server start up.');
});