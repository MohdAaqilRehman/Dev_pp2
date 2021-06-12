const cheerio =  require("cheerio");   //ye file me cheezo ko dhundne me madad krta hai...iske pass bhut sare tools hote hai aur ye object me change kr deta hai data ko
const request = require("request");  // ye reuqest bhejta hai server se data lene ke liye...
const fs = require("fs");   // ye file ko access krne ke liye hai..

// name:"" ,
// wickets:"" ,
// economy:""

let highestWickerTaker = {};

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);

function cb(error , response , data){     // ye naah call back function hai..
    parseData(data);          
}


function parseData(html){  // ye vala html file ko lekr aayega 
    let highestWicketsSoFar = 0;  // ye intalise krva rakha hai 
    let nameOfHighestWicketTaker;
    let economy;

    let ch= cheerio.load(html);
    let bothBowlingTables = ch('.Collapsible .table.bowler');
    // {  '0' :{} , '1' :{}  }
    for(let i=0 ; i<bothBowlingTables.length ; i++){
        let bowlingTable = bothBowlingTables[`${i}`];
        let allTrs = ch(bowlingTable).find("tbody tr");
        // { 0: tr , 1:tr , 2:tr, 3:tr, 4:tr, 5:tr }
        for(let j=0 ; j<allTrs.length ; j++){
            let allTds = ch(allTrs[j]).find("td");
            let wicketsTaken = ch(allTds['4']).text();
            if(wicketsTaken > highestWicketsSoFar){
                highestWicketsSoFar = wicketsTaken;
                nameOfHighestWicketTaker = ch(allTds['0']).text();
                economy = ch(allTds['5']).text();
            }
            // 0=> name  // 4=>wickets  // 5=>eco
        }
    }
    highestWickerTaker.name = nameOfHighestWicketTaker;
    highestWickerTaker.wickets = highestWicketsSoFar;
    highestWickerTaker.economy = economy;   
    console.log(highestWickerTaker);
}