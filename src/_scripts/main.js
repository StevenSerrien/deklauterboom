// Main javascript entry point
// Should handle bootstrapping/starting application

"use strict";

import $ from "jquery";
import Link from "../_modules/link/link";

$(() => {
  new Link(); // Activate Link modules logic
  // console.log('Welcome to Yeogurt!');

  var contactFormActivated = false;

  $("#contactform").submit(function(event) {
    event.preventDefault();
    var actionUrl = $(event.target).data('action');

    if (!contactFormActivated) {
      submitContactForm(event.target);
    }

  });

  function submitContactForm(form, actionUrl = "https://deklauterboom-contact.herokuapp.com/") {
    contactFormActivated = true;
    form = $(form)[0];

    var firstName = $("#first_name").val();
    var lastName = $("#last_name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var telephone = $("#telephone").val();


    $.ajax({
      type: "POST",
      url: actionUrl + "send_email",
      data:
        "first_name=" +
        firstName +
        "&last_name=" +
        lastName +
        "&email=" +
        email +
        "&telephone=" +
        telephone +
        "&message=" +
        message,
      success: function(text) {
        contactFormActivated = false;
        if (text && text.message == "success") {
          form.reset();
        } else if (text && text.message == "failure_email") {
          alert("Er ging iets mis. Bericht niet verstuurd.");
        }
      },
      error: function() {
        alert("Er ging iets mis. Bericht niet verstuurd.");
      }
    });
  }
});
