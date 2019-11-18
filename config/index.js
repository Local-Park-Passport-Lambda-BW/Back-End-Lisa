const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const port = process.env.PORT || 4400

module.exports = {
    env,
    port,
    pgdburl: process.env.DATABASE_URL,
    origin: [
        'http://localhost:3000'
    ]
}