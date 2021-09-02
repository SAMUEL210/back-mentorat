var mongoose = require('mongoose')
var objectifModel = require('../models/objectif')

const contratSchema = new mongoose.Schema({
    duree: {
        type: Number,
        required: true
    },
    frequence: {
        type: Number,
        required: true
    },
    mentorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    mentoreId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    accordMentor: {
        type: Boolean,
        required: false,
    },
    accordMentore: {
        type: Boolean,
        required: false
    },
    sessions: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    objectifsMentor: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    objectifsMentore: {
        type: [mongoose.Types.ObjectId],
        required: false
    }
})

// contratSchema.post('save', async function(next) {
//     if (this.objectifsMentor != '') {
//         for (obj in objectifMentor) {
//             let objectif = objectifModel({
//                 valeur: objectif,
//                 par: this.mentorId,
//                 pour: this._id
//             })
//             await objectif.save()
//             next()
//         }
//     }
// })
var contratModel = mongoose.model('contrat', contratSchema)

module.exports = contratModel;