setTimeout(function () {
    console.log(4);
  });
  setTimeout(function () {
    console.log(5);
  });
  
  let p = new Promise(function (resolve, reject) {
    resolve();
  });
  
  console.log(1);
  
  p.then(function () {
    console.log(2);
  });
  
  p.then(function () {
    console.log(3);
  });
  
  setTimeout(function () {
    console.log(6);
  });
