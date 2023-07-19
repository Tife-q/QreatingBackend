const mongoose = require('mongoose')

const users  = mongoose.Schema(
	{
		name: { type: String },
		email: { type: String },
		mobile: { type: String },
		password: { type: String },
        status: { type: String },
        role: { type: String },
        stripeID: {type: String}
    },
    { timestamps: true }
    )

module.exports = mongoose.model('users', users)
