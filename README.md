# 課程:網站設計進階 -- 習題專案 -- 留言板

欄位 | 內容
-----|--------
學期 | 109 學年度上學期
學生 |  鄧筌祐
學號末兩碼 | 49
教師 | [陳鍾誠](https://www.nqu.edu.tw/educsie/index.php?act=blog&code=list&ids=4)
學校科系 | [金門大學資訊工程系](https://www.nqu.edu.tw/educsie/index.php)
課程內容 | https://gitlab.com/ccc109/ws

## 流程
* 1.實作route的網頁
* 2.用第三方套件處理圖片上傳資料
* 3.留言板前端用Ajax
* 4.含後端與資料庫mongoDB的處理

## 安裝套件
* npm install express
* npm install formidable 
* npm install mongodb 

## code
```
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
```

## 參考網址
* [Node入門](https://www.nodebeginner.org/index-zh-tw.html)
* [Hsuan-Ju Lin](https://github.com/mis101bird)
