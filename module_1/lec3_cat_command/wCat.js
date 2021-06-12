let content = process.argv.slice(2);
//upar vala jo code hai usme hum (process(jo ki object library hai node js me) usme se hum argv liya aur slice kiya hai) 
let fs = require("fs");  // ye naah libarary hai fs=filesystem.... ye naah read krne ke liye kaam ata hai write vagrah bhi.
// console.log(content);

let flags = [];    // 2 array bna liya 
let files = [];      // like     
/*
-s,-b,-n,pdf.text,abc.doc vagrah short kr lega
*/
for(let i=0 ; i<content.length ; i++){
    // "-s"
    if( content[i].startsWith('-') ){
        flags.push(content[i])
    }
    else{
        files.push(content[i]);
    }
}

// console.log(flags);
// console.log(files);
// flags X

// for files output
let fileKaData = "";
for(let i=0 ; i<files.length ; i++){
    // f1.txt => f2.txt
    fileKaData += fs.readFileSync( files[i] ) + "";
    fileKaData+=" "
}

console.log(fileKaData);