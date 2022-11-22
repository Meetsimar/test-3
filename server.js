const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const {engine} = require("express-handlebars");

var data = require("./ data_prep.js")

var HTTP_PORT = process.env.PORT || 8080;
function expressoutput(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
    res.render("home", {layout: "main"})
});

app.get("/BSD", (req, res) => {
    data.getBSD().
    then((data) => {
        res.render("students", {
            students: data
        });
    }).
    catch((ex) => {
        res.render({ message: "no results" });
    })
});

app.get("/highGPA", (req, res) => {
    data.highGPA().
    then((data) => {
        res.render("student", {
            students: data
        });
    }).
    catch((ex) => {
        res.render({ message: "no results" });
    })
});

app.get("/allStudents", (req, res)=>{
    data.allStudents().
    then((data) => {
        res.render("students", {
            students: data
        });
    }).
    catch((ex) => {
        res.render({ message: "no results" });
    })
})

app.use(function (req, res) {
    res.status(404).send("Page not found");
})

data.init().then(() => { app.listen(HTTP_PORT, expressoutput()) }).catch(() => {
    console.log("unable to start server");
})