var mongoose = require('mongoose')
var entrepriseModel = require('../models/entreprise')
var bcrypt = require('bcrypt')
var { isEmail } = require('validator')

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: false,
        default: './img/default-user.png'
    },
    description: {
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
    },
    contratActuel: {
        type: mongoose.Types.ObjectId,
        required: false
    }
})

utilisateurSchema.pre('save', async function(next) {
    let salt = await bcrypt.genSalt()
    this.mp = await bcrypt.hash(this.mp, salt)
    next()
})

utilisateurSchema.post('save', async function(next) {
    let entreprise = await entrepriseModel.findOne({ _id: this.entreprise_id })
    let utilisateurs = await utilisateurModel.find({ entreprise_id: this.entreprise_id })
    if (utilisateurs)
        entreprise.employes = []
    for (let i = 0; i < utilisateurs.length; i++) {
        entreprise.employes.push(utilisateurs[i]._id)
    }
    entreprise.employes.push(utilisateurs._id)
    await entrepriseModel.findOneAndUpdate({ _id: this.entreprise_id },
        entreprise, { new: true }
    );
    next()
})

var utilisateurModel = mongoose.model('utilisateur', utilisateurSchema)

module.exports = utilisateurModel