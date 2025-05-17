const dotenv=require('dotenv')
const { FRONTEND_URL } = require('../../../FoodComa-Backend/src/config/serverConfig')

dotenv.config()

module.exports={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    FRONTEND_URL:process.env.FRONTEND_URL
}
