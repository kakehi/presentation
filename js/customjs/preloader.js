// JavaScript Document

function _initializePreloader(){
	/*----------------------------------------------------*/
	// PRELOADER CALLING
	/*----------------------------------------------------*/    
    $("body.onepage").queryLoader2({
        barColor: "#111111",
        backgroundColor: "#ffffff",
        percentage: true,
        barHeight: 3,
        completeAnimation: "fade",
        minimumTime: 200
    }); 
	
	function callMe(){
		alert('AAAAA');
	}
	
	function home_parallax() {
		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / 2); 
			
			// Put together our final background position
			var coords = '50% '+ yPos + 'px';
		 
			// Move the background
			//$('.page-title-wrapper').css({ backgroundPosition: coords });
			$('.home-parallax, .home-parallax2, .home-parallax3, .home-parallax4').css({ backgroundPosition: coords 					});
				
		}); 
	}
	
	 home_parallax();
	
	

}




