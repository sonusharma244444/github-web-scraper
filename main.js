// 1
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./repoPage");

const URL = "https://github.com/topics";
request(URL, cb);

function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else if (response.statusCode == 404) {
    console.log("page not found");
  } else {
    getTopicLinks(html);
  }
}

function getTopicLinks(html) {
  const $ = cheerio.load(html);
  const linksArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
  for (let i = 0; i < linksArr.length; i++) {
    const herf = $(linksArr[i]).attr("href");

    const topic = herf.split("/").pop();
    const fullLink = `https://github.com${herf}`;

    getReposPageHtml(fullLink, topic);
  }
}
