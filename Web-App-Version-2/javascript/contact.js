// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','Let Us Know Your Opinions...'],
    typeSpeed: 20,
});

const reviews = ["I recently switched to a new medication for my allergies and it has been a game-changer. I was constantly struggling with congestion and sneezing, but now my symptoms are completely under control. The only downside is that it can make me a bit drowsy, but I've found that taking it before bed helps me get a good night's sleep.", "I've been taking this medication for my chronic pain for a few weeks now, and I have to say that it's been a disappointment. It hasn't really helped alleviate my symptoms and I've experienced some unpleasant side effects like nausea and dizziness. I'm going to speak to my doctor about trying a different medication.", "I suffer from anxiety and panic attacks and was prescribed this medication by my doctor. I was hesitant to take it at first, but it has been a lifesaver. It helps me stay calm and focused during the day and I haven't experienced any negative side effects. I highly recommend it to anyone struggling with anxiety."];
const users = ["Shanouf Ansari", "Harsh Jain", "Palaash Jain"];
const icons = ["../Images/user2.png", "../Images/user3.png", "../Images/user.png"];
// const reviews = ["one", "two", "three"];
var c = document.getElementById("user_icon");
var u = document.getElementById("user_name");
var p = document.getElementById("user_text");
var i = 0;
var length = reviews.length;

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

right.addEventListener("click", function(){
    i = (i + 1) % length;
    var temp_a = icons[i];
    var temp_b = users[i];
    var temp_c = reviews[i];
    c.src = temp_a;
    u.innerHTML = temp_b;
    p.innerHTML = temp_c;
});

left.addEventListener("click", function(){
    if (i == 0)
        i = length - 1;
    else
        i = i - 1;
    var temp_d = icons[i];
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

submit.addEventListener("click", function(){
    var name_input = ((document.getElementById("name")).value).length;
    var email_input = ((document.getElementById("email")).value).length;
    var comments_input = ((document.getElementById("comments")).value).length;
    if (name_input == 0 || email_input == 0 || comments_input == 0)
        window.alert("Empty Input");
    else
    {
        name_input = document.getElementById("name");
        email_input = document.getElementById("email");
        comments_input = document.getElementById("comments");
        reviews.push(comments_input);
        users.push(name_input);
        var temp = form.style.background;
        form_content.style.display = "none";
        form.style.background = "none";
        submit_animation.style.display = "flex";
        delay(1500).then(() => {submit_animation.style.display = "none"; submission.style.display = "block"});
        delay(5000).then(() => {submission.style.display = "none"; form_content.style.display = "block"; name_input.value = ""; email_input.value = ""; comments_input.value = " "; form.style.background = temp;});
    }
});
