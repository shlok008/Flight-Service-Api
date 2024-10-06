const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

// POST path:/api/v1/flights
router.post(
	"/",
	FlightMiddlewares.validateCreateRequest,
	FlightController.createFlight
);

// GET path:/api/v1/flights/id
router.get("/:id", FlightController.getFlight);

// GET path:/api/v1/flights?trip=DEL-MUM
router.get("/", FlightController.getAllFlights);

// GET path:/api/v1/flights
router.get("/", FlightController.getFlights);

// DELETE path:/api/v1/flights/id
router.delete("/:id", FlightController.destroyFlight);

//PUT path:/api/v1/flights/id
router.put("/:id", FlightController.updateFlight);

//PATCH path:/api/v1/flights/seats
router.patch("/:id/seats", FlightMiddlewares.validateUpdateSeatsRequest,FlightController.updateSeats);


module.exports = router;
