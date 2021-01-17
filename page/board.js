

 var xmlHttp=null;
 var before =null;
 var beforeHttp=null;
function showUser()
 { 

 xmlHttp=GetXmlHttpObject();
 if (xmlHttp==null)
  {
  alert ("Browser does not support HTTP Request");
  return;
  } 
 
 var email=null;
 var sex=null;
 var name = document.getElementById("name").value;
 email = document.getElementById("email").value;
 var com = document.getElementById("com").value;
 
 
 if(document.getElementById("boy").checked){
    sex="boy";
 }else{
    sex="girl";
 }
 
 var url="boardback.js";
 url=url+"?state=1&sname="+name+"&semail="+email+"&scom="+com+"&ssex="+sex;
 url=url+"&sid="+Math.random();//怕緩存
 xmlHttp.onreadystatechange=stateChanged;
 xmlHttp.open("GET",url,true);
 xmlHttp.send(null);
  
 }

function stateChanged() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{
    
 var txtDoc=xmlHttp.responseText; 
 
 document.getElementById("show").innerHTML+=txtDoc;
 }
}
function firstStateChanged() 
{ 
if (beforeHttp.readyState==4 || beforeHttp.readyState=="complete")
{
 var x;
 var out="";
 var docs=JSON.parse(beforeHttp.responseText); 
 for( x in docs ){           //x is key of docs       
         out+="<table border = '1'>"
         +"<thead>"           
            +"<tr>"
               +"<th colspan = '3'>"+ docs[x].sdate +"</th>"
               +"<th>"+ docs[x].ssex +"</th>"  
            +"</tr>"
            +"<tr>"
               +"<th>姓名</th>"
               +"<td>"+docs[x].sname+"</td>"
               +"<th>e-mail</th>"
               +"<td>"+docs[x].semail+"</td>"
            +"</tr>"
			+"<tr>"
			+"<th colspan = '4' rows='10px'>留  言</th>"
			+"</tr>"
         +"</thead>"
         +"<tbody>"
            +"<tr>"
			+"<td colspan = '4' class='big'>"+docs[x].scom+"</td>"
            +"</tr>"
         +"</tbody>"
      +"</table><br/>";
 }
 document.getElementById( "beforeData" ).innerHTML=out;
 }
}

function GetXmlHttpObject()
 { 
 var objXMLHttp=null;
 if (window.XMLHttpRequest)
  {
  objXMLHttp=new XMLHttpRequest();
  }
 else if (window.ActiveXObject)
  {
  objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 return objXMLHttp;
 }
 
 function start()
{   
   beforeHttp=GetXmlHttpObject();
	if (beforeHttp==null)
	{
	alert ("Browser does not support HTTP Request");
	return;
	} 
   var url="boardback.js";
   url=url+"?state=0&sid="+Math.random();//怕緩存
   beforeHttp.onreadystatechange=firstStateChanged;
   beforeHttp.open("GET",url,true);
   beforeHttp.send(null);
}
 window.addEventListener( "load", start, false );


