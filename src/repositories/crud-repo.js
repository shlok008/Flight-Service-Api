const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepo {
	constructor(model) {
		this.model = model;
	}
	async create(data) {
		const res = await this.model.create(data);
		return res;
	}

	async destroy(data) {
		const res = await this.model.destroy({
			where: {
				id: data,
			},
		});
		if(!res){
			throw new AppError(
				"not able to find the resource",
				StatusCodes.NOT_FOUND
			);
		}
		return res;
	} 

	async get(data) {
		const res = await this.model.findByPk(data);
		if(!res){
			throw new AppError('not able to find the resource',StatusCodes.NOT_FOUND
			)
		}
		return res;
	}

	async getAll(data) {
		const res = await this.model.findAll(data);
		return res;
	}

	async update(id, data) {
		const res = await this.model.update(data, {
			where: {
				id: id,
			},
		});
		if(res[0]=== 0){
			throw new AppError(
				"not able to find the resource to update, check the id",
				StatusCodes.NOT_FOUND
			);
		}
		const updatedRes =await this.model.findByPk(id);
		return updatedRes;
	}
}

module.exports = CrudRepo;
