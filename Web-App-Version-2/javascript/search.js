// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','<span>Embark</span> on the Journey of Finding the Best Medicine Deals Online...'],
    typeSpeed: 20,
});

//taking document objects to update the search information
let searchInfo = document.getElementById("searchInfo");
let searchCards = document.getElementById("searchCards");
let searchBtn = document.getElementById("searchBtn");
var inputVal=document.getElementById("medicine_name");
let sources = ['Tata1mg', 'Apollo Pharmacy', 'Pharmeasy'];
var miniCards = [];
var count = 0;
var addToCartBtns, addIcons, subtractIcons, cart_view, cartIcon, qtyInCart, medNameInCart;

//selecting some elements to make changes in their relative structure when summary is displayed
let resultBox = document.getElementById("searchResultBox");
let summaryBox = document.getElementById("summary_container");
let summaryBtn = document.querySelector("#summaryBtn");
summaryBtn.classList.add("summaryBtnInactive");
let notificationMessContainer = document.querySelector(".notificationMessContainer");
notificationMessContainer.classList.add("notifInactive");

//function for shaking cart btn when already added
function shakeCart(event){
    event.target.style.animation='shake 0.5s';
    event.target.style.backgroundColor='#be0404';
    event.target.innerText='Already Added!'
    setTimeout(()=>{
        event.target.style.animation='';
    },500);
}

function triggerClick(event){
    event.target.parentElement.parentElement.parentElement.childNodes[5].childNodes[1].click();
}

//functions for add and subtract icons of the main cards
function mainAddIconEvent(event){
    var displayElem = event.target.parentElement.parentElement.childNodes[3];
    var currentVal = parseInt(displayElem.innerText);
    displayElem.innerText=currentVal+1;
}

function mainSubIconEvent(event){
    var displayElem = event.target.parentElement.parentElement.childNodes[3];
    var currentVal = parseInt(displayElem.innerText);
    if(currentVal>=2){
        displayElem.innerText=currentVal-1;
    }
}

//function for when something is added to the card
function addingToCart(event){
    count++;
    event.target.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[1].removeEventListener('click',mainAddIconEvent);
    event.target.parentElement.parentElement.childNodes[3].childNodes[5].childNodes[1].removeEventListener('click',mainSubIconEvent);
    event.target.removeEventListener('click',addingToCart);
    setTimeout(()=>{
        event.target.style.backgroundColor='#038d04';
        event.target.innerText='Added to Cart';
    },300);
    event.target.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[1].addEventListener('click',triggerClick);
    event.target.parentElement.parentElement.childNodes[3].childNodes[5].childNodes[1].addEventListener('click',triggerClick);
    event.target.addEventListener('click',shakeCart);
    if(cartIcon.classList.contains('animateCartIcon')) cartIcon.classList.remove("animateCartIcon");
    if(notificationMessContainer.classList.contains("slideUp")) {
        notificationMessContainer.classList.remove("slideUp");
        notificationMessContainer.classList.add("notifInactive");
    }
    var parentCard = event.target.parentElement.parentElement.parentElement;
    var imageSrc = parentCard.childNodes[1].childNodes[1].src;
    var medName = parentCard.childNodes[3].innerText;
    var medLink = parentCard.childNodes[5].childNodes[7].childNodes[1].childNodes[0].href;
    var medPrice = parentCard.childNodes[5].childNodes[1].childNodes[1].innerText;
    var company = parentCard.childNodes[5].childNodes[7].childNodes[1].childNodes[0].innerText;
    var qtyCount = parentCard.childNodes[5].childNodes[3].childNodes[3].innerText;
    var newMiniCard = `
        <div class="cartCard">
            <img src="${imageSrc}"  alt="Medicine">
            <div class="medDescription">
                <p class="med_name"><a href="${medLink}" target="_blank">${medName}</a></p>
                <p class="priceViewParent">
                    <span class="priceView">${medPrice}</span>
                </p>
            </div>
            <div class="counter">
                <div><i class="fa-solid fa-minus"></i></div>
                <p class="val">${qtyCount}</p>
                <div><i class="fa-solid fa-plus"></i></div>
            </div>
            <p class="company_tag">${company}</p>
            <p class="removeTag">
                <i class="fa-sharp fa-solid fa-trash"></i>
            </p>
        </div> `;
    cart_view.innerHTML+=newMiniCard;
    if(summaryBtn.classList.contains('summaryBtnInactive')) summaryBtn.classList.remove('summaryBtnInactive');
    cartIcon.classList.add("animateCartIcon");
    if(notificationMessContainer.classList.contains("notifInactive")) {
        notificationMessContainer.classList.remove("notifInactive");
        if(count > 1) qtyInCart.innerText = `${count} Items`;
        else qtyInCart.innerText = `${count} Item`;
        medNameInCart.innerText = medName;
        notificationMessContainer.classList.add("slideUp");
    }   
}

