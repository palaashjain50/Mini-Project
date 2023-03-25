// for typing animation
var typed = new Typed('#slogan', {
    strings: ['','Let Us Know Your Opinions...'],
    typeSpeed: 20,
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var submit = document.getElementById("submit-button");
var form_content = document.getElementById("form_content");
var submit_animation = document.getElementById("submit_animation");
var submission = document.getElementById("submission");

submit.addEventListener("click", function(){
    var name_input = ((document.getElementById("name")).value).length;
    var email_input = ((document.getElementById("email")).value).length;
    var comments_input = ((document.getElementById("comments")).value).length;
    if (name_input == 0 || email_input == 0 || comments_input == 0)
        window.alert("Empty Input");
    else
    {
        form_content.style.display = "none";
        submit_animation.style.display = "flex";
        delay(1500).then(() => {submit_animation.style.display = "none"; submission.style.display = "flex"});
    }
});
