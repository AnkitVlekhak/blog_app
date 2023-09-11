const mongoose = require('mongoose');
const blog_schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
    , photo: {
        type: Array
    },
    text: {
        type: String
    },
    title: {
        type: String
    }
})
const blogModel = mongoose.model('Blog', blog_schema)
module.exports = blogModel;