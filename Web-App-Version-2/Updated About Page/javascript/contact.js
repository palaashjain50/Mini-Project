// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','Let Us Know Your Opinions...'],
    typeSpeed: 20,
});

var reviews = ["I recently switched to a new medication for my allergies and it has been a game-changer. I was constantly struggling with congestion and sneezing, but now my symptoms are completely under control. The only downside is that it can make me a bit drowsy, but I've found that taking it before bed helps me get a good night's sleep.", "I've been taking this medication for my chronic pain for a few weeks now, and I have to say that it's been a disappointment. It hasn't really helped alleviate my symptoms and I've experienced some unpleasant side effects like nausea and dizziness. I'm going to speak to my doctor about trying a different medication.", "I suffer from anxiety and panic attacks and was prescribed this medication by my doctor. I was hesitant to take it at first, but it has been a lifesaver. It helps me stay calm and focused during the day and I haven't experienced any negative side effects. I highly recommend it to anyone struggling with anxiety."];

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

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
        form_content.style.display = "none";
        form.style.background = "none";
        submit_animation.style.display = "flex";
        delay(1500).then(() => {submit_animation.style.display = "none"; submission.style.display = "block"});
    }
});
