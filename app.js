const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const res = require("express/lib/response");
const app = express();
var items=["Learn Ejs","Practice DSA","Checking For notice"];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  res.render("list",{KindofDay:day , newlistitems: items});
});

app.post('/' , (req,res)=>{
  var item = req.body.newitem;
  items.push(item);
  var data = `The task is to be added is ${item}`
  fs.writeFileSync('output.txt',data);
  const mess = "Your Form Is Successfully Submitted";
  res.redirect("/");
  res.send(mess); 
});

app.listen(3000, () => {
  console.log("The server had started on port 3000");
});
