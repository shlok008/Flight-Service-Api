const { StatusCodes } = require("http-status-codes");
const { CityRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepo = new CityRepo();

async function createCity(data) {
	try {
		const city = await cityRepo.create(data);
		return city;
	} catch (error) {
		if (
			error.name === "SequelizeUniqueConstraintError" ||
			error.name === "SequelizeValidationError"
		) {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot create a new City object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getCity(id) {
	try {
		const city = await cityRepo.get(id);
		return city;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The city you requested to get is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot fetch data of city id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getCities() {
	try {
		const cities = await cityRepo.getAll();
		return cities;
	} catch (error) {
		throw new AppError(
			"Cannot fetch data of cities",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function updateCity(id, data) {
	try {
		const city = await cityRepo.update(id, data);
		return city;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The city you requested to update is not present",
				error.statusCode
			);
		}

		throw new AppError(
			`Cannot fetch data of city id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyCity(id) {
	try {
		const res = await cityRepo.destroy(id);
		return res;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The city you requested to delete is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot delete city with id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createCity,
	getCity,
	getCities,
	updateCity,
	destroyCity,
};
