$(document).ready(function() {	
	activarConsulta();
	
	confirmarLetras();
	
	confirmarCorreo();
	
	activarRegistro();
	
	comprobarUsuario();
	
	activarSesionInput();
	
	activarSesionCheck();
	
	comprobarSesion();
    
	iniciarSesion();

	cerrarSesion();
});

function activarConsulta() {
	//activar boton de registro
	$('#exampleFormControlTextarea1').keyup(function() {
		if ($("#exampleFormControlTextarea1").val()=="" || $("#exampleFormControlTextarea1").lenght ==0) {
			$('#btnConsulta').attr('disabled', 'disabled');
		}else {
			$('#btnConsulta').attr('disabled', false);
		}
	});
}

function confirmarLetras() {
	$("#nombreFormInsert").keypress(function(event) {
	    var codigo=event.which;
	    
	    if((codigo > 64 && codigo < 91) || (codigo > 96 && codigo < 123)) {
	    	return true;
	    }else {
	        return false;
	    }
	});
}

function confirmarCorreo() {
	$("#emailFormInsert").blur(function() {
	    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	    var correo=$("#emailFormInsert").val();
	    
	    if (emailRegex.test(correo)) {
	    	$("#emailFormInsert").css({'border':'1px solid green'});
	    }else {
	    	alert("Email no valido");
	    	$("#emailFormInsert").val("");
	    	$("#emailFormInsert").css({'border':'1px solid black'});
	    }
	});
}

function activarRegistro() {
	//activar boton de registro
	$('.datoRegistro').keyup(function() {
		if ($("#nombreFormInsert").val()=="" || $("#nombreFormInsert").lenght ==0 || 
			$("#emailFormInsert").val()=="" || $("#emailFormInsert").lenght==0 ||
			$("#usuarioFormInsert").val()=="" || $("#usuarioFormInsert").lenght==0 ||
			$("#passwordFormInsert").val()=="" || $("#passwordFormInsert").lenght==0) {
			
			$('#btnRegistro').attr('disabled', 'disabled');
			
		}else {
			$('#btnRegistro').attr('disabled', false);
		}
	});
}

function comprobarUsuario() {
	$("#btnRegistro").click(function() {
		var username=$("#usuarioFormInsert").val();
	
		$.ajax({
			data:{'username':username},
	       	url: "../controller/usuarios/cBuscarUsuario.php", 
	       	dataType:"text",
	    	success:function(result) {
	    		if (result==0) {
	    			comprobarCorreo();
	    		}else {
	    			alert ("El usuario ya existe");
	    		}
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		});
	});
}

function comprobarCorreo() {	
	var correo=$("#emailFormInsert").val();

	$.ajax({
		data:{'correo':correo},
       	url:"../controller/usuarios/cBuscarCorreo.php", 
       	dataType:"text",
    	success:function(result) {
    		if (result==0) {
    			registrarUsuario();
    		}else {
    			alert("El correo ya existe");
    		}
		},
       	error:function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   		}
	});
}

function registrarUsuario() {
	var nombre=$("#nombreFormInsert").val();
	var correo=$("#emailFormInsert").val();
	var usuario=$("#usuarioFormInsert").val();
	var contrasena=$("#passwordFormInsert").val();
	
	$.ajax({
		type:"POST",
		data:{'nombre':nombre,'correo':correo, 'usuario':usuario,'contrasena':contrasena},
	   	url:"../controller/usuarios/cInsertUsuarios.php", 
	   	dataType:"text",
		success:function(result) { 
	   		alert("Usuario insertado");
	   		
	   		$("#nombreFormInsert").val("");
	   		$("#emailFormInsert").val("");
	   		$("#usuarioFormInsert").val("");
	   		$("#passwordFormInsert").val("");
	   		$("#emailFormInsert").css({'border':'1px solid black'});
		},
	   	error:function(xhr) {
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
				
			$("#nombreFormInsert").val("");
	   		$("#emailFormInsert").val("");
	   		$("#usuarioFormInsert").val("");
	   		$("#passwordFormInsert").val("");
		}
	});
}

