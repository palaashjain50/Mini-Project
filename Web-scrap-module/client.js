function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

document.getElementById('clickbtn').addEventListener('click',()=>{
    document.getElementById('medicine').innerHTML='Loading data..... Please wait!';
});

window.addEventListener('load',()=>{
    readTextFile("med.json", function(text){
        var data = JSON.parse(text);
        for(i=0; i<3; i++){
            for(j=0; j<4; j++){
                if(data[i].medicines[j]!=""){
                    document.getElementById("medicine").innerHTML+=`<div class="cards">
                        <div>${data[i].medicines[j]}</div>
                        <div>${data[i].prices[j]}</div>
                        <div><img src="${data[i].images[j]}" width="100px" height="100px"></div>
                        <div><a href="${data[i].hyperLinks[j]}">click</a></div>
                        <div style="height: 35px;"></div>
                    </div>`;
                }
            }
        }
    });
});

