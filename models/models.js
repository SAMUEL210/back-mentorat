var mongoose = require('monggose')

const utilisateurSchema = new mongoose.Schema({

})

var utilisateurModel = mongoose.model('utilisateur', utilisateurSchema)

module.exports = {
    utilisateurModel: utilisateurModel,

}