var EquipoN,NombreTabla,ContenidoTablas,cantidad,linea,Tabla,clase,datosEncontrados;
var idModificar=-1;
var roles=[];
var elementosValidar="";
var equiposInput=[];
var categorias=[];
var users=[];
var LoopTimes=0;
var datosInsert=[];
var cantidadInsert=-1;
var obj = {};//creamos un objeto vacio
var siguienteInsert=false;
var midato= new Object();
var equipos = [];
var m;// variable utilizada en frontal para sacar los tipos
$(document).ready(function(){
	/*INICIO DE CREAR TABLAS */
	comprobarSesion();
	
	
	iniciarJAdmin(); //Mostrar datos de la tabla de jugadores por equipos

	iniciarEqAdmin(); //Mostrar datos de la tabla de equipos
    
    iniciarEnAdmin(); //Mostrar datos de la tabla de entrenadores
    
    iniciarCaAdmin(); //Mostrar datos de la tabla de categorias

    iniciarCoAdmin(); //Mostrar datos de la tabla de consultas

    iniciarUAdmin(); //Mostrar datos de la tabla de usuarios
	/*FIN DE CREAR TABLAS */
    
    aparicionTablas();

});//FIN DEL DOCUMENT READY

function comprobarSesion() {
	$.ajax({
		data:{},
       	url:"../controller/cSessionVerVars.php", 
       	dataType:"json",
    	success:function(result) {
    		sesionIniciada(result);
		},
       	error:function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   		}
	});
}

function sesionIniciada(result) {
	if (result != 0) {
		//generar botones de admin, registro y login
		var newRow="";
		
		if (result.admin==0) {
			newRow+="<a class='' id='usu'>"+ result.usuario +" </a>";
			newRow+="<i class='fas fa-sign-out-alt' id='cerrarSesion'></i>";

		}else {

			newRow+="<a class='' id='usu'>"+ result.usuario +" </a>";
			newRow+="<i class='fas fa-sign-out-alt' id='cerrarSesion'></i>";

		}
		$(".link_Admin_vAdmin").html(newRow);
        
        cerrarSesion();
	}else {	
		$(location).attr('href','../index.html');
	}
}

function cerrarSesion() {
	$("#cerrarSesion").click(function() {	
		$.ajax({
	       	url:"../controller/cSessionLogout.php", 
	       	dataType:"text",
	    	success:function(result) {  
	    		alert("Vuelve pronto :)");
	    		window.location.href="../index.html";
			},
	       	error:function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		}); 
	});
}


