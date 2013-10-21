jQuery(document).ready(function ($) {


    $(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
	
	/**/	
	if (mywindow.scrollTop() < 1) {
		$('.navigation li[data-slide="1"]').addClass('active');
	}
	/**/

    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
			
			$('.navigation li[data-slide="1"]').removeClass('active');
			
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

  function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top + 4
        }, 2000, 'easeInOutQuint');
    }
	
	function goToByScroll(dataslide) {
		var goal = $('.slide[data-slide="' + dataslide + '"]').offset().top;
		if (mywindow.scrollTop()<goal) {
			var goalPx = goal + 5;
		} else {
			var goalPx = goal - 20;
		}
        htmlbody.animate({
            scrollTop: goalPx
        }, 3000, 'easeInOutQuint');
    }

    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
	
	//prettyPhoto
		$("a[rel^='prettyPhoto']").prettyPhoto();
	
	// Sticky Navigation	
		$(".menu").sticky({topSpacing:0});
	
	
	$("#slide1, #slide5, #slide7").each(function () {
        var slide_h = $(this).height();
		
		$(this).css('background-size', '100% '+slide_h+'px');
		
    });
    
  var calendarService;
  var feedUrl = "https://www.google.com/calendar/feeds/host@thegothicrestaurant.com/public/full";
  var entries;

  function setupCalendarService() {
    // Registered with Google Cloud API console by elliot at infinite digital now for use by The Gothic
    calendarService = new google.gdata.calendar.CalendarService('BrowserKey-2013-10-16-0');
  }

  function getEventsFeed() {
    setupCalendarService();
    var query = new google.gdata.calendar.CalendarEventQuery(feedUrl);
    query.setOrderBy('starttime');
    query.setSortOrder('ascending');
    query.setFutureEvents(true);
    query.setSingleEvents(true);
    query.setMaxResults(10);
    return calendarService.getEventsFeed(query, addEvents, null);
  }

  var addEvents = function (resultsFeedRoot) {
    //alert("This feed's title is: " + resultsFeedRoot.feed.getTitle().getText());
    eventEntries = resultsFeedRoot.feed.getEntries();
    entries = eventEntries;
    for (var i = 0; i < eventEntries.length; i++) { 
      var event = eventEntries[i];
      var title = "<h2>" + event.getTitle().getText() + "</h2>";
      var date = event.getTimes()[0].getStartTime().getDate();
      uiDate = "<h3>" + $.datepicker.formatDate('MM d', date) + "</h3>";
      var description = "<p>" + event.getContent().getText() + "</p>";
      var e = "<li>" + title + uiDate + description + "</li>";
      $("#events_list").append(e);
    }
  };

  var handleClientLoad = function () {
    // registered for the gothic restaurant
    var apiKey = 'AIzaSyB5el3rwn_s9mMeSkW5UvtDu7DrqIt4qD8'; 
    getEventsFeed();
    // Had trouble getting the v3 calendar gdata apis working, so switched to another technique.
    //gapi.client.setApiKey(apiKey);
    //alert('got there');
    //gapi.client.load('calendar', 'v3', function() { loadCalendarEvents(); });
  };

  google.load("gdata", "1");
  google.setOnLoadCallback(handleClientLoad);
	
});







