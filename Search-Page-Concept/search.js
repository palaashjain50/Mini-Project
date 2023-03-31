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
var CartArr = [];
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
    .then(data => {
        console.log('Data');
        var imgArr = [];
        var url = [];
        displayCards([data.tata1mg, data.apollo, data.pharmeasy],imgArr,url);
        let searchCard =  document.querySelectorAll(".searchCard");
        // var imgFullURL = document.querySelector('.medImg').src;
        // console.log(imgFullURL);
        console.log(imgArr);
        let medName = document.querySelectorAll(".medName");
        let price = document.querySelectorAll(".price");
        let addToCartBtn = document.querySelectorAll(".addToCartArea");
        let addIcon = document.querySelectorAll(".addIcon");
        let displayArea = document.querySelectorAll(".displayArea");
        let subtractIcon = document.querySelectorAll(".subtractIcon");
        let links = document.querySelectorAll(".link");
        let cart_view = document.querySelector(".cart_view");
        // console.log(imgSrc);
        addToCartBtn.forEach((addCard, index) => { 
            addCard.addEventListener('click', () => {
                console.log('clicked');
                cart_view.innerHTML += `
                <div class="cartCard">
                    <img src="${imgArr[index]}"  alt="">
                    <div class="medDescription">
                        <p class="med_name"><a href="${url[index]}" target="_blank">${medName[index].innerText}</a></p>
                        <p class="priceViewParent">
                            <span class="priceView">${(price[index].innerText).replace('Price-','')}</span>
                        </p>
                    </div>
                    <div class="counter">
                        <div><i class="fa-solid fa-minus"></i></div>
                        <p>1</p>
                        <div><i class="fa-solid fa-plus"></i></div>
                    </div>
                    <p class="tata1mg_tag">Tata 1mg</p>
                    <p class="removeTag">
                        <i class="fa-sharp fa-solid fa-trash"></i>
                    </p>
                </div> `;
                CartArr.push(cart_view);
            });
        });
        addIcon.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                console.log('add');
                let value = parseInt(displayArea[index].innerText);
                value += 1;
                displayArea[index].innerText = value;
                // updateCart(value,medName[index].innerText);
            });
        });
        subtractIcon.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                let value = parseInt(displayArea[index].innerText);
                value -= 1;
                if(value >= 0) {
                    displayArea[index].innerText = value;
                    // updateCart(value,medName[index].innerText);
                }
            });
        });
        let summaryBtn = document.querySelector("#summaryBtn");
        summaryBtn.addEventListener('click', () => {
            if(CartArr.length > 0) {
                let cartCard = document.querySelectorAll(".cartCard");
                let removeTag = document.querySelectorAll(".removeTag");
                removeTag.forEach((tag, index) => {
                    tag.addEventListener('click', () => {
                        cartCard[index].remove();
                        CartArr.splice(index,1);
                    });
                });
            }
        });
    })
    .catch(error => searchInfo.innerHTML='Cannot connect to the server :(');

});
    

//function to display all the search cards
function displayCards(medJsonData,imgArr,url){
    searchInfo.innerHTML='';
    searchCards.innerHTML='';
    searchInfo.innerHTML=`Showing results for ${inputVal.value}...`;
        for(i=0; i<3; i++){
            for(j=0; j<4; j++){
                if(medJsonData[i].medicines[j]==''){
                    continue;
                }
                imgArr.push(medJsonData[i].images[j]);
                url.push(medJsonData[i].hyperLinks[j]);
                searchCards.innerHTML+=`
                    <div class="searchCard">
                        <div class="imageArea">
                            <img src="${medJsonData[i].images[j]}" alt="${medJsonData[i].medicines[j]}" class="medImg">
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
                                Source: <span><a href="${medJsonData[i].hyperLinks[j]}" target="_blank" class="link">${sources[i]}</a></span>
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

// Implementation of Cart button and containers swapping.
const viewCartBtn = document.querySelector("#summaryBtn");
const summaryContainer = document.querySelector(".summary_container");
const searchResultBox = document.querySelector("#searchResultBox");
const closeIcon = document.querySelector(".fa-x");
const searchBox = document.querySelector("#medicine_name");

viewCartBtn.addEventListener('click', () => {
    searchResultBox.classList.add("inactive");
    summaryContainer.classList.add("active");
    viewCartBtn.classList.add("inactive");
});

closeIcon.addEventListener('click', () => {
    summaryContainer.classList.remove("active");
    searchResultBox.classList.remove("inactive");
    viewCartBtn.classList.remove("inactive");
});

searchBox.addEventListener('click',() => {
    summaryContainer.classList.remove("active");
    searchResultBox.classList.remove("inactive");
    viewCartBtn.classList.remove("inactive");
});


