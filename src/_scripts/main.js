// Main javascript entry point
// Should handle bootstrapping/starting application

"use strict";

import $ from "jquery";
import Link from "../_modules/link/link";
import Toastify from 'toastify-js';


import { Foundation } from 'foundation-sites/js/foundation.core';
import { Abide } from 'foundation-sites/js/foundation.abide';



// import 'foundation-core';

$(() => {
  new Link(); // Activate Link modules logic
  // console.log('Welcome to Yeogurt!');
  Foundation.addToJquery($);
  Foundation.plugin(Abide, 'Abide');

  Foundation.Abide.defaults.liveValidate = true;
  // Foundation.Abide.defaults.validateOnBlur = true;

  $(document).foundation();

  var toastConfig = {
    text: "This is a toast",
    duration: 3000,
    newWindow: true,
    gravity: "bottom", // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    className: "toast",
    onClick: function(){} // Callback after click
  }

  var contactFormActivated = false;





  $(document)
  .on("forminvalid.zf.abide", function(ev,frm) {
    ev.preventDefault();
  })
  .on("formvalid.zf.abide", function(ev,frm) {
    if (!contactFormActivated) {
      submitContactForm(ev.target);
    }
  })
  .submit('submit', function(ev) {
    ev.preventDefault();
  });



  function submitContactForm(form, actionUrl = "https://deklauterboom-contact.herokuapp.com/") {
    contactFormActivated = true;
    form = $(form)[0];

    var successTitle = $(form).data('success-title');
    var successText = $(form).data('success-text');


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
          showToast('<span class="title">' + successTitle + '</span> <br/ > <span class="text">' + successText + '</span>', 'success');
        } else if (text && text.message == "failure_email") {
          alert("Er ging iets mis. Bericht niet verstuurd.");
        }
      },
      error: function() {
        contactFormActivated = false;
        alert("Er ging iets mis. Bericht niet verstuurd.");
      }
    });
  }


  function showToast(text, type) {
    var config = toastConfig;
    config.text = text;
    config.className = type;

    Toastify(config).showToast();
  }
});
