var miApp=angular.module('myApp',[]);
	miApp.controller('miControlador',['$scope','$http', function($scope,$http){
       $scope.ver="no";
       $scope.verJugadores='no';
       $scope.verTelefono='false';
       
       $http.get('https://cuatro.fpz1920.com/controller/cSessionVerVars.php').then(function(data) {
 		 	if(data.data!=0) {
 		 		idUsuario=data.data.idUsuario;
 		 		
 		 		$http({url:'https://cuatro.fpz1920.com/controller/votos/cComprobarVotos.php',
 	    		   method: "GET",
 	    		   params:{idUsuario:idUsuario}}).then(function(data){
 	    			 
 	    			  $scope.misVotos=data.data;
 	               
 	    			  console.log($scope.misVotos);
 	    			   
 	    			  var cardCategoria = 1;
 	    			  
 	    			  console.log($scope.misVotos.length);
 	    			   
 	    			  for(i=0; i<$scope.misVotos.length++; i++) {
 	    		            if($scope.misVotos[i].idCategoria == cardCategoria) {
 	    		            	cardCategoria = document.getElementsByClassName('card')[i].id;
 	    		            	imgGracias = document.getElementsByClassName('img-gracias')[i];
 	    		            	
 	    		            	document.getElementById(cardCategoria).style.display = "none";
 	    		            	imgGracias.style.display = "block"; 
 	    		            	
 	    		            	console.log("cardCategoria: " + cardCategoria);
 	    		            }
 	    		            
 	    		            cardCategoria++;
 	    		      }
 	    		   }).catch(function(response){
 	    			   console.error('Error ocurred: ',response.status,response.data);	          	   
 	    		   }).finally(function(){
 	    			   console.log("Task finished.");
 	    		   });
 		 	}
 	 	});
       
       $http.get('https://cuatro.fpz1920.com/controller/cSessionVerVars.php').then(function(data) {
  		 	if(data.data.admin==0 || data.data.admin==1) {
  			 	$scope.verTelefono='true';
  		 	}else {
  			 	$scope.verTelefono='false';
  		 	}
  	 	});
           
        $http.get('https://cuatro.fpz1920.com/controller/categorias/cSeleccionarCategorias.php').then(function(data) {     
            $scope.misdatosJSON = data.data;
 
        }).catch(function(response){
        	console.error('Error ocurred: ',response.status,response.data);
            	   
        }).finally(function(){
        	console.log("Task finished.");
        });
          
       $scope.mostrarEquipos=function(gg){
    	   $scope.ver='si';
    	   $scope.verJugadores='no';
    	   $scope.verEntrenadores='no';
    	   $scope.idCategoria=gg;
  
    	   $http({url:'https://cuatro.fpz1920.com/controller/equipos/cEquiposPorCategoria.php',
    		   method: "GET",
    		   params:{value:$scope.idCategoria}}).then(function(data){
    			 
               $scope.misEquipos=data.data;
               
               console.log($scope.misEquipos);
             }).catch(function(response){
          	   console.error('Error ocurred: ',response.status,response.data);
          	   
      	   }).finally(function(){
      		   console.log("Task finished.");
      	   });
       }         
          
       $scope.mostrarJugadores=function(ff, idCategoria){
    	   $scope.verJugadores='si';
    	   $scope.verEntrenadores='no';
    	   $scope.id=ff;
    	   $scope.idCategoria=idCategoria;

    	   $http({url:'https://cuatro.fpz1920.com/controller/jugadores/cMostrarJugadoresPorEquipo.php',
    		   method: "GET",
    		   params:{value:$scope.id}}).then(function(data){

               $scope.misJugadores=data.data;
               
               console.log($scope.misJugadores);
 
           }).catch(function(response){
          	   console.error('Error ocurred: ',response.status,response.data);      	   
      	   }).finally(function(){
      		   console.log("Task finished.");
      	   });
       }    

       $scope.nuevaConsulta=function(){
    	 var consulta=$scope.miConsulta;
    	 var usuario;
    	 
    	 $http.get('https://cuatro.fpz1920.com/controller/cSessionVerVars.php').then(function(data) {
    		 if(data.data!=0) {
    		 usuario=data.data.idUsuario;
        	 misDatosInsert={
        		consulta:$scope.miConsulta,
        		usuario:data.data.idUsuario
        	 }
        	 
        	 misDatosInsert=JSON.stringify(misDatosInsert);
        	 alert(misDatosInsert);
        	 
        	   $http({url:'https://cuatro.fpz1920.com/controller/consultas/cInsertConsultaPrincipal.php',
        		   method: "GET",
        		   params:{datosInsert:misDatosInsert}}).then(function(data){

                 }).catch(function(response){
              	   console.error('Error ocurred: ',response.status,response.data);
              	   
          	   }).finally(function(){
          		   console.log("Consulta enviada.");
          	   });
    		 }else {
				 usuario=100;
				 
	        	 misDatosInsert={
	        		consulta:$scope.miConsulta,
	        		usuario:"100"
	        	 }
	        	 
	        	 misDatosInsert=JSON.stringify(misDatosInsert);
	        	 alert(misDatosInsert);
	        	 
	        	 $http({url:'https://cuatro.fpz1920.com/controller/consultas/cInsertConsultaPrincipal.php',
	        		 method: "GET",
	        		 params:{datosInsert:misDatosInsert}}).then(function(data){
        		 }).catch(function(response){
        			 console.error('Error ocurred: ',response.status,response.data);
  	   
        		 }).finally(function(){
        			 console.log("Consulta enviada.");
        		 });
	    	}
    	 }); 	 
       }
    
       $scope.botonVotar=function(idVotado, nombreVotado, idCategoria) {
           // Get the modal
           var modal = document.getElementById("myModal");

           // Get the button that opens the modal
           var btn = document.getElementById("btnModal");

           // When the user clicks the button, open the modal 
           modal.style.display = "block";
           
           $scope.idJugador=idVotado;
           $scope.nombre=nombreVotado;
           $scope.idCategoria=idCategoria;
       }
       
       $scope.votar=function(idVotado, idCategoria){ 	   
    	   $scope.idJugador= idVotado;
    	   $scope.idCategoria=idCategoria;
    	   
    	   $http.get('https://cuatro.fpz1920.com/controller/cSessionVerVars.php').then(function(data) {
    		   if(data.data!=0) {
    			   usuario=data.data.idUsuario;
    			   
    			   misDatosVotos={
    					idUsuario:data.data.idUsuario,
    					idJugador:$scope.idJugador,
    					idCategoria:$scope.idCategoria
    		       }
    			   
    			   console.log(misDatosVotos);
   
    			   $http({url:'https://cuatro.fpz1920.com/controller/votos/cInsertarVotos.php',
    				   method:"GET",
    				   params:{datosVotos:misDatosVotos}}).then(function(data){
    				   }).catch(function(response){
    					   console.error('Error ocurred: ',response.status,response.data);        	   
    				   }).finally(function(){
    					   console.log("Task finished.");
    					   window.location.href="vMvp.html";
    				   });
    		   }else {
    			   alert("Tienes que iniciar sesión para poder votar.")
    			   window.location.href="vMvp.html";
    		   }
    	   });
       }
       
       $scope.CancelarVoto=function() {
           var modal = document.getElementById("myModal");

           modal.style.display = "none";
       }
	}]);     