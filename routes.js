var path = require("path");
var fs = require('fs');
var boardback=require("./back/boardback");//和handler一起
var loginback=require("./back/loginback");//和handler一起

function route(pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  //handler on here
  var filename = null ;
	var ext = path.extname(pathname); //檔案類型
	var localPath = __dirname + '/page'; //server的文本位置
	var validExtensions = { //可接受的檔案類型
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png"
	};
  if(validExtensions[ext]){ //如果非以上的檔案類型，會把結果導到首頁index.html
    filename = pathname;
  }else{
    filename = "/index.html";
  }
   var isValidExt = validExtensions[path.extname(filename)]; //filename的檔案類型
  
   var handler={}; //路由位置設定(後端)~和sails的routes設定意義同
   handler["/boardback.js"]= boardback.run;
   handler["/loginback.js"]= loginback.run;
  
    if(ext==".js" && typeof handler[pathname]==='function'){ //後端
        handler[pathname]( response , postData);
    }else if( isValidExt ) { //前端
      fs.readFile(localPath + filename  , function (err, file) { //__dirname為當下資料夾位置
      if (err) {
        console.log("View Error:"+err.message);
      }       
    response.writeHead( 200, {"Content-Type": isValidExt });
    response.write(file);
    response.end();
    });
  } else {
      console.log("No View pages found for " + localPath + filename );
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not found");
      response.end();
  }
  
 }
  


exports.route = route;