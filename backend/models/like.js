"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Like.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
					name: "userId",
				},
			});
			Like.belongsTo(models.Post, {
				foreignKey: {
					allowNull: false,
					name: "postId",
				},
			});
		}
	}
	Like.init(
		{
			userId: DataTypes.INTEGER.UNSIGNED,
			postId: DataTypes.INTEGER.UNSIGNED,
			likes: DataTypes.INTEGER.UNSIGNED,
		},
		{
			sequelize,
			modelName: "Like",
		}
	);
	return Like;
};
