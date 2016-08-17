//================== WINDOW LOADED ==================//
$(window).load(function() {
	$(".loading").fadeOut(500);	
	$("body").addClass("scroll-play");
});

//============ COLOR ============//
$(function(){
	var $mycss = $("link.colorname").attr("href","css/color/blue.css");
	$.cookie("css", $mycss);
	if($.cookie("css_color")) {
		$("link.colorname").attr("href",$.cookie("css_color"));
	}
	$(".get-color").click(function() { 
		$("link.colorname").attr("href",$(this).attr('rel'));
		$.cookie("css", null, {expires: 365, path: '/'})
		$.cookie("css_color",$(this).attr('rel'), {expires: 365, path: '/'});
		return false;
	});		
});

var positiveMargin = false;
$('.tomb-panel').click(function () {

	if (!positiveMargin) {
		var marginLeft = "0px";
		positiveMargin = true;
	}
	else {
		var marginLeft = "-186px";
		positiveMargin = false;
	}
	 $('.mypanel').animate({marginLeft: marginLeft}, {
		   duration: 1000
	 });
 });
 
//================== FLEXSLIDER ==================//
$(function () {
	$('#mySlide .flexslider').flexslider({
		slideshow: true,
		slideshowSpeed: 5000,
		pauseOnHover: true,
		start: renderPreview,	//render preview on start
		before: renderPreview //render preview before moving to the next slide
	});
		
	function renderPreview(slider) {
	
		 var sl = $(slider);
		 var prevWrapper = sl.find('.flex-prev');
		 var nextWrapper = sl.find('.flex-next');		 
		 
		 //calculate the prev and curr slide based on current slide
		 var curr = slider.animatingTo;
		 var prev = (curr == 0) ? slider.count - 1 : curr - 1;
		 var next = (curr == slider.count - 1) ? 0 : curr + 1;		 

		 //add prev and next slide details into the directional nav
		 prevWrapper.find('.preview, .arrow').remove();
		 nextWrapper.find('.preview, .arrow').remove();		 
		 prevWrapper.append(grabContent(sl.find('li:eq(' + prev + ') img')));
		 nextWrapper.append(grabContent(sl.find('li:eq(' + next + ') img')));		 

	}
	
	// grab the data and render in HTML
	function grabContent(img) {		
		var tn = img.data('thumbnail');
		var alt = img.prop('alt');		
		var html = '';
		
		//you can edit this markup to your own needs, but make sure you style it up accordingly
		html = '<div class="arrow"></div><div class="preview"><img src="' + tn + '" alt="" /><div class="alt">' + alt + '</div></div>';	
		return html;
	}
	
});

//================== VIDEO BACKGROUND ==================//
jQuery(function(){
	jQuery(".player").mb_YTPlayer(); 
});
$(function() {
	$('a.play').click(function(){
		$(this).hide(300);
		$('a.pause').show(100);
	});
	
	$('a.pause').click(function(){
		$(this).hide(300);
		$('a.play').show(100);
	});
});

//================== JQUERY FOR PAGE SCROLLING FEATURE - REQUIRES JQUERY EASING PLUGIN ==================//
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//================== HIGHLIGHT THE TOP NAV AS SCROLLING OCCURS ==================//
$('body').scrollspy({
    target: '.myNav'
});

	
//================== SCROLL TOP ANIMATION ==================//
$(window).scroll(function(){
   if( $(document).scrollTop() > 500 ) {
      $('#backToTop').fadeIn();
   }else {
      $('#backToTop').fadeOut();
   }
});

//================== PARALLAX BACKGROUND ==================//
$(function(){
	$(".parallax").each(function() {
		var window_r = $(window).width();
		var data_s = $(this).attr("data-speed");
		if(window_r <= 1024){
			data_s = 0;
		}
		$(this).parallax("50%", data_s);
		var $bgna = $(this).attr("data-background");							   
		$(this).css("background-image","url(" + $bgna + ")");
		$(this).css("background-size","cover");
	});
});

//================== JQUERY STICKEM ==================//
$(function(){
	$(".main").stickem();
});

