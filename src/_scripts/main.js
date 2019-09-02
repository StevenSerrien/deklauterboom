// Main javascript entry point
// Should handle bootstrapping/starting application

"use strict";

import $ from "jquery";
import Link from "../_modules/link/link";
// import Toastify from 'toastify-js';


import { Foundation } from 'foundation-sites/js/foundation.core';
import { Abide } from 'foundation-sites/js/foundation.abide';

import './vendors/jquery.easing.js';



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


  var mobileHamburger = document.querySelector('#hamburger');


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


  var sections = $('section')
  , nav = $('.header-wrapper')
  , nav_height = nav.outerHeight();

  var scrollTimeout;
  var throttle = 200;

  $(window).on('scroll', function () {
    if (!scrollTimeout) {

    scrollTimeout = setTimeout(function () {
    var cur_pos = $(this).scrollTop() + (nav_height * 2);

    if ($(this).scrollTop() > (nav_height * 2)) {
      nav.addClass('scrolled');
    } else {
      nav.removeClass('scrolled');
    }


    sections.each(function() {
      var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();



      // console.log('top section', sections[0].getBoundingClientRect());
      if (cur_pos >= top && cur_pos <= bottom) {
      // if (cur_pos >= top && cur_pos <= bottom) {

        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');

        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');


      }
      scrollTimeout = null;
    });
  }), throttle;
  }
  });

  $('.page-scroll').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    mobileHamburger.checked = false;
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1000, 'easeInOutCubic');

    return false;
  });


  function submitContactForm(form, actionUrl = "https://deklauterboom-contact.herokuapp.com/") {
    contactFormActivated = true;
    form = $(form)[0];

    var loadingClass = 'button--loading';

    var submitButton = $(form.querySelector('[type*="submit"]'));
    submitButton.addClass(loadingClass);

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
          submitButton.removeClass(loadingClass);
          showToast('<span class="title">' + successTitle + '</span> <br/ > <span class="text">' + successText + '</span>', 'success');
        } else if (text && text.message == "failure_email") {
          alert("Er ging iets mis. Bericht niet verstuurd.");
        }
      },
      error: function() {
        submitButton.removeClass(loadingClass);
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
