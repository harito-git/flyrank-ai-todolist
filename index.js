import express from 'express';
import path from 'path';
const PORT = 5001;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json('Ok, the server works fine');
})


app.listen(PORT, () => {
    console.log('Listening at http://localhost:5001');
})
