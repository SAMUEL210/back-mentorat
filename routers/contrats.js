var express = require('express')
var contratModel = require('../models/contrat')
var { createToken, checkToken } = require('../utilities/token')
var utilisateurModel = require('../models/utilisateur')

var router = express.Router()

//POST un contrat http://hote:port/entreprises/*
router.post('/', checkToken, async(req, rep) => {
    try {
        let { body } = req
        if (body.mentorId === body.mentoreId) rep.send({ error: "Vous ne pouvez pas vous mentorer vous même!" })
        else {
            let mentor = await utilisateurModel.findOne({ _id: body.mentorId })
            let mentore = await utilisateurModel.findOne({ _id: body.mentoreId })
            if (mentor && mentore) {
                var contrat = new contratModel(body)
                await contrat.save()
                rep.send({ contrat })
            } else rep.send({ error: "Utilisateur n'existe pas" })
        }
    } catch (e) {
        rep.send({ error: e.message })
    }
})

//GET tous les contrats http://hote:port/contrat/*
router.get("/", checkToken, async(req, rep) => {
    try {
        var contrats = await contratModel.find({});
        rep.send({ contrats });
    } catch (e) {
        rep.send({ error: e.message });
    }

});

//Get un contrat par son ID http://hote:port/contrat/id
router.get("/:id", checkToken, async(req, rep) => {
    try {
        var contrat = await contratModel.findOne({ _id: req.params.id });
        rep.send({ contrat });
    } catch (e) {
        rep.send(e)
    }
});

//Modifie un contrat http://hote:port/contrat/:id
router.put("/:id", checkToken, async(req, rep) => {
    try {
        var contrat = await contratModel.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true }
        );
        rep.send({ contrat });
    } catch (e) {
        rep.send({ error: e })
    }

});

module.exports = router