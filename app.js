const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const https = require('https');
const app = express();
const ejs = require('ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.set('view engine','ejs');
app.get("/",function(req,res){
  res.render("index");
})

app.post("/post",function(req,res){
  res.redirect("/post/"+req.body.word);
})
app.get("/post/:word",function(req,res){
  var apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${req.params.word}`;
    fetch(apiURL)
        .then(res => res.json())
        .then(json => {
            let searchedWord = json[0];
            console.log(json);
            res.render('post', { data: searchedWord});
        });
})
app.post("/reset",function(req,res){
  res.redirect("/");
})
// app.post("/post",function(req,res){
//   // console.log(req.body.word);
//   var words = req.body.word;
//   const url ="https://api.dictionaryapi.dev/api/v2/entries/en/"+words
//   // const url ="https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220729T081648Z.57dcb0fa18a9dc1e.4cfeb809b0feea29d2a2e3399f74a6a0f625aef0&lang=en-en&text="+word;
//
//   https.get(url,function(response){
//     // console.log(response.statusCode);
//     response.on("data",function(data){
//       const datas = JSON.parse(data);
//       var data = {
//         word : datas[0].word,
//         definition : datas[0].meanings[0].definitions[1].definition,
//         definition1 : datas[0].meanings[0].definitions[0].definition,
//         definition2 : datas[0].meanings[0].definitions[2].definition,
  //       audio : datas[0].phonetics[0].audio,
  //       synonyms : datas[0].meanings[0].synonyms[0],
  //       antonyms : datas[0].meanings[0].antonyms[0]
  //     }
  //     // console.log(data.word);
  //     // console.log(data.definition);
  //     // dictArray=[];
  //     dictArray.push(data.word);
  //     dictArray.push(data.definition);
  //     dictArray.push(data.definition1);
  //     dictArray.push(data.definition2);
  //     dictArray.push(data.audio);
  //     dictArray.push(data.synonyms);
  //   });
  // })
  // console.log(dictArray);
  // res.render("index",{dicArray:dictArray})
//   res.redirect("/");
//
//
// });


// app.post("/reset",function(req,res){
//
//   res.redirect("/");
// })
app.listen(3000,function(){
  console.log("the server is running on the port:3000")
})
// apikey
// dict.1.1.20220729T081648Z.57dcb0fa18a9dc1e.4cfeb809b0feea29d2a2e3399f74a6a0f625aef0
