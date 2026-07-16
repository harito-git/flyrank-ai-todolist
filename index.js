import express from 'express';
import path from 'path';
const PORT = 3000;
const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json' with {"type":"json"};
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let to_do_list = [{id: 1, title: 'Room Cleanup', done:false}, {id:2, title: 'Groceries', done:false}, {id:3, title:'Attend flyrank backend session', done:true}]

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
    let tasks_list = to_do_list.length;
    if(title_found === undefined){
        tasks_list+=1;
        to_do_list.push({id: tasks_list, title: title_to_string, done:false});
        const newTaskAdded = to_do_list.find((t) => t.title === title_to_string);
        return res.status(201).json(newTaskAdded);
    }
    else{
        return res.status(400).json("Bad request, please create a new task, title is missing or empty or already in tasks");
    }
});

//update tasks
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


//delete task
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
    console.log('Listening at http://localhost:3000/docs');
})

