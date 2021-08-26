var mongoose = require('mongoose')

const entrepriseSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    employes: {
        type: [mongoose.Types.ObjectId],
        required: false
    }
})

var entrepriseModel = mongoose.model('entreprise', entrepriseSchema)

module.exports = entrepriseModel;