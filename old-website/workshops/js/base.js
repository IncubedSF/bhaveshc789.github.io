$(document).ready(function(){
  var once = false,
    today = new Date(Date.now()),
    zoneH = parseInt(today.getTimezoneOffset() / 60),
    zoneM = parseInt(today.getTimezoneOffset() % 60),
    zoneS = (zoneH < 0 ? '+' : '-') + (Math.abs(zoneH) < 10 ? '0' + Math.abs(zoneH) : Math.abs(zoneH)) + ':' +
    (Math.abs(zoneM) < 10 ? '0' + Math.abs(zoneM) : Math.abs(zoneM));

  function updateMonthYear() {
    $( '#custom-month' ).html( $( '#calendar' ).calendario('getMonthName') );
    $( '#custom-year' ).html( $( '#calendar' ).calendario('getYear'));
  }

  $(document).on('finish.calendar.calendario', function(e){
    $( '#custom-month' ).html( $( '#calendar' ).calendario('getMonthName') );
    $( '#custom-year' ).html( $( '#calendar' ).calendario('getYear'));
    $( '#custom-next' ).on( 'click', function() {
      $( '#calendar' ).calendario('gotoNextMonth', updateMonthYear);
    } );
    $( '#custom-prev' ).on( 'click', function() {
      $( '#calendar' ).calendario('gotoPreviousMonth', updateMonthYear);
    } );
    if(!once) {
      init();
      $( '#calendar' ).calendario('getCell', today.getDate()).trigger('click');
      once = true;
    }
  });

  $('#calendar').on('shown.calendar.calendario', function(){
    $('div.fc-row > div').on('onDayClick.calendario', function(e, dateprop) {
      if( dateprop.data.content.length > 0 ) {
        if(dateprop.data.startTime.length > 0) {
          $('#view').trigger('calClick');
          reset();
          for(var i = 0; i < dateprop.data.startTime.length; i++) {
            if(dateprop.data.allDay[i]) allDay(dateprop.data.content[i]);
            else date(dateprop.data.content[i], dateprop.data.startTime[i], dateprop.data.endTime[i]);
          }
        }
      }
    });
  });

  $('#view').on('click calClick', function(e){
    e.preventDefault();
    if(once) $('.custom-calendar-wrap').slideToggle();
    else $('.custom-calendar-wrap').slideUp();
  });

  function init() {
    var d = new Date(), time, hour;
    $('ul > li:not(.all-day)').each(function(i, e){
      time = $(e).find('time').attr('datetime');
      hour = parseInt(time.split(':')[0]);
      d.setHours(hour, 0, 0, 0);
      $(e).find('time').attr('datetime', d.toISOString());
      if(hour < 10) $(e).find('time > span').html('0' + hour + ':' + '00<h6>AM</h6>');
      else if(hour < 12 && hour >= 10) $(e).find('time > span').html(hour + ':' + '00<h6>AM</h6>');
      else if(hour == 12) $(e).find('time > span').html(hour + ':' + '00<h6>PM</h6>');
      else if(hour < 22 && hour > 12) $(e).find('time > span').html('0' + (hour - 12) + ':' + '00<h6>PM</h6>');
      else if(hour >= 22) $(e).find('time > span').html((hour - 12) + ':' + '00<h6>PM</h6>');
    });
  }

  function allDay(content) {
    $('li.all-day').append('<div class="cbp_tmlabel">' + content + '</div>');
  }

  function date(content, start, end) {
    var pos = start.getHours() + 2,
      top = ((start.getMinutes() / 60) * 200) == 0 ? '-1px' :  ((start.getMinutes() / 60) * 200) - 1 + 'px',
      height = ((((end.getTime() - start.getTime()) / (60 * 1000 * 60)) * 200) - 1) + 'px',
      append = '<div class="cbp_tmlabel" style="top:'+ top + ';height:' + height + '; max-height:' + height + '">' +
        content + '</div>';
    $('ul > li:nth-child(' + pos +')').append(append);
  }

  function reset() {
    $('li').find('div.cbp_tmlabel').remove();
  }

  $('#calendar').calendario({
    caldata : timelineEvents,
    displayWeekAbbr : true,
    zone: zoneS
  });
});
