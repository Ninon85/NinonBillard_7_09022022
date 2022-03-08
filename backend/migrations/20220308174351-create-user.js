"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING(50),
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING(255),
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			avatar: {
				type: Sequelize.STRING(800),
				defaultValue: "../public/defaultPicture/random-user.png",
			},
			job: {
				type: Sequelize.STRING(255),
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
