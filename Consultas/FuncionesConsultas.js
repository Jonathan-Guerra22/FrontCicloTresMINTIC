function verReporteReservas(){
    $.ajax({
       url: "http://localhost:8080/api/Reservation/report-status",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservas").empty();
            RespuestaReporteReservas(respuesta);
        }
    });
}
function RespuestaReporteReservas(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";
    
    myTable += "<tr class='table-dark'>";
    myTable += "<th>COMPLETED</th>";
    myTable += "<th>CANCELLED</th>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<td>"+items.completed+"</td>";
    myTable += "<td>"+items.cancelled+"</td>";
    myTable += "</tr>";
        
    myTable += "</table>";
    $("#resultadoReservas").append(myTable);
}





function verReporteClientes(){
    $.ajax({
       url: "http://localhost:8080/api/Reservations/report-clients",
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoClientes").empty();
            RespuestaReporteClientes(respuesta);
        }
    });
}

function RespuestaReporteClientes(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";
    
    if(items.length>0){
        
        myTable += "<tr class='table-dark'>";
        myTable += "<th>CLIENT</th>";
        myTable += "<th>TOTAL RESERVATIONS</th>";
        myTable += "<th>RESERVATIONS</th>";
        myTable += "</tr>";
    }else{
        myTable += "<th>No hay datos disponibles en la tabla</th>";
    }
    
    for(i=0;i<items.length; i++){

        let reservaciones=[];
        for (j=0;j<items[i].client.reservations.length;j++){
            reservaciones+="<li>"+items[i].client.reservations[j].idReservation+"<br>";
            reservaciones+="Start Date: "+items[i].client.reservations[j].startDate+"<br>";
            reservaciones+="Devolution Date: "+items[i].client.reservations[j].devolutionDate+"<br>";
            reservaciones+="Farm: "+items[i].client.reservations[j].farm.id+"<br>";
        }
        myTable += "<tr>";
        myTable += "<td>"+items[i].client.name+"</td>";
        myTable += "<td>"+items[i].total+"</td>";
        myTable += "<td>"+reservaciones+"</td>";
        myTable += "</tr>";
    }
    
    myTable += "</table>";
    $("#resultadoClientes").append(myTable);
}





function buscarFechas(){

    let dateOne = $("#startDate").val();
    let dateTwo = $("#endDate").val();
    console.log(dateOne)
    console.log(dateTwo)
    $.ajax({
       url: "http://localhost:8080/api/Reservation/report-dates/"+dateOne+"/"+dateTwo,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoFechas").empty();
            RespuestaBuscarFechas(respuesta);
        }
    });
}
function RespuestaBuscarFechas(items){
    let myTable = "<table class='table table-striped table-bordered border-secondary'>";

    myTable += "<tr class='table-dark'>";
    myTable += "<th>CLIENT</th>";
    myTable += "<th>FARM</th>";
    myTable += "<th>ID RESERVATION</th>";
    myTable += "<th>DATES</th>";
    myTable += "<th>STATUS</th>";
    myTable += "</tr>";
    myTable += "<tr>";

    for(i=0;i<items.length; i++){
        myTable += "<td>"+items[i].client.name+"</td>";
        myTable += "<td> Id Farm:   "+items[i].farm.id+"<br><br>Name: "+items[i].farm.name+"</td>";
        myTable += "<td>"+items[i].idReservation+"</td>";
        myTable += "<td> Start Date:  "+items[i].startDate+"<br><br>Devolution Date  "+items[i].devolutionDate+"</td>";
        myTable += "<td> Status:  "+items[i].status+"</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoFechas").append(myTable);
}
