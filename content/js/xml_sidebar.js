var DPRXML = {
	updateHierarchy:function (depth){ // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all

		document.activeElement.blur();
		
		var nikaya = document.getElementById('set').value;
		var book = document.getElementById('book').value;
		var bookload = 'xml/' + nikaya + book + G_hier + '.xml';
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var meta = (depth > 0  ? document.getElementById('meta').selectedIndex : 0);
		var volume = (depth > 1 ? document.getElementById('volume').selectedIndex : 0);
		var vagga = (depth > 2 ? document.getElementById('vagga').selectedIndex : 0);
		var sutta = (depth > 3 ? document.getElementById('sutta').selectedIndex : 0);


		var nik = document.getElementById('set').value;
		var book = document.getElementById('book').value;

		var xml,axml,lista,list,name,namea;
		
		axml = xmlDoc.getElementsByTagName("ha");
		namea = axml[0].getElementsByTagName("han");
		if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); 
		else name = this.unnamed;
		var outname = translit(toUni(name));
		document.getElementById('title').label = outname;
			
		var u = xmlDoc.getElementsByTagName("h0");
		var v = u[meta].getElementsByTagName("h1");
		var w = v[volume].getElementsByTagName("h2");
		var x = w[vagga].getElementsByTagName("h3");
		var y = x[sutta].getElementsByTagName("h4");


		switch(true) {
			case (depth == 0): // remake meta list
				lista = this.makeTitleSelect(u,'h0n');

				var listNode = document.getElementById('meta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.collapsed = true;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 2): // remake volume list
				lista = this.makeTitleSelect(v,'h1n');
				var listNode = document.getElementById('volume');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.collapsed = true;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.collapsed = false;
				}
				listNode.selectedIndex = 0;

			case  (depth < 3): // remake vaggalist
				lista = this.makeTitleSelect(w,'h2n');
				var listNode = document.getElementById('vagga');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.collapsed = true;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 4): // remake sutta list on depth = 0, 2, or 3
				lista = this.makeTitleSelect(x,'h3n');
				var listNode = document.getElementById('sutta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.collapsed = true;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			default: // remake section list

				lista = this.makeTitleSelect(y,'h4n');

				listNode = document.getElementById('section');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.collapsed = true;
				}
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			break;
		}

	// decide whether to load section
	
		switch(true) {
			case (depth == 1): 
				if(v.length == 1 && w.length == 1 && x.length == 1 && y.length == 1) DPRSend.importXML();
			break;
			case  (depth == 2): 
				if(w.length == 1 && x.length == 1 && y.length == 1) DPRSend.importXML();
			break;
			case  (depth == 3): 
				if(x.length == 1 && y.length == 1) DPRSend.importXML();
			break;
			case  (depth == 4): 
				if(y.length == 1) DPRSend.importXML();
			break;
		}
	},

	makeTitleSelect:function(xml,tag) { // output menupopup tag with titles in menuitems
		var name, namea;
		var outlist = [];
		for (var a = 0; a < xml.length; a++)
		{
			name = xml[a].getElementsByTagName(tag);
			if (name[0].childNodes[0] && name[0].textContent.replace(/ /g,'').length > 0) namea = name[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
			else {
				namea = this.unnamed;
				outlist.push(namea);
				continue;
			}
			
			namea = translit(toUni(namea));

			outlist.push(namea);
		}
		return outlist;
	},

	unnamed:'[unnamed]',
}