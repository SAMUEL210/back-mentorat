var mongoose = require('mongoose')

const debriefSchema = new mongoose.Schema({
    objectifs_complete: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    retours: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
})

var debriefModel = mongoose.model('debrief', debriefSchema)

module.exports = debriefModel;