//function to update the result box based on cart window changes
function updateResultBoxWhenSummaryClosed(){
    let cartItems = document.querySelectorAll(".cartCard");
    let resultCards = document.querySelectorAll(".searchCard");
    let medLink, flag;
    for(i=0; i<resultCards.length; i++){
        flag=0;
        if(resultCards[i].outerHTML.includes('Added to Cart')||resultCards[i].outerHTML.includes('Already Added!')){
            medLink=resultCards[i].childNodes[5].childNodes[7].childNodes[1].childNodes[0].href;
            for(j=0; j<cartItems.length; j++){
                if(cartItems[j].outerHTML.includes(medLink)){
                    flag=1;
                    resultCards[i].childNodes[5].childNodes[3].childNodes[3].innerText=cartItems[j].childNodes[5].childNodes[3].innerText
                    break;
                }
            }
            if(flag==0){
                resultCards[i].childNodes[5].childNodes[5].childNodes[1].style='';
                resultCards[i].childNodes[5].childNodes[5].childNodes[1].innerText='Add to Cart';
                resultCards[i].childNodes[5].childNodes[3].childNodes[3].innerText=1;
                resultCards[i].childNodes[5].childNodes[5].childNodes[1].removeEventListener('click',shakeCart);
                resultCards[i].childNodes[5].childNodes[5].childNodes[1].addEventListener('click',addingToCart);
                resultCards[i].childNodes[5].childNodes[3].childNodes[1].childNodes[1].removeEventListener('click',triggerClick);
                resultCards[i].childNodes[5].childNodes[3].childNodes[5].childNodes[1].removeEventListener('click',triggerClick);
                resultCards[i].childNodes[5].childNodes[3].childNodes[1].childNodes[1].addEventListener('click',mainAddIconEvent);
                resultCards[i].childNodes[5].childNodes[3].childNodes[5].childNodes[1].addEventListener('click',mainSubIconEvent);
            }
        }
    }
}

//function to update result box based on cart history
function updateResultBoxOnSearching(){
    let cartItems = document.querySelectorAll(".cartCard");
    let resultCards = document.querySelectorAll(".searchCard");
    let medLink;
    for(i=0; i<cartItems.length; i++){
        medLink= cartItems[i].childNodes[3].childNodes[1].childNodes[0].href;
        for(j=0; j<resultCards.length; j++){
            if(resultCards[j].outerHTML.includes(medLink)){
                resultCards[j].childNodes[5].childNodes[5].childNodes[1].style.backgroundColor='#038d04';
                resultCards[j].childNodes[5].childNodes[5].childNodes[1].innerText='Added to Cart';
                resultCards[j].childNodes[5].childNodes[3].childNodes[3].innerText=cartItems[i].childNodes[5].childNodes[3].innerText;
                resultCards[j].childNodes[5].childNodes[5].childNodes[1].removeEventListener('click',addingToCart);
                resultCards[j].childNodes[5].childNodes[5].childNodes[1].addEventListener('click',shakeCart);
                resultCards[j].childNodes[5].childNodes[3].childNodes[1].childNodes[1].removeEventListener('click',mainAddIconEvent);
                resultCards[j].childNodes[5].childNodes[3].childNodes[5].childNodes[1].removeEventListener('click',mainSubIconEvent);
                resultCards[j].childNodes[5].childNodes[3].childNodes[1].childNodes[1].addEventListener('click',triggerClick);
                resultCards[j].childNodes[5].childNodes[3].childNodes[5].childNodes[1].addEventListener('click',triggerClick);
                break;
            }
        }
    }
}