$(document).ready(function(){
	var p_nav = $( ".stickem-container" ).offset().top;

	$(window).scroll(function(){
	   if( $(document).scrollTop() <= p_nav ) {
		  $('.myNav').removeClass("stickit");
	   }else {
		  $('.myNav').addClass("stickit");
	   }
	});
});

//================== STORY SECTION ==================//
$(document).ready(function(){
	$(window).on("scroll.myHistory", function(){
		var p_history = $( "#history" ).offset().top;
		var h_window = $(window).height() * 0.50;
		var get_scroll_history = p_history - h_window;

		if( $(document).scrollTop() > get_scroll_history ){
			$(window).off("scroll.myHistory");
			$(".item-count-story").each(function(){
				var count_store = $(this).data("count-store");
				$(this).find(".value-count > h2").delay(500).animateNumber({ number : count_store }, 3000);
			});
		}								   
	});						   
});

//================== TEAM SECTION ==================//
$(document).ready(function(){
	
	//====== Run Animation Skill when Scroll ======//
	$(window).on("scroll.myTeam", function(){
		var p_team = $( "#team" ).offset().top;
		var h_window = $(window).height() * 0.50;
		var get_scroll_team = p_team - h_window;

		if( $(document).scrollTop() > get_scroll_team ){
			$(window).off("scroll.myTeam");
			$("div.progress").each(function(){
				var myProgress = $(this).find(".progress-bar");
				var val_progress = myProgress.data("value-skill");
				myProgress.animate({
						"width"  : val_progress + '%'
					},{
					  duration: 'slow',
					  easing: 'easeInOutExpo'			
				});
				myProgress.find(".value-skill").delay(500).animateNumber({ number : val_progress }, 3000);
			});
		}								   
	});	
	
	//====== Team Selection by Tabs ======//	
    $('li.team > a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var p_team = $( "#team" ).offset().top;
		var h_window = $(window).height() * 0.50;
		var get_scroll_team = p_team - h_window;

		$("div.progress").each(function(){
			var myProgress = $(this).find(".progress-bar");
			var val_progress = myProgress.data("value-skill");
			myProgress.delay(300).animate({
					"width"  : val_progress + '%'
				},{
				  duration: 'slow',
				  easing: 'easeInOutExpo'			
			});
			myProgress.find(".value-skill").delay(500).animateNumber({ number : val_progress }, 3000);
		});
		$("html, body").animate({scrollTop : p_team},{
			  duration: 'slow',
			  easing: 'easeInOutExpo'			
		});
		$("li.team.active").removeClass("active");	
		$(this).parent("li").addClass("active");
	});
	
	//====== Team list style ======//
	$("li.team").each(function(){
		if(!$(this).is("active")){
			$(this).hoverIntent(function(){
				$(this).find("img").animate({
					"opacity" : "0"							
				});
				$(this).find("a").fadeIn();
			}, function(){
				$(this).find("img").animate({
					"opacity" : "100"							
				});
				$(this).find("a").fadeOut();
			});
		}
	});
});

//================== OWL SETTING ==================//

//====== Team List ======//
$(function(){   
    var owl = $("#team-list");
    owl.owlCarousel({
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,2],
		itemsTabletSmall : [640,2],
		itemsTabletSmall : [480,1],
		itemsMobile : [360,1]
	});
     
    // Custom Navigation Events
    $(".next").click(function(){
		owl.trigger('owl.next');
    })
    $(".prev").click(function(){
		owl.trigger('owl.prev');
    });
});

