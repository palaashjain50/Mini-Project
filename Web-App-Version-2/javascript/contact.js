// for typing animation
var typed = new Typed('#slogan', {
    strings: ['', 'Let Us Know <span>Your</span> Opinions...'],
    typeSpeed: 20,
});

var reviews;
var users;
const icons = ["../Images/user2.png", "../Images/user3.png", "../Images/user.png"];
// const reviews = ["one", "two", "three"];
var c = document.getElementById("user_icon");
var u = document.getElementById("user_name");
var p = document.getElementById("user_text");
var i = 0;
var img = 0;
var length;

window.onload = (event) => {
    reviews = JSON.parse(localStorage.getItem("review"));
    users = JSON.parse(localStorage.getItem("user"));
    if (reviews === null)
    {
        reviews = [];
        users = [];
    }
    length = reviews.length;
    console.log(users);
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/*async function extractReview() {
    while (true)
    {
        var a = reviews[i];
        var b = users[i];
        var d = icons[i];
        // delay(5000).then(() => p.innerHTML = a);
        await delay(5000);
        u.innerHTML = b;
        p.innerHTML = a;
        c.src = d;
        i = (i + 1) % reviews.length;
    }
}*/

var left = document.getElementById("left_click");
var right = document.getElementById("right_click");

right.addEventListener("click", function () {
    i = (i + 1) % length;
    img = Math.floor(Math.random() * 100) % icons.length;
    var temp_a = icons[img];
    var temp_b = users[i];
    var temp_c = reviews[i];
    c.src = temp_a;
    u.innerHTML = temp_b;
    p.innerHTML = temp_c;
});

left.addEventListener("click", function () {
    if (i == 0)
        i = length - 1;
    else
        i = i - 1;
    img = Math.floor(Math.random() * 100) % icons.length;
    var temp_d = icons[img];
    var temp_e = users[i];
    var temp_f = reviews[i];
    c.src = temp_d;
    u.innerHTML = temp_e;
    p.innerHTML = temp_f;
});

var submit = document.getElementById("submit-button");
var form_content = document.getElementById("form_content");
var submit_animation = document.getElementById("submit_animation");
var submission = document.getElementById("submission");
var form = document.getElementById("form");

function validateEmail(input) 
{

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex))
        return true;
    else 
        return false;
}

submit.addEventListener("click", function () {
    var name_input = ((document.getElementById("name")).value).length;
    var email_input = ((document.getElementById("email")).value).length;
    var comments_input = ((document.getElementById("comments")).value).length;
    if (name_input == 0 || email_input == 0 || comments_input == 0)
        window.alert("Empty Input");
    else {
        name_input = document.getElementById("name");
        email_input = document.getElementById("email");
        comments_input = document.getElementById("comments");
        if (!validateEmail(email_input.value))
        {
            // window.alert("Please enter a valid email!!");
            document.getElementById("valid_email").style.display = "inline-block";
            email_input.classList.add("email_animation");
            delay(2000).then(() => { email_input.classList.remove("email_animation"); document.getElementById("valid_email").style.display = "none";});
            return;
        }
        reviews.push(comments_input.value);
        users.push(name_input.value);
        length = reviews.length;
        var temp = form.style.background;
        form_content.style.display = "none";
        form.style.background = "none";
        submit_animation.style.display = "flex";
        delay(1500).then(() => { submit_animation.style.display = "none"; submission.style.display = "block" });
        delay(5000).then(() => {
            submission.style.display = "none";
            form_content.style.display = "block";
            name_input.value = "";
            email_input.value = "";
            comments_input.value = "";
            form.style.background = temp;
        });
        localStorage.setItem("review", JSON.stringify(reviews));
        localStorage.setItem("user", JSON.stringify(users));
    }
});
