var miApp=angular.module('miApp',[]);
	miApp.controller('miControlador',['$scope','$http', function($scope,$http){
       $scope.ver="no";
       $scope.verJugadores='no';
       $scope.verEntrenadores='no';
       $scope.verTelefono='false';
       
       $http.get('../controller/cSessionVerVars.php').then(function(data) {
  		 console.log(data.data);
  		 if(data.data.admin==0 || data.data.admin==1) {
  			$scope.verTelefono='true';
  		 }else {
  			$scope.verTelefono='false';
	    }
  	 });
           
        $http.get('../controller/categorias/cSeleccionarCategorias.php').then(function(data) {     
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
    	   $scope.id= gg;
    	   $http({url:'../controller/equipos/cEquiposPorCategoria.php',
    		   method: "GET",
    		   params:{value:$scope.id}}).then(function(data){
    			 
               $scope.misEquipos=data.data;
               
               console.log($scope.misEquipos);
             }).catch(function(response){
          	   console.error('Error ocurred: ',response.status,response.data);
          	   
      	   }).finally(function(){
      		   console.log("Task finished.");
      	   });
       }         
          
       $scope.mostrarJugadores=function(ff){
    	   $scope.verJugadores='si';
    	   $scope.verEntrenadores='no';
    	   $scope.id= ff;
    	   $http({url:'../controller/jugadores/cMostrarJugadoresPorEquipo.php',
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

       $scope.mostrarEntrenadores=function(bb){
    	   $scope.verEntrenadores='si';
    	   $scope.verJugadores='no';
    	   $scope.id= bb;
    	   $http({url:'../controller/entrenadores/cMostrarEntrenadoresPorEquipo.php',
    		   method:"GET",
    		   params:{value:$scope.id}}).then(function(data){

               $scope.misEntrenadores=data.data;
               
               console.log($scope.misEntrenadores);

             }).catch(function(response){
          	   console.error('Error ocurred: ',response.status,response.data);
          	   
      	   }).finally(function(){
      		   console.log("Task finished.");
      	   });
       }     

       $scope.nuevaConsulta=function(){
    	 var consulta=$scope.miConsulta;
    	 var usuario;
    	 $http.get('../controller/cSessionVerVars.php').then(function(data) {
    		 console.log(data.data);
    		 if(data.data!=0) {
    		 usuario=data.data.idUsuario;
        	 misDatosInsert={
        		consulta:$scope.miConsulta,
        		usuario:data.data.idUsuario
        	 }
        	 
        	 misDatosInsert=JSON.stringify(misDatosInsert);
        	 alert(misDatosInsert);
        	 
        	   $http({url:'../controller/consultas/cInsertConsultaPrincipal.php',
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
	        	 
	        	   $http({url:'../controller/consultas/cInsertConsultaPrincipal.php',
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
	}]);     