//adding event listener to search btn to get to know when exactly to update data
searchBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    searchInfo.innerHTML=`
        <div>Please wait while we look for the medicine</div>
        <div><img src="../Images/searchLoading.gif" width="32px" alt="Loading..."></div>
    `;
    searchCards.innerHTML='';
    // notificationMessContainer.classList.add("notifInactive");
    fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: inputVal.value })
    })
    .then(response => response.json())
    .then(data => {
        displayCards([data.tata1mg, data.apollo, data.pharmeasy]);
        addToCartBtns =  document.querySelectorAll(".addToCartBtn");
        addIcons = document.querySelectorAll(".addI");
        subtractIcons = document.querySelectorAll(".subtractI");
        cart_view = document.querySelector(".cart_view");
        cartIcon = document.querySelector(".fa-cart-shopping"); 
        qtyInCart = document.querySelector(".qtyInCart");
        medNameInCart = document.querySelector(".medNameInCart");
        //adding eventlisteners to all the required elements of each card
        addIcons.forEach(addIcon=>{
            addIcon.addEventListener('click',mainAddIconEvent);
        });
        subtractIcons.forEach(subtractIcon=>{
            subtractIcon.addEventListener('click',mainSubIconEvent);
        });
        addToCartBtns.forEach(btn=>{
            btn.addEventListener('click',addingToCart);
        });
        updateResultBoxOnSearching();
        //removing previous event listener and adding new one
        summaryBtn.removeEventListener('click', summaryHandling);
        //Implemenation of event listeners on Cart Container Items
        //function to display cartCards
        function displayMiniCards(cards){
            let cart_view = document.querySelector(".cart_view");
            cart_view.innerHTML='';
            cards.forEach(card=>{
                cart_view.innerHTML+=card;
            });
        }
        function addIconAction(event){
            var parentElem = event.target.parentElement.parentElement;
            var currVal = parseInt(parentElem.childNodes[3].innerText);
            parentElem.childNodes[3].innerText=currVal+1; 
            updateSummary();
        }
        function subIconAction(event){
            var parentElem = event.target.parentElement.parentElement;
            var currVal = parseInt(parentElem.childNodes[3].innerText);
            if(currVal>=2){
                parentElem.childNodes[3].innerText=currVal-1;
            } 
            updateSummary();
        }
        function delAction(event){
            count--;
            var cartCards = document.querySelectorAll(".cartCard");
            miniCards=[];
            cartCards.forEach(card=>{
                miniCards.push(card.outerHTML);
            });
            var srcStr= event.target.parentElement.parentElement.childNodes[1].src;
            for(i=0; i<miniCards.length; i++){
                if(miniCards[i].includes(srcStr)){
                    miniCards.splice(i,1);
                    break;
                }
            }
            displayMiniCards(miniCards);
            var addIconsSummary = document.querySelectorAll(".fa-plus");
            var subIconsSummary = document.querySelectorAll(".fa-minus");
            var delBtns = document.querySelectorAll(".fa-trash");
            addIconsSummary.forEach(icon=>{
                icon.addEventListener('click',addIconAction);
            });
            subIconsSummary.forEach(icon=>{
                icon.addEventListener('click',subIconAction);
            });
            delBtns.forEach(btn=>{
                btn.addEventListener('click',delAction);
            });
            updateSummary();
        }
        summaryBtn.addEventListener('click', () => {
            var cartCards = document.querySelectorAll(".cartCard");
            miniCards=[];
            cartCards.forEach(card=>{
                miniCards.push(card.outerHTML);
            });
            displayMiniCards(miniCards);
            resultBox.style.height='730px';
            summaryBox.style.top='55%';
            setTimeout(()=>{
                document.getElementById("summary_container").scrollIntoView({behavior: "smooth"});
            },900);
            var addIconsSummary = document.querySelectorAll(".fa-plus");
            var subIconsSummary = document.querySelectorAll(".fa-minus");
            var delBtns = document.querySelectorAll(".fa-trash");
            addIconsSummary.forEach(icon=>{
                icon.addEventListener('click',addIconAction);
            });
            subIconsSummary.forEach(icon=>{
                icon.addEventListener('click',subIconAction);
            });
            delBtns.forEach(btn=>{
                btn.addEventListener('click',delAction);
            });
            updateSummary();
        });
    })
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
                                    <span class="material-symbols-outlined addI" style="width: 63px;">
                                        add
                                    </span>
                                </div>
                                <div class="displayArea">
                                    1
                                </div>
                                <div class="subtractIcon">
                                    <span class="material-symbols-outlined subtractI" style="width: 63px;">
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

