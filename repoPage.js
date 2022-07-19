//2
const request = require("request");
const cheerio = require("cheerio");
const getIssuesHtml = require("./getIssuesPage");
const { link } = require("fs");

function getReposPageHtml(url, topic) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log("page not found");
    } else {
      getReposLinks(html, topic);
    }
  }
}

function getReposLinks(html, topic) {
  const $ = cheerio.load(html);
  const headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");

  console.log(topic);
  for (let i = 0; i < 8; i++) {
    const twoAnchors = $(headingArr[i]).find("a");
    const links = $(twoAnchors[1]).attr("href");
    // console.log(links);

    let repoFullLink = `https://github.com${links}/issues`;
    const repoName = links.split("/").pop();
    getIssuesHtml(repoFullLink, topic, repoName);
  }
  console.log("---------------------------------");
}

module.exports = getReposPageHtml;
