/**
 * Steps.js 1.0.0
 * A smart UI component which allows you to easily create wizard-like interfaces
 *
 * Copyright 2018, Takaki Kinoshita
 * https://xxxxx/
 *
 * Licensed under MIT
 *
 * Released on : 2018/02/23
 */
(function ($, undefined) {
'use strict';

function initialize(options){
  var
    $wps,
    $wpModal,

    opts = $.extend({}, options),
    wizardWidth;

  state = {
    currentIndex : opts.startIndex || 0
  };

  $wizard = $(this);

  wizardWidth = $wizard.width();

  $wps = $wizard.find('.wizard-page');
  $wps.each(function (idx) {
    $wps.data('step_number', idx);

    if(idx === state.currentIndex) {
      $(this).offset({left : 0 });
    }
    else if(idx < state.currentIndex) {
      $(this).offset({left : -wizardWidth });
    }
    else if(idx > state.currentIndex) {
      $(this).offset({left : wizardWidth });
    }
  });

  // モーダルを非表示にする
  $wpModal = $wizard.find('.wizard-page-modal');
  $wpModal.each(function (event) {
    var $this = $(this);

    $this.css({
      'background-color' : '#ffffff',
    });

    $(this).hide();
  });
}

function moveWizard($step, xAxis, easing, duration){
console.dir($step);
  $step
    .animate({
      left : xAxis, 
    },
    duration,
    easing);
/*
  return new Promise(function (resolve, reject) {
    $step
      .animate({
        left : xAxis, 
      },
      duration,
      easing,
      function (){
        resolve(arguments);
      });
  });
*/
}

function goToStep ($inStep, $outStep, option) {
  var
    wizardWidth = $wizard.width(),
    sign = -1;

  if(option && option.direction === 1){
    sign = 1;
  }

  moveWizard($inStep, 0, defaults.easing, defaults.fadeInDuration);

  moveWizard($outStep, sign * wizardWidth, defaults.easing, defaults.fadeOutDuration);
/*
  $inStep
    .animate({
      left : 0
    }, 1000, 'easeOutExpo');

  $outStep
    .animate({
      left : sign * wizardWidth
    }, 500, 'easeOutExpo');
*/
}

function goToPreviousStep() {
  var
    currentIndex  = state.currentIndex,
    $steps          = $wizard.find('.wizard-page'),
    $currentStep  = $steps.eq(currentIndex),
    $previousStep = $steps.eq(currentIndex - 1);

  goToStep($previousStep, $currentStep, { direction : 1 });

  state.currentIndex = state.currentIndex - 1;
}

function goToNextStep() {
  var
    currentIndex = state.currentIndex,
    $wps       = $wizard.find('.wizard-page'),
    $currentStep = $wps.eq(currentIndex),
    $nextStep    = $wps.eq(currentIndex + 1);

    goToStep($nextStep, $currentStep);

    state.currentIndex = state.currentIndex + 1;
}

$.fn.steps = function (method) {
  if($.fn.steps[method]){
    return $.fn.steps[method].apply(this, Array.prototype.slice.call(arguments, 1));
  }
  else if(typeof method === "object" || !method){
    return initialize.apply(this, arguments);
  }
  else {
    $.error('oops!!');
  }
}

$.fn.steps.skip = function (skipCount) {
  var
    count = skipCount,
    goTo  = goToNextStep;

  if(skipCount < 0) {
    count = -1 * skipCount;
    goTo = goToPreviousStep;
  }

  _.times(count, function () {
    goTo(); 
  });
}

$.fn.steps.show = function (selector) {
  var
    $modal               = $(selector).clone(),
    window_height      = $(window).height(),
    window_scroll_top  = $(window).scrollTop(),
    start_y            = window_scroll_top + window_height;

  $modal.find('.modal_close_btn').click(function (event) {
    $modal.animate(
      {
        top : window_height,
      },
      {
        duration : defaults.fadeOutDuration,
        easing   : defaults.easing,
        complete : function () {
          $modal.remove();
        }
      }
    );
  });

  $modal.css({
    'display'          : 'block',
    'z-index'          : 100
  });

  $modal.attr('id', $modal.attr('id') + '_' + uniqueId());

  $wizard.append($modal);

  $modal
    .height(window_height)
    .offset({top : start_y});

  $.Deferred(function(d) {
    d.pipe(function () {
      return $modal.animate({
        top : 0,
      },
      {
        duration : defaults.fadeInDuration,
        easing   : defaults.easing,
      });
    }).pipe(function () {
      $modal.offset({top : 0});
    });
  }).resolve();
}

$.fn.steps.next = function () {
  return goToNextStep();
}

$.fn.steps.previous = function () {
  return goToPreviousStep();
}

var state = {};

var $wizard = null;

var defaults = $.fn.steps.defaults = {
  fadeInDuration : 700,
  fadeOutDuration : 600,

  easing   : 'easeOutExpo'
};

})(jQuery);
