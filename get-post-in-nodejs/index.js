const express=require('express');
const http=require('./module/http-route');

const app=express();
app.use(express.json())

app.use('/api/http', http);

const port=process.env.PORT || 3000 
app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})