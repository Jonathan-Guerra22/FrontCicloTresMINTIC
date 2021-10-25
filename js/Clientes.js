function verClientes(){
    $.ajax({
       url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoClientes").empty();
            RespuestaClientes(respuesta);
        }
    });
}
function RespuestaClientes(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";
    
    if(items.length>0){
        
        myTable += "<tr class='table-dark'>";
        myTable += "<th>ID</th>";
        myTable += "<th>NAME</th>";
        myTable += "<th>EMAIL</th>";
        myTable += "<th>AGE</th>";
        myTable += "<th>RESERVATIONS</th>";
        myTable += "<th></th>";
        myTable += "<th></th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){

        let reservaciones=[];
        for (j=0;j<items[i].reservations.length;j++){
            reservaciones+="<li>"+items[i].reservations[j].idReservation+"<br>";
            reservaciones+=items[i].reservations[j].startDate+"<br>";
            reservaciones+=items[i].reservations[j].devolutionDate+"<br>";
        }
        
        myTable += "<tr>";
        myTable += "<td>"+items[i].idClient+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].email+"</td>";
        myTable += "<td>"+items[i].age+"</td>";
        myTable += "<td>"+reservaciones+"</td>";
        myTable += "<td><a href='#idCli'><button class='btn btn-warning' onclick='editarC("+items[i].idClient+")'>Edit</button></td></a>"
        myTable += "<td><button class='btn btn-danger' onclick='borrarC("+items[i].idClient+")'>🗑</button></td>"
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoClientes").append(myTable);
}

function crearCliente(){
    
    let myData= {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        age: $("#age").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
		url: "http://localhost:8080/api/Client/save",
        type:"POST",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        complete:function(respuesta){

            $("#email").val("");
            $("#name").val("");
            $("#password").val(""),
            $("#age").val("");
            
            verClientes();

            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    });
}

function editarC(idCli){
    
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
         type: "GET",
         dataType: "json",
         success: function(respuesta){

            //$("#resultadoClientes").empty();
            for(i=0;i<respuesta.length; i++){
                if(respuesta[i].idClient==idCli){
                    console.log(respuesta[i].idClient,respuesta[i].password);
                    $("#idCli").empty();
                    $("#idCli").val(idCli);
                    $("#OldPasswordEditCli").empty();
                    $("#OldPasswordEditCli").val(respuesta[i].password);

                    $("#nameEditCli").empty();
                    $("#nameEditCli").val(respuesta[i].name);
                    $("#emailEditCli").empty();
                    $("#emailEditCli").val(respuesta[i].email);
                    $("#ageEditCli").empty();
                    $("#ageEditCli").val(respuesta[i].age);
                }
            }
         }
     });
}

function editarCliente(){
    
    if($("#ActualPasswordEditCli").val()==$("#OldPasswordEditCli").val()){

        
        let myData= {
            idClient:$("#idCli").val(),
            name: $("#nameEditCli").val(),
            email: $("#emailEditCli").val(),
            password: $("#newPasswordEditCli").val(),
            age: $("#ageEditCli").val(),
        };
        
        let dataToSend = JSON.stringify(myData);
        
        $.ajax({
            url: "http://localhost:8080/api/Client/update",
            type:"PUT",
            data: dataToSend,
            dataType:"json",
            contentType: 'application/json',
            success:function(respuesta){
                verClientes();
                $("#idCli").val("");
                $("#nameEditCli").val("");
                $("#emailEditCli").val("");
                $("#OldPasswordEditCli").val("");
                $("#newPasswordEditCli").val("");
                $("#ActualPasswordEditCli").val("");
                $("#ageEditCli").val("");
                console.log("Editado");
            }
        });
    }else{
        alert("Contraseña Actual incorrecta");
        return console.log("Las contraseñas no son iguales");
    }
}
    
    function borrarC(idB){
        
        let urlMV="http://localhost:8080/api/Client/"+idB;
        $.ajax({
            url: urlMV,
            type:"DELETE",
            success:function(respuesta){
                verClientes();
                console.log("Borrado");
            }
        });
}

