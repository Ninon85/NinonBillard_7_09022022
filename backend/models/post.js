"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Post.hasMany(models.Comment, {
				foreignKey: {
					allowNull: false,
					onDelete: "cascade",
				},
			});
			models.Post.hasMany(models.Like, {
				foreignKey: {
					allowNull: false,
					onDelete: "cascade",
				},
			});
			models.Post.hasMany(models.Dislike, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "cascade",
			});
			Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	Post.init(
		{
			user_id: DataTypes.INTEGER.UNSIGNED,
			content: DataTypes.STRING(1000),
			attachment: DataTypes.STRING(800),
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
