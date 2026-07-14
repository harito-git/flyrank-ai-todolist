import express from 'express';
import path from 'path';
const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({name: "Task API", version:"1.0", endpoints:["/tasks"]});
});

app.get('/health', (req, res) => {
    res.status(200).json({status:"ok"});
})


app.listen(PORT, () => {
    console.log('Listening at http://localhost:3000');
})
