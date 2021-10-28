function verFincas(){
    $.ajax({
       url: "http://localhost:8080/api/Farm/all",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoFincas").empty();
            RespuestaFincas(respuesta);
        }
    });
}
function RespuestaFincas(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";

    if(items.length>0){
        myTable += "<tr class='table-dark'>";
        myTable += "<th>ID</th>";
        myTable += "<th>NAME</th>";
        myTable += "<th>ADDRESS</th>";
        myTable += "<th>EXTENSION</th>";
        myTable += "<th>DESCRIPTION</th>";
        myTable += "<th>CATEGORY</th>";
        myTable += "<th>MESSAGES</th>";
        myTable += "<th></th>";
        myTable += "<th></th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){
        let categoria = "<li>"+items[i].category.name+"<br>";
        

        let mensajes=[];
        for (j=0;j<items[i].messages.length;j++){
            mensajes+="<li>"+items[i].messages[j].messageText+"<br>";
        }

        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].address+"</td>";
        myTable += "<td>"+items[i].extension+"</td>";
        myTable += "<td>"+items[i].description+"</td>";
        myTable += "<td>"+categoria+"</td>";
        myTable += "<td>"+mensajes+"</td>";
        myTable += "<td><a  href='#id'><button class='btn btn-warning' onclick='editarF("+items[i].id+")'>Edit</button></td></a>"
        myTable += "<td><button class='btn btn-danger' onclick='borrarF("+items[i].id+")'>🗑</button></td>"
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoFincas").append(myTable);
}

function crearFinca(){
    
    let categoria={id: $("#category").val()}


    let myData= {
        address: $("#address").val(),
        extension: $("#extension").val(),
        category: categoria,
        name: $("#name").val(),
        description: $("#description").val(),
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
		url: "http://localhost:8080/api/Farm/save",
        type:"POST",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        complete:function(respuesta){

            $("#address").val("");
            $("#extension").val("");
            $("#category").val(""),
            $("#name").val("");
            $("#description").val("");
            
            verFincas();

            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    });
}

function editarF(idF){
    
    $.ajax({
        url: "http://localhost:8080/api/Farm/all",
         type: "GET",
         dataType: "json",
         success: function(respuesta){

            for(i=0;i<respuesta.length; i++){
                if(respuesta[i].id==idF){
                    $("#id").empty();
                    $("#id").val(idF);
                    $("#addressEditF").empty();
                    $("#addressEditF").val(respuesta[i].address);
                    $("#nameEditF").empty();
                    $("#nameEditF").val(respuesta[i].name);
                    $("#descriptionEditF").empty();
                    $("#descriptionEditF").val(respuesta[i].description);
                    $("#extensionEditF").empty();
                    $("#extensionEditF").val(respuesta[i].extension);
                }
            }
         }
     });
}

function editarFinca(){
         
    let myData= {
        id:$("#id").val(),
        address: $("#addressEditF").val(),
        name: $("#nameEditF").val(),
        description: $("#descriptionEditF").val(),
        extension: $("#extensionEditF").val(),
    };
       
    let dataToSend = JSON.stringify(myData);
        
    $.ajax({
        url: "http://localhost:8080/api/Farm/update",
        type:"PUT",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        success:function(respuesta){
            verFincas();
            $("#id").val("");
            $("#addressEditF").val("");
            $("#nameEditF").val("");
            $("#descriptionEditF").val("");
            $("#extensionEditF").val("");
            console.log("Editado");
        }
    });
}
    
function borrarF(idF){
        
    let urlMV="http://localhost:8080/api/Farm/"+idF;
    $.ajax({
        url: urlMV,
        type:"DELETE",
        success:function(respuesta){
            verFincas();
            console.log("Borrado");
        }
    });
}
