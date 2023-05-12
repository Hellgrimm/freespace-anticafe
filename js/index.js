function ValidMail() {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById('footeremail').value;
    var valid = re.test(myMail);
    if (valid) output = 'You are subscribed';
    else output = 'Incorrect email';
    document.getElementById('footeremail').placeholder = output;
    document.getElementById("footeremail").value = "";
    return valid;
}
