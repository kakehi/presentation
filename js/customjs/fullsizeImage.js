// JavaScript Document

var   window_height = $(window).height();	
	    
	  $.browser.safari = ($.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));	 	

	 
	 if ( !$.browser.safari ) {
		  $('.home-parallax').find('.home-text-wrapper').children('.container').addClass('no-safari');
	 }
/*----------------------------------------------------*/
/* FULLSCREEN IMAGE HEIGHT
/*----------------------------------------------------*/	     
	
	 function fullscreenImgHeight(){

		$('#home, .background-video').css({height:window_height});
/*		  var headerH = $('nav').outerHeight();
          $("#home").css('marginBottom',-headerH);*/
		  
	 }
		  
	  
		  
		  
		  
	  $(window).bind('resize',function() {
	  	  
		  window_height = $(window).height();	
		  
		  fullscreenImgHeight();
		  home_parallax();
		 		  
	  });	 



function getReadyForFullSizeImage(){    
// cache container
	var container = $('#portfolio-wrap');	
	

	/*container.isotope({
		animationEngine : 'best-available',
	  	animationOptions: {
	     	duration: 200,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});*/


	// filter items when filter link is clicked
	$('#filters a').click(function(){
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
	  	container.isotope({ filter: selector });
        setProjects();		
	  	return false;
	});
		
		
		function splitColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = 1;
			
			
			if (winWidth > 1200) {
				columnNumb = 5;
			} else if (winWidth > 900) {
				columnNumb = 4;
			} else if (winWidth > 600) {
				columnNumb = 3;
			} else if (winWidth > 300) {
				columnNumb = 1;
			}
			
			return columnNumb;
		}		
		
		function setColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = splitColumns(), 
				postWidth = Math.floor(winWidth / columnNumb);
			
			container.find('.portfolio-item').each(function () { 
				$(this).css( { 
					width : postWidth + 'px' 
				});
			});
		}		
		
		/*function setProjects() { 
			setColumns();
			container.isotope('reLayout');
		}*/	
		
		/*container.imagesLoaded(function () { 
			setColumns();
		});*/
		
	
		/*$(window).bind('resize', function () { 
			setProjects();			
		});*/

  }



function home_parallax() {
	        $(window).scroll(function() {
	            var yPos = -($(window).scrollTop() / 2); 
         
	            // Put together our final background position
	            var coords = '50% '+ yPos + 'px';
	 
	            // Move the background
	            //$('.page-title-wrapper').css({ backgroundPosition: coords });
	            $('.home-parallax, .home-parallax2, .home-parallax3, .home-parallax4').css({ backgroundPosition: coords });
	        
	        }); 
}

