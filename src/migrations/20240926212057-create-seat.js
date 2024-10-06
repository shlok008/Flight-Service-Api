"use strict";
/** @type {import('sequelize-cli').Migration} */
const { ENUM } = require("../utils/common");

const { BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY } = ENUM.SEAT_TYPE;
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Seats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			row: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			col: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			airplaneId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Airplanes",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			type: {
				allowNull: false,
				type: Sequelize.ENUM,
				values: [BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY],
				defaultValue: ECONOMY,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Seats");
	},
};
