function form_action (fnm,act) {
  if (act == 'copy') {
    document.getElementById('act').value = 'copy';
  }

  var err= "";
  var x = document.getElementsByTagName('input');
  var y = document.getElementsByTagName('select');
  var e = document.getElementsByTagName('textarea');
  for (i = 0; i < x.length; i++) {
    if (x[i].className == 'mandatory') {
      if (x[i].value == ""){
        alert("Mandatory Field Cannot be Blank");
        x[i].focus();
        err="error";
        exit ;
      } 
    }
  }

function formatNumber(myElement) {
        var myVal = "";
        var myDec = "";
        var ffname = myElement.name.substr(0,myElement.name.lastIndexOf("_dsc"));

        var parts = myElement.value.toString().split(".");

        parts[0] = parts[0].replace(/[^0-9]/g,"");

        if ( parts[1] ) { myDec = "."+parts[1] }

        while ( parts[0].length > 3 ) {
            myVal = ","+parts[0].substr(parts[0].length-3, parts[0].length )+myVal;
            parts[0] = parts[0].substr(0, parts[0].length-3)
        }
        myElement.value = parts[0]+myVal+myDec;

        var val = myElement.value;
        var ori = val.replace(/,/g, "");
        document.getElementById(ffname).value = ori;

    }

                 
  for (u = 0; u < y.length; u++) {
    if (y[u].className == 'mandatory') {
      if (y[u].value == "0"){
        alert("Mandatory Field Cannot be Blank");
        y[u].focus(); 
        err="error";
        exit ;
      }
    }
  } 

  for (t = 0; t < e.length; t++) {
    if (e[t].className == 'mandatory') {
      if (e[t].value == ""){
        alert("Mandatory Field Cannot be Blank");
        e[t].focus(); 
        err="error";
        exit ;
      }
    }
  }

  if (err == ""){
    document[fnm].submit();
  } 
}   

function delimage (formid) {
 var answer = confirm('Press Save Button if you want to permanently delete this image .');
  if (answer) {
    document.getElementById(formid).value = "";
  }
}

function fup_action (btid,tynextid,tynextform,nextformid,fnm,act) {
  document.getElementById('act').value = 'fup';
  document.getElementById('btid').value = btid;
  document.getElementById('tynextid').value = tynextid;
  document.getElementById('tynextform').value = tynextform;
  document.getElementById('nextformid').value = nextformid;  
  document[fnm].submit();
}

function cekMandatory() {
  var erorr = "";
  var x = document.getElementsByTagName('input');
  var y = document.getElementsByTagName('select');
  for (i = 0; i < x.length; i++) {
    if (x[i].className == 'mandatory') {
      if (x[i].value == ""){
        alert("Mandatory Field Cannot be Blank");
        x[i].focus();
        err="error";
        exit ;
      }
    }
  }

  for (u = 0; u < y.length; u++) {
    if (y[u].className == 'mandatory') {
      if (y[u].value == "0"){
        alert("Mandatory Field Cannot be Blank");
        y[u].focus();
        err="error";
        exit ;
      }
    }
  }

  var answer = confirm('Are you sure want to set Approve this record ?');
  if (answer) {
    var w = window.open(burl + '/index.php/page/setApproval/'+btid,'CategorySearch','width=1,height=1,left=1,top=1,scrollbars=1,location=no');
    w.hide;
    return false;
  }


}

function print_action (fnm,act) {
  var url = window.location.href;
  var print_url = url.replace('/view/','/printout/')
  if (act == 'all') {
    var print_url = print_url + '?&all=1'
  }
  if (act == 'page') {
    var print_url = print_url + '?&page=1'
  }
  window.location = print_url;
}

function setApproval(btid,burl) {
  var answer = confirm('Are you sure want to set Approve this record ?');
  if (answer) {
    var w = window.open(burl + '/index.php/page/setApproval/'+btid,'CategorySearch','width=1,height=1,left=1,top=1,scrollbars=1,location=no');
    w.hide;
    return false;
  }
}

function logout() {
var base_url = document.getElementById('base_url').value;
if (window.confirm('Are you sure to log out?'))
  {
    window.location = base_url + "index.php/login/logout";
  };
}