//====== Mission ======//
$(function(){  
     
    var mission1 = $("#mission-content");
    var mission2 = $("#list-mission");
     
    mission1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		navigation: true,
		pagination:false,
		navigationText:false,
		transitionStyle : "goDown",
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
    });
     
    mission2.owlCarousel({
		items : 5,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,3],
		itemsMobile : [480,3],
		itemsMobile : [360,2],
		pagination:false,
		responsiveRefreshRate : 100,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
	    }
    });
     
    function syncPosition(el){
		var current = this.currentItem;
		$("#list-mission")
		.find(".owl-item")
		.removeClass("synced")
		.eq(current)
		.addClass("synced")
		if($("#list-mission").data("owlCarousel") !== undefined){
			center(current)
		}
    }
     
    $("#list-mission").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		mission1.trigger("owl.goTo",number);
    });
     
    function center(number){
		var mission2visible = mission2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in mission2visible){
			if(num === mission2visible[i]){
			var found = true;
			}
    	}
     
    if(found===false){
		if(num>mission2visible[mission2visible.length-1]){
			mission2.trigger("owl.goTo", num - mission2visible.length+2)
		}else{
			if(num - 1 === -1){
			num = 0;
		}
    	mission2.trigger("owl.goTo", num);
    	}
    } else if(num === mission2visible[mission2visible.length-1]){
    	mission2.trigger("owl.goTo", mission2visible[1])
    } else if(num === mission2visible[0]){
   		mission2.trigger("owl.goTo", num-1)
    	}
    }
});

//====== Testimonial ======//
$(function(){   
    var testimonial = $("#testimonial");
	testimonial.owlCarousel({
		singleItem : true,
		transitionStyle : "backSlide"
	});
	
	// Custom Navigation Events
    $(".t-next").click(function(){
		testimonial.trigger('owl.next');
    })
    $(".t-prev").click(function(){
		testimonial.trigger('owl.prev');
    });
});


//====== News ======//
$(function(){  
	var news = $("#news-item"); 
		news.owlCarousel({
		items : 2,
		itemsDesktop : [1199,2],
		itemsDesktopSmall : [979,2],
		itemsTablet : [768,2],
		itemsTabletSmall : [640,1],
		itemsMobile : [360,1],
	});

	 // Custom Navigation Events
    $(".n-next").click(function(){
		news.trigger('owl.next');
    })
    $(".n-prev").click(function(){
		news.trigger('owl.prev');
    });
});



//====== Client ======//
$(function(){  
     
    var sync1 = $("#client-said");
    var sync2 = $("#client");
     
    sync1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		navigation: true,
		pagination:false,
		navigationText:false,
		autoPlay:true,
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
    });
     
    sync2.owlCarousel({
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
		itemsTablet : [768,3],
		itemsMobile : [479,1],
		pagination:false,
		autoPlay:true,
		responsiveRefreshRate : 100,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
	    }
    });
     
    function syncPosition(el){
		var current = this.currentItem;
		$("#client")
		.find(".owl-item")
		.removeClass("synced")
		.eq(current)
		.addClass("synced")
		if($("#client").data("owlCarousel") !== undefined){
			center(current)
		}
    }
     
    $("#client").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
			if(num === sync2visible[i]){
			var found = true;
			}
    	}
     
    if(found===false){
		if(num>sync2visible[sync2visible.length-1]){
			sync2.trigger("owl.goTo", num - sync2visible.length+2)
		}else{
			if(num - 1 === -1){
			num = 0;
		}
    	sync2.trigger("owl.goTo", num);
    	}
    } else if(num === sync2visible[sync2visible.length-1]){
    	sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
   		sync2.trigger("owl.goTo", num-1)
    	}
    }
});




//================== PORTFOLIO SECTION ==================//
$(function() {
	var wall = new freewall("#portfolio-list");
	wall.reset({
		selector: '.item-folio',
		animate: true,
		delay: 20,
		gutterX: 0,
		gutterY: 0,
		cellW: 152,
		cellH: 250,
		fixSize: 0,
		onResize: function() {
			wall.refresh();
		}
	});
	
	wall.filter("");
	$(".filter-label").click(function() {
		var filter = $(this).data('filter');
		if (filter) {
			wall.filter(filter);
		} else {
			wall.unFilter();
		}
	});
  wall.fitWidth();
});

//============ ACTIVE MENU FILTER PORTFOLIO ============//
$(function() {
	$(".menu-filter-folio").find("li").click(function(){
		$(".portfolio-list").css("width","100%");
		$(".menu-filter-folio").find("li.active").removeClass("active");
		$(this).addClass("active");
	});
});

