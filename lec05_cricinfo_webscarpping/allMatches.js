const cheerio = require("cheerio");
const request = require("request");
const getAllMatchesData = require("./match");

function makeRequestonLink(link){
    request(link,cb);
}

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let ScoreCard_aTag = ch('a[data-hover="Scorecard"]');
    for(let i = 0; i <ScoreCard_aTag.length; i++){
         let single_aTag = ScoreCard_aTag[i+""];
         let link = "https://www.espncricinfo.com" + ch(single_aTag).attr("href");
        //SCORECARD URL
        getAllMatchesData(link);
    }
}

module.exports = makeRequestonLink; 