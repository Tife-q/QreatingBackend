const mongoose = require('mongoose')

const users  = mongoose.Schema(
	{
		name: { type: String },
		email: { type: String },
		mobile: { type: String },
		password: { type: String },
        status: { type: String },
        role: { type: String },
        stripeID: {type: String},
        profile: {
            name: { type: String },
            title:{ type: String },
            profilePic:{ type: String },
            language:[{ type: String }],
            about:{ type: String },
            role:{ type: String },
            introVideo:{ type: String },
            skills:[{ type: String }],
            avgResponseTime:{ type: String },
            availibility:{ type: String },
            socialMedia: {
                name: { type: String },
                link: { type: String },
            },
            highlights: [{ type: String }],
        },
        portfolio: [{
            name: { type: String },
            link: { type: String },
            img: { type: String },
        }],
        plans: [{
            name: { type: String },
            sessions: { type: String },
            img: { type: String },
            cost: { type: String },
            details: { type: String },
        }],
        faq: [{
            question: { type: String },
            answer: { type: String },
        }],
        
    },
    { timestamps: true }
    )

module.exports = mongoose.model('users', users)
