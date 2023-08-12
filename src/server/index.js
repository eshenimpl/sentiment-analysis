const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/nlp", (req, res) => {
  let target = req.body;
  fetch(
    `${baseURL}${process.env.API_KEY}&lang=auto&${
      target.type
    }=${encodeURIComponent(target.content)}`
  )
    .then((response) => response.json())
    .then((data) => {
      let result = null;
      if (data.status.code != "0") {
        result = { msg: data.status.msg };
      } else {
        result = {
          agreement: data.agreement,
          irony: data.irony,
          score_tag: data.score_tag,
          subjectivity: data.subjectivity,
          confidence: data.confidence,
          text_snippet: data.sentence_list
            .slice(0, 5)
            .map((obj) => obj.text)
            .join(" "),
        };
      }

      res.json(result);
    });
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log(`running on localhost: http://localhost:8080`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
