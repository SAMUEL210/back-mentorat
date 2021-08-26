var mongoose = require('monggose')
var { isEmail } = required('validator')

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: isEmail,
        required: true,
        unique: true,
        lowercase: true
    },
    mp: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    mentors: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    mentores: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    entreprise_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

var utilisateurModel = mongoose.model('utilisateur', utilisateurSchema)

module.exports = {
    utilisateurModel: utilisateurModel
}