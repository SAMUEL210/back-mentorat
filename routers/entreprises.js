var express = require('express')
var entrepriseModel = require('../models/entreprise')
var { createToken, checkToken } = require('../utilities/token')
var router = express.Router()

//Ajoute un utilisateur http://hote:port/entreprise/
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

//GET tous les utlisateur http://hote:port/entreprise/*
router.get("/", async(req, rep) => {
    try {
        var entreprises = await entrepriseModel.find({});
        rep.send({ entreprises });
    } catch (e) {
        rep.send({ error: e.message });
    }

});

//Get un utilisateur par son ID http://hote:port/entreprises/id
router.get("/:id", async(req, rep) => {
    try {
        var entreprises = await entrepriseModel.findOne({ _id: req.params.id });
        rep.status(200).send({ utilsentreprisesateur });
    } catch (e) {
        rep.send(e)
    }
});

//Modifie un utilisateur http://hote:port/entreprise/:id
router.put("/:id", async(req, rep) => {
    try {
        var entreprise = await entrepriseModel.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true }
        );
        rep.send({ entreprise });
    } catch (e) {
        rep.send(e)
    }

});



// //Suprimmer un utilisateur par son ID http://hote:port/utilisateurs/id
// router.delete("/:id", async(req, rep) => {
//     try {
//         var utilisateur = await utModel.deleteOne({ _id: req.params.id });
//         rep.status(200).send({ succes: "Ok" });
//     } catch (e) {
//         rep.status(409).send({ error: e.message });
//     }
// });

module.exports = router;