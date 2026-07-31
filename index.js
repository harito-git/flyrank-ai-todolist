//Step 1 - Import libraries 
//In PostgreSQL, import pg - postgresql with express js. Let's go!
import express from 'express';
import path from 'path';
import pg from 'pg';
const {Pool, Client} = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL

})
console.log('Check to make sure that the pool is running', pool);
const PORT = 3000;
const app = express();


//improt swagger ui and documentation.
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json' with {"type":"json"};

//Express needs this to parse JSON bodies and run.
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000;
app.use(express.json());
let tasks_list = 0;

//create table if it does not exists intially, stage 1. 
const database = pool.query('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY generated always as identity, title varchar(200), done bool)');
console.log(database.rows);

/*
const client = new Client({
    user: process.env.DATABASE_USER,
    host:5432,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD
})

*/

//use a transaction function, to insert the 3 tasks if the table is found to be empty. 
const insert_3_objects = async => {(objs) => {
    const count = pool.query('SELECT COUNT(*) as count from tasks');
    const counter = parseInt(count.rows[0].count, 10);
    console.log("The counter is", counter);
    if(counter === 0) {
        for(const obj of objs) 
            pool.query('INSERT or REPLACEinto tasks(id, title, done) VALUES ($1, $2, $3) RETURNING *'
            , [obj.id, obj.title, obj.done]);
        }
    }
};
    


//call seed tasks function.
insert_3_objects([
    {id: 1, title: 'Wash hands', done:0},
    {id: 2, title: 'Plan your schedule', done:0},
    {id: 3,title: 'Clean room', done:1}
]);


app.get('/', (req, res) => {
    res.json({name: "Task API", version:"1.0", endpoints:["/tasks"]});
});

//task 1
app.get('/health', (req, res) => {
    res.status(200).json({status:"ok"});
});









//Stage 1: Get requests, read, give me the lsit of all tasks and read them from the database. 
app.get('/tasks', async(req, res) => {
    const task_string = 'SELECT * from tasks';
    const run_query = await pool.query(task_string);
    console.log('Here are the rows, ', run_query.rows);


    if(res.rows !== undefined) {
        return res.status(400).json('error, task lsits is empty');
    }
    else {
        return res.status(200).json(run_query.rows);
    }


});

//Stage 1: Read one task by id from the databsase. Need async/await since we need tor etireve data froma databse and query it.
app.get('/tasks/:id', async(req, res) => {
    //get id from parameters
    const urlID = req.params.id;
    //parseInt() function covnerts a string to an integer
    const id_to_integer = parseInt(urlID, 10);
    //find an integer
    //the concept of prepared staements
    const query_database = {
        text: 'SELECT * from tasks where id = $1',
        values: [id_to_integer]
    };
    const found_number = await pool.query(query_database);
    if(found_number.rows !== undefined){
        console.log(found_number);
        return res.status(200).json(found_number.rows);


    }
    else{
        console.log('URL ID is ', urlID);
        return res.status(404).json(`{error: Task ${urlID} not found`);
        
    }
})

//checkpoint 2: add tasks to database. 
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const title_to_string = String(title);
    const title_found = db.prepare('SELECT title from tasks where title = ?');
    const find_title = title_found.get(title_to_string);
    const find_total_number_of_items = db.prepare('SELECT COUNT(title) from tasks');
    const number_of_items = find_total_number_of_items.get();
    tasks_list = Math.max(find_total_number_of_items, tasks_list);
    if(find_title === undefined){
        const added_query = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
        const newtask = added_query.run(title, 0);
        tasks_list+=1;
        const added_new_task = db.prepare('SELECT * from tasks where title = ?');
        const new_titles = added_new_task.get(title_to_string);
        return res.status(201).json(new_titles);
    }
    else{
        return res.status(400).json("Bad request, please create a new task, title is missing or empty or already in tasks");
    }
});

//checkpoint 3: update tasks in database.
app.put('/tasks/:id', (req, res) => {
    const {title, done} = req.body;
    const title_to_string = String(title);
    const urlID = req.params.id;
    const done_to_boolean = Number(done); 
     //parseInt() function covnerts a string to an integer
     const id_to_integer = parseInt(urlID, 10);
     //find an integer
     const title_found = db.prepare('SELECT id from tasks where id = ?');
     const find_title = title_found.get(id_to_integer);
     


     //check for id in put request to update title and done
    if(find_title !== undefined && (title_to_string !== undefined || done_to_boolean !== undefined)){
        const update_tasks = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?');
        const update_new_tasks = update_tasks.run(title_to_string, done_to_boolean, id_to_integer);
        console.log(update_new_tasks.changes);
        return res.status(201).json(update_new_tasks);
    }
    else if(find_title !== undefined && (title_to_string === undefined || done_to_boolean === undefined)){
        return res.status(400).json('Empty/invalid body, cannot update task.');
    }
    else if(find_title === undefined){
        return res.status(404).json('Error 404, unknown id, not found in to-do list.');
    }
});


//checkpioint 4: delete task from the database.
app.delete('/tasks/:id', (req, res) => {
    //get id from parameters
    const urlID = req.params.id;
    //parseInt() function covnerts a string to an integer
    const id_to_integer = parseInt(urlID, 10);
    const find_task_to_delete = db.prepare('SELECT id from tasks where id = ?');
    const find_task_to_delete_get = find_task_to_delete.get(id_to_integer);
    if(find_task_to_delete !== undefined){
        //parseInt() function covnerts a string to an integer
        const delete_task = db.prepare('DELETE FROM tasks WHERE id = ?');
        const run_tasks = delete_task.run(id_to_integer);
        return res.status(204).json('No Content');
    }
    else{
        return res.status(404).json('Unknown, no id is not found.');
    }
})

//run the API on the server and lsiten on the port. 
app.listen(PORT, () => {
    console.log('Listening at http://localhost:3000');
});
