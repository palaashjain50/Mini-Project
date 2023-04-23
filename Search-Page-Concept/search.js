// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','<span>Embark</span> Upon the Journey of Finding the Best Medicine Deals Online...'],
    typeSpeed: 20,
});

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

const form = document.querySelector('.form_container');
const medicine_container = document.querySelector('.output_search_container');
const load_gif = document.querySelector(".load_gif");
// medicine_container.style.display = 'none';
// medicine_container.style.display = 'none';
form.addEventListener('submit', () => {
    console.log('form clicked');
    medicine_container.style.display = 'none';
    load_gif.classList.add("load_gif_active");
});
medicine_container.style.display = 'grid';


window.addEventListener('load',()=>{
    // medicine_container.style.display = 'none';
    readTextFile("med.json", function(text){
        var data = JSON.parse(text);
        console.log(data);     
        load_gif.classList.remove("load_gif_active");
        console.log('Version - 2');
        // output_search_container.style.display = 'block';
        // form.addEventListener('submit', () => {
        //     output_search_container.style.display = 'block';
        // });
        // const loading_gif = document.querySelector(".load_gif");
        const cards = document.querySelectorAll(".card");
        const name = document.querySelectorAll(".medicine_name");
        const price = document.querySelectorAll(".actual_price");
        const img = document.querySelectorAll(".medi_img");
        const mrp = document.querySelectorAll(".mrp");
        // med.json contains Array[] of 3 objects{}
        let tata1mg_arr = Object.values(data[0]);
        // Object.values return arr (3 X 4)
        console.log(tata1mg_arr);
        // tata1mg_obj[0] contains medicine
        let mediname_arr = tata1mg_arr[0];
        let mediprice_arr = tata1mg_arr[1];
        let mrp_arr = tata1mg_arr[2];
        let mediimg_arr = tata1mg_arr[3];
        // console.log(mediname_arr);
        console.log(mediname_arr.length);
        for(let i = 0; i < mediname_arr.length - 1; i++) {
            if(mediname_arr[i] == ""){
                // console.log("none");
                cards[i].style.display = 'none';
            }
            else {
                img[i].src = mediimg_arr[i];
                name[i].innerText = mediname_arr[i];
                mrp[i].innerText = mrp_arr[i];
                mrp[i].style.setProperty("text-decoration", "line-through");
                price[i].innerText = mediprice_arr[i];
            }
        }
                
        let apollo_arr = Object.values(data[1]);
        mediname_arr = apollo_arr[0];
        mediprice_arr = apollo_arr[1];
        mediimg_arr = apollo_arr[2];
        for(let i = 0, j = 3; i < mediname_arr.length - 1; i++, j++) {
            if(mediname_arr[i] == "") {
                cards[j].style.display = 'none';
            }
            else {
                name[j].innerText = mediname_arr[i];
                price[j].innerText = mediprice_arr[i];
                img[j].src = mediimg_arr[i];
            }
        }

        let pharmeasy_arr = Object.values(data[2]);
        mediname_arr = pharmeasy_arr[0];
        mediprice_arr = pharmeasy_arr[1];
        mediimg_arr = pharmeasy_arr[3];
        mrp_arr = pharmeasy_arr[2];
        for(let i = 0, j = 6; i < mediname_arr.length - 1; i++, j++) {
            if(mediname_arr[i] == ""){
                cards[j].style.display = 'none';
            }
            else{
                name[j].innerText = mediname_arr[i];
                price[j].innerText = mediprice_arr[i];
                img[j].src = mediimg_arr[i];
                mrp[j-3].innerText = mrp_arr[i];
                mrp[j-3].style.setProperty("text-decoration", "line-through");
            }
        }
        
    });
});



// 1.Implementation of switch b/w view summary and medicine_container
// 2.Adding add to cart + counter button (if qty >= 1) *for each cards of medicine_container

const summary_btn = document.querySelector(".summary_btn");
const summary_display = document.querySelector(".summary_container");
const med_container = document.querySelector(".medicine_container");
const cartbtn = document.querySelectorAll(".cart");
const counterbtn = document.querySelectorAll(".counter_btn");
const counterbtn_plus = document.querySelectorAll(".counter_btn_plus");
const counterbtn_minus = document.querySelectorAll(".counter_btn_minus");
const counterbtn_val = document.querySelectorAll(".qty");


summary_btn.addEventListener('click', () => {
    if(summary_btn.innerText === "View Summary") {
        summary_display.classList.add("active");
        med_container.classList.add("inactive");
        summary_btn.innerText = "Close Summary";
    }
    else {
        summary_display.classList.remove("active");
        med_container.classList.remove("inactive");
        summary_btn.innerText = "View Summary";
    }
});

// For each card
cartbtn.forEach((cart, index) => {
    cart.addEventListener('click', () => {
        cartbtn[index].classList.add("cart_inactive");
        counterbtn[index].classList.add("counter_btn_active");
    });
});

// For a single card
// cartbtn.addEventListener('click', () => {
//     cartbtn.classList.add("cart_inactive");
//     counterbtn.classList.add("counter_btn_active");
// });

counterbtn_plus.forEach((plusbtn, index) => {
    plusbtn.addEventListener('click', () => {
        let val = parseInt(counterbtn_val[index].textContent);
        val = val + 1;
        counterbtn_val[index].textContent = val;
    }); 
});
// counterbtn_plus.addEventListener('click', () => {
//     let val = parseInt(counterbtn_val.textContent);
//     val = val + 1;
//     counterbtn_val.textContent = val;
// });

counterbtn_minus.forEach((minusbtn, index) => {
    minusbtn.addEventListener('click', () => {
        let val = parseInt(counterbtn_val[index].textContent);
        val = val - 1;
        if(val > 0) counterbtn_val[index].textContent = val;
        else {
            cartbtn[index].classList.remove("cart_inactive");
            counterbtn[index].classList.remove("counter_btn_active");
        }
    }); 
});
// counterbtn_minus.addEventListener('click', () => {
//     let val = parseInt(counterbtn_val.textContent);
//     val = val - 1;
//     if(val > 0) counterbtn_val.textContent = val;
//     else {
//         cartbtn.classList.remove("cart_inactive");
//         counterbtn.classList.remove("counter_btn_active");
//     }
// });

// https://stackoverflow.com/questions/36812786/adding-div-dynamically-using-button-click-in-javascript-jquery#:~:text=%24%20%28%27button%27%29.on%20%28%27click%27%2C%20addDiv%29%3B%20Then%2C%20create%20the%20function,%7B%20%24%20%28%27.container%27%29.append%20%28%27%3Cdiv%3E%27%29.addClass%20%28%27listing%20listing_ad%20job%27%29%3B%20%7D
