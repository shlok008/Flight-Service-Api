const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

// POST path:/api/v1/cities
router.post(
	"/",
	CityMiddlewares.validateCreateRequest,
	CityController.createCity
);

// GET path:/api/v1/cities/id
router.get("/:id", CityController.getCity);

// GET path:/api/v1/cities
router.get("/", CityController.getCities);

// DELETE path:/api/v1/cities/id
router.delete("/:id", CityController.destroyCity);


//PUT path:/api/v1/cities/id
router.put("/:id", CityController.updateCity);

module.exports = router;
