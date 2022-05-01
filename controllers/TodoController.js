const db = require("../models");
const error = require("../helpers/ErrorMessage");
const Todo = db.todos;
const Op = db.Sequelize.Op;

module.exports = class TodoController{
    
    index(req, res){
        Todo.findAll()
            .then(
                (data)=>{ res.send(data); }
            )
            .catch(
                (err) => {
                    error(res, err.message || "Some error occured while retrieving todos" );
                }
            );
    }

    show(req, res){
        const id = req.params.id;
      
        Todo.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Todo with id=" + id
                });
            });
    }

    create(req, res){
        const todos = { 
            title : req.body.title,
            name: req.body.name
        }

        Todo.create(todos)
        .then( 
            (data) => {
                res.send(data);
            }
        )
        .catch(
            (err) => {
                error(res, err.message || "Some error occurred while creating the todo." );
            }
        );
    }

    delete(req, res){
        const id = req.params.id;
        console.log("Params id ---- ", req.params.id);
        Todo.destroy({ 
            where : { id : id }
            })
            .then(
                num => {
                    res.send(
                        {
                            message: num === 1 ? 
                                "Todo was deleted successfully!" :
                                `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                        }
                    );
                }
            )
            .catch(
                (err) => {
                    res.status(500).send({
                      message: "Could not delete Todo with id=" + id
                    });
                }
            );
    }

    update(req, res){
        const id = req.params.id;
      
        Todo.update(req.body, {
                        where: { id: id }
                    })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Todo was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Todo with id=" + id
                });
            });
    };
      
}//end of class TodoController