const express = require('express')
const bcrypt = require('bcrypt')
var utilisateurModel = require('../models/utilisateur')
var { isEmail } = require('validator')
var { createToken } = require('../utilities/token')
var router = express.Router()


router.post("/", async(req, rep) => {

    try {
        if (isEmail(req.body.email) === false)
            rep.send({ error: 'Veuillez saisir une adresse mail valide!', cause: 'Email' })
        else {
            var utilisateur = await utilisateurModel.findOne({ email: req.body.email });
            if (utilisateur) {
                bcrypt.compare(req.body.mp, utilisateur.mp, function(err, result) {
                    if (result == true) {
                        const token = createToken(utilisateur);
                        rep.header("Authorization", token);
                        rep.send({ id: utilisateur._id });
                    } else rep.send({ error: "Identifiants incorrectes!", cause: 'Identifiants' });
                });
            } else rep.send({ error: "Identifiants incorrectes!", cause: 'Identifiants' });
        }
    } catch (e) {
        rep.send({ error: e.message })
    }
});



module.exports = router;