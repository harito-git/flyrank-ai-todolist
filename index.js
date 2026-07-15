import express from 'express';
import path from 'path';
const PORT = 3000;
const app = express();
app.use(express.json());

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
    res.json(to_do_list);
});

//stop googling, use your msucles and brain
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



app.listen(PORT, () => {
    console.log('Listening at http://localhost:3000');
})