//function to handle search page structure when summary is displayed
function summaryHandling(){
    // console.log('clicked');
    resultBox.style.height='730px';
    summaryBox.style.top='55%';
    setTimeout(()=>{
        document.getElementById("summary_container").scrollIntoView({behavior: "smooth"});
    },900);
}
//initial event listener when no results displayed
summaryBtn.addEventListener('click', summaryHandling);

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
    resultBox.style.height='';
    summaryBox.style.top='40%';
    updateResultBoxWhenSummaryClosed();
    summaryContainer.classList.remove("active");
    searchResultBox.classList.remove("inactive");
    viewCartBtn.classList.remove("inactive");
});

searchBox.addEventListener('click',() => {
    summaryContainer.classList.remove("active");
    searchResultBox.classList.remove("inactive");
    viewCartBtn.classList.remove("inactive");
});

//function for updating the summary
function updateSummary(){
    let tata1mgSummary = document.querySelector(".tata1mg_summary");
    let apolloSummary = document.querySelector(".apollo_summary");
    let pharmeasySummary = document.querySelector(".pharmeasy_summary");
    tata1mgSummary.childNodes[3].innerHTML='';
    apolloSummary.childNodes[3].innerHTML='';
    pharmeasySummary.childNodes[3].innerHTML='';
    let cards = document.querySelectorAll(".cartCard");
    let medName, medPrice, medQty, temp;
    let tata1mgTotal=0, apolloTotal=0, pharmeasyTotal=0;  
    cards.forEach(card=>{
        medName=card.childNodes[3].childNodes[1].innerText;
        medPrice=card.childNodes[3].childNodes[3].innerText;
        medQty=card.childNodes[5].childNodes[3].innerText;
        temp=medPrice;
        if(temp.includes(")")){
            temp=temp.split(")")[1];
        }
        temp=temp.replace('₹','');
        if(card.outerHTML.includes("Tata1mg")){
            tata1mgTotal+=parseInt(medQty)*parseFloat(temp);
            tata1mgSummary.childNodes[3].innerHTML+=`
                <div class="summary_content_box">
                    <p >${medName}</p>
                    <p>${medQty}</p>
                    <p>${medPrice}</p>
                </div>`;
        }
        else if(card.outerHTML.includes("Apollo Pharmacy")){
            apolloTotal+=parseInt(medQty)*parseFloat(temp);
            apolloSummary.childNodes[3].innerHTML+=`
                <div class="summary_content_box">
                    <p >${medName}</p>
                    <p>${medQty}</p>
                    <p>${medPrice}</p>
                </div>`;
        }
        else if(card.outerHTML.includes("Pharmeasy")){
            pharmeasyTotal+=parseInt(medQty)*parseFloat(temp);
            pharmeasySummary.childNodes[3].innerHTML+=`
                <div class="summary_content_box">
                    <p >${medName}</p>
                    <p>${medQty}</p>
                    <p>${medPrice}</p>
                </div>`;
        }
    });
    if(tata1mgSummary.childNodes[3].innerHTML==''){
        tata1mgSummary.childNodes[3].innerHTML='Empty'
    }
    if(apolloSummary.childNodes[3].innerHTML==''){
        apolloSummary.childNodes[3].innerHTML='Empty'
    }
    if(pharmeasySummary.childNodes[3].innerHTML==''){
        pharmeasySummary.childNodes[3].innerHTML='Empty'
    }
    tata1mgSummary.childNodes[1].childNodes[1].innerText=`₹${(tata1mgTotal).toFixed(2)}`;
    apolloSummary.childNodes[1].childNodes[1].innerText=`₹${(apolloTotal).toFixed(2)}`;
    pharmeasySummary.childNodes[1].childNodes[1].innerText=`₹${(pharmeasyTotal).toFixed(2)}`;
    let cartTotal=document.querySelector(".summary_container");
    cartTotal.childNodes[1].childNodes[1].childNodes[1].innerText=`₹${(tata1mgTotal+apolloTotal+pharmeasyTotal).toFixed(2)}`;
}
