(function(){
  // Using the newer v4 initialization
  emailjs.init({
    publicKey: "ydz8es7xIvf8kkYxW",
  });
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = "SENDING...";
  btn.disabled = true;

  // Matching your template keys: {{name}}, {{email}}, {{subject}}, {{message}}
  var templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  emailjs.send("service_1stnakw", "template_g51x3xx", templateParams)
  .then(function(response) {
    alert("Message sent successfully!");
    document.getElementById('contactForm').reset();
    btn.innerHTML = "SEND MESSAGE";
    btn.disabled = false;
  }, function(error) {
    console.error("EmailJS Error Details:", error);
    alert("Failed to send message. Error: " + (error.text || "Unknown Error"));
    btn.innerHTML = "SEND MESSAGE";
    btn.disabled = false;
  });
});

function myFunction() {
  var x = document.getElementById("demo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}
