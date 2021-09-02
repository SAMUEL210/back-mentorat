var express = require('express')
var bcrypt = require('bcrypt')
var { isEmail } = require('validator')
var utilisateurModel = require('../models/utilisateur')
var { createToken, checkToken } = require('../utilities/token')
var router = express.Router()


//POST tous les utlisateur http://hote:port/utilisateurs
router.post("/", async(req, rep) => {
    if (isEmail(req.body.email) === false)
        rep.send({ error: 'Veuillez saisir une adresse mail valide!', cause: 'Email' })
    else {
        let ut = await utilisateurModel.findOne({ email: req.body.email })
        if (ut) {
            rep.send({ error: 'Un utilisateur avec cet adresse mail existe déjà!', cause: 'Email' })
        } else {
            try {
                var utilisateur = new utilisateurModel(req.body);
                await utilisateur.save();
                rep.send({ utilisateur });
            } catch (e) {
                rep.send({ error: e });
            }
        }

    }
});

//GET tous les utlisateur http://hote:port/utilisateurs/*
router.get("/", checkToken, async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.find({});
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

//GET  utlisateur  par son id http://hote:port/utilisateurs/:id
router.get("/:id", checkToken, async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.findOne({ _id: req.params.id });
        rep.send({ utilisateur });
    } catch (e) {
        rep.send({ error: e.message });
    }
});

router.put("/:id", checkToken, async(request, response) => {
    let { body } = request;
    let dejaEmail = false;
    if (validate(body.email)) {
        var users = await utilisateurModel.find({})
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id != request.params.id) {
                if (users[i].email == body.email) {
                    dejaEmail = true;
                }
            }
        }
        if (dejaEmail == false) {
            let salt = await bcrypt.genSalt()
            body.mp = await bcrypt.hash(body.mp, salt);
            var user = await utilisateurModel.findOneAndUpdate({ _id: request.params.id },
                body, { new: true }
            );
            response.send({ success: user });
        } else response.send({ error: "Un utilisateur avec cet adresse mail existe déjà!", cause: 'Email' })
    } else response.send({ error: "Veuillez saisir une adresse mail valide!", cause: 'Email' })

});

//Suprimmer un utilisateur par son ID http://hote:port/utilisateurs/id
router.delete("/:id", checkToken, async(req, rep) => {
    try {
        var utilisateur = await utilisateurModel.deleteOne({ _id: req.params.id });
        rep.send({ succes: "Ok" });
    } catch (e) {
        rep.send({ error: e.message });
    }
});


module.exports = router;