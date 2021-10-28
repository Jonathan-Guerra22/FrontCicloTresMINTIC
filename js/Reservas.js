function verReservas(){
    $.ajax({
        //132.226.244.108
       url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservas").empty();
            RespuestaReservas(respuesta);
        }
    });
}
function RespuestaReservas(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";

    if(items.length>0){
        myTable += "<tr class='table-dark'>";
        myTable += "<th>ID</th>";
        myTable += "<th>Start Date</th>";
        myTable += "<th>Devolution Date</th>";
        myTable += "<th>CLIENT</th>";
        myTable += "<th>FARM</th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){
        
        let finca = items[i].farm.id+"<br>";
        finca += items[i].farm.name+"<br>";
        
        let cliente = items[i].client.name+"<br>";

        myTable += "<tr>";
        myTable += "<td>"+items[i].idReservation+"</td>";
        myTable += "<td>"+items[i].startDate+"</td>";
        myTable += "<td>"+items[i].devolutionDate+"</td>";
        myTable += "<td>"+cliente+"</td>";
        myTable += "<td>"+finca+"</td>";
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoReservas").append(myTable);
}

function crearReservacion(){
    
    let finca = {id: $("#idfarm").val()};
    let cliente = {idClient: $("#idclient").val()};

    let myData= {
        startDate: $("#start").val(),
        devolutionDate: $("#devolution").val(),
        client: cliente,
        farm: finca
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
		url: "http://localhost:8080/api/Reservation/save",
        type:"POST",
        data: dataToSend,
        dataType:"json",
        contentType: 'application/json',
        complete:function(respuesta){

            $("#idfarm").val(""),
            $("#idclient").val("");
            $("#devolution").val(),
            $("#start").val(),
            
            verReservas();

            console.log("Guardado!");

        },
        error: function(textStatus) {
            console.log(textStatus)
        }
    });
}