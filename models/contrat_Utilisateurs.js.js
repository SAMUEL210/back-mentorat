var mongoose = require('mongoose')

const contratUtilisateurSchema = new mongoose.Schema({
    mentor_id: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    mentor_id: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    contat_id: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
})

var contratUtilisateurModel = mongoose.model('contratUtilisateur', contratUtilisateurSchema)

module.exports = contratUtilisateurModel;