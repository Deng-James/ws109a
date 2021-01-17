var formidable = require("formidable"); //解析post data中有檔案file 的第三方套件
var fs = require('fs');

function run(res , data){
  var object=null;
  //parse post file data
  var form = new formidable.IncomingForm();
      form.uploadDir="/home/action/workspace/page/pic"; //預設上傳資料夾位置
      form.parse(data, function(err, fields, files) { 
        //解析~ fields:string變數區 files:檔案區
        if(err){console.log("File error!: "+err); return;}
        fs.renameSync(files.file.path, '/home/action/workspace/page/pic/talkback2.jpg'); //同步!改完檔名再繼續下一步
        object={"fields": fields, "files": files}; //json {fields:{put:..,fine:..},files:{file:{...}}}
        console.log("success get File data!: "+ JSON.stringify(object));
         var changeCSS="body {"
         
		 +"font-family: arial, sans-serif;"
                +" background-image: url('pic/talkback2.jpg');"
		 +"background-repeat: no-repeat;" 
		 +"background-attachment: fixed;"
		 +"background-position: top right;"
		 +"text-align:center;"	 
        +"}"
        +".left{"
            +"position: relative;" 
            +"right: 12%;"
        +"}"
    +"span{"
        +"    color:red;"
    +"}"
    +"table {"
         
    		 +"border-collapse: collapse;"
		 +"width: 45%;"
		 +"position: relative; "
		 +"border: 1px solid "+object.fields.put+";"
                   +"left: 16%;"
				+"   text-align: center;"
    +"}"
    +"td.big {"
         
        +"     height:150px;"
    +"}"
    +"div.end{"
               +" border-style:ridge;"
		+"border-width:1px;"
		 +"width: 45%;"
     +"position: relative; "
		 +"border-color:"+object.fields.fine +";"
                 +"left: 16%;"
		+"text-align: center;"
    +"}"
    +"a{"
                 +"text-decoration: none;"
		+"color: #2F0B3A;"
    +"}";
  
    fs.writeFile('/home/action/workspace/page/broadstyle.css',changeCSS, function(err) { //修改CSS
    if(err) {
      console.log("Change CSS Fail: "+err);
    } else {
        console.log("The CSS file was saved!");
    }
   }); 
  fs.readFile("/home/action/workspace/page/board.html"  , function (err, file) { //回應board頁面
    if(err){console.log("Loginback response Error: "+err);return;}
  res.writeHead( 200, {"Content-Type": "text/html" });
  res.end(file);
  });
    });
   
}
exports.run = run;