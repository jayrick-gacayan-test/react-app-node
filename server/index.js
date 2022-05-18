const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

let corsOption = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded(
        { extended: true }
    )
);

app.use(
    express.static(path.resolve(__dirname, "../../react-app-with-backend/build"))
);

const db = require("../models");


const TodoController = require("../controllers/TodoController");
//db.sequelize.sync({ force: false });

const PORT = process.env.PORT || 3001;



app.get(
    "/api/hello",
    (req, res) => {
        res.json({
            message: "Hello from express"
        });
    }
);

app.get("/api",
    (req, res) => {
        console.log("Test");
        res.send("test");
        
    }
);

app.get('/api/todos',
    new TodoController().index
);

app.post('/api/todos/create',
    new TodoController().create
);

app.delete('/api/todos/:id',
    new TodoController().delete
);

app.get('/api/todos/:id',
    new TodoController().show
);

app.put('/api/todos/:id',
    new TodoController().update
);

app.listen(
    PORT,
    () => {
        console.log(`Server listening on ${ PORT }`);
    }
);