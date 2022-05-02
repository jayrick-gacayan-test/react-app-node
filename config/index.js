module.exports = {
    HOST: "localhost",
    USER: "kk40",
    PASSWORD: "123",
    DATABASE: "test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};