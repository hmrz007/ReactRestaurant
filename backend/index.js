const mongoDB=require("./db")
const express = require('express')
const app = express()
const cors = require("cors");
app.use(cors());
const port = 3001
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

mongoDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use(express.json())

// Create User request
app.use('/api',require("./Routes/CreateUser"))

//Display data
app.use('/api',require("./Routes/DisplayData"))

app.use('/api',require("./Routes/OrderData"))








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})