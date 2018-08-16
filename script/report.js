function generateFeedTable(){
    
//    var tablesrow = $(".content_row");
//    if(tablesrow!=null){
//        tablesrow.remove();
//    }
    
    $("#generate_record").click(function(e) {
        e.preventDefault();
        console.log("1111");
        $.ajax({
            type: "POST",
            url: "/feedTable",
            data: { 
                request: "feeding"
            },
            success: function(result) {
                if(result){
                    var txt = "";
                    for(var i=0; i< result.length; i++){
                         txt += "<tr class='content_row'><td>"+result[i].id_record+"</td><td>"+result[i].time+"</td><td>"+result[i].location+"</td><td>"+result[i].count+"</td><td>"+result[i].name+"</td></tr>";
                    }
                 //no request before
                 if($("#feeder td").length == 0){
                    $("#feeder").append(txt);
                  }
                 
                 //$("#generate_record").hide();
                }
            },
            error: function(result) {
                console.log("sql error")
            }
        });
    });
}
//request for 
function generateFoodTable(){
    //console.log("click");
    $("#generate_food").click(function(e) {
        console.log("click");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/foodTable",
            data: { 
                request: "food"
            },
            success: function(result) {
                if(result){
                    var txt = "";
                    for(var i=0; i< result.length; i++){
                         txt += "<tr><td>"+result[i].idfood+"</td><td>"+result[i].kind+"</td><td>"+result[i].quantity+"</td></tr>";
                    }
                 if($("#food td").length == 0){
                    $("#food").append(txt);
                 }else{
                     $(".content_row").remove();
                     $("#food").append(txt);
                 }
                 //$("#feeder").append(txt);
                 //$("#generate_record").hide();
                }
            },
            error: function(result) {
                console.log("sql error")
            }
        });
    });
}

//generate the join results
function generateAll(){
    $("#generateFullRecord").click(function(e) {
        console.log("click");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/fullResults",
            data: { 
                request: "results"
            },
            success: function(result) {
                if(result){
                    var txt = "";
                    for(var i=0; i< result.length; i++){
                         txt += "<tr><td>"+result[i].id_record+"</td><td>"+result[i].time+"</td><td>"+result[i].location+"</td><td>"+result[i].count+"</td><td>"+result[i].name+"</td><td>"+result[i].kind+"</td><td>"+result[i].quantity+"</td></tr>";
                    }
                 if($("#results td").length == 0){
                    $("#results").append(txt);
                 }
                }
            },
            error: function(result) {
                console.log("sql error")
            }
        });
    });
}

//searching Feeder 
function searchName(){
    var searchstring  = $('#searchfield').val();
    if(searchstring!=null){
        console.log(searchstring);
        $.ajax({
            type: "POST",
            url: "/feederName",
            data: { 
                request: searchstring
            },
            success: function(result) {
                if(result){
                    console.log("success");
                    var txt = "";
                    for(var i=0; i< result.length; i++){
                         txt += "<tr class='content_row'><td>"+result[i].id_record+"</td><td>"+result[i].time+"</td><td>"+result[i].location+"</td><td>"+result[i].count+"</td><td>"+result[i].name+"</td></tr>";
                    }
                 //no request before
                 if($("#feeder td").length == 0){
                    $("#feeder").append(txt);
                  }else{
                      $(".content_row").remove();
                      $("#feeder").append(txt)
                  }
                }
            },
            error: function(result) {
                console.log("sql error")
            }
        });
    }
}

