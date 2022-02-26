//------------------------------------

# INSTALLATION

//------------------------------------
change password username and DB name in config.json before create DB

nmp install

# SEQUELIZE MIGRATION

BEFORE change password username and DB name in config.json

# using npm

npx sequelize-cli db:migrate

# using yarn

yarn sequelize-cli db:migrate

# SEEDERS (create user moderator)

❗ DON'T forget to change password and email address in .env.sample

# using npm

npx sequelize-cli db:seed:all

# using yarn

yarn sequelize-cli db:seed:all
//------------------------------------

# USAGE

//------------------------------------
npm start
