const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
 * POST:/flights
 * req.body{name:'IGI',cityId:5,code:'DEL'}
 */

async function createFlight(req, res) {
	try {
		const flight = await FlightService.createFlight({
			flightNumber:req.body.flightNumber,
			airplaneId: req.body.airplaneId,
			departureAirportId: req.body.departureAirportId,
			arrivalAirportId: req.body.arrivalAirportId,
			departureTime: req.body.departureTime,
			arrivalTime: req.body.arrivalTime,
			price:req.body.price,
			boardingGate:req.body.boardingGate,
			totalSeats:req.body.totalSeats

		});
		SuccessResponse.data = flight;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/*
 * GET:/flight/:id
 * req.body{}
 */

async function getFlight(req, res) {
	try {
		const flight = await FlightService.getFlight(req.params.id);
		SuccessResponse.data = flight;
		console.log(flight);
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getFlights(req, res) {
	try {
		const flights = await FlightService.getFlights();
		SuccessResponse.data = flights;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/*
 * DELETE:/flights/:id
 * req.body{}
 */

async function destroyFlight(req, res) {
	try {
		const flight = await FlightService.destroyFlight(req.params.id);
		SuccessResponse.data = flight;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function updateFlight(req, res) {
	try {
		const flight = await FlightService.updateFlight(
			req.params.id,
			req.body
		);
		SuccessResponse.data = flight;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res
			.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
			.json(ErrorResponse);
	}
}

async function getAllFlights(req, res) {
	try {
		const flights = await FlightService.getAllFlights(req.query);
		SuccessResponse.data = flights;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function updateSeats(req,res) {
	try{
		const result=await FlightService.updateSeats({
			flightId:req.params.id,
			seats:req.body.seats,
			dec:req.body.dec
		});
		SuccessResponse.data=result;
		return res.status(StatusCodes.OK).json(SuccessResponse);
	}catch(error){
		ErrorResponse.error = error;
		return res
			.status(error.statusCode)
			.json(ErrorResponse);
	}
}


module.exports = {
	createFlight,
	getFlight,
	getFlights,
	getAllFlights,
	destroyFlight,
	updateFlight,
	updateSeats
};
