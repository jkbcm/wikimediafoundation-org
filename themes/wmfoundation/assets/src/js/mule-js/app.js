/**
 *
 * Header JS
 *
 */


jQuery(document).ready( function($) {

  // Transation bar into slider
  $('.translation-bar ul').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    prevNextButtons: false,
    freeScroll: true
  });

  $('.arrow-wrap').on('click', function() {
    $('.translation-bar ul').flickity('next');
  });

  $('.back-arrow-wrap').on('click', function() {
    $('.translation-bar ul').flickity('prev');
  });

  function toggleNav() {
    $('.nav-links').toggleClass('open');
    $('.header-inner').toggleClass('nav-open');
  }

  function toggleSearch() {
    $('.logo-nav-container').toggleClass('search-open');
    $('.search-toggle').blur();
    $('.search-bar-container input').focus();
  }


  $('.mobile-nav-toggle').on('click', function() {
    toggleNav();

    // If search is open, close it.
    if ($('.search-open').length) {
      $('.logo-nav-container').removeClass('search-open');
    }
  });


  $('.search-toggle').on('click', function() {
    toggleSearch();

    // If mobile nav is open, close it.
    if ($('.nav-open').length) {
      $('.nav-links').removeClass('open');
      $('.header-inner').removeClass('nav-open');
    }
  });


  // On resize, remove any open nav classes if desktop size, otheriwise, blue overlay behind nav will still be there.
  $(window).on('resize', function() {

    if (window.matchMedia("(min-width: 1050px)").matches) {
      if ($('.nav-open').length) {
        $('.nav-links').removeClass('open');
        $('.header-inner').removeClass('nav-open');
      }
    }
  });


  // Hide search bar container if mouse is clicked outside of search div or search toggle and search div is open
  $('html').on('click', function(e) {
    if( !$(e.target).is('.search-toggle *, .search-toggle') ) {
      if( !$(e.target).is('.search-bar-container *, .search-bar-container') ) {
        if ($('.search-open').length) {
          $('.logo-nav-container').removeClass('search-open');
        }
      }
    }
  });


  // Move search bar container just below logo-nav-container for mobile
  function searchBar() {
    if (window.matchMedia("(max-width: 1049px)").matches) {
      $('.logo-nav-container').prepend($('.search-bar-container'));
    } else {
      $('.search-bar-container').insertAfter($('.search-toggle'));
    }
  }


  // Logo swapping depending on screen size.
  var logoStacked = $('.header-inner .logo-stacked'),
    logoFull = $('.header-inner .logo-full');

  function swapLogos() {
    if (window.matchMedia("(max-width: 1049px)").matches) {
        $('.header-inner .logo-container a').prepend(logoFull);
    } else {
      $('.header-inner .logo-container a').prepend(logoStacked);
    }
  }

  $(window).on('resize load', function() {
    swapLogos();
    searchBar();
  });
 });
$(document).ready(function() {

  // Hover on an element, and add class to closest parent.
  function hoverAddClass(container, parent, elem, className) {
    $(container + ' ' + elem).hover(
      function () {
        $(this).closest(parent).addClass(className);
      },
      function () {
        $(this).closest(parent).removeClass(className);
      }
    );
  }

  // News category list, give li item a bottom border turquoise.
  hoverAddClass('.news-categories', 'li', 'a', 'border-turquoise');

  // Related News, take down the opacity of the darkening gradient.
  hoverAddClass('.related-news', '.bg-img', '.card-heading', 'headline-hover');

  // Translation bar, add underline to li
  hoverAddClass('.translation-bar', 'li', 'a', 'hover-underline');

  // Darken news images when headline is hovered
  hoverAddClass('.cta-news', '.card', '.h2 a', 'darken-img');
  hoverAddClass('.card-list-container', '.card', '.h3 a', 'darken-img');

});
/**
 *
 * Main site JS
 *
 */
$(document).ready(function() {

  // Related News module.  Keep h3 headings the same height so the images stay the same height as well.
  var headings = $('.related-news h3'),
    headingHeights = [];

  headings.each(function(index, value){
    headingHeights.push(value.clientHeight);
  });

  var maxHeight = headingHeights.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);

  headings.height(maxHeight);


  // Blockquotes
  // Since these blockquotes need to be display:inline for the quotation marks to function as designed, we can't add margin to it. This will wrap WordPress blockquotes in a container div to handle positioning and spacing.
  $('article blockquote').wrap( "<div class='blockquote-container'></div>")

  // Three up People module becomes slider on mobile.
  $('.people.slider-on-mobile').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    prevNextButtons: false,
    watchCSS: true
  });

  // Run a quick resize event on flickity - in case cards don't get spread properly spaces out cards.
  setTimeout(function(){
    $('.people.slider-on-mobile').flickity( 'resize' );
  }, 500);


  // Photo credits hover effect
  // Based on:
  // http://cssglobe.com/lab/tooltip/02/
  // http://cssglobe.com/lab/tooltip/02/main.js

  function imagePreview() {

    $("a.preview").hover(function(e){
      this.t = this.title;
      this.title = "";

      var c = (this.t != "") ? "<br/>" + this.t : "";

      $(this).append("<p id='preview'><img src='"+ $(this).attr('data-src') +"' alt='Image preview' />"+ c +"</p>");

      $("#preview").addClass('preview-visible');
    },
    function(){
      this.title = this.t;
      $("#preview").remove();
    });
  };

  imagePreview();



$('#dismiss-notification').click( function(){
  $('.notification-bar').fadeOut("slow", function(){

  });
});


});
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;

  // Wrap video (iframe) in parent div with .video-container class to activate fitVids.
  $(".video-container").fitVids();

})( window.jQuery );