/*INICIO DE INICIAR LAS TABLAS EN LA VISTA ADMIN*/
function iniciarJAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/jugadores/cSeleccionarJugadores.php",
        success: function(datosJugadores){
        	
        	miDatosJugadores=JSON.parse(datosJugadores);
        	ContenidoTablas="";
        	$.each(miDatosJugadores,function(i,datosJugadores){
				var equipoClass=datosJugadores.objectEquipo.nombre.replace(/ /g, "");
				/*recogemos los nombres de los equipos (y les quitamos los espacios) y comprobramos si están en 
				 * el array equipos, en caso de no estar entra en el if y se añade al array el nombre del 
				 * equipo sin espacios*/
				if(!equipos.includes(equipoClass)){
					ContenidoTablas+=`<div class="JugadoresEquiposTitulo paneles `+equipoClass+` " ><div class="titulo_boton"><div class="tituloEquipo"><h2>`+datosJugadores.objectEquipo.nombre+`</h2></div></div><div class="divTablaAdmin scrollAuto"><div class="insertButton" ><button type="button" >+NUEVOS JUGADORES</button></div><table class="rellenoAdminJugadoresEquipos"></table></div></div>`;
	 				equipos.push(equipoClass);//añadimos el nombre del equipo al array
				}
				/*LLAMADA A LA FUNCION PARA INSERTAR EN CUALQUIER TABLA LAS LINEAS QUE EL ADMINISTRADOR DESEE*/
	        	/*LO PONEMOS AQUI PORQUE AQUI SE GENERA EL BOTON DE JUGADORES POR EQUIPOS(si no solo iria en las demas tablas)*/
        	});//AQUI TERMINA EL GENERADOR DE LOS TITULOS DE LOS EQUIPOS POR JUGADORES
			$("#JugadoresPorEquipos").html(ContenidoTablas);
        	botonInsertAdmin();//boton para insertar nuevas lineas en cualquiera de las tablas

	 		for(var i=0;i<equipos.length;i++){
	 			var equipo=equipos[i];
	
	 		    $("."+equipos[i]+" .titulo_boton").click(function(){//cuando clicke en alguno de los titulos de los equipos(tabla jugadores)
	 		    	var NombreEquipo=$(this).parent().attr("class");//recogemos las clases del padre
	 		    	
	 		    	NombreEquipo=NombreEquipo.split(" ");//guardamos como array las clases del padre
	 		    	EquipoN =NombreEquipo[2];
	 		    	/*recogemos la clase que esta en el index 2 es decir, en la tercera posicion, 
	 		    	 * ya que siempre será el nombre del equipo*/
	 				
	 		    	$(window).scrollTop(0);
	 				var visibilidadJugadores=$("."+EquipoN+" .divTablaAdmin").is(`:visible`);
		    		$(".JugadoresE").html("");//eliminamos los jugadores creados anteriormente

	 				if(visibilidadJugadores){
	 					$(".divTablaAdmin").hide(800);
	 				}else{
	 					$(".divTablaAdmin").hide(800);
	 	 		    	$("."+EquipoN+" .divTablaAdmin").show(1200);//mostramos la tabla de jugadores del equipo en el que hemos clickado
	 	 				$(".panelJ .divTablaAdmin .rellenoAdminJugadoresEquipos").css({"margin-top":"50px", "margin-bottom": "50px"});
	 	 				$(".panelJ .titulo_boton").css({"border-bottom":"1px solid black", "background-color":"gray"});
	 				}
	 				ContenidoTablas="<tr><th>IDJUGADOR</th><th>NOMBRE</th><th>IMAGEN</th><th>ROL</th><th>TELEFONO</th><th>EQUIPO</th><th>ACCION</th></tr>";
	 	        	NombreTabla="jugadores";

	 				$.each(miDatosJugadores,function(i,datosJugadores){
	 					var equipoJugador=datosJugadores.objectEquipo.nombre.replace(/ /g, "");
	 					//volvemos a recoger el nombre del equipo
	 					 					
	 		    		if(equipoJugador==EquipoN){//si son jugadores del equipo clickado, entra en el if
	 		    			$(".JugadoresEquipos").css("background-color","white!important");
	 		    			ContenidoTablas+=`<tr class="JugadoresE"><td>`+datosJugadores.idJugador+`</td><td>`+datosJugadores.nombre+`</td><td><img src="`+datosJugadores.imagen+`" style="width:100px; height:auto;"></td><td>`+datosJugadores.rol+`</td><td>`+datosJugadores.telefono+`</td><td>`+datosJugadores.objectEquipo.nombre+`</td><td><div onclick="editarElemento(`+datosJugadores.idJugador+`,'`+NombreTabla+`')" style="display:inline-block" class="editar" id="`+datosJugadores.idJugador+`"><i class="fas fa-edit"></i></div><div onclick="borrarElemento(`+datosJugadores.idJugador+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosJugadores.idJugador+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;
	 		    			
	 		    		}
	 		    	});
	 		    	$("."+EquipoN+" .rellenoAdminJugadoresEquipos").html(ContenidoTablas);
	 		    });//FIN DEL EVENTO DE CLICKAR EN LOS EQUIPOS DENTRO DE LA TABLA JUGADORES
	 		}
        },
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });//FIN DEL AJAX DE GENERAR LA TABLA DE JUGADORES (POR EQUIPOS)
}//FIN DEL INICIAR LA FUNCION DE CREAR JUGADORES (POR EQUIPOS)

function iniciarEqAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/equipos/cSeleccionarEquipos.php",
        success: function(datosEquipos){

        	miDatosEquipos=JSON.parse(datosEquipos);
        	ContenidoTablas=`<tr><th>IDEQUIPO</th><th>NOMBRE</th><th>LOGO</th><th>CATEGORIA</th><th>ACCION</th></tr>`;
        	NombreTabla="equipos";
        	$.each(miDatosEquipos,function(i,datosEquipo){
        		ContenidoTablas+=`<tr><td>`+datosEquipo.idEquipo+`</td><td>`+datosEquipo.nombre+`</td><td><img src="`+datosEquipo.logo+`" style="width:100px; height:auto;"></td><td>`+datosEquipo.objectCategoria.nombre+`</td><td><div onclick="editarElemento(`+datosEquipo.idEquipo+`,'`+NombreTabla+`')" style="display:inline-block" class="editar" id="`+datosEquipo.idEquipo+`"><i class="fas fa-edit"></i></div><div onclick="borrarElemento(`+datosEquipo.idEquipo+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosEquipo.idEquipo+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;
 			
        	});//FIN DE GENERAR LA TABLA DE EQUIPOS
        	$(".panelEq .divTablaAdmin table").html(ContenidoTablas);	
 		},
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
	});//FIN DEL AJAX DE GENERAR LA TABLA EQUIPOS
}//FIN DEL INICIAR LA FUNCION DE CREAR EQUIPOS

function iniciarEnAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/entrenadores/cSeleccionarEntrenadores.php",
        success: function(datosEntrenadores){
        	
        	miDatosEntrenadores=JSON.parse(datosEntrenadores);
        	ContenidoTablas=`<tr><th>IDENTRENADOR</th><th>NOMBRE</th><th>IMAGEN</th><th>TELEFONO</th><th>EQUIPO</th><th>ACCION</th></tr>`;
        	NombreTabla="entrenadores";
        	$.each(miDatosEntrenadores,function(i,datosEntrenador){
				ContenidoTablas+=`<tr><td>`+datosEntrenador.idEntrenador+`</td><td>`+datosEntrenador.nombre+`</td><td><img src="`+datosEntrenador.imagen+`" style="width:100px; height:auto;"></td><td>`+datosEntrenador.telefono+`</td><td>`+datosEntrenador.objectEquipo.nombre+`</td><td><div onclick="editarElemento(`+datosEntrenador.idEntrenador+`,'`+NombreTabla+`')" style="display:inline-block" class="editar" id="`+datosEntrenador.idEntrenador+`"><i class="fas fa-edit"></i></div><div onclick="borrarElemento(`+datosEntrenador.idEntrenador+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosEntrenador.idEntrenador+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;

 			});//FIN DE GENERAR LA TABLA DE ENTRENADORES
        	$(".panelEn .divTablaAdmin table").html(ContenidoTablas);
       	},
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });//FIN DEL AJAX DE GENERAR LA TABLA ENTRENADORES
}//FIN DEL INICIAR LA FUNCION DE CREAR ENTRENADORES

function iniciarCaAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/categorias/cSeleccionarCategorias.php",
        success: function(datosCategorias){
        	
        	miDatosCategorias=JSON.parse(datosCategorias);
        	ContenidoTablas=`<tr><th>IDCATEGORIA</th><th>NOMBRE</th><th>IMAGEN</th><th>ACCION</th></tr>`;
        	NombreTabla="categorias";
        	$.each(miDatosCategorias,function(i,datosCategoria){
        		ContenidoTablas+=`<tr><td>`+datosCategoria.idCategoria+`</td><td>`+datosCategoria.nombre+`</td><td><img src="`+datosCategoria.imagen+`" style="width:100px; height:auto;"></td><td><div onclick="editarElemento(`+datosCategoria.idCategoria+`,'`+NombreTabla+`')" style="display:inline-block" class="editar" id="`+datosCategoria.idCategoria+`"><i class="fas fa-edit"></i></div><div onclick="borrarElemento(`+datosCategoria.idCategoria+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosCategoria.idCategoria+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;
 				
 			});//FIN DE GENERAR LA TABLA DE CATEGORIAS
        	$(".panelCa .divTablaAdmin table").html(ContenidoTablas);
       	},
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });//FIN DEL AJAX DE GENERAR LA TABLA CATEGORIAS
}//FIN DEL INICIAR LA FUNCION DE CREAR CATEGORIAS

function iniciarCoAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/consultas/cSeleccionarConsultas.php",
        success: function(datosConsultas){
        	
        	miDatosConsultas=JSON.parse(datosConsultas);
        	ContenidoTablas=`<tr><th>IDCONSULTA</th><th>CONSULTA</th><th>USUARIO</th><th>ACCION</th></tr>`;
        	NombreTabla="consultas";
        	$.each(miDatosConsultas,function(i,datosConsultas){
        		ContenidoTablas+=`<tr><td>`+datosConsultas.idConsulta+`</td><td>`+datosConsultas.consulta+`</td><td>`+datosConsultas.objectUsuario.usuario+`</td><td><div onclick="borrarElemento(`+datosConsultas.idConsulta+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosConsultas.idConsulta+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;
 				
 			});//FIN DE GENERAR LA TABLA DE CONSULTAS
        	$(".panelCo .divTablaAdmin table").html(ContenidoTablas);
       	},
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });//FIN DEL AJAX DE GENERAR LA TABLA CONSULTAS
}//FIN DEL INICIAR LA FUNCION DE CREAR CONSULTAS

function iniciarUAdmin(){
	$.ajax({
        type:"JSON",
        url:"../controller/usuarios/cSeleccionarUsuarios.php",
        success: function(datosUsuarios){
        	
        	miDatosUsuarios=JSON.parse(datosUsuarios);
//        	console.log(miDatosUsuarios);
	    	ContenidoTablas=`<tr><th>IDUSUARIO</th><th>USUARIO</th><th>CONTRASENA</th><th>NOMBRE</th><th>CORREO</th><th>TIPO</th><th>ACCION</th></tr>`;
	    	NombreTabla="usuarios";	
	 		$.each(miDatosUsuarios,function(i,datosUsuarios){
	 			ContenidoTablas+=`<tr><td>`+datosUsuarios.idUsuario+`</td><td>`+datosUsuarios.usuario+`</td><td>`+datosUsuarios.contrasena+`</td><td>`+datosUsuarios.nombre+`</td><td>`+datosUsuarios.correo+`</td><td>`+datosUsuarios.tipo+`</td><td><div onclick="editarElemento(`+datosUsuarios.idUsuario+`,'`+NombreTabla+`')" style="display:inline-block" class="editar" id="`+datosUsuarios.idUsuario+`"><i class="fas fa-edit"></i></div><div onclick="borrarElemento(`+datosUsuarios.idUsuario+`,'`+NombreTabla+`')" style="display:inline-block" class="borrar" id="`+datosUsuarios.idUsuario+`"><i class="fas fa-trash-alt" ></i></div></td></tr>`;
	 				
	 			});//FIN DE GENERAR LA TABLA DE USUARIOS	
	 		$(".panelU .divTablaAdmin table").html(ContenidoTablas);
		},
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
		
    });//FIN DEL AJAX DE GENERAR LA TABLA USUARIOS
	}//FIN DEL INICIAR LA FUNCION DE CREAR USUARIOS
/*FIN DE INSERTAR DATOS EN LAS TABLAS DESDE VADMIN */

