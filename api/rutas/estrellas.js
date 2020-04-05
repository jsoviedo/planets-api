const express = require('express');
const router = express.Router();

const starControllers = require('../controladores/estrellas'); //Controllers

//Endpoints 
router.get('/', starControllers.getStars);

router.get('/:id', starControllers.getStar);

router.patch('/:id', starControllers.updateStar);

router.post('/', starControllers.createStar);

router.delete('/:id', starControllers.deleteStar);

module.exports = router;