var types = ["good", "bad", "juicy"];

var getAllTodos = function (){
    $.ajax({
        method: 'get',
        url : window.location.origin+'/todos',
        success: function(response){
            for(var i = 0; i< types.length; i++){
                showTodos(response,types[i]);
            }
            
        }
    })
};


var showTodos = function(todos,type){
    var parent = $("div."+type);
    parent.empty();
    var empty = true;
    for(var i = 0; i < todos.length; i++){
        if(todos[i].type === type){
            empty = false;
            parent.append('<p>'+todos[i].title+'</p>');
        }
    }
    if(empty){
        parent.append('<p class="no-item">There is not item in this category</p>'); 
    }
}

var create = function(){
    var title = $('input[name=title]').val();
    var type = $('select').val();
    var data = JSON.stringify({title: title, type: type});
    $.ajax({
        method: 'post',
        url : window.location.origin+'/todos',
        contentType: "application/json",
        dataType: "text",
        data: data,
        success: function(){
            //getAllTodos();
        }
    })
}

$("button").on("click",function(){
    create();
    //console.log("click");
});

getAllTodos();

