const cheerio = require("cheerio");
const request = require("request");

function getAllMatchesData(link){
    request(link,cb);
}

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let bothInnings = ch(".Collapsible");
    
    for(let i = 0; i<bothInnings.length;i++){
        let singleInnings = bothInnings[i];
        let teamName = ch(singleInnings).find("h5").text();

        teamName = teamName.split("INNINGS")[0].trim();

        let batsmanTable = bothInnings.find(".table.batsman");

        let allTrs = batsmanTable.find("tbody tr");
        //YE HAMKO BATSMAN TABLE KE SAARE ROWS LAAKE DE DEGA DONO TABLE K

        for(let j = 0; j<allTrs.length; j++){
            let allTds = ch(allTrs[j]).find("td");

            if(allTds.length > 1){
                let batsmanName = ch(allTds['0']).text().trim();
                let runs = ch(allTds['2']).text().trim();
                let balls = ch(allTds['3']).text().trim();
                let fours = ch(allTds['5']).text().trim();
                let sixes = ch(allTds['6']).text().trim();
                let strikeRate = ch(allTds['7']).text().trim();
                
                console.log(`batsmanName : ${batsmanName} runs : ${runs} balls : ${balls} fours : ${fours} six : ${sixes} strikeRates : ${strikeRate}`);

            }
        }

        console.log("############################################");
    }

}

module.exports = getAllMatchesData;