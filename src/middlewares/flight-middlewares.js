const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
	if (!req.body.airplaneId) {
		ErrorResponse.messsage = "Something went wrong while creating flight";
		ErrorResponse.error = {
			explanation:
				"airplaneId of flight is not found in the incoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.departureAirportId) {
		ErrorResponse.messsage = "Something went wrong while creating flight";
		ErrorResponse.error = {
			explanation:
				"departureAirportId of flight is not found in the incoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.arrivalAirportId) {
		ErrorResponse.messsage = "Something went wrong while creating flight";
		ErrorResponse.error = {
			explanation:
				"arrivalAirportId of flight is not found in the incoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}

function validateUpdateSeatsRequest(req,res,next){

	if (!req.body.seats) {
		ErrorResponse.messsage = "Something went wrong while updating flight";
		ErrorResponse.error = {
			explanation:
				"Seats is not found in the incoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}

module.exports = { validateCreateRequest,validateUpdateSeatsRequest };
