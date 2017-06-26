$(document).ready(function(){
  // Show User Data
  buildUserDataTable("#userData");  
$("#checkRecommend").click(function(){
    //var res= sim_pearson(critics,"Lisa Rose", "Toby");
    //var res = topMatches(critics,"Toby",n=5,similarity=sim_pearson) ;
    var res = getRecommendations(Data,$("#userName").val(),similarity=$("#algorithm").val()); 
    $("#resultRecommed").html(formatToTable(res));
});
$("#checkTop").click(function(){
    //var res= sim_pearson(critics,"Lisa Rose", "Toby");
    //var res = topMatches(critics,"Toby",n=5,similarity=sim_pearson) ;
    var res = topMatches(Data,$("#userName").val(),n=$("#noOfRecords").val(),similarity=$("#algorithm").val()) 
    $("#resultTop").html(formatToTable(res));
});

 
});
items = [];
function buildUserDataTable(selector){
for (user in Data) 
  for (item in Data[user]) {if(items.indexOf(item) == -1) items.push(item)};

columsheader = "<thead class='thead-inverse'><tr><th scope='row'>#</th>";
for(item in items) columsheader += "<th>" + items[item] + "</th>";columsheader += "</tr></thead>" 
rows = "";
for (user in Data) {rows += "<tr><th scope='row'>"+ user+"</th>";for(item in Data[user]) rows+="<td>"+"<meter value="+Data[user][item]+" min='0' max='5'></meter>"+ "</td>"; rows+="</tr>"}
tableHtml = columsheader+rows;  
$(selector).html(tableHtml);
}

function formatToTable(result){
    htm = "<table class='table table-bordered'>";
    for (ity in result){res=result[ity]; htm += "<tr><td>"+ res[1] +"</td><td>"+res[0]+"</td></tr>";}
    htm += "</table>";
    return htm; 
}



// A dictionary of movie critics and their ratings of a small set of movies
var Data = {
    'Lisa Rose': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'Superman Returns': 3.5,
        'You, Me and Dupree': 2.5,
        'The Night Listener': 3.0,
    },
    'Gene Seymour': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 1.5,
        'Superman Returns': 5.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 3.5,
    },
    'Michael Phillips': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.0,
        'Superman Returns': 3.5,
        'The Night Listener': 4.0,
    },
    'Claudia Puig': {
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'The Night Listener': 4.5,
        'Superman Returns': 4.0,
        'You, Me and Dupree': 2.5,
    },
    'Mick LaSalle': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'Just My Luck': 2.0,
        'Superman Returns': 3.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 2.0,
    },
    'Jack Matthews': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'The Night Listener': 3.0,
        'Superman Returns': 5.0,
        'You, Me and Dupree': 3.5,
    },
    'Toby': {'Snakes on a Plane': 4.5, 'You, Me and Dupree': 1.0,
             'Superman Returns': 4.0},
}