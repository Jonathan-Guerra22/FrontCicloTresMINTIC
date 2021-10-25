function verMensajes(){
    $.ajax({
       url: "http://localhost:8080/api/Message/all",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoMensajes").empty();
            RespuestaMensajes(respuesta);
        }
    });
}
function RespuestaMensajes(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";

    if(items.length>0){
        myTable += "<tr class='table-dark'>";
        myTable += "<th>ID</th>";
        myTable += "<th>MESSAGETEXT</th>";
        myTable += "<th>FARM</th>";
        myTable += "<th>CLIENT</th>";
        myTable += "<th></th>";
        myTable += "<th></th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){
        
        let finca = items[i].farm.id+"<br>";
        finca += items[i].farm.name+"<br>";
        
        let cliente = items[i].client.name+"<br>";

        myTable += "<tr>";
        myTable += "<td>"+items[i].idMessage+"</td>";
        myTable += "<td>"+items[i].messageText+"</td>";
        myTable += "<td>"+finca+"</td>";
        myTable += "<td>"+cliente+"</td>";
        myTable += "<td><a  href='#idMS'><button class='btn btn-warning' onclick='editarM("+items[i].idMessage+")'>Edit</button></td></a>"
        myTable += "<td><button class='btn btn-danger' onclick='borrarM("+items[i].idMessage+")'>🗑</button></td>"
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoMensajes").append(myTable);
}

function crearMensaje(){
    
    let finca = {id: $("#idfarm").val()};
    let cliente = {idClient: $("#idclient").val()};

    let myData= {
        messageText: $("#messageText").val(),
        client: cliente,
        farm: finca
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
		url: "http://localhost:8080/api/Message/save",
        type:"POST",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        complete:function(respuesta){

            $("#idfarm").val(""),
            $("#idclient").val("");
            $("#messageText").val("");
            
            verMensajes();

            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    });
}

function editarM(idM){
    
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
         type: "GET",
         dataType: "json",
         success: function(respuesta){

            for(i=0;i<respuesta.length; i++){
                if(respuesta[i].idMessage==idM){
                    $("#idMS").empty();
                    $("#idMS").val(idM);
                    $("#messageEdit").empty();
                    $("#messageEdit").val(respuesta[i].messageText);
                }
            }
        }
    });
}

function editarMensaje(){
         
    let myData= {
        id:$("#idMS").val(),
        messageText: $("#messageEdit").val()
    };
       
    let dataToSend = JSON.stringify(myData);
        
    $.ajax({
        url: "http://localhost:8080/api/Message/update",
        type:"PUT",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        success:function(respuesta){
            verMensajes();
            $("#idMS").val("");
            $("#MessageEdit").val("");
            console.log("Editado");
        }
    });
}
    
function borrarM(idM){
        
    let urlMV="http://localhost:8080/api/Message/"+idM;
    $.ajax({
        url: urlMV,
        type:"DELETE",
        success:function(respuesta){
            verMensajes();
            console.log("Borrado");
        }
    });
}
