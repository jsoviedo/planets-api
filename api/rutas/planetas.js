const express = require('express');
const router = express.Router();

const planetControllers = require('../controladores/planetas'); //Controllers


//Endpoints 
router.get('/', planetControllers.getPlanets);

router.get('/:id', planetControllers.getPlanet);

router.patch('/:id', planetControllers.updatePlanet);

router.post('/', planetControllers.createPlanet);

router.delete('/:id', planetControllers.deletePlanet);

module.exports = router;