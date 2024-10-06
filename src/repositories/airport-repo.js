const CrudRepo = require("./crud-repo");
const { Airport } = require("../models");

class AirportRepo extends CrudRepo {
	constructor() {
		super(Airport);
	}
}

module.exports = AirportRepo;
