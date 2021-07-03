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
    username: 'eofikimhuhceex',
    password: '30b4814635e3500b2f5fa84c51e6ab5766b85e8fe0ceaee3cffe5db63bea9eb2',
    database: 'df0agkkpr52712',
    host: 'ec2-50-16-196-238.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
};
