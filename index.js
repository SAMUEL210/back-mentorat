const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()

var entrepriseRouter = require('./routers/entreprises')
var utilisateurRouter = require('./routers/utilisateurs')
var loginRouter = require('./routers/login')


var app = express()

mongoose.Promise = Promise
mongoose.connect(process.env.bd_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
var bd = mongoose.connection

bd.on('error', console.error.bind(console, "ERREUR CONNECTION : "))
bd.once('open', () => console.log("STATUS_BD : ", bd.states[bd._readyState]))


app.use(express.json())
app.use(cors({ origin: '*', exposedHeaders: 'authorization' }))

app.use('/entreprises', entrepriseRouter)
app.use('/utilisateurs', utilisateurRouter)
app.use('/login', loginRouter)

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur en cour sur " + HOST + ":" + PORT);
})