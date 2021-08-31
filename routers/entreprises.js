var express = require('express')
var entrepriseModel = require('../models/entreprise')
var { createToken, checkToken } = require('../utilities/token')
var router = express.Router()

//Ajouter une entreprise http://hote:port/entreprises/
router.post("/", async(req, rep) => {
    let { body } = req;
    try {
        var entreprise = new entrepriseModel(body);
        await entreprise.save();
        rep.send({ entreprise });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

//GET tous les entreprises http://hote:port/entreprises/*
router.get("/", checkToken, async(req, rep) => {
    try {
        var entreprises = await entrepriseModel.find({});
        rep.send({ entreprises });
    } catch (e) {
        rep.send({ error: e.message });
    }

});

//Get une entreprise par son ID http://hote:port/entreprises/id
router.get("/:id", checkToken, async(req, rep) => {
    try {
        var entreprises = await entrepriseModel.findOne({ _id: req.params.id });
        rep.send({ entreprises });
    } catch (e) {
        rep.send(e)
    }
});

//Modifie une entreprise http://hote:port/entreprises/:id
router.put("/:id", checkToken, async(req, rep) => {
    try {
        var entreprise = await entrepriseModel.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true }
        );
        rep.send({ entreprise });
    } catch (e) {
        rep.send(e)
    }

});

//Suprimmer une entreprise par son ID http://hote:port/entreprises/id
router.delete("/:id", checkToken, async(req, rep) => {
    try {
        var utilisateur = await utModel.deleteOne({ _id: req.params.id });
        rep.send({ succes: "Ok" });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

module.exports = router;