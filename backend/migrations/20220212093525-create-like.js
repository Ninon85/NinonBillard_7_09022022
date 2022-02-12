"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Likes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			user_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				//if the reference (user) is deleted his likes will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			post_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				//if the reference (post) is deleted his likes will be deleted too
				onDelete: "CASCADE",
				references: {
					model: "Posts",
					key: "id",
				},
			},
			likes: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
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
		await queryInterface.dropTable("Likes");
	},
};
