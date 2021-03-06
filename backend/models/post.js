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
			Post.hasMany(models.Comment, { onDelete: "cascade" });
			Post.hasMany(models.Like, { onDelete: "cascade" });
			Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
					name: "userId",
				},
			});
		}
	}
	Post.init(
		{
			userId: DataTypes.INTEGER.UNSIGNED,
			content: DataTypes.STRING(2000),
			attachment: DataTypes.STRING(800),
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
