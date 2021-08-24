const express = require('express')
const mongoose = require('mongoose')
var cors = raquire('cors')
require('dotenv').config()

var app = express()

mongoose.Promise = Promise
mongoose.connect(process.env.bd_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
var bd = mongoose.connection

bd.on('error', console.error.bind(console, "ERREUR CONNECTION : "))
bd.once('open', () => consele.log('STATUT BD : ', bd.states[bd._readyStates]))


app.use(express.JSON)
app.user(cors({ origin: '*', exposedHeaders: 'authorization' }))



const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur en cour sur " + HOST + ":" + PORT);
})