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
    PASSWORD: "af08dd98c0c4c9910ccb9e51ae3d6280b1c244ec2eeb691b1df3fef1834f6f06",
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