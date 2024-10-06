const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

// POST path:/api/v1/airports
router.post(
	"/",
	AirportMiddlewares.validateCreateRequest,
	AirportController.createAirport
);

// GET path:/api/v1/airports/id
router.get("/:id", AirportController.getAirport);

// GET path:/api/v1/airports
router.get("/", AirportController.getAirports);

// DELETE path:/api/v1/airports/id
router.delete("/:id", AirportController.destroyAirport);

//PUT path:/api/v1/airport/id
router.put("/:id", AirportController.updateAirport);


module.exports = router;
