const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getAllMatchesData(link){
    request(link,cb);
}

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let bothInnings = ch(".Collapsible");
    //yaha par hamare paas 2 innings ki table aa jayegi
    for(let i = 0; i<bothInnings.length;i++){
        let singleInnings = bothInnings[i];// ->zero-> ke table ke andar->delhi capital innings... 

        let teamName = ch(singleInnings).find("h5").text();//-->delhi capital innings maximum over 20->heading 

        teamName = teamName.split("INNINGS")[0].trim();

        let batsmanTable = bothInnings.find(".table.batsman");  // yaha pr hum single vale pr hum row pr hai basically

        let allTrs = batsmanTable.find("tbody tr");
        //YE HAMKO BATSMAN TABLE KE SAARE ROWS LAAKE DE DEGA DONO TABLE K

        for(let j = 0; j<allTrs.length; j++){          // column //<tr> 1 2 3  4</
            let allTds = ch(allTrs[j]).find("td");

            if(allTds.length > 1){
                let batsmanName = ch(allTds['0']).text().trim();
                let runs = ch(allTds['2']).text().trim();
                let balls = ch(allTds['3']).text().trim();
                let fours = ch(allTds['5']).text().trim();
                let sixes = ch(allTds['6']).text().trim();
                let strikeRate = ch(allTds['7']).text().trim();
                
                // console.log(`batsmanName : ${batsmanName} runs : ${runs} balls : ${balls} fours : ${fours} six : ${sixes} strikeRates : ${strikeRate}`);
                processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }

        console.log("############################################");
    }

}

function checkTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`; //IPL/delhi capitals/gautam gambhir
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName , batsmanName){
    // "./IPL/Mumbai Indians/Rohit Sharma.json";
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;//"{abc : keyvalue}" "[{},{},{}]"   string me value gayi hai 
    let stringifiedData = fs.readFileSync(batsmanPath);   // string to hi read kr raha hai
    let batsmanFile = JSON.parse(stringifiedData);//json object bana diya string ko -->[{},{},{},{}(humne nayi object banakr daal di hai )] vapas object me dala
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);  //phir vapas daal diya 
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile)); // aur humne vapas string me change krdiya
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    // "./IPL/Mumbai Indians/Rohit Sharma.json"
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    let stringifiedData = JSON.stringify(batsmanFile); // [object] => [ {}]
    fs.writeFileSync(batsmanPath , stringifiedData  );
}
function createTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}




function processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let isTeam = checkTeamFolder(teamName);
    if(isTeam){
        let isBatsman = checkBatsmanFile(teamName , batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}



module.exports = getAllMatchesData;