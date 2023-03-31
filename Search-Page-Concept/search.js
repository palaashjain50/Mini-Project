// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','<span>Embark</span> on the Journey of Finding the Best Medicine Deals Online...'],
    typeSpeed: 20,
});

//for reading json file
// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

//taking document objects to update the search information
let searchInfo = document.getElementById("searchInfo");
let searchCards = document.getElementById("searchCards");
let searchBtn = document.getElementById("searchBtn");
var inputVal=document.getElementById("medicine_name");
let sources = ['Tata1mg', 'Apollo Pharmacy', 'Pharmeasy'];

//adding event listener to search btn to get to know when exactly to update data
searchBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    searchInfo.innerHTML=`
        <div>Please wait while we look for the medicine</div>
        <div><img src="./Images/searchLoading.gif" width="32px" alt="Loading..."></div>
    `;
    searchCards.innerHTML='';
    // var http = new XMLHttpRequest();
    // var url = 'http://localhost:3000/';
    // var params = `name=${inputVal.value}`;
    // http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.onreadystatechange = function(){
    //     if(http.readyState == 4 && http.status == 200) {
    //         alert(http.responseText);
    //     }
    // }
    // http.send(params);
    // event.preventDefault();

    // const xhr = new XMLHttpRequest(); // Create XMLHttpRequest object
    // xhr.open('POST', 'http://localhost:3000/'); // Open a connection to the server
    // xhr.setRequestHeader('Content-Type', 'application/json'); // Set request headers 'x-www-form-urlencoded'
    // xhr.onload = function(){
    //   // Handle response from the server
    // };


    // xhr.send(JSON.stringify({name: inputVal.value}));


    // // xhr.send(`name=${inputVal.value}`); // Send data to the server
    
    
    
    // const getData = async () => {
    //     const response = await fetch("http://localhost:3000/");
    //     const data = await response.json();
    //     console.log(data);
    // }
    // getData();
        


    fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: inputVal.value })
    })
    .then(response => response.json())
    .then(data => displayCards([data.tata1mg, data.apollo, data.pharmeasy]))
    .catch(error => searchInfo.innerHTML='Cannot connect to the server :(');

});

//function to display all the search cards
function displayCards(medJsonData){
    searchInfo.innerHTML='';
    searchCards.innerHTML='';
    searchInfo.innerHTML=`Showing results for ${inputVal.value}...`;
        for(i=0; i<3; i++){
            for(j=0; j<4; j++){
                if(medJsonData[i].medicines[j]==''){
                    continue;
                }
                searchCards.innerHTML+=`
                    <div class="searchCard">
                        <div class="imageArea">
                            <img src="${medJsonData[i].images[j]}" alt="${medJsonData[i].medicines[j]}">
                        </div>
                        <div class="medName">
                            ${medJsonData[i].medicines[j]}
                        </div>
                        <div class="baseGroup">
                            <div class="price">
                                Price- <span>${(medJsonData[i].prices[j]).replace('MRP','')}</span>
                            </div>
                            <div class="quantityArea">
                                <div class="addIcon">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                </div>
                                <div class="displayArea">
                                    1
                                </div>
                                <div class="subtractIcon">
                                    <span class="material-symbols-outlined">
                                        remove
                                    </span>
                                </div>
                            </div>
                            <div class="addToCartArea">
                                <div class="addToCartBtn">
                                    Add to Cart
                                </div>
                            </div>
                            <div class="cardSource">
                                Source: <span><a href="${medJsonData[i].hyperLinks[j]}" target="_blank">${sources[i]}</a></span>
                            </div>
                        </div>
                    </div>`;
        }
    }
}

//to show the results whenever required
//setInterval(()=>{
    // readTextFile("med.json", function(text){
    //     var data = JSON.parse(text);
    //     displayCards(data);
    // });
//},100);
// window.addEventListener('load',()=>{
//     readTextFile("med.json", function(text){
//         var data = JSON.parse(text);
//         displayCards(data);
//     });
// });