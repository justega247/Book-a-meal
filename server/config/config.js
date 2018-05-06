require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEVELOPMENT_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DIALECT
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DIALECT
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
}