function activarSesionInput() {
	//activar boton de login
	$('.datoSesion').keyup(function() {
		if ($("#username").val()=="" || $("#username").lenght ==0 || 
			$("#password").val()=="" || $("#password").lenght==0) {
			
			$('#btnLogin').attr('disabled', 'disabled');
			
		}else {
			$('#customControlInline').click(function() {
				if($('#customControlInline').prop('checked')) {
					$('#btnLogin').attr('disabled', false);
				}else {
					$('#btnLogin').attr('disabled', 'disabled');
				}
			});
		}
	});  
}

function activarSesionCheck() {
	//activar boton de login
	$('.datoSesion').keyup(function() {
		if ($("#username").val()=="" || $("#username").lenght ==0 || 
			$("#password").val()=="" || $("#password").lenght==0) {
			
			$('#btnLogin').attr('disabled', 'disabled');
			
		}else {
			if($('#customControlInline').prop('checked')) {
				$('#btnLogin').attr('disabled', false);
			}else {
				$('#btnLogin').attr('disabled', 'disabled');
			}
		}
	});  
}

function iniciarSesion() {
	//datos del login
    $("#btnLogin").click(function() {	
		var username=$("#username").val();
        var password=$("#password").val();

		$.ajax({
			data:{'username':username,'password':password},
	       	url: "../controller/cSessionVars.php", 
	       	dataType:"json",
	    	success: function(result) {
	    		sesionIniciada(result);
	    		window.location.href="vPrincipal.html";
			},
	       	error : function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   			
	   			$("#username").val("");
       			$("#password").val("");
	   		}
		});
    });
}

function comprobarSesion() {
	$.ajax({
		data:{},
       	url:"../controller/cSessionVerVars.php", 
       	dataType:"json",
    	success:function(result) {
    		if(result!=0) {
    			sesionIniciada(result);
    		}
		},
       	error:function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   			
   			$("#username").val("");
   			$("#password").val("");
   		}
	});
}

function sesionIniciada(result) {
	if (result != 0) {
		//generar botones de admin, registro y login
		newRow="";
		
		if (result.admin==0) {
			newRow+="<ul class='navbar-nav mr-auto'>";
	        newRow+="<li class='nav-item'>";
	        newRow+="<a class='nav-link text-light' id='panelAdmin' href='vAdmin.html'>Panel Admin</a>";
			newRow+="</li>";
			newRow+="<li class='nav-item'>";
			newRow+="<a class='nav-link text-light' id='usuario'>"+ result.usuario +" </a>";
			newRow+="</li>";
			newRow+="<li class='nav-item'>";
			newRow+="<i class='text-light fas fa-sign-out-alt' id='cerrarSesion'></i>";
			newRow+="</li>";
			newRow+="</ul>";
		}else {
			newRow+="<ul class='navbar-nav mr-auto'>";
			newRow+="<li class='nav-item'>";
			newRow+="<a class='nav-link text-light' id='usuario'>"+ result.usuario +" </a>";
			newRow+="</li>";
			newRow+="<li class='nav-item'>";
			newRow+="<i class='text-light fas fa-sign-out-alt' id='cerrarSesion'></i>";
			newRow+="</li>";
			newRow+="</ul>";
		}
		$("#nombreUsuario").html(newRow);
		
        $('#nombreUsuario').show();
        $('.sesion').hide();
        
        $("#username").val("");
        
        cerrarSesion();
	}else {	
		$("#username").val("");
		$("#password").val("");
	}
}

function cerrarSesion() {
	$("#cerrarSesion").click(function() {	
		$.ajax({
	       	url:"../controller/cSessionLogout.php", 
	       	dataType:"text",
	    	success:function(result) {  
	    		alert("Vuelve pronto :)");
	    		window.location.href="vPrincipal.html";
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		}); 
	});
}