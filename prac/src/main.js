const express = require('express');
const app = express();
const port = 8000;
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");

// const staticPath = path.join(__dirname, '../');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials/");

// to set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
// app.use(express.static(staticPath));

app.get("/about", (req, res) => {
    requests(`http://api.weatherapi.com/v1/current.json?key=65c7d334fcc24050b90110304212511&q=${req.query.name}&aqi=yes`)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            // console.log(`City is : ${arrData[0].location.name}`); returns city name 
            // console.log(arrData[0].current.temp_c); returns temp_c 
            const cityName = arrData[0].location.name;
            const cityTemp = arrData[0].current.temp_c;
            console.log(cityName);
            console.log(cityTemp);
            res.write(`City is ${cityName} Temperature is ${cityTemp}`);
        })
        .on('end', (err) => {
            if (err)
                return console.log('connection closed due to errors', err);
            res.end();
        });
});

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