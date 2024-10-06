const { StatusCodes } = require("http-status-codes");
const { AirportRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepo = new AirportRepo();

async function createAirport(data) {
	try {
		const airport = await airportRepo.create(data);
		return airport;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot create a new Airport object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirport(id) {
	try {
		const airport = await airportRepo.get(id);
		return airport;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airport details you requested to get is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot fetch data of airport id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirports() {
	try {
		const airports = await airportRepo.getAll();
		return airports;
	} catch (error) {
		throw new AppError(
			"Cannot fetch data of airports",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}


async function updateAirport(id, data) {
	try {
		const airport = await airportRepo.update(id, data);
		return airport;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airport you requested to update is not present",
				error.statusCode
			);
		}

		throw new AppError(
			`Cannot fetch data of airport id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyAirport(id) {
	try {
		const res = await airportRepo.destroy(id);
		return res;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airport you requested to delete is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot delete airport with id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createAirport,
	getAirport,
	getAirports,
	destroyAirport,
	updateAirport
};
