require("dotenv").config();

const PORT = process.env.PORT || 3001;

const MONGODB = process.env.MONGODB_URI;
const SECRET_AUTH = process.env.SECRET;
const MASTER_KEY = process.env.MASTER_KEY;

module.exports = { PORT, MONGODB, SECRET_AUTH, MASTER_KEY };
