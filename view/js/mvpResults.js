$(document).ready(function() {
	modificarJumbotron();
	
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
	
	masVotados();
});

function modificarJumbotron() {
	//cambio del texto del jumbotron
    $('.card').click(function(){
        titulo = $(this).find('h5').html();
        parrafo = $(this).find('.hidden').html();

        $('.jumbotron').find('h1').html(titulo);
        $('.jumbotron').find('p').html(parrafo);
    });
}

function activarConsulta() {
	//activar boton de registro
	$('#textoConsulta').keyup(function() {
		if ($("#textoConsulta").val()=="" || $("#textoConsulta").lenght ==0) {
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
	       	url: "https://cuatro.fpz1920.com/controller/usuarios/cBuscarUsuario.php", 
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
       	url:"https://cuatro.fpz1920.com/controller/usuarios/cBuscarCorreo.php", 
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
	   	url:"https://cuatro.fpz1920.com/controller/usuarios/cInsertUsuarios.php", 
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
	       	url:"https://cuatro.fpz1920.com/controller/cSessionVars.php", 
	       	dataType:"json",
	    	success:function(result) {
	    		sesionIniciada(result);
	    		window.location.href="vMvpResults.html";
			},
	       	error:function(xhr) {
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
       	url:"https://cuatro.fpz1920.com/controller/cSessionVerVars.php", 
       	dataType:"json",
    	success:function(result) {
    		console.log(result);
    		if(result!=0) {
    			sesionIniciada(result);
        		insertarConsulta(result);
    		}else {
    			insertarConsultaSinSesion(result);
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
	       	url:"https://cuatro.fpz1920.com/controller/cSessionLogout.php", 
	       	dataType:"text",
	    	success:function(result) {  
	    		alert("Vuelve pronto :)");
	    		window.location.href="vMvpResults.html";
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		}); 
	});
}

function insertarConsulta(result) {
	$("#btnConsulta").click(function() {
		comprobarUsuario()
		var idUsuario=result.idUsuario;
        var textoConsulta=$("#textoConsulta").val();
		
		$.ajax({
			type:"POST",
			data:{'idUsuario':idUsuario,'textoConsulta':textoConsulta},
	       	url:"https://cuatro.fpz1920.com/controller/consultas/cNuevaConsulta.php", 
	       	dataType:"text",
	    	success:function(result) {  
	    		alert("Consulta registrada :)");
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		}); 
	});
}

function insertarConsultaSinSesion(result) {
	$("#btnConsulta").click(function() {
		comprobarUsuario()
		var idUsuario=100;
        var textoConsulta=$("#textoConsulta").val();
		
		$.ajax({
			type:"POST",
			data:{'idUsuario':idUsuario,'textoConsulta':textoConsulta},
	       	url:"https://cuatro.fpz1920.com/controller/consultas/cNuevaConsulta.php", 
	       	dataType:"text",
	    	success:function(result) {  
	    		alert("Consulta registrada :)");
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		}); 
	});
}

function masVotados() {
	$.ajax({
		data:{},
       	url: "https://cuatro.fpz1920.com/controller/votos/cSeleccionarVotos.php", 
       	dataType:"json",
    	success:function(result) {
    		console.log(result);
    		
    		countGlobal=0;
    		countJunior=0;
    		countSenior=0;
    		countMaster=0;
    		
    		if (result != null) {
    			//generar cards de jugadores mas votados
    			newRowJunior="";
    			newRowSenior="";
    			newRowMaster="";
    			
    			for(i=0; i<result.length; i++) {
    				if(countGlobal < 10) {
    					if(result[i].idCategoria==1 && countJunior < 3) {
    						countJunior++;
    						
        					newRowJunior+="<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
        			        newRowJunior+="<div class='card mb-4 shadow-sm'>";
        			        newRowJunior+="<div class='card-body'>";
        					newRowJunior+="<h3 class='card-title'>#"+countJunior+"</h3>";
        					newRowJunior+="<img src="+result[i].objectJugador.imagen+" width='125px' height='125px'>";
        					newRowJunior+="<h4>"+result[i].objectJugador.nombre+"</h4>";
        					newRowJunior+="<h4>"+result[i].objectJugador.rol+"</h4>";
        					newRowJunior+="<h5>"+result[i].idVoto+" voto(s)</h5>";
        					newRowJunior+="</div>";
        					newRowJunior+="</div>";
        					newRowJunior+="</div>";
        					
        					$("#votosJunior").html(newRowJunior);

            		    }else if(result[i].idCategoria==2 && countSenior < 3) {
        					countSenior++;
        					
        					newRowSenior+="<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
        			        newRowSenior+="<div class='card mb-4 shadow-sm'>";
        			        newRowSenior+="<div class='card-body'>";
        			        newRowSenior+="<h3 class='card-title'>#"+countSenior+"</h3>";
        			        newRowSenior+="<img src="+result[i].objectJugador.imagen+" width='125px' height='125px'>";
        					newRowSenior+="<h4>"+result[i].objectJugador.nombre+"</h4>";
        					newRowSenior+="<h4>"+result[i].objectJugador.rol+"</h4>";
        			        newRowSenior+="<h5>"+result[i].idVoto+" voto(s)</h5>";
        					newRowSenior+="</div>";
        					newRowSenior+="</div>";
        					newRowSenior+="</div>";
        					
        					$("#votosSenior").html(newRowSenior);
            		    }else if(result[i].idCategoria==3 && countMaster < 3) {
        					countMaster++;
        					
        					newRowMaster+="<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
        			        newRowMaster+="<div class='card mb-4 shadow-sm'>";
        			        newRowMaster+="<div class='card-body'>";
        			        newRowMaster+="<h3 class='card-title'>#"+countMaster+"</h3>";
        			        newRowMaster+="<img src="+result[i].objectJugador.imagen+" width='125px' height='125px'>";
        					newRowMaster+="<h4>"+result[i].objectJugador.nombre+"</h4>";
        					newRowMaster+="<h4>"+result[i].objectJugador.rol+"</h4>";
        			        newRowMaster+="<h5>"+result[i].idVoto+" voto(s)</h5>";
        					newRowMaster+="</div>";
        					newRowMaster+="</div>";
        					newRowMaster+="</div>";
        					
        					$("#votosMaster").html(newRowMaster);
            		    }
    					countGlobal++;
    				}else {
    					i=result.length;
    				}   				
    			}    			
    		}
		},
       	error:function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   		}
	});
}