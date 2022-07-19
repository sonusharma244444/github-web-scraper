const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesHtml(url, topic, repoName) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log("page not found");
    } else {
      getIssue(html, topic, repoName);
    }
  }
}

function getIssue(html, topic, repoName) {
  const $ = cheerio.load(html);
  const issueArr = $(
    ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
  );
  let arr = [];
  for (let i = 0; i < issueArr.length; i++) {
    const issueLink = $(issueArr[i]).attr("href");
    // console.log(issueLink);

    arr.push(issueLink);
  }
  //   console.log(topic, " ", arr);
  let folderPath = path.join(__dirname, topic);
  dirCreater(folderPath);
  let filePath = path.join(folderPath, repoName + ".pdf");
  const text = JSON.stringify(arr);

  // convert json to pdf
  const pdfDoc = new pdfkit();
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();

  // to create json files
  //   fs.writeFileSync(filePath, text);
}

module.exports = getIssuesHtml;

function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}
