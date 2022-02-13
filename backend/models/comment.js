"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
					name: "userId",
				},
			});
			Comment.belongsTo(models.Post, {
				foreignKey: {
					allowNull: false,
					name: "postId",
				},
			});
		}
	}
	Comment.init(
		{
			userId: DataTypes.INTEGER.UNSIGNED,
			postId: DataTypes.INTEGER.UNSIGNED,
			content: DataTypes.STRING(600),
			attachment: DataTypes.STRING(800),
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