/*INICIO DE AL CLICKCAR QUE APAREZCA LA TABLA CORRESPONDIENTE Y SE ESCONDAN LAS OTRAS*/
function aparicionTablas(){
	$(".titulo_boton div").click(function(){
		contador=0;
		//Al clickar en cualquier nombre de tabla, se esconden todas y se les cambia el fondo y el margen
		$(".divTablaAdmin").hide(800);
		$(".divTablaAdmin").css("margin","0px");
		$(".titulo_boton").css({"border-bottom":"0px","background-color":"white"});
	
		//hemos creado un array con el nombre de las tablas
		var TablasPrograma=["jugadores","equipos","entrenadores","categorias","consultas","usuarios"];
		clase=$(this).parent().parent().attr(`class`);//recogemos la clase de el div abuelo del titulo de la tabla
		clases=clase.split(" "); //convertimos la clase en un array separandolo por sus clases 
		var encontrarClase=false; //creamos variable para saber si ha encontrado la clase con el mismo nombre que alguna de las tablas
		var index=0;
		while(encontrarClase==false){
			
			if(clases.indexOf(TablasPrograma[index])!=-1){ 
			/*Aqui busca en el array clases cada campo del array de las tablas, si no lo encuentra será -1 siempre
			 * y entonces no se meterá en el if. En caso de entrar en el if, 
			 * guardamos el indice donde está el nombre(de la clase) de la tabla (estamos en el array) en una variable,
			 * luego guardamos del array de clases el valor de la posicion encontrada y
			 * le decimos que la hemos encontrado cambiando a true encontrarClase*/
			num=clases.indexOf(TablasPrograma[index]);
			clase=clases[num];
			encontrarClase=true;
			}
			index+=1;
		}
			
		var visibilidad=$("."+clase+" .divTablaAdmin").is(`:visible`);
		var visibilidadEquiposJugadores=$("#JugadoresPorEquipos").is(`:visible`);
		/*si esta visible, se esconderá la tabla a la que hemos clickado (la que esta visible) y las 
		 * tablas de jugadores en caso de que esten abiertas, si no lo está, se mostrará*/
		if(visibilidad){
			$(window).scrollTop(0);//cuando clickes en una tabla ira a la parte de arriba de la pagina
			$("."+clase+" .divTablaAdmin").hide(1200);
			$("#JugadoresPorEquipos").hide(800);
		}else if(visibilidadEquiposJugadores){
			$(window).scrollTop(0);//cuando clickes en una tabla ira a la parte de arriba de la pagina
			$("#JugadoresPorEquipos").hide(1200);
		}else{
			$(window).scrollTop(0);
			$("."+clase+" .divTablaAdmin").show(1200);
			$("#JugadoresPorEquipos").hide(800);
			$("#JugadoresPorEquipos").css("margin","0px");
			$(".relleno_"+clase).css({"margin-top":"50px", "margin-bottom": "50px"});
			$("."+clase+" .titulo_boton").css({"border-bottom":"1px solid black", "background-color":"gray"});
			$(".JugadoresEquiposTitulo .divTablaAdmin").hide();//Escondemos las tablas de jugadores por equipos (no los titulos)
			if(clase=="jugadores"){//aqui mostramos los nombres de los equipos
				$("#JugadoresPorEquipos").show(1200);
			}
		}
	});
}//FIN DE LA FUNCION DE APARICION DE TABLAS
/*INICIO DE AL CLICKCAR QUE APAREZCA LA TABLA CORRESPONDIENTE Y SE ESCONDAN LAS OTRAS*/

