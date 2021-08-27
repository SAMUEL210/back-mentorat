var express = require('express')
var bcrypt = require('bcrypt')
var utilisateurModel = require('../models/utilisateur')
var { createToken, checkToken } = require('../utilities/token')
var router = express.Router()


//POST tous les utlisateur http://hote:port/utilisateur
router.post("/", async(req, rep) => {
    let saltRounds = 10;
    let { body } = req;
    const hash = bcrypt.hashSync(body.mp, saltRounds);
    body.mp = hash
    console.log(hash)
    try {
        var utilisateur = new utilisateurModel(body);
        await utilisateur.save();
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

//GET tous les utlisateur http://hote:port/utilisateur/*
router.get("/", async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.find({});
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

//GET tous les utlisateur http://hote:port/utilisateur/:id
router.get("/:id", async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.find({ _id: req.params.id });
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});


//Suprimmer un utilisateur par son ID http://hote:port/utilisateurs/id
router.delete("/:id", async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.deleteOne({ _id: req.params.id });
        rep.send({ succes: "Ok" });
    } catch (e) {
        rep.send({ error: e.message });
    }
});
module.exports = router;