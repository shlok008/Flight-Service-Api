const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
 * POST:/airplanes
 * req.body{modelNumber:'vistaraABC',capacity:120}
 */

async function createAirplane(req, res) {
	try {
		const airplane = await AirplaneService.createAirplane({
			modelNumber: req.body.modelNumber,
			capacity: req.body.capacity,
		});
		SuccessResponse.data=airplane;
        return res.status(StatusCodes.CREATED)
        .json(SuccessResponse)
	} catch (error) {
		ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
 * GET:/airplanes/:id
 * req.body{}
 */

async function getAirplane(req, res) {
	try {
		const airplanes = await AirplaneService.getAirplane(req.params.id);
		SuccessResponse.data = airplanes;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getAirplanes(req,res){
	try {
		const airplanes= await AirplaneService.getAirplanes();
		SuccessResponse.data=airplanes;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error=error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/*
 * DELETE:/airplanes/:id
 * req.body{}
 */

async function destroyAirplane(req, res) {
	try {
		const airplanes = await AirplaneService.destroyAirplane(req.params.id);
		SuccessResponse.data = airplanes;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/*
 * PUT:/airplanes/:id
 * req.body {modelNumber: 'newModel', capacity: 150}
 */

async function updateAirplane(req,res) {
	try {
		const airplane = await AirplaneService.updateAirplane(
			req.params.id,
			req.body
		);
		SuccessResponse.data = airplane;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
	}
}

module.exports = { createAirplane, getAirplane, getAirplanes,destroyAirplane,updateAirplane };