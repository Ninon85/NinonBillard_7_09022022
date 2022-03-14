"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
				//if the reference (user) is deleted his posts will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			content: {
				type: Sequelize.STRING(2000),
			},
			attachment: {
				type: Sequelize.STRING(800),
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
		await queryInterface.dropTable("Posts");
	},
};
