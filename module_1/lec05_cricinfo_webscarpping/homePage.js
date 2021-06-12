const cheerio = require("cheerio");
const request = require("request");
const makeRequestonLink = require("./allMatches");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
//MAIN PAGE URL
request(url,cb);

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
let ch = cheerio.load(html);
let aTag = ch(".widget-items.cta-link a");
let link = "https://www.espncricinfo.com" + aTag['0']["attribs"]["href"];
//VIEW ALL MATCHES URL
console.log(link);
makeRequestonLink(link);
}