"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			user_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				//if user is deleted, comments will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			post_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				//if post is deleted, comments will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Posts",
					key: "id",
				},
			},
			content: {
				type: Sequelize.STRING(600),
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
		await queryInterface.dropTable("Comments");
	},
};
