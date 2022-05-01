module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull : false
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
  
    return Todo;
};