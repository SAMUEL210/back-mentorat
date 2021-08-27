var express = require('express')
var bcrypt = require("bcrypt")
var utilisateurModel = require('../models/utilisateur')
var router = express.Router()

router.post("/", async(req, rep) => {
    let saltRounds = 10;
    let { body } = req;
    bcrypt.hash(body.mp, saltRounds, function(err, hash) {
        body.mp = hash
    })
    console.log(body.mp)
    try {
        var utilisateur = new utilisateurModel(body);
        await utilisateur.save();
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

module.exports = router;