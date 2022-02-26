//--------------------------------------------------------
//        After creating DB
//--------------------------------------------------------

//--------------------------------------------------------
//        # using npm                                   --
//        npx sequelize-cli db:seed:all                 --
//        # using yarn                                  --
//        yarn sequelize-cli db:seed:all                --
//                                                      --
//--------------------------------------------------------

const bcrypt = require("bcrypt");
require("dotenv").config();
("use strict");

module.exports = {
	up(queryInterface) {
		return queryInterface.bulkInsert("Users", [
			{
				id: 1,
				username: "Groupomania",
				email: process.env.ADMIN_MAIL,
				password: bcrypt.hashSync(
					process.env.ADMIN_PASS,
					bcrypt.genSaltSync(10)
				),
				avatar: "http://localhost:3000/public/defaultPicture/random-user.png",
				job: "",
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down(queryInterface, Sequelize) {
		//  * Add commands to revert seed here.
		//  *
		//  * Example:
		return queryInterface.bulkDelete("Users", null, {});
	},
};
