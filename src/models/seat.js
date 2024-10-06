"use strict";
const { Model } = require("sequelize");
const { ENUM } = require("../utils/common");

const {BUSINESS,PREMIUM_ECONOMY,FIRST_CLASS,ECONOMY}=ENUM.SEAT_TYPE;
module.exports = (sequelize, DataTypes) => {
	class Seat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
      this.belongsTo(models.Airplane, {
			foreignKey: "airplaneId",
			onDelete: "CASCADE",
		});
		}
	}
	Seat.init(
		{
			row: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			col: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			airplaneId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM,
        values:[BUSINESS,PREMIUM_ECONOMY,FIRST_CLASS,ECONOMY],
				defaultValue:ECONOMY,
        allowNull:false
			},
		},
		{
			sequelize,
			modelName: "Seat",
		}
	);
	return Seat;
};