/*INICIO DE INSERTAR NUEVOS DATOS EN LAS TABLAS EN LA VISTA ADMIN*/
function botonInsertAdmin(){//se le llama desde iniciarJAdmin()

	$(".insertButton button").click(function(){
		
		/*AQUI EMPIEZA EL RECOGER VALOR DE EL BOTON CLICK INSERTAR*/
		$("#tablas").hide();
		var TablaInsert=$(this).text();
		var TablaInsert1=TablaInsert.split(" ",2);//RECOGEMOS EN UN ARRAY LO QUE ESTA ESCRITO EN EL BOTON
		TablaInsert =TablaInsert1[1]; 	//SELECCIONAMOS LA SEGUNDA POSICION del array Y LA GUARDAMOS EN UNA VARIABLE
		
		minusculas=TablaInsert.substring(1,TablaInsert.length); //COGEMOS EL TEXTO EXCEPTO LA PRIMERA LETRA
		mayusculas=TablaInsert.substring(0,1); //COGEMOS LA PRIMERA LETRA
		minusculas=minusculas.toLowerCase(); //CAMBIAMOS EL TEXTO A MINUSCULAS
		Tabla=mayusculas+minusculas;
		minusculas=TablaInsert.toLowerCase();
		/*AQUI TERMINA EL RECOGER VALOR DE EL BOTON CLICK INSERTAR*/
		
		/*AQUI EMPIEZA EL PREGUNTAR LA CANTIDAD DEL INSERT DESEADOS*/
		$("#formularioInsert").css("margin-top","16px");
	
		var htmlCodes=`<form id="formularioCantidadInsertar">`;
		htmlCodes+=`Cantidad de `+minusculas+` que desee insertar:  <select name="`+Tabla+`" id="cantidad"></select><br>`;		
		htmlCodes+=`<input id="aceptarInsert" type=button value="Aceptar"></input><input id="cancelarInsert" type=button value="Cancelar"></input>`;
		htmlCodes+=`</form>`;
		$("#formularioInsert").html(htmlCodes);
		
		for(var i=1;i<13;i++){//generamos 12 options, ya que va a ser el máximo de inserts para hacer (ya que por equipo son 12 jugadores)
			$("#formularioInsert select").append(`<option id=`+i+`> `+i+` </option>`);	
		}
		/*AQUI TERMINA EL PREGUNTAR LA CANTIDAD DEL INSERT DESEADOS*/
		datosEncontrados=null;
		$("#cancelarInsert").click(function(){
			$(".divTablaAdmin").hide(800);
			$(".divTablaAdmin").css("margin","0px");
			$(".titulo_boton").css({"border-bottom":"0px","background-color":"white"});
			$("#JugadoresPorEquipos").hide(1200);
			$(".JugadoresEquiposTitulo .divTablaAdmin").hide();//Escondemos las tablas de jugadores por equipos (no los titulos)
			$("#tablas").show();
			$("#formularioInsert").html("");
		});
			
		$("#aceptarInsert").click(function(){
			cantidad=$("#cantidad").val();
			cantidadInsert=parseInt(cantidad);
			$("#formularioInsert").html("");
			generarCodigoInsert();
			//vaciamos el formulario donde hemos dado la opcion de selecionar cuantos inserts quiere(limite 12)
//			generarInserts();//Generamos los inserts llamando a esta funcion
		});
		
			
	
	});	/*AQUI TERMINA EL GENERAR EL FORMULARIO DE INSERT DESEADOS (DE TODAS LAS TABLAS, ya que todas usan el mismo)*/

}/*FIN DE LA FUNCION QUE ES PARA CREAR EL FORMULARIO DE INSERTS DESEADOS (max 12)*/
	
/*AQUI LA FUNCION QUE GENERA LOS INSERTS QUE HAYA ELEGIDO EL USUARIO*/
function generarInserts(){
	/*Para meter la primera vez los datos le llamamos desde dentro de la funcion botonInsertAdmin()
	 * despues le llamamos desde el boton del formulario con un myfunction=generarInserts()*/
	if(datosEncontrados==null){
		if(cantidadInsert>=1 &&(LoopTimes==cantidadInsert||LoopTimes!=cantidadInsert)&&siguienteInsert==false){
			var elements = document.getElementsByName( Tabla );
			for(var i=0;i<elements.length;i++){
				var input=elements[i];
				var id = elements[i].getAttribute( 'id' );
				var contenido = $("#"+id).val();
				linea+=id+"*/separar/*"+contenido+",";	//añadimos 
			}
			
			linea=linea.slice(0,-1);
			var values = linea.split(",");//separamos las partes de nuestro futuro array
			for(var i=0; i<values.length; i++) {
			    var keyValue = values[i].split("*/separar/*");//separamos cada parte de cada campo ya que es key:value
			    obj[keyValue[0]] = keyValue[1];//asignamos que el key sea el que esta en la posicion principal y el value en la secundaria del objeto
			}
			datosInsert=[];
			datosInsert.push(obj);//añadimos al array creado anteriormente el objeto 
			//console.log(datosInsert);
			//alert(minusculas+"<-carpeta Tabla->"+Tabla);
				if(cantidadInsert>=1 &&LoopTimes!=cantidadInsert&&siguienteInsert==false&& datosEncontrados==null){	
		//			console.log(LoopTimes+"LoopTimes y insertCantidad"+cantidadInsert);
					siguienteInsert=generarCodigoInsert();//llamamos a una funcion donde generamos los inputs y devuelve un true cuando se han insertado
					siguienteInsert=false;
					LoopTimes+=1;//console.log(LoopTimes +"loop y siguiente"+siguienteInsert);
				}
				if((LoopTimes==cantidadInsert||LoopTimes!=cantidadInsert)&& datosEncontrados==null){
					$("#tablas").hide();

					$.ajax({
				        type:"POST",
				        data:{"datosInsert":datosInsert},
				        url:"../controller/"+minusculas+"/cAniadir"+Tabla+".php",
				        success: function(datos){
				        	//console.log(datos);
							if(LoopTimes==cantidadInsert){
					        	$("#formularioInsert").html(`<input type="button" value="Volver a las tablas" class="volverTablas"></input>`);
								$("#formularioInsert .volverTablas").click(function(){
								    location.reload();

								});					
							}

								},
				        error: function(xhr){
				            alert("An error occured: "+xhr.status+" "+xhr.statusText);
				        }
				    });
				}
			}
		}else{
			//console.log("id"+idModificar);
			linea="id*/separar/*"+idModificar+",";
			var elements = document.getElementsByName( Tabla );
			for(var i=0;i<elements.length;i++){
				var input=elements[i];
				var id = elements[i].getAttribute( 'id' );
				var contenido = $("#"+id).val();
				linea+=id+"*/separar/*"+contenido+",";
			}//añadimos 
			linea=linea.slice(0,-1);
			var values = linea.split(",");//separamos las partes de nuestro futuro array
			for(var i=0; i<values.length; i++) {
				    var keyValue = values[i].split("*/separar/*");//separamos cada parte de cada campo ya que es key:value
				    obj[keyValue[0]] = keyValue[1];//asignamos que el key sea el que esta en la posicion principal y el value en la secundaria del objeto		    
			}
			datosInsert=[];
			datosInsert.push(obj);//añadimos al array creado anteriormente el objeto 
			//console.log(datosInsert);
			$("#tablas").hide(800);
	
				$.ajax({
			        type:"POST",
			        data:{"datosInsert":datosInsert},
			        url:"../controller/"+minusculas+"/cEditar"+Tabla+".php",
			        success: function(datos){
			        	console.log(datos);
			        	$("#formularioInsert").html(`<input type="button" value="Volver a las tablas" class="volverTablas"></input>`);
						$("#formularioInsert .volverTablas").click(function(){
//							$(".divTablaAdmin").hide(800);
//							$(".divTablaAdmin").css("margin","0px");
//							$(".titulo_boton").css({"border-bottom":"0px","background-color":"white"});
//							$("#JugadoresPorEquipos").hide(1200);
//							$(".JugadoresEquiposTitulo .divTablaAdmin").hide();//Escondemos las tablas de jugadores por equipos (no los titulos)
//							$("#tablas").show();
//							$("#tablas .paneles").show();
//							$("#formularioInsert").html("");
						    location.reload();

						});

			        },
			        error: function(xhr){
			            alert("An error occured: "+xhr.status+" "+xhr.statusText);
			        }
			    });
			
		}
	
	
}/*FIN DE LA FUNCION QUE ES PARA GENERAR LOS INSERTS Y PARA HACER INSERTS EN LA BASE DE DATOS*/

