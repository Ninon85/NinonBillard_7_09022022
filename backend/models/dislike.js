"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Dislike extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Dislike.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});
			Dislike.belongsTo(models.Post, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	Dislike.init(
		{
			user_id: DataTypes.INTEGER.UNSIGNED,
			post_id: DataTypes.INTEGER.UNSIGNED,
			dislikes: DataTypes.INTEGER.UNSIGNED,
		},
		{
			sequelize,
			modelName: "Dislike",
		}
	);
	return Dislike;
};
