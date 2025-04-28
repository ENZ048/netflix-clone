const express = require('express');
const app = express();

app.use('/api/v1/auth', authRoutes);

app.listen(4848, (err)=> {
    if(err){
        console.log("Error listening to the server", err);
    }
    else{
        console.log("Listening to the server at 4848");
    }
})