function CurrencyFormatted(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function delTotal(obj,fnm) {
  if (fnm == '78000QTY_DETAIL') {
    var inputs = obj.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
    var name = inputs[i].name;
    if (name.match(/fld_btqty/gi)) {
      var totalAmount = parseInt(document.getElementById('fld_btqty').value);
      var value = parseInt(inputs[i].value);
      document.getElementById('fld_btqty').value = totalAmount - value;
    }
    } 
  }
  
  if (fnm == '78000PAYMENT_DETAIL') {
    var inputs = obj.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
    var name = inputs[i].name;
    if (name.match(/fld_btqty/gi)) {
      var totalAmount = parseInt(document.getElementById('fld_btp01').value);
      var value = parseInt(inputs[i].value);
      document.getElementById('fld_btp01').value = totalAmount - value;
    }
    } 
 }
 
 if (fnm == '78000PURCHASE_ORDER_DETAIL') {
    var inputs = obj.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
    var name = inputs[i].name;
    if (name.match(/fld_btamt/gi)) {
      var totalAmount = parseInt(document.getElementById('fld_btamt').value);
      var value = parseInt(inputs[i].value);
      document.getElementById('fld_btamt').value = totalAmount - value;
    }
    } 
 }

  
}

function setTotal(count,fnm) {
var totalAmount = 0;

if (fnm == '78000QTY_DETAIL') {
  for (i=1; i<=count; i++) { 
    var subAmount = (document.getElementById(fnm + 'fld_btqty01' + i).value == '') ? 0 : parseInt(document.getElementById(fnm + 'fld_btqty01' + i).value);
    totalAmount = parseInt(totalAmount + subAmount);
  }
  document.getElementById('fld_btqty').value = totalAmount;
}

if (fnm == '78000PAYMENT_DETAIL') {
  for (i=1; i<=count; i++) { 
    var subAmount = (document.getElementById(fnm + 'fld_btqty01' + i).value == '') ? 0 : parseInt(document.getElementById(fnm + 'fld_btqty01' + i).value);
    totalAmount = parseInt(totalAmount + subAmount);
  }
  document.getElementById('fld_btp01').value = totalAmount;
}

}

function change(div,count,fnm) {
  var div = document.getElementById(div);
  var elms = div.getElementsByTagName("*");
  var subTotal = 0;
  for(var i = 0, maxI = elms.length; i < maxI; ++i) {
    var elm = elms[i];
	switch(elm.type) {
	  case "text":
	  if (elm.name == fnm + 'fld_btqty01' + count || elm.name == fnm + 'fld_btuamt01' + count) {
	    var subTotal = parseFloat(document.getElementById(fnm + 'fld_btqty01' + count).value * document.getElementById(fnm + 'fld_btuamt01' + count).value);
		document.getElementById(fnm + 'fld_btamt01' + count).value = subTotal;
	  }
	  if (elm.name == fnm + 'fld_btamt01' + count) 	{
	    var totalAmount = 0;
		for (u=1; u<=count; u++) {
		  if (document.getElementById(fnm + 'fld_btamt01' + u)) {
		    var subAmount = parseFloat(document.getElementById(fnm + 'fld_btamt01' + u).value);
          } else {
  	        var subAmount = 0;
          }
		  totalAmount = parseFloat(totalAmount + subAmount);
 		}
		var tax = parseFloat(totalAmount * 0.1) ;
		totalAmount = totalAmount.toFixed(2);
		tax = tax.toFixed(2);
		document.getElementById('fld_btamt').value = totalAmount;
		document.getElementById('fld_btuamt').value = tax;
	  }
    }
  }
}

function popup_selector(ffval,burl,qname,ffname,bindfield1,bindfield2,bindfield3,bindfield4,bindfield5) {
  var bindval1 = (bindfield1 !='') ? document.getElementById(bindfield1).value : 999;
  var bindval2 =  (bindfield2 !='') ? document.getElementById(bindfield2).value : 999;
  var bindval3 =  (bindfield3 !='') ? document.getElementById(bindfield3).value : 999;
  var bindval4 = (bindfield4 !='') ? document.getElementById(bindfield4).value : 999;
  var bindval5 =  (bindfield5 !='') ? document.getElementById(bindfield5).value : 999;
  var w = window.open(burl + 'index.php/popup/selector?val='+ffval+'&qname='+qname+'&ffname='+ffname+'&bindval1='+bindval1+'&bindval2='+bindval2+'&bindval3='+bindval3+'&bindval4='+bindval4+'&bindval5='+bindval5,'CategorySearch','width=550,height=350,left=50,top=50,scrollbars=1,location=no');
  w.focus();
  return false;
}

function keyhandler(obj,e,max) {
  e = e || event;
  max = max || 50;
  var keycode = e.keyCode
  , len     = 0
  , This    = keyhandler
  , currlen = obj.value.length;
  if (currlen == 4) {	
    var currtext = document.getElementById('fld_btp29').value;
    document.getElementById('fld_btp29').value = currtext + " ";
  }
  if (!('countfld' in This)) {
        This.countfld = document.getElementById('counter');
  }
  if (keycode === 13) {
    return document.forms[0].submit();
  }
  if ((keycode == 32 || keycode>46) && currlen >= max) {
    This.countfld.innerHTML = 'maximum input length reached';
    return false;
  }
  len = (keycode==8 || (keycode===46) && obj.value.length<=max && currlen > 0)
  ? currlen-1
  : keycode <= 46
  ? currlen
  : currlen+1;
  This.countfld.innerHTML = (currlen <1 ? max : max-len) + ' characters left';
  return true;
}