function generarCodigoInsert(){
	$("#formularioInsert").html("");
	$.ajax({
        type:"POST",
        data:{"datosInsert":datosInsert},
        url:"../controller/"+minusculas+"/cSeleccionar"+Tabla+".php",
        success: function(datosTabla){
        	
        	misDatosTabla=JSON.parse(datosTabla);
        	if(LoopTimes!=cantidadInsert){

        	var htmlCode=`<form id="FormInsert">`;
    		$("#formularioInsert").html(htmlCode);

        	if(Tabla==="Equipos"||Tabla==="Jugadores"||Tabla==="Categorias"||Tabla==="Entrenadores"||Tabla==="Usuarios"){
        		htmlCode=`<p>Nombre:</p><input type="text" id="nombre" name="`+Tabla+`" required>`;		
        		$("#FormInsert").append(htmlCode);
        		if(datosEncontrados != null){ 
            		$("#FormInsert #nombre").val(datosEncontrados.nombre);
        		}else{
            		$("#FormInsert #nombre").val("");
        		};

        	}
        	
        	if(Tabla==="Jugadores"||Tabla==="Categorias"||Tabla==="Entrenadores"){
        		htmlCode=`<p>Imagen:</p><input type="text" name="`+Tabla+`" id="imagen"></input>`;
        		$("#FormInsert").append(htmlCode);
        		if(datosEncontrados != null){ 
            		$("#FormInsert #imagen").val(datosEncontrados.imagen);
        		}else{
            		$("#FormInsert #imagen").val("");
        		};
        	}
        	
        	if(Tabla==="Jugadores"||Tabla==="Entrenadores"){
        		htmlCode=`<p>Telefono:</p><input type="number" id="telefono" name="`+Tabla+`" required onkeypress="return teclaPulsadaNum(event)"><p>Equipo:</p><select id="equipo" name="`+Tabla+`" required></select>`;
        		$("#FormInsert").append(htmlCode);
	        	$.each(misDatosTabla,function(i,datos_tabla){
	        		if(!equiposInput.includes(datos_tabla.objectEquipo.nombre)){
	        			$("#equipo").append(`<option id="`+datos_tabla.objectEquipo.nombre+`">`+datos_tabla.objectEquipo.nombre+`</option>`);
	        			equiposInput.push(datos_tabla.objectEquipo.nombre);
	        			}
	        		});
	        	
	        	if(datosEncontrados != null){ 
            		$("#FormInsert #telefono").val(datosEncontrados.telefono);
            		$("#FormInsert #equipo").val(datosEncontrados.objectEquipo.nombre);
        		}else{
            		$("#FormInsert #telefono").val("");
            		$("#FormInsert #equipo").val("");

        		};
        	}
        	
        	if(Tabla==="Equipos"){
        		htmlCode=`<p>Categoria:</p><select id="categoria" name="`+Tabla+`" required></select><p>Logo:</p><input type="text" name="`+Tabla+`" id="logo"></input>`;
        		$("#FormInsert").append(htmlCode);
	        	$.each(misDatosTabla,function(i,datos_tabla){
     				if(!categorias.includes(datos_tabla.objectCategoria.nombre)){
     					$("#categoria").append(`<option id="`+datos_tabla.objectCategoria.nombre+`">`+datos_tabla.objectCategoria.nombre+`</option>`);
     					categorias.push(datos_tabla.objectCategoria.nombre);
     				}
 				});        	
	        	if(datosEncontrados != null){ 
            		$("#FormInsert #categoria").val(datosEncontrados.objectCategoria.nombre);
            		$("#FormInsert #logo").val(datosEncontrados.logo);
        		}else{
            		$("#FormInsert #logo").val("");
            		$("#FormInsert #categoria").val("");
        		};
        	}
        	
        	if(Tabla==="Jugadores"){
        		htmlCode=`<p>Rol:</p><select id="rol" name="`+Tabla+`" required></select>`;
        		$("#FormInsert").append(htmlCode);
            	$.each(misDatosTabla,function(i,datos_tabla){
     				if(!roles.includes(datos_tabla.rol)){
                		$("#rol").append(`<option id="`+datos_tabla.rol+`">`+datos_tabla.rol+`</option>`);
                		roles.push(datos_tabla.rol);
     				}
     			});
            	if(datosEncontrados != null){ 
            		$("#FormInsert #rol").val(datosEncontrados.rol);
        		}else{
            		$("#FormInsert #rol").val("");
        		};
        	}
        	
        	if(Tabla==="Consultas"){
        		htmlCode=`<p>Consulta:</p><input type="text" id="consulta" name="`+Tabla+`"  required><p>Usuario:</p><select id="usuario" name="`+Tabla+`"  required></select>`;
        		$("#FormInsert").append(htmlCode);
            	$.each(misDatosTabla,function(i,datos_tabla){
     				if(!users.includes(datos_tabla.objectUsuario.usuario)){
						$("#usuario").append(`<option id="`+datos_tabla.objectUsuario.usuario+`">`+datos_tabla.objectUsuario.usuario+`</option>`);
						users.push(datos_tabla.objectUsuario.usuario);
     				}
     				});
            	if(datosEncontrados != null){ 
            		$("#FormInsert #consulta").val(datosEncontrados.consulta);
            		$("#FormInsert #usuario").val(datosEncontrados.objectUsuario.nombre);
        		}else{
            		$("#FormInsert #consulta").val("");
            		$("#FormInsert #usuario").val("");
        		};
        	}
        	
        	if(Tabla==="Usuarios"){
        		htmlCode=`<p>Contrasena:</p><input type="password" id="contrasena" name="`+Tabla+`"  required><p>Tipo:</p><select id="tipo" name="`+Tabla+`" required></select><p>Usuario:</p><input type="text" id="usuario" name="`+Tabla+`"><p>Correo:</p><input type="text" id="correo" name="`+Tabla+`">`;
        		$("#FormInsert").append(htmlCode);
//            	$.each(misDatosTabla,function(i,datos_tabla){
//     				$("#tipo").append(`<option id="`+datos_tabla.objectTipo.nombre+`">`+datos_tabla.objectTipo.nombre+`</option>`);
//     			});
    			$("#tipo").append(`<option id="0">Administrador</option><option id="1">Entrenador</option><option id="2" selected>Usuario Normal</option><option id="3">Anonimo</option>`);
            	if(datosEncontrados != null){ 
            		
            		 if(datosEncontrados.tipo=="0"){
            			 datosEncontrados.tipo="Administrador";
                     }else if(datosEncontrados.tipo=="1"){
                    	 datosEncontrados.tipo="Entrenador";
                     }else if(datosEncontrados.tipo=="2"){
                    	 datosEncontrados.tipo="Usuario Normal";
                     }else if(datosEncontrados.tipo=="3"){
                    	 datosEncontrados.tipo="Anonimo";
                     }
            		$("#FormInsert #tipo").val(datosEncontrados.tipo);
            		$("#FormInsert #contrasena").val(datosEncontrados.contrasena);
            		$("#FormInsert #usuario").val(datosEncontrados.usuario);
            		$("#FormInsert #correo").val(datosEncontrados.correo);
        		}else{
            		$("#FormInsert #contrasena").val("");
            		$("#FormInsert #usuario").val("");
            		$("#FormInsert #correo").val("");
            		$("#FormInsert #tipo").val("");
        		};
        	}
        	
        	htmlCode=` </form>`;
        	$("#formularioInsert").append(htmlCode);
        	htmlCode=`<div id="botonesInsertMod"></div>`;
        	$("#formularioInsert").append(htmlCode);

        	if(datosEncontrados != null){
        		htmlCode=`<input type="button" id="cancelarModificar" value="CANCELAR" style="inline-block"></input>`;
            	htmlCode+=`<input id="button" class="aceptarInsertMod" type="button" value="MODIFICAR" onclick="validaciones()" style="inline-block">`;
        		$("#formularioInsert #botonesInsertMod").html("");

        		$("#formularioInsert #botonesInsertMod").html(htmlCode);
        		$("#cancelarModificar").click(function(){
		        	$("#tablas .paneles").show();
	        		$("#formularioInsert").html("");
	        	});
        		
        	}else{
        		htmlCode=`<input id="button" type="button" value="INSERTAR"  class="aceptarInsertMod" onclick="validaciones()">`;
        		$("#formularioInsert #botonesInsertMod").html("");	

        		$("#formularioInsert #botonesInsertMod").html(htmlCode);	
        	}
        	linea="";
        	
            $("#formularioInsert #FormInsert").css({"display":"grid", "grid-template-columns":"auto auto"});
            $("#formularioInsert #FormInsert input,select").css({"height":"30%","margin":"auto"});
            $("#formularioInsert #FormInsert input").css({"background-color":"transparent","border":"none","border-bottom":"2px solid black"});
            $("#formularioInsert #FormInsert input").focus(function(){
                $("#formularioInsert #FormInsert input").css({"background-color":"transparent","border-bottom":"2px solid black","color":"black","font-weight":"normal"});
                $("#formularioInsert #FormInsert select").css({"background-color":"transparent","border":"1px solid black","color":"black","font-weight":"normal"});
                $(this).css({"background-color":"#90ee90","border-bottom":"2px solid green","color":"darkgreen","font-weight":"bold"});
            });
            $("#formularioInsert #FormInsert select").click(function(){
                $("#formularioInsert #FormInsert input").css({"background-color":"transparent","border-bottom":"2px solid black","color":"black","font-weight":"normal"});
                $(this).css({"background-color":"#90ee90","border":"2px solid green","color":"darkgreen","font-weight":"bold"});
            });
            $("#formularioInsert").css({"justify-self":"center","align-self":"center"});
            categorias=[];
            users=[];
        	equiposInput=[];
        	roles=[];
        	return true;
        	}
        },
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });
	
}
/*FIN DE INSERTAR NUEVOS DATOS EN LAS TABLAS DESDE VADMIN */