//============ BACKGROUND AS THUMBNAIL FOR PORTFOLIO ============//
$(function(){
	$(".item-folio").each(function() {
		var $thumbfolio = $(this).attr("data-img-folio");							   
		$(this).css("background-image","url(" + $thumbfolio + ")");
		$(this).css("background-size","cover");
	});
});


//============ ANIMATION HOVER PORTFOLIO ITEM ============//
$(function(){
	$("div.item-folio").each(function(){
		var $title_folio = $(this).find(".title-folio");
		var $height_title_folio = $title_folio.outerHeight();

		$title_folio.css({
			"bottom"  : "-" + $height_title_folio + "px"
		});
		
		$(this).hoverIntent(function(){
			$(this).find('.bg-folio').fadeIn();
			$title_folio.css("display","block").animate({
					"bottom"  : '0px',
					"opacity" : 1
				},{
				  duration: 'slow',
				  easing: 'easeInOutExpo'			
			});
			$(this).find(".do-folio").animate({
				"opacity": '100',
				"top"    : '50px'		
			},{
				  duration: 'slow',
				  easing: 'easeOutBounce'			
			});
		}, function(){
			$title_folio.animate({
					"bottom"  : "-" + $height_title_folio + "px",
					"opacity" : 0
				},{
				  duration: 'slow',
				  easing: 'easeInOutExpo'			
			});
			$(this).find(".do-folio").animate({
				"top"    : '0px',	
				"opacity": '0'
			},{
				  duration: 'slow',
				  easing: 'easeInOutExpo'			
			});
			$(this).find('.bg-folio').delay(300).fadeOut();
		});
		
	});	
});	

//============ TO MAKE CENTERING GRID PORTFOLIO ============//
freewall.createPlugin({
	centering: function(setting, container) {
		var runtime = setting.runtime;
		this.addCustomEvent("onGridArrange", function(setting) {
			var gridWidth = container.attr("data-wall-width") * 1;
			var realWidth = container.width();
			var offsetLeft = (realWidth - gridWidth) / 2;
			for (var i in runtime.blocks) {
				var block = runtime.blocks[i];
				block.left != null && (block.left += offsetLeft);
			}
		});
	}
});




//============ ACTION LOAD PROJECT BY MODAL BOOTSTRAP ============//
$('#myModal').on('show.bs.modal', function (e) {
  $("body").css("overflow-y", "hidden");
});
$('#myModal').on('hidden.bs.modal', function (e) {
  $("body").css("overflow-y","auto");
  $(this).removeData('bs.modal');
  $("#" + $(this).attr("id") + " .modal-content").empty();
});


//============ CAROUSEL ============//
$(function(){
	var $carousel = $(".carousel-inner").find(".item")
	$carousel.each(function(){
	    var car_img = $(this).find("img").height();
		$(this).css("height",car_img + "px");						
	});
});

//================== FEATURE ==================//	

//====== Accordion ======//
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('fa-chevron-down fa-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);

//====== Alert ======//
$(function(){
	$('.alert').each(function(){
		var icon_alert = $(this).find('.icon-alert').width();	
		if(icon_alert == null)
		{
			var p_icon_alert = 20;
		}else{
			var p_icon_alert = icon_alert + icon_alert;
		}
		
		$(this).find(".icon-alert").css("left", icon_alert + "px");
		$(this).css("padding-left", p_icon_alert + "px");
	});
});

//================== ANIMATION SCROLL ==================//
$(function(){
	new WOW().init();
});

//============ GOOGLE MAP ============//
$(document).ready(function(){
	var myMap = $("#map"); 
	var myLat = myMap.data("lat");
	var myLng = myMap.data("lng");
	var myMarkerLat = myMap.data("marker-lat");
	var myMarkerLng = myMap.data("marker-lng");
	var myWindowMap = myMap.data("window-map");
	
	myMap.TekMap({	
		lat:myLat,
		lng:myLng, 
			mapoptions : {
			  zoom: 10
			},
		 markers : [{
			lat:myMarkerLat,
			lng:myMarkerLng, 
			draggable:false,
			featureType: 'road',
			infowindow:myWindowMap
		}]
	});
	
});
