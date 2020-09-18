require('dotenv').config({ path: './config/.env' });
const config = module.exports;

config.database = {
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'matcha',
    password: process.env.DB_PWD || ''
}

config.express = {
    port: process.env.PORT || 5000,
    ip: process.env.IP || 'localhost'
}

config.email = {
    address: process.env.EMAIL,
    password: process.env.EMAIL_PWD
}

config.jwtSecret = process.env.JWT_SECRET

config.google = {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET
}

config.ipstack = process.env.IPSTACK;
