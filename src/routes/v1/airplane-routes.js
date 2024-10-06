const express=require('express');
const { AirplaneController } = require('../../controllers');
const {AirplaneMiddlewares} = require('../../middlewares')

const router = express.Router();

// POST path:/api/v1/airplanes
router.post('/',AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);
    
// GET path:/api/v1/airplanes/id
router.get('/:id',AirplaneController.getAirplane)

// GET path:/api/v1/airplanes
router.get('/',AirplaneController.getAirplanes)

// DELETE path:/api/v1/airplanes/id
router.delete('/:id',AirplaneController.destroyAirplane)

//PUT path:/api/v1/airplanes/id
router.put("/:id", AirplaneController.updateAirplane);


module.exports=router;