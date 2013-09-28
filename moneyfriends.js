var control="";
function tutorial(){
	alert("Say you are on a weekend with friends... you're a single and have already payed for the beer. Your best friend is a couple with no kids and has already payed for the apartment. Your sister has come alone with her 2 kids and accounts for three people. What's each friend supposed to pay to each other? We help you with that calculation.\n\nType for each friend/family:\n\n1) number of people\n\n2) money spent\n\n-> get the money to PAY/GET to each other");
}
function missatge(){
	if(localStorage.clickcount){
	
	}else{
	alert("Say you are on a weekend with friends... you're a single and have already payed for the beer. Your best friend is a couple with no kids and has already payed for the apartment. Your sister has come alone with her 2 kids and accounts for three people. What's each friend supposed to pay to each other? We help you with that calculation.\n\nType for each friend/family:\n\n1) number of people\n\n2) money spent\n\n-> get the money to PAY/GET to each other");
	}
}
function clickCounter(){
	//alert("hola clickCounter");
	if(typeof(Storage)!=="undefined"){
  		if (localStorage.clickcount){
    		localStorage.clickcount=Number(localStorage.clickcount)+1;
		}else{
    		localStorage.clickcount=1;
    	}
	}
}
function redireccionar() {
	setTimeout("location.href='moneyfriends1.html'", 1500);
}
function esborra(){
	console.log("Comença: esborra()");
	var tbl = document.getElementById('taula');
	var lastRow = tbl.rows.length-2;
	var linies=6*(lastRow-1);
	for (var i=0;i<linies;i++){
		if (document.forms[0].elements[i].value!="x"){
			document.forms[0].elements[i].value="";
			}
	}
	document.forms[0].elements[linies].value="";
	document.forms[0].elements[linies+1].value="";
	document.forms[0].elements[linies+2].value="";
	alert("passa per aquí");
	document.getElementById("results").innerHTML="<div id='quadreResults'><div id='h3Results'><br/>Who's paying who?...:<br/><br/><br/><br/><br/></div>";
	control="";
	console.log("Acaba: esborra()");
}
function valid(){
	console.log("Comença: valid()");
	var tbl = document.getElementById('taula');
	var lastRow = tbl.rows.length-2;
	console.log("lastRow="+lastRow);
	var a=0;
	var inputs=(lastRow-1)*6;
	for (var i=1;i<inputs;i=i+6){
		if (document.forms[0].elements[i].value=="" || document.forms[0].elements[i+1].value==""){
			if (control!="esborrat"){
				alert("Must enter ALL\n'num. of people' and '$'");
			}
			return;
		}
	}
	
	people=0;
	money=0;
	for (i=1;i<lastRow;i++){
		var a=parseFloat(eval("document.Form.people"+i+".value.replace(',','.')"));
		//var a=parseFloat(eval("document.Form.people"+i+".value"));
		people=people+a;
		var b=parseFloat(eval("document.Form.money"+i+".value.replace(',','.')"));
		console.log("b val: "+b);
		//var b=parseFloat(eval("document.Form.money"+i+".value"));
		if (isNaN(a) || isNaN(b)){
			alert("All 'Num. of people' and '$'\nmust be numbers");
			return;
		}
		if (a<0 || b<0){
			alert("All 'Num. of people' and '$'\nmust be positive");
			return;
		}
		money=money+b;
	}
	money=money.toFixed(2);
	
	var peop=people;
	people=people.toFixed(1);																//CANVI 2 a 1
	peop=peop.toFixed(0);
	if ((people-peop)==0){
		people=peop;
	}
	
	var mitja=money/people;
	mitja=mitja.toFixed(2);
	var missatge="pay ";

	var pagpositius=[];								
	var pagnegatius=[];								
	var pagnomfriendspositius=[];								
	var pagnomfriendsnegatius=[];
	var pagfriends;	
	var pagaments;									

	for (i=1;i<lastRow;i++){
		console.log("i="+i);
		a=parseFloat(eval("document.Form.people"+i+".value.replace(',','.')"));
		b=parseFloat(eval("document.Form.money"+i+".value.replace(',','.')"));
		b=b.toFixed(2);
		var plusmoney=b-a*mitja;
		
		pagaments=parseFloat(plusmoney.toFixed(2));
		if(eval("document.Form.friend"+i+".value")==""){
			pagfriends=eval("document.Form.friend"+i+".placeholder");
		}else{
			pagfriends=eval("document.Form.friend"+i+".value");
		}
		if(pagaments>=0){
			pagpositius.push(pagaments);													console.log("import friendpositiu: "+pagaments);
			pagnomfriendspositius.push(pagfriends);											console.log("nom friendpositiu: "+pagfriends);
		}else{
			//pagament=-pagaments;
			pagnegatius.push(pagaments);
			pagnomfriendsnegatius.push(pagfriends);
		}											
				
		if (plusmoney>0) {
			document.getElementById("resultat"+i).style.color="green";
		}else if (plusmoney<0) {
			document.getElementById("resultat"+i).style.color="red";
		}else {
			document.getElementById("resultat"+i).style.color="black";
		}
		if(lastRow==3 && i==1){
			var plusmoneyprevi=-plusmoney;													console.log("plusmoneyprevi: "+plusmoney);									
		}
		if (plusmoney>0){missatge="";}
		if (plusmoney<0){missatge="";plusmoney=-plusmoney;}
		if (plusmoney==0){missatge="";}
		//if (plusmoney>0){missatge="";}
		//if (plusmoney<0){missatge="";plusmoney=-plusmoney;}
		//if (plusmoney==0){missatge="";}
		
		plusmoney=plusmoney.toFixed(2);
		var total=a*mitja;
		total=total.toFixed(2);
		if(lastRow==3 && i==1){	
			var pluscontrol1=plusmoney;/*NOU*/												console.log("lastRow=3 & i=1");
																							console.log("pluscontrol1=plusmoney: "+pluscontrol1);
		}							
		var j=i;
		i=3+6*(i-1);
		if(lastRow==3 && j==2 && pluscontrol1!=plusmoney){
			var controler=1;
			plusmoney=pluscontrol1;															console.log("lastRow=3 & i=2 & pluscontrol1<>plusmoney");
																							console.log("plusmoney=pluscontrol1: "+plusmoney);
																							console.log("plusmoneyprevi: "+plusmoneyprevi);
			total=b-plusmoneyprevi;	
			total=total.toFixed(2);															console.log("total=b-plusmoneyprevi: "+total);
		}																		
		
		var aop=a;
		a=a.toFixed(1);																		//CANVI 2 a 1
		aop=aop.toFixed(0);
		if ((a-aop)==0){
			a=aop;
		}
		
		var plus=String(missatge)+String(plusmoney);
		document.forms[0].elements[i].value=plus;
		document.forms[0].elements[i+1].value=total;
		document.forms[0].elements[i-1].value=b;
		document.forms[0].elements[i-2].value=a;
		i=j;
	}
																							console.log("pagpositius: "+pagpositius);						
																							console.log("pagnegatius: "+pagnegatius);
	
	var z=0, w=0, j=0, p=0, ctrl=0, pagos, pendent=0, s, text="Who's paying who?...", texto="<div id='quadreResults'><div id='h3Results'><br/>Who's paying who?...</div>";					
	for(i=0;i<pagnegatius.length;i++){														console.log("nova i: "+i);
		if(eval("pagnegatius["+i+"]")==0){
			i++;
		}
		z=-parseFloat(eval("pagnegatius["+i+"]")).toFixed(2);								//console.log("z: "+z);
		while(z>0 && j<pagpositius.length){													//console.log("While z>0");
			w=z;																			//console.log("w: "+w);
			if(pendent>0){																	console.log("pendent>0: "+pendent);
				s=pendent;																	//console.log("s:"+s+"=pendent:"+pendent);
				if(j==pagpositius.length-1 && i==pagnegatius.length-1){s=w}					//console.log("ultims i,j: s=w= "+w);
			}else{																			console.log("j: "+j);
																							console.log(parseFloat(eval("pagpositius["+j+"]")));
																							console.log("PASSA PER AQUÍ");
				if(parseFloat(eval("pagpositius["+j+"]"))==0){								//console.log("pagpositiu=0? pagpositiu: "+pagpositiu);
					pagos=eval("pagnomfriendspositius["+j+"]")+" pays nothing";				console.log(pagos);
					text=text+"\n\n"+pagos;
					texto=texto+"<br/><div>"+pagos+"</div>";
					var y=j;
					j++;
				}
				s=parseFloat(eval("pagpositius["+j+"]"));									//console.log("No hi ha pendent...s: "+s);
			}
			z=z-s;																			//console.log("z: "+z);
			if(z>=0){																		//console.log("z>=0");																			//console.log("p abans toFixed(2): "+p);
				p=s;
				p=p*1;
				p=p.toFixed(2);																//console.log("p despres toFixed(2): "+p);
				if(pluscontrol1){p=pluscontrol1}
				pagos=eval("pagnomfriendsnegatius["+i+"]")+" pays "+p+" to "+eval("pagnomfriendspositius["+j+"]");
				text=text+"\n\n"+pagos;														console.log(pagos);
				texto=texto+"<br/><div>"+pagos+"</div>";	
				pendent=0;
				j++;																		//console.log("j: "+j);
			}else{																			//console.log("z<0");
				if(j==pagpositius.length-1 && i==pagnegatius.length-1 && pendent==0){		//NOUNOU des d'aquí...
					p=s;
				}else{																		//...fins aquí NOUNOU
					p=w;
				}
				p=p*1;
				p=p.toFixed(2);
				pendent=-z;																	//console.log("Hi ha pendent: "+pendent);
				pagos=eval("pagnomfriendsnegatius["+i+"]")+" pays "+p+" to "+eval("pagnomfriendspositius["+j+"]");
				text=text+"\n\n"+pagos;														console.log(pagos);
				texto=texto+"<br/><div>"+pagos+"</div>";
			}
																							//console.log("z té: "+z);
																							//console.log("j: "+j);
																							//console.log("pagpositius.length: "+pagpositius.length);
		}
	}																						console.log("j: "+j);
																							console.log("pagpositius.length-1: "+(pagpositius.length-1));
	for(j=1;j<=pagpositius.length;j++){														console.log("pagpositius[+j+]: "+parseFloat(eval("pagpositius["+j+"]")));
		if(parseFloat(eval("pagpositius["+j+"]"))==0 && j!=y){								//console.log("pagpositiu=0? pagpositiu: "+pagpositiu);
			pagos=eval("pagnomfriendspositius["+j+"]")+" pays nothing";						console.log(pagos);
			text=text+"\n\n"+pagos;
			texto=texto+"<div>"+pagos+"</div>";
		}	
	}																						//console.log("i: "+i);	
	
	document.forms[0].people.value=people;
	document.forms[0].money.value=money;
	document.forms[0].mitja.value=mitja;
	control="";
	document.getElementById("results").innerHTML=texto+"<br/></div><br/><br/>";
	console.log("Acaba: valid()");
}
function addLine(){
	console.log("Comença: addLine()");
	var tbl = document.getElementById('taula');
	var lastRow = tbl.rows.length-2;
	//alert(lastRow);
	var row = tbl.insertRow(lastRow);
	var amic = row.insertCell(0);
	var numero = row.insertCell(1);
	var dolar = row.insertCell(2);
	var payget = row.insertCell(3);
	var total = row.insertCell(4);
	var equis = row.insertCell(5);
	
	amic.id="amic";
	numero.id="numero";
	dolar.id="dolar";
	payget.id="payget";
	total.id="total";
	
	var nounom='friend'+lastRow;
	var lastFriend=parseInt(document.getElementById("amagat").innerHTML);
	if(document.getElementById("amagat").innerHTML==""){
		lastFriend=1;
	}else{
		lastFriend=lastFriend+1;
	}
	var noufriend='friend'+lastFriend;
	amic.innerHTML="<input type='text' class='friend' id="+nounom+" placeholder="+noufriend+" name="+nounom+" size='6' maxlength='8' autocomplete='off'>";
	
	document.getElementById("amagat").innerHTML=lastFriend;
	
	nounom='people'+lastRow;
	numero.innerHTML="<input type='number' class='people' id="+nounom+" name="+nounom+" size='3' autocomplete='off'>";	
	//numero.outerHTML="<td>hola</td>";
	//numero.style="background-color:red";
	
	nounom='money'+lastRow;
	dolar.innerHTML="<input type='number' class='money' id="+nounom+" name="+nounom+" size='6' autocomplete='off'>";
	
	nounom='resultat'+lastRow;
	payget.innerHTML="<input type='text' class='resultat' readonly id="+nounom+" name="+nounom+" size='6' style='background:#EAF2D3;border:none' autocomplete='off'>";

	/*nounom='total'+lastRow;
	total.innerHTML="<input type='text' class='total' readonly id="+nounom+" name="+nounom+" size='5' style='background:#EAF2D3;border:none' autocomplete='off'>";
	*/
	nounom='total'+lastRow;
	total.innerHTML="<input type='text' class='total' readonly id="+nounom+" name="+nounom+" size='6' style='width:0px; border:none' autocomplete='off'>";
	total.style.visibility="hidden";

	nounom='boto'+lastRow;
	equis.innerHTML="<input type='text' class='equisbutton' readonly id="+nounom+" name="+nounom+" value='x' onclick='esborrarLinia(this)'>";
	
	var tbl = document.getElementById('taula');
	var lastRow = tbl.rows.length-2;
	var linia=5+(lastRow-2)*6;
	var a=document.forms[0].elements[linia].parentElement;
	a.id="boton";
	control="";
	console.log("Acaba: addLine()");
}
function esborrarLinia(x){
	console.log("Comença: esborrarLinia()");
	var y=x.parentElement.parentElement;
	fila=x.parentElement.parentElement.rowIndex;//Ara hem de buscar el número de fila
	
	var table = document.getElementById('taula');
	var lastRow = table.rows.length-2;
	var elementsTaula=(lastRow-1)*6;
	console.log("JUSTlastRow="+lastRow);
	if (lastRow>3){
		console.log("PASSA PER AQUÍ!!");
		table.deleteRow(y.rowIndex);
		var j=1;
		for(var i=0;i<(elementsTaula-6);i=i+6){
			console.log("i="+i);
			document.forms[0].elements[i].name="friend"+j;
			document.forms[0].elements[i].id="friend"+j;
			console.log("friend+j=friend"+j);
			document.forms[0].elements[i+1].name="people"+j;
			document.forms[0].elements[i+1].id="people"+j;
			console.log("people+j=people"+j);
			document.forms[0].elements[i+2].name="money"+j;
			document.forms[0].elements[i+2].id="money"+j;
			console.log("money+j=money"+j);
			document.forms[0].elements[i+3].name="resultat"+j;
			document.forms[0].elements[i+3].id="resultat"+j;
			console.log("document.forms[0].elements[i+3].name="+document.forms[0].elements[i+3].name);
			document.forms[0].elements[i+4].name="total"+j;
			document.forms[0].elements[i+4].id="total"+j;
			console.log("total+j=total"+j);
			document.forms[0].elements[i+5].name="boto"+j;
			document.forms[0].elements[i+5].id="boto"+j;
			console.log("boto+j=boto"+j);
			j=j+1;
			console.log("j="+j);
		}
		control="esborrat";
		console.log("Marxa de: esborrarLinia");
		valid();
	}else if (x.name=="boto1") {
		console.log("x.name="+x.name);
		document.Form.elements[0].value="";
		document.Form.elements[1].value="";
		document.Form.elements[2].value="";
		document.Form.elements[3].value="";
		document.Form.elements[4].value="";
		document.Form.elements[9].value="";
		document.Form.elements[10].value="";
		document.Form.elements[12].value="";
		document.Form.elements[13].value="";
		document.Form.elements[14].value="";
		document.getElementById("results").innerHTML="<div id='quadreResults'><div id='h3Results'><br/>Who's paying who?...</div><br/><br/><br/><br/><br/></div>"
	}else if(x.name=="boto2"){
		console.log("x.name="+x.name);
		document.Form.elements[3].value="";
		document.Form.elements[4].value="";
		document.Form.elements[6].value="";
		document.Form.elements[7].value="";
		document.Form.elements[8].value="";
		document.Form.elements[9].value="";
		document.Form.elements[10].value="";
		document.Form.elements[12].value="";
		document.Form.elements[13].value="";
		document.Form.elements[14].value="";
		document.getElementById("results").innerHTML="<div id='quadreResults'><div id='h3Results'><br/>Who's paying who?...</div><br/><br/><br/><br/><br/></div>"
	}
	control="";
	console.log("Acaba: esborrarLinia()");
}
function resetea(){
	document.getElementById("amagat").innerHTML="";
	var tbl = document.getElementById('taula');
	var lastRow = tbl.rows.length-2;
	var lastRowTable=lastRow-1;
	console.log("lastRow="+lastRow);
	console.log("lastRowTable="+lastRowTable);
	var x=document.getElementById("boto"+lastRowTable);
	console.log("boto="+x);
	var y=x.parentElement.parentElement;
	console.log("y="+y);
	console.log("y.rowIndex="+y.rowIndex);
	var elementsTaula=(lastRowTable)*6;
	while (lastRow>1){
		console.log("PASSA PER AQUÍ!!");
		tbl.deleteRow(lastRowTable);
		lastRow = tbl.rows.length-2;
		lastRowTable=lastRow-1;
		console.log("ara la lastRow es..."+lastRow);
	}
	document.getElementById("people").value="";
	document.getElementById("money").value="";
	document.getElementById("despesaxpersona").value="";
	document.getElementById("results").innerHTML="<div id='quadreResults'><div id='h3Results'><br/>Who's paying who?...</div><br/><br/><br/><br/><br/>"
	addLine();
	addLine();
	control="";
	console.log("Reset fet");
}