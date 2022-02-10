"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Dislikes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			user_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				//if the reference (user) is deleted his dislikes will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			post_id: {
				type: Sequelize.INTEGER,
				//if the reference (post) is deleted his dislikeS will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Posts",
					key: "id",
				},
			},
			dislikes: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.INTEGER.UNSIGNED,
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
		await queryInterface.dropTable("Dislikes");
	},
};
