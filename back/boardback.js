var MongoClient = require('mongodb').MongoClient;

function run(res , data){
  
  
  if(data.state==1){ //==值相同即可 ===值和型態皆相同
    
    var name=data.sname;
          if(data.semail!==null){
          var email=data.semail;
          }
          else{
          var email="";
          }
          var com=data.scom;
          var sex=data.ssex;
          var date=new Date().toDateString(); //當下電腦時間
    //要response的資料
	  var out="<table border = '1'>"
         +"<thead>"           
            +"<tr>"
               +"<th colspan = '3'>"+ date +"</th>"
               +"<th>"+ sex +"</th>"  
            +"</tr>"
            +"<tr>"
               +"<th>姓名</th>"
               +"<td>"+name+"</td>"
               +"<th>e-mail</th>"
               +"<td>"+email+"</td>"
            +"</tr>"
			+"<tr>"
			+"<th colspan = '4' rows='10px'>留  言</th>"
			+"</tr>"
         +"</thead>"
         +"<tbody>"
            +"<tr>"
			+"<td colspan = '4' class='big'>"+com+"</td>"
            +"</tr>"
         +"</tbody>"
      +"</table>";
    
    //put date into dataObject 合併date到dataObject
    var mydate={"sdate":date };
    for(var key in mydate) data[key]=mydate[key];
    
    //insert data in database
    MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
      if(err) { return console.log("db Error: "+err); }
          db.createCollection('myboard', function(err, collection) {
            if(err) { return console.log("collection create err: "+err); }
              collection.insert(data, {w:1}, function(err, result) { //將dataObject插入mongo-以json形式儲存
                if(err) { return console.log("db insert err: "+err); }
                console.log("data insert database success!");
              });
          });
    });
    //response data back
    res.writeHead(200, {"Content-Type": "text/html" }); 
    res.end(out);
    
   }else if(data.state==0){ 
     MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db) { //連上database
      if(err) { return console.log("db Error: "+err); }
          db.createCollection('myboard', function(err, collection) { //create或use collection
            if(err) { return console.log("collection create err: "+err); }
            
              collection.find().toArray(function(err, docs) { //將此collections內的documents用array裝起來
                if(err) { return console.log("data find all err: "+err); }
                res.writeHead(200, {"Content-Type": "text/plain" });
                res.write(JSON.stringify(docs)); //response json array回去
                res.end();
                db.close();
              });
          });
    });
   
  }else{
    response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not found");
      response.end();
  }
}

exports.run = run;