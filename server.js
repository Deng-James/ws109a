var http = require("http");
var url = require("url");
var routes = require("./routes");
var querystring = require("querystring"); //為了解析GET、POST資料
var formidable = require("formidable"); //解析檔案file


function start() {
  function onRequest(request, response) {
   var dataObject="";
   var postData="";
   var urlObject=url.parse(request.url); //將URL解析為json物件
   var pathname=urlObject.pathname;
   //request.setEncoding("utf8"); 使用formidable時如果手動設置此項會錯誤
   if(urlObject.query != null){ //GET
     dataObject=querystring.parse(urlObject.query); //將url.query的資料解析為json物件
     console.log("invite in server.and have GET data: "+ JSON.stringify(dataObject)); 
     routes.route(pathname, response, dataObject);
   }
    else if(pathname=="/loginback.js"){
      //have File post data 專門給loginback!因為有file的POST資料無法直接用平常方式解析!要用到其他套件
     
      dataObject=request;//request內含未解析的post data~直接把request傳到loginback解析
      routes.route(pathname, response, dataObject);
   
    }
   else{ //POST or no data
      request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });

    request.addListener("end", function() {
    if(postData !== ""){ //have post data
     dataObject=querystring.parse(postData);
     console.log("invite in server.and have POST data: "+ JSON.stringify(dataObject));
    }    
    routes.route(pathname, response, dataObject);
    });
   }
 }
  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;
