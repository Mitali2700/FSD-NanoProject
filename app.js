const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  
  res.sendFile(__dirname+ "/index.html")

})

app.post("/", function(req, res){
  //console.log(req.body.cityName);
  //console.log("Post request recieved.")
  const query=req.body.cityName;
   const apiKey="1e05b64943c967b43b3d8f9404a7c5f0";
   const unit = 'metric';
   const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units="+unit;
   https.get(url, function(response){
       console.log(response.statusCode);

       response.on("data", function(data){
           // console.log(data);
           const weatherData = JSON.parse(data);
           
           const temp = weatherData.main.temp;
           console.log(temp);
           const desc = weatherData.weather[0].description;
           res.write("<p>The wether is currently "+desc+"<p>");
           
           //res.send("<H1>The temperture in London is "+ temp+" degree Celcius</H1>")
           res.write("<H1>The temperture in "+ query +" is "+ temp +" degree Celcius</H1>");
           //res.send();
           const icon= weatherData.weather[0].icon;
           //res.write(icon);
           
           const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
           res.write("<img src ="+ imageURL +">");
   
           res.send();
       })
   
   })
   
   // We commit this send because due to this send, send at the upper part is not working and also giving error at hyper terminal.
   //res.send("Server is up and running.")
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
  
  })