function convertToUpper(obj) {
  obj.value=obj.value.toUpperCase();
}
    
function showProtect(val) {
  if (val.value == 1) {
    document.getElementById('fld_btp21').style.display = "block";
    document.getElementById('fld_btp21-trigger').style.display = "block";
    document.getElementById('fld_btp22').style.display = "block";
  }
  else {
    document.getElementById('fld_btp21').style.display = "none";
    document.getElementById('fld_btp21-trigger').style.display = "none";
    document.getElementById('fld_btp22').style.display = "none";
  }
}
   

// AJAX

function cekContainer() {
  var ajaxRequest;  // The variable that makes Ajax possible!
  try {
    // Opera 8.0+, Firefox, Safari
	ajaxRequest = new XMLHttpRequest();
  } 
  catch (e) {
  // Internet Explorer Browsers
    try {
      ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
	} 
    catch (e) {
	  try {
	    ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
	  } 
      catch (e) {
	    // Something went wrong
		alert("Your browser broke!");
		return false;
	  }
	}
  }
  // Create a function that will receive data sent from the server
  ajaxRequest.onreadystatechange = function() {
	if(ajaxRequest.readyState == 4) {
	var ajaxDisplay = document.getElementById('message');
	ajaxDisplay.innerHTML = ajaxRequest.responseText;
	if (ajaxRequest.responseText == '' ) {
	  document.getElementById("message").style.visibility = "hidden";  	  
	}
	else {
	  document.getElementById("message").style.visibility = "visible"; 
	  document.getElementById('fld_btp29').value = '';
	  document.getElementById('fld_btp29').focus();
	}
  }
}
	var contnum = document.getElementById('fld_btp29').value;
	var queryString = "fld_btp29=" + contnum;
	var base_url = document.getElementById('base_url').value;
	ajaxRequest.open("GET", base_url + "index.php/page/message/?" + queryString, true);
 	ajaxRequest.send(null); 
}

function cekBLOut(){
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server

	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			var ajaxDisplay = document.getElementById('message');
			
			ajaxDisplay.innerHTML = ajaxRequest.responseText;
			if (ajaxRequest.responseText == '' ) {
			  document.getElementById("message").style.visibility = "hidden";  	  
			}
			else {
			  document.getElementById("message").style.visibility = "visible"; 
			  document.getElementById('fld_btp29').value = '';
			  document.getElementById('fld_btp29').focus();
			}
		}
	}
	var book = document.getElementById('fld_btnoreff').value;
	var queryString = "fld_btnoreff=" + book;
	var base_url = document.getElementById('base_url').value;
	ajaxRequest.open("GET", base_url + "index.php/page/message_out/?" + queryString, true);
 	ajaxRequest.send(null); 
}

function form_search() {
var search_value = document.getElementById('form_search_value').value;
var base_url = document.getElementById('base_url').value;
window.location = base_url + "index.php/page/view/78000EIR/?fld_btp29=" + search_value + "&search=Search";
}

function countDays() {
var startTime=document.getElementById('fld_btdtsa').value;
var endTime=document.getElementById('fld_btdtso').value;
var startTime_pisah=startTime.split('-');
var endTime_pisah=endTime.split('-');
var objek_tgl=new Date();
var startTime_leave=objek_tgl.setFullYear(startTime_pisah[0],startTime_pisah[1],startTime_pisah[2]);
var endTime_leave=objek_tgl.setFullYear(endTime_pisah[0],endTime_pisah[1],endTime_pisah[2]);
var hasil=(endTime_leave-startTime_leave)/(60*60*24*1000);
document.getElementById('fld_btqty').value=(hasil)+1;
} 
function hideAdv() {
  window.document.getElementById("adv").style.visibility="hidden";
}

function unHideFile(ffname,mode) {
  var divid = ffname + '_attach';
  var ele = document.getElementById(divid);
  ele.style.display = "block";
  if (mode == 'delete') {
    document.getElementById(ffname).value = '';
    alert("Please save the form to completely remove attachment file(s)");  
  }
}

function pgoto(page) {
	var pg = page;
	document.getElementById("currentpage").value= pg;
	document.forms["spar"].submit();
	};
function order(ind,sorting) {
	document.getElementById("order").value= ind;
	document.getElementById("sorting").value= sorting;
	document.forms["spar"].submit();
	}; 
