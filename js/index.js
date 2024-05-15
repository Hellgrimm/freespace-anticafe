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

// Reference to the item count and the overlay
var itemCount = document.getElementById('item-count');
var bookOverlay = document.getElementById('book-overlay');
var cartContainer = document.getElementById('cart-container');

// Mouseover event on item count to show the overlay
itemCount.addEventListener('mouseover', function() {
    bookOverlay.style.display = 'block';
});

// Mouseout event on cart container to hide the overlay
// Checks if the mouse is actually outside the cart-container before hiding
cartContainer.addEventListener('mouseleave', function(event) {
    if (!cartContainer.contains(event.relatedTarget)) {
        bookOverlay.style.display = 'none';
    }
});



document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.style.display = 'none'; // Hide the parent .book-item
    });
});
