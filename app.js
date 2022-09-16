// requires
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Database connection
mongoose.connect("mongodb://localhost:27017/blogDB");

// Schema
const postSchema = {
    title: String,
    content: String
}
// model
const Post = mongoose.model("Post", postSchema);

const homeContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

app.get("/", (req, res)=>{
   
    Post.find({}, function(err, posts){
        res.render("home", 
        {firstContent: homeContent, 
        posts:posts
        });
    });

});

// app.post("/", (req, res)=>{
//     const post = {
//         title: req.body.newTitle,
//         content: req.body.newContent
//     }

//     posts.push(post);
//     res.redirect("/");
// });


app.get("/compose", (req, res)=>{
    res.render("compose");

});

app.post("/compose", function(req, res){

    const post = new Post({
        title: req.body.newTitle,
        content: req.body.newContent
    });

    post.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });

});
app.get("/post/:postId", (req, res) => {

    const requestedPostId = req.params.postId;

    Post.findOne({_id:requestedPostId}, function(err, post){

        if(err){
            console.log(err);
        }else{
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.listen(4000, ()=>{

    console.log(`Server is running on port 4000!`);
});
