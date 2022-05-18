module.exports = {
  development: {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123",
    DATABASE: "test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    HOST: "ec2-44-195-169-163.compute-1.amazonaws.com",
    USER: "iqnxeoldobxprt",
    PASSWORD: "123",
    DATABASE: "d83a54g70ldnl1",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  
};