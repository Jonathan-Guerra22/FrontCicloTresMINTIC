function verCategorias(){
    $.ajax({
       url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoCategorias").empty();
            RespuestaCategorias(respuesta);
        }
    });
}
function RespuestaCategorias(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";

    if(items.length>0){
        myTable += "<tr class='table-dark'>";
        myTable += "<th>ID</th>";
        myTable += "<th>NAME</th>";
        myTable += "<th>DESCRIPTION</th>";
        myTable += "<th></th>";
        myTable += "<th></th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].description+"</td>";
        myTable += "<td><a href='#idCate'><button class='btn btn-warning' onclick='editarC("+items[i].id+")'>Edit</button></td></a>"
        myTable += "<td><button class='btn btn-danger' onclick='borrarC("+items[i].id+")'>🗑</button></td>"
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoCategorias").append(myTable);
}

function crearCategoria(){
    
    let myData= {
        name: $("#name").val(),
        description: $("#description").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
		url: "http://localhost:8080/api/Category/save",
        type:"POST",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        complete:function(respuesta){

           $("#name").val("");
            $("#description").val("");
            verCategorias();

            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    });
}

function editarC(idCate){
    $("#idCate").empty();
    $("#idCate").val(idCate);    
}
function editarCategoria(){
    let myData= {
        id:$("#idCate").val(),
        name: $("#nameEditCate").val(),
        description: $("#descriptionEditCate").val()
    };

    let dataToSend = JSON.stringify(myData);
    
    $.ajax({
		url: "http://localhost:8080/api/Category/update",
        type:"PUT",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        success:function(respuesta){
            verCategorias();
            console.log("Editado");
        }
    });
}

function borrarC(idB){

    let urlMV="http://localhost:8080/api/Category/"+idB;
    $.ajax({
		url: urlMV,
        type:"DELETE",
        //data: dataToSend,
        //dataType:"json",
        //contentType: 'application/json',
        success:function(respuesta){
            verCategorias();
            console.log("Borrado");
        }
    });
}

