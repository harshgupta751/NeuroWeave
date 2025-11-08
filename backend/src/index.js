import express from 'express'
import cors from 'cors'
const app= express();

app.use(cors());

app.post('/', function(req, res){



})

app.listen(3000, ()=>{
console.log("Server is running on Port 3000");
});

