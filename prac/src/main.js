const express = require('express');
const hbs = require("hbs");
const app = express();
const port = 8000;
const path = require("path");

// const staticPath = path.join(__dirname, '../');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials/");

// to set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
// app.use(express.static(staticPath));


app.get("/", (req, res) => {
    res.render("index");
});

app.get("*", (req, res) => {
    res.render("404", {
        errorcomment: "Page not found."
    })
});

app.listen(port, () => {
    console.log(`listening to port ${port};`);
});
