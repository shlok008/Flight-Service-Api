const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
	if (!req.body.name) {
		ErrorResponse.messsage = "Something went wrong while creating city";
		ErrorResponse.error = {
			explanation:
				"City name not found in the oncoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}

module.exports = { validateCreateRequest };
