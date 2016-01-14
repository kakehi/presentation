// JavaScript Document

function _externalStickyNav(){
	/* ------------------------------------------------------------------------ */
	/* BACK TO TOP 
	/* ------------------------------------------------------------------------ */

	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$("#back-to-top").fadeIn(200);
		} else{
			$("#back-to-top").fadeOut(200);
		}
	});
	
	$('#back-to-top, .back-to-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});
	
	/*----------------------------------------------------*/
	// MENU SMOOTH SCROLLING
	/*----------------------------------------------------*/  
    $(".main-menu a, .logo a, .home-logo-text a, .home-logo a, .scroll-to").bind('click',function(event){
		
		$(".main-menu a").removeClass('active');
		
		var tempID = $(this);
		$(this).addClass('active');			
		var headerH = $('.navigation').outerHeight();
		
		console.log($(this).attr("href"));
		
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - headerH  + 'px'
        }, {
            duration: 200
        });

		event.preventDefault();


    });	
/* ------------------------------------------------------------------------ */
/* STICKY NAVIGATION */
/* ------------------------------------------------------------------------ */ 
 
	$("nav.sticky-nav").sticky({ topSpacing: 0, className: 'sticky', wrapperClassName: 'main-menu-wrapper' });
	

	if ($(window).scrollTop() > $(window).height()){
		$('nav.transparent').addClass('scroll');		
	} else {
		$('nav.transparent').removeClass('scroll');				
	}	
	
	$(window).on("scroll", function(){
		var winHeight = $(window).height();
		var windowWidth = $(window).width();
		var windowScroll = $(window).scrollTop();
		var home_height =  $('#home').outerHeight();

			if ($(window).scrollTop() > home_height){
				$('nav.transparent').addClass('scroll');										
			} else {
				$('nav.transparent').removeClass('scroll');									
			}

		
	  });

/* ------------------------------------------------------------------------ */
/* SELECTNAV - A DROPDOWN NAVIGATION FOR SMALL SCREENS */
/* ------------------------------------------------------------------------ */ 
	selectnav('nav', {
		nested: true,
		indent: '-'
	}); 
	
}
	