function borrarElemento(id,tablita){
	minusculas=tablita.substring(1,tablita.length); //COGEMOS EL TEXTO EXCEPTO LA PRIMERA LETRA
	mayusculas=tablita.substring(0,1); //COGEMOS LA PRIMERA LETRA
	mayusculas=mayusculas.toUpperCase(); //CAMBIAMOS EL TEXTO A MAYUSCULAS
	Tabla=mayusculas+minusculas;
	//console.log(id+" <-id tablita-> "+tablita+" Tabla-> "+Tabla);
	
	$.ajax({
        type:"POST",
        data:{"id":id},
        url:"../controller/"+tablita+"/cBorrar"+Tabla+".php",
        success: function(resultado){
        	//console.log(resultado);
		    location.reload();
        },
        error: function(xhr){
            alert("An error occured: "+xhr.status+" "+xhr.statusText);
        }
    });
}
function editarElemento(id,tablita){

	
		$("#tablas .paneles").hide();

	minusculas=tablita.substring(1,tablita.length); //COGEMOS EL TEXTO EXCEPTO LA PRIMERA LETRA
	mayusculas=tablita.substring(0,1); //COGEMOS LA PRIMERA LETRA
	mayusculas=mayusculas.toUpperCase(); //CAMBIAMOS EL TEXTO A MAYUSCULAS
	Tabla=mayusculas+minusculas;
	minusculas=Tabla.toLowerCase();
	//console.log(id+" <-id tablita-> "+tablita+" Tabla-> "+Tabla);
	$.ajax({
      type:"POST",
      data:{"id":id},
      url:"../controller/"+minusculas+"/cSeleccionar"+Tabla+".php",
      success: function(datosTabla){
      	miDatosTabla=JSON.parse(datosTabla);
    	ContenidoTablas="";
    	if(Tabla.endsWith("es")){
    		NombreTabla=Tabla.slice(0,-2); 
        	//console.log(NombreTabla);
    	}else if(Tabla.endsWith("s")){
    		NombreTabla=Tabla.slice(0,-1); 
        	//console.log(NombreTabla);
    	}else{
    		alert("NO SE PUEDE HACER EL MODIFICAR");
    	}
    	
    	$.each(miDatosTabla,function(i,datos){
    	var myVar=eval("datos.id"+NombreTabla);
    	//console.log({myVar});

			if(id==myVar){

			//console.log("id-> "+id+" MyVar-> "+myVar);
			datosEncontrados=datos;
			idModificar=id;
			generarCodigoInsert();
			}	
    	});
      },
      error: function(xhr){
          alert("An error occured: "+xhr.status+" "+xhr.statusText);
      }
  });	
}


function teclaPulsadaNum(e){
	 
	 var teclanumero;
	 var keychar;
	 var longitud;
	 teclanumero=e.which;
	 keychar= String.fromCharCode(teclanumero);
	 longitud= $("#telefono").val();
	 console.log(longitud);
	 if(longitud.length<9){
		 if(keychar<"0" || keychar>"9"){
			 return false;
		 }else{
			 return true;
		 }
	 }else{
		 return false;
	 }
	
}

function validaciones(){
	if(revisarInputs()){
		alert("DATOS ENVIADOS CORRECTAMENTE");
		generarInserts();
		return true;
		}else{
			alert("DATOS NO ENVIADOS");
			alert("INTRODUZCA EN LOS SIGUIENTES CAMPOS DATOS VALIDOS: "+elementosValidar);

		return false;
	}
}
function revisarInputs(){
	elementosValidar="/";
	var elements = document.getElementsByName( Tabla );
	for(var i=0;i<elements.length;i++){
		var input=elements[i];
		var id = elements[i].getAttribute( 'id' );
		var contenido = $("#"+id).val();
		if(contenido==null||contenido==""){
			elementosValidar+=id+"/";			
		}
	}
	if(elementosValidar!="/"){
		return false;
	}else{
		return true;
	}
}