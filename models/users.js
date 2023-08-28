const mongoose = require('mongoose')

const users = mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        active: { type: Boolean },
        email: { type: String },
        phone: { type: String },
        password: { type: String },
        status: { type: String },
        role: { type: String },
        stripeID: { type: String },
        parentAccount: { type: String },
        profile: {
            fullname: { type: String },
            userName: { type: String },
            hourlyRate: { type: String },
            profilePhoto: { type: String },
            shortDescription: { type: String },
            mainSpecilization: { type: String },
            headline: { type: String },
            location: { type: String },
            gender: { type: String },
            language: [{ type: String }],
            aboutMe: { type: String },
            role: { type: String },
            introVideo: { type: String },
            focusArea: [{ type: String }],
            avgResponseTime: { type: String },
            socials: {
                name: { type: String },
                link: { type: String },
            },
            pinnedHighlights: [{ type: String }],
            workExperiences: [{
                jobTitle: { type: String },
                company: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                description: { type: String }
            }],
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
