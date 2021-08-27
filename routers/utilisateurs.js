var express = require('express')
var { utilisateurModel } = require('../models/utilisateur')
var { createToken, checkToken } = require('../utilities/token')
var router = express.Router()

//GET tous les utlisateur http://hote:port/entreprise/*
router.get("/", async(req, rep) => {
    try {
        var utilisateur = new utilisateurModel.find({});
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

//GET tous les utlisateur http://hote:port/entreprise/:id
router.get("/:id", async(req, rep) => {
    try {
        var utilisateur = new utilisateurModel.find({ _id: req.params.id });
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

module.exports = router;