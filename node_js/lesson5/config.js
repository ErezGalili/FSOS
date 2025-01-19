require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'mysecret',
    jwtExpireTime: process.env.JWT_EXPIRE_TIME || '24h',
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',
    mongoOptions: {
        serverApi: { version: '1', strict: true, deprecationErrors: true }
    }
};

module.exports = config;
