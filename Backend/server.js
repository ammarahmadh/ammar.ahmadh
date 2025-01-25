const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const port = 5500

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/ammarahmadh')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Server connected Successful")
})

const viewerSchema = new mongoose.Schema({
    name:String,
    email:String,
    massage:String
})

const viewers = mongoose.model("Massage",viewerSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'App.html'))
})



app.post('/post', async (req,res)=>{
    const {name,email,massage} = req.body
    const viewer = new viewers({
        name,
        email,
        massage
    })
    await viewer.save()
    console.log(viewer)
    return res.redirect('Hello.html')
})


app.listen(port,()=>{
    console.log("Server Started")
})

