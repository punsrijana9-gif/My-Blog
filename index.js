
const express = require("express");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Connect CSS folder
app.use(express.static("public"));

// Store blog posts temporarily
let posts = [];

// Home page
app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

// Create a new blog post
app.post("/posts", (req, res) => {
    posts.push({
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    });
    console.log("New post:", posts);
    res.redirect("/");
});

// Show edit page
app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.send("Post not found!");
    }

    res.render("edit", { post: post });
});

// Update blog post
app.post("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.send("Post not found!");
    }

    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
});

// Delete a blog post
app.post("/posts/:id/delete", (req, res) => {

    const postIndex = posts.findIndex(
        p => p.id == req.params.id
    );

    if (postIndex === -1) {
        return res.send("Post not found!");
    }

    posts.splice(postIndex, 1);

    res.redirect("/");
});


// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
