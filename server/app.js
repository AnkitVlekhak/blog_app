const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const blogModel = require('./models/blog');
app.use(cors({ origin: true }))
app.use(express.json())
dotenv.config();
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
    app.listen(process.env.PORT, () =>
        console.log(`Listening at ${process.env.PORT}`)
    )
).catch((err) => {
    console.log(err);
})

const port = 3000;
app.get("/show-blogs", async (req, res) => {
    const allBlogs = await blogModel.find({});
    console.log("HELLO");
    console.log(allBlogs);
    res.status(200).json({ data: allBlogs });
})

app.post('/add-blog', async (req, res) => {
    const { displayName, email, title, links, content } = req.body;
    const newBlog = new blogModel({ name: displayName, email: email, photo: [links], text: content, title: title });
    newBlog.save().then(function (doc) {
        console.log(doc._id.toString());
        console.log('Data stored Success');
    }).catch(function (error) {
        console.log(error);
    });

})

app.get("/my-blog/:email", async (req, res) => {
    const { email } = req.params;
    const allBlogs = await blogModel.find({ email: email });
    console.log(allBlogs);
    res.status(200).json({ data: allBlogs });
})
