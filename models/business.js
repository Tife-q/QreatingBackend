const mongoose = require('mongoose')

const business = mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phone: { type: String },
        password: { type: String },
        companyName: { type: String },
        active:{type: Boolean},
    },
    { timestamps: true }
)

module.exports = mongoose.model('business', business)
