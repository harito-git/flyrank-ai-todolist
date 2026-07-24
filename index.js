const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

//create database, databse is our object, taks.db is where our database, your data live sin a fiel called tasks.db.
const Database = require('better-sqlite3');
const db = new Database('tasks.db');
const port = 3000;

db.exec('CREATE TABLE IF NOT EXISTS tasks(id integer primary key, title varchar(200), done bool)');

const insert = db.prepare('INSERT OR REPLACE into tasks(id, title, done) values (@id, @title, @done)');

//sue a transaction function
const insert_3_objects = db.transaction((objs) => {
    for(const obj of objs) 
        insert.run(obj);
})

insert_3_objects([
    {id: 1, title: 'Wash hands', done:'false'},
    {id:2, title: 'Plan your schedule', done:'false'},
    {id:3, title: 'Clean room', done:'true'}
]);
console.log(insert_3_objects);

app.get('/', (req, res) => {
    res.json({name: "Task API", version:"1.0", endpoints:["/tasks"]});
});

//task 1
app.get('/health', (req, res) => {
    res.status(200).json({status:"ok"});
});



//Get tasks api endpoint crud task 2
//get all tasks

app.get('/tasks', (req, res) => {
    const tasks = JSON.stringify(to_do_list);
    res.status(200).json(to_do_list);
});

//First task
app.get('/tasks/:id', (req, res) => {
    //get id from parameters
    const urlID = req.params.id;
    //parseInt() function covnerts a string to an integer
    const id_to_integer = parseInt(urlID, 10);
    //find an integer
    const found = to_do_list.find((n) => n.id === id_to_integer);
    if(found !== undefined){
        res.status(200).json(found);

    }
    else{
        console.log('URL ID is ', urlID);
        return res.status(404).json("{error: Task ${id} not found");
        
    }
})

//checkpoint 2: add tasks
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const title_to_string = String(title);
    const title_found = to_do_list.find((t)=> t.title === title_to_string);
    let tasks_list = Math.max(to_do_list.length, tasks_list);
    if(title_found === undefined){
        to_do_list.push({id: tasks_list, title: title_to_string, done:false});
        tasks_list+=1;
        const newTaskAdded = to_do_list.find((t) => t.title === title_to_string);
        return res.status(201).json(newTaskAdded);
    }
    else{
        return res.status(400).json("Bad request, please create a new task, title is missing or empty or already in tasks");
    }
});

//checkpoint3: update tasks
app.put('/tasks/:id', (req, res) => {
    const {title, done} = req.body;
    const title_to_string = String(title);
    const urlID = req.params.id;
    const done_to_boolean = Boolean(done); 
     //parseInt() function covnerts a string to an integer
     const id_to_integer = parseInt(urlID, 10);
     //find an integer
     const found = to_do_list.find((n) => n.id === id_to_integer);


     //check for id in put request to update title and done
    if(found !== undefined && title !== undefined && done !== undefined){
        found.title = String(title);
        found.done = Boolean(done);
        return res.status(201).json(found);
    }
    else if(found !== undefined & (title === undefined || done === undefined)){
        return res.status(400).json('Empty/invalid body, cannot update task.');
    }
    else if(found === undefined){
        return res.status(404).json('Error 404, unknown id, not found in to-do list.');
    }
});


//checkpioint 4: delete task
app.delete('/tasks/:id', (req, res) => {
   //get id from parameters
   const urlID = req.params.id;
   //parseInt() function covnerts a string to an integer
   const id_to_integer = parseInt(urlID, 10);
   //find an integer
   const found = to_do_list.find((n) => n.id === id_to_integer);
   if(found !== undefined){
        const index_to_be_removed = to_do_list.indexOf(found);
        to_do_list.splice(index_to_be_removed, 1);
        return res.status(204).json('No Content');

   } 
   else{
        return res.status(404).json('Try again, unknown id.');
   }
})


app.listen(PORT, () => {
    console.log('Listening at http://localhost:3000');
});
