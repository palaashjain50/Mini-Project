// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','<span>Embark</span> on the Journey of Finding the Best Medicine Deals Online...'],
    typeSpeed: 20,
});

//for reading json file
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

//taking document objects to update the search information
let searchInfo = document.getElementById("searchInfo");
let searchCards = document.getElementById("searchCards");
let searchBtn = document.getElementById("searchBtn");
let sources = ['Tata1mg', 'Apollo Pharmacy', 'Pharmeasy'];
let inputVal='Otrivin';

//adding event listener to search btn to get to know when exactly to update data
searchBtn.addEventListener('click', ()=>{
    // inputVal=document.getElementById("medicine_name").value;
    // console.log(value);
    searchInfo.innerHTML=`
        <div>Please wait while we look for the medicine</div>
        <div><img src="../Images/searchLoading.gif" width="32px" alt="Loading..."></div>
    `;
    searchCards.innerHTML='';
});

//to show results whenever window loads
window.addEventListener('load',()=>{
    readTextFile("med.json", function(text){
        var data = JSON.parse(text);
        searchInfo.innerHTML='';
        searchCards.innerHTML='';
        //if(inputVal!=''){
            searchInfo.innerHTML=`Showing results for ${inputVal}...`;
            for(i=0; i<3; i++){
                for(j=0; j<4; j++){
                    if(data[i].medicines[j]==''){
                        continue;
                    }
                    searchCards.innerHTML+=`
                        <div class="searchCard">
                            <div class="imageArea">
                                <img src="${data[i].images[j]}" alt="${data[i].medicines[j]}">
                            </div>
                            <div class="medName">
                                ${data[i].medicines[j]}
                            </div>
                            <div class="price">
                                Price- <span>${(data[i].prices[j]).replace('MRP','')}</span>
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
                                Source: <span><a href="${data[i].hyperLinks[j]}" target="_blank">${sources[i]}</a></span>
                            </div>
                        </div>`;
                }
            }
        //}
    });
});