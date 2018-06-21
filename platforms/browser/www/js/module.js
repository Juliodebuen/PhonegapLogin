	var page;
	var username;



	document.addEventListener('init', function(event) {
	  page = event.target;

	  if (page.id === 'loginPage') {
	  	$("#push-button").click(function(){
  		//	service();
  			
  			login();
	  	});

	  	$("#register-button").click(function(){
	 		document.querySelector('#myNavigator').pushPage('registerPage.html', {data: {title: 'Crear cuenta'}});
	  	});
	    /*page.querySelector('#push-button').onclick = function() {
	      document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
	    };*/
	  } 
	  else if (page.id === 'mainPage') {
	    //page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
	 //  page.querySelector('#bienvenida').innerHTML = page.data.username;

	    document.getElementById('logout').onclick = logoutDialog;
	    /* function(event) {
		  // Reset the whole stack instead of popping 1 page
			logoutDialog();
		
		};*/

		//document.getElementById('menu-button').onclick = fn.open;
	  } 
	  else if(page.id = 'registerPage'){
	  	$('#confirm-register-button').click(function(){
  			register();
	  	});
	  }	 	
	});

	var register = function(){

		var user = document.getElementById('userRegister');
		var pass = document.getElementById('passRegister');
		var name = document.getElementById('nameRegister');

		var data = JSON.stringify({
			"name": name.value,
		  	"user": user.value,
		  	"pass": pass.value
		});

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
		  	createAlertDialog(this.responseText, "Mensaje");
		    console.log(this.responseText);
		  }
		});

		xhr.open("POST", "http://localhost:60308/PruebaService.svc/RegistroNombre");
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Postman-Token", "a84dec9b-d027-409e-a6f3-2bc629cc8532");

		xhr.send(data);
	};

	var login = function(){
		var user = document.getElementById('user');
		var pass = document.getElementById('pass');
		if(user.value.trim() == '' || pass.value.trim() == ''){
			ons.notification.alert("Asegurese de rellenar todos los campos");
		}else{				  
			var data = JSON.stringify({
				"user": user.value,
				"pass": pass.value
			});
			console.log(data);
			document.getElementById('user').value = "";
			document.getElementById('pass').value = "";
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function () {
			  if (this.readyState === 4) {
			    //console.log(this.responseText);
			    try{
			    	var obj = JSON.parse(this.responseText);
			    	obj = JSON.parse(obj);
			    	//alert(obj.userName);
			    	console.log(obj);
				    if(obj.Resultado){
				    	createAlertDialog(obj.Usuario , "Bienvenido(a)");
				    }else{
			   			ons.notification.alert("Usuario o contraseña incorrectos");
				    }
			    }catch(e){
			    	console.log(e);
			   		ons.notification.alert("ocurrio un error, intentelo de nuevo");
			    }
			  }
			});

			xhr.open("POST", "http://localhost:60308/PruebaService.svc/Login");
			xhr.setRequestHeader("Cache-Control", "no-cache");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Postman-Token", "a84dec9b-d027-409e-a6f3-2bc629cc8532");

			xhr.send(data);
		}
	};

/*

	var notify = function() {
		var user = document.getElementById('user');
		var pass = document.getElementById('pass');
		if(user.value.trim() == '' || pass.value.trim() == ''){
			ons.notification.alert("Asegurese de rellenar todos los campos");
		}else{				  
			var data = encodeURI("username="+user.value+"&password="+pass.value+"&grant_type=password");
			console.log(data);
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function () {
			  if (this.readyState === 4) {
			    console.log(this.responseText);
			    try{
			    	var obj = JSON.parse(this.responseText)
			    	//alert(obj.userName);
				    if(obj.hasOwnProperty('userName')){
				    	createAlertDialog(obj.userName , "Bienvenido(a)");
				    	
				    }
			    }catch(e){
			    	ons.notification.alert("ocurrio un error, intentelo de nuevo");
			    }
			    
			   // ons.notification.confirm(obj.userName);
			  }
			});

			xhr.open("POST", "https://qbitsticket.com:8443/oauth2/token");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Cache-Control", "no-cache");
			xhr.setRequestHeader("Postman-Token", "69816825-2579-49a7-9512-11dafa466be7");

			xhr.send(data);
		}
	}; */

	var createAlertDialog = function(username, title) {
		var dialog = document.getElementById('my-alert-dialog');
		this.username = username;
		if (dialog) {
			dialog.remove();
		}

    	ons.createElement('alert-dialog.html', { append: true })
		    .then(function(dialog) {
		      	document.getElementById('dialog-title').innerHTML = title;
		      	document.getElementById('content-dialog').innerHTML = username;
		        dialog.show();
		    }
	    );
		  
	};

	var logoutDialog = function() {
		var dialog = document.getElementById('my-logout-dialog');
	    this.username = username;
		if (dialog) {
			dialog.remove();
		 } 
	    ons.createElement('logout-dialog.html', { append: true })
	      .then(function(dialog) {
	        dialog.show();
	      });
		  
		 
	};

	var hideAlertDialog = function() {
	  document
	    .getElementById('my-alert-dialog')
	    .hide();
    	//alert(page.id);
    	switch(page.id){
    		case 'loginPage':
    			document.querySelector('#myNavigator').pushPage('mainPage.html', {
			 		data: {
			 			title: 'Menú principal',
		 				username : this.username
		 			}
		 		});
		 		break;
	 		case 'registerPage':
	 			page.id = 'loginPage';
	 			document.querySelector('#myNavigator').popPage();
	 			break;
    	}	 	

	 //	var template = document.getElementById("mainPage.html");//$('#mainPage.html');  acceder a elemento dentro de un template
	 	//var item = template.content.querySelectorAll("div");

      //  item[2].innerHTML = this.username;
	};

    var hideLogoutDialog = function(confirmar){
    	document.getElementById('my-logout-dialog').hide();
		if(confirmar){
			page.id = 'loginPage';
			document.querySelector("#myNavigator").popPage();
		}
    }
