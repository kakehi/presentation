// JavaScript Document


$(document).ready(function () {
		
		var myCompany;
		var proposalDB;
		var clientDB;
		var teamDB;
		
		var myClientID = "none";
		var myProposerID = "none";
		
		var myKeyColor = "#FFD600";
		var myBrandColor = "#000000";
		
		var loadCount = 0;
		var loadEnds = 2;
		
		var target_headerLogo1, target_headerLogo2, target_headerCross;
		
		function $_GET(param) {
			var vars = {};
			
			var param1 = window.location.href.split('#')[0];
			
			param1.replace( 
				/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
				function( m, key, value ) { // callback
					vars[key] = value !== undefined ? value : '';
				}
			);
		
			if ( param ) {
				return vars[param] ? vars[param] : null;	
			}
			
			
			return vars;
		}



		var companyList = [
		{companyName:'Simmer Media Group',
		url:'1GmT2G7EmtjbKh2gpaIOLztxo6nMN37fG09DSnJF_Ku0',
		mainTitle:'Simmer Media Group',
		sheetNumber2:'oyiu8ce',
		logo: 'img/simmer-logo.png', 
		allrights:'© 2016 All Rights Reserved. Simmer Media Group',
		favicon:'favicon.png'},
		{companyName:'PLEY App',
		url:'1dzanWfkSUTTBt635MvsS3j-b1b9gFVI_OZLcPeLPsi4',
		mainTitle:'BIG DATA. BETTER DECISIONS.',
		sheetNumber2:'oyiu8ce',
		logo: 'img/pley-logo.png',
		allrights:'© 2016 All Rights Reserved. PLEY',
		favicon:'http://pleyapp.com/favicon.ico'}];

		function checkMyCompanyID(id){
			var i=0;
			while(i<companyList.length){
				if(companyList[i].companyName === id){
					return i;
					i = companyList.length;
				}else{
					i++;
				}
			}
			return false;
		}
		function changeInformationAccordingToCompany(myCompany){
			$('#_header-simmer img').attr('src', companyList[myCompany].logo);
			$('.documentName').html(companyList[myCompany].mainTitle);
			$('._companyName').html(companyList[myCompany].companyName);
			$("#favicon").attr("href",companyList[myCompany].favicon);
			$('#_footer_copyright p').html(companyList[myCompany].allrights);
		}


		function _loadJSON(urlkey, sheetkey){
			
			var apiURL = "https://spreadsheets.google.com/feeds/list/" + urlkey + "/" + sheetkey + "/public/values";
			apiURL = apiURL + "?alt=json-in-script&callback=?";
			
			$.ajax({
			type: 'GET',
			url: apiURL,
			cache: false,
			dataType: 'jsonp',
			jsonp : 'myFunc',
			success: function(json, textStatus) {
				
				//console.log(json.feed);
				
				// Getting client DB and load team DB
				if(loadCount == 0){
					proposalDB = json;
					myCompany = checkMyCompanyID(proposalDB.feed.entry[0].gsx$content.$t);
					changeInformationAccordingToCompany(myCompany);
					_loadJSON(companyList[myCompany].url, 'od6');
				}
				
				// Getting team DB and load proposal DB
				if(loadCount == 1){
					
					clientDB = json;
					_loadJSON(companyList[myCompany].url, companyList[myCompany].sheetNumber2);
				}
				
				if(loadCount == loadEnds){
					teamDB = json;
					_fillContents(proposalDB);
				}
				loadCount++;
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(textStatus);
			}
		
		});
		}
		
		_loadJSON($_GET('proposal'), 'od6'); // Start Loading Clients' Data
			
		function _fillContents(json){
			
			_checkMyClient(String(json.feed.entry[1].gsx$content.$t));
			console.log
			_checkMyProposer(String(json.feed.entry[40].gsx$content.$t));
			
			_applyClientName(json);
			
			
			/* -- Color -- */
			if(json.feed.entry[4].gsx$content.$t === ""){
				if(myClientID != "none"){
					myKeyColor = "#"+String(clientDB.feed.entry[myClientID].gsx$keycolor.$t);
				}
			}else{
				myKeyColor = "#"+String(json.feed.entry[4].gsx$content.$t);
			}
			
			/* -- Title -- */
			document.title = String(json.feed.entry[1].gsx$content.$t) + ' + Simmer Group';
			
			/* -- proposal header -- */
			if(myClientID != "none"){
				$("._proposalHeader").find('.client-logo').prepend('<img src="'+String(clientDB.feed.entry[myClientID].gsx$logourl.$t)+'"/>');
			}else{
				$("._proposalHeader").find('.client-logo').prepend('<h1 style="Color:White; margin-top:2.4rem;">'+String(json.feed.entry[1].gsx$content.$t)+'</h4>');
			}
			
			
			$(".home-parallax").css({'background':'url('+String(json.feed.entry[5].gsx$content.$t)+')', 'background-size':'cover', 'min-width':'100%', 'min-height':'160%', 'background-repeat':'no-repeat'});
			$('#header-backgroundimage').attr({'src':String(json.feed.entry[5].gsx$content.$t)});
			$("._proposalHeaderTitle").find('h3').html(String(json.feed.entry[2].gsx$content.$t));
			$("._proposalHeaderDate").find('h3').html(String(json.feed.entry[3].gsx$content.$t));
			$("._proposalHeaderTitle-Print").find('h3').html(String(json.feed.entry[2].gsx$content.$t));
			$("._proposalHeaderDate-Print").find('h3').html(String(json.feed.entry[3].gsx$content.$t));

			
			$("#_headerTitle .documentTitle").html(String(json.feed.entry[2].gsx$content.$t));
			
			/* -- populate pages --*/
			/* -- populate pages --*/
			/* -- populate pages --*/
			
			/* -- Hamburger --*/
	
			  var toggles = document.querySelectorAll(".c-hamburger");
			
			  for (var i = toggles.length - 1; i >= 0; i--) {
				var toggle = toggles[i];
				toggleHandler(toggle);
			  }
			
			  function toggleHandler(toggle) {
				toggle.addEventListener( "click", function(e) {
				  	e.preventDefault();
					//e.defaultPrevented();
				  	if(this.classList.contains("is-active") === true){
						this.classList.remove("is-active");
						$('#nav').css({'height':'300px'}).animate({'height':'0px'}, 500);
					}else{
						this.classList.add("is-active");
						$('#nav').css({'height':'0px'}).animate({'height':'700px'}, 500);
					}
				    
				});
			  }
			/* -- Hamburger --*/
			
			/* -- Common Pages -- */

			var greyOrNot = "";
			for(i=6; i<30; i+=3){
				
				// -- exclude if exlucde flag is on
				if(String(json.feed.entry[i].gsx$exclude.$t) === ""){
					
					var parm = _createURLParameter(String(json.feed.entry[i].gsx$title.$t));
					
					// -- text contents
					$('#populateContainer').append("<div id='"+parm+"' class='page fullwidth "+String(greyOrNot)+"'><div id='_page_"+parm+"' class='_page_textArea'><h1 class='_pageTitle'>"+String(json.feed.entry[i].gsx$title.$t)+"</h1><div class='_pageTextContnt'>"+String(json.feed.entry[i].gsx$content.$t)+"</div></div></div>");
					
					// -- image
					var videoOrNot = isYoutube(String(json.feed.entry[i+1].gsx$content.$t));
					console.log(videoOrNot);
					if(videoOrNot === false){
						if(String(json.feed.entry[i+1].gsx$content.$t) != "" && String(json.feed.entry[i+1].gsx$exclude.$t) == ""){
							$('#populateContainer').append("<div id='parallax_"+ String(i) +"' class='parallax'><div class='parallax-bg' style='background-position: 50% 34px; background-image: url("+String(json.feed.entry[i+1].gsx$content.$t)+");'></div><div class='overlay'></div><div class='container clearfix'><div class='parallax-content'><p class='quote'></p></div></div></div>");
							
							$('#populateContainer').append("<div id='parallax_print_"+ String(i) +"' class='parallax-print'><div class='img-print'><img style='position:absolute;' src="+String(json.feed.entry[i+1].gsx$content.$t)+"><div class='quote' style='max-width:800px; width:100%; text-align:center; margin:200px 0px; color: #FFF; -webkit-print-color-adjust: exact;position:absolute;' class='container clearfix'></div></div></div>");
							// -- image Caption
							if(String(json.feed.entry[i+2].gsx$content.$t) != "" && String(json.feed.entry[i+2].gsx$exclude.$t) == ""){
								$('#parallax_'+ String(i)).find('.quote').html(String(json.feed.entry[i+2].gsx$content.$t));
								$('#parallax_print_'+ String(i)).find('.quote').html(String(json.feed.entry[i+2].gsx$content.$t));
							}
						}
					}else{
						$('#populateContainer').append("<div id='parallax_"+ String(i) +"' class='parallax' style='margin:auto;'><iframe width='800' height='450' style='margin: auto; display: block;' src='http://www.youtube.com/embed/"+videoOrNot+"?autoplay=0&controls=1&showinfo=0'></iframe><div class='container clearfix'><div class='parallax-content'><p class='quote'></p></div></div></div>");
						$('#populateContainer').append("<div id='parallax_print_"+ String(i) +"' class='parallax-print'><div class='img-print'><img style='position:absolute;' src="+String(json.feed.entry[i+1].gsx$content.$t)+"><div class='quote' style='max-width:800px; width:100%; text-align:center; margin:200px 0px; color: #FFF; -webkit-print-color-adjust: exact;position:absolute;' class='container clearfix'></div></div></div>");
					}

					
					greyOrNot = _stripePage(greyOrNot);
					
					// -- nav
					$('#nav').append('<li><a href="#'+parm+'">'+String(json.feed.entry[i].gsx$title.$t)+'</a></li>');
					
					/* -- Unique Contents --*/
					// add unique charts for advertising charts
					if(i === 24){
						$('#_page_'+parm).append('<div id="advertisingchart"></div>')
						$('#advertisingchart').load('advertisingchart.html');
					}
					/* -- Unique Contents --*/
					
				}
	
				/*-- load jQuery --*/
				
				
			}
			/* -- Common Pages -- */

			/* -- Unique Page Pricing And Scheduling -- */

			if(String(json.feed.entry[30].gsx$exclude.$t) === ""){
				parm = _createURLParameter(String(json.feed.entry[(30)].gsx$title.$t));
				$('#populateContainer').append("<div id='"+parm+"' class='page fullwidth "+String(greyOrNot)+"'><div id='_page_"+parm+"' class='_page_textArea'><h1 class='_pageTitle'>"+String(json.feed.entry[30].gsx$title.$t)+"</h1><div class='_pageTextContnt'>Our proposed pricing structure is below. <div id='_populate_schedule'></div></div></div></div>");
				for(var j=0; j<7; j++){
					if(String(json.feed.entry[30+j].gsx$content.$t) != "" && String(json.feed.entry[i+3+j].gsx$exclude.$t) == ""){
					$('#_populate_schedule').append("<div style='padding-top:24px;'><h4>"+ String(json.feed.entry[30+j].gsx$subtext.$t) + ": </h4>"+String(json.feed.entry[30+j].gsx$content.$t)+"</div>");
					}
				}

				// add note
						
						if(String(json.feed.entry[37].gsx$content.$t) != "" && String(json.feed.entry[37].gsx$exclude.$t) == ""){
								$('#_populate_schedule').append("<div style='padding-top:24px;'>"+String(json.feed.entry[37].gsx$content.$t)+"</div>");
						}
			}

			/* -- Unique Page Pricing And Scheduling -- */
			
			
			/* -- Unique Page Thank You -- */
			$("._page_lastThankYou").find('._pageTitle').html(String(json.feed.entry[38].gsx$content.$t));
			$("._page_lastThankYou").find('._pageTextContnt').html(String(json.feed.entry[39].gsx$content.$t));
			if(myProposerID !== 'none'){
				$("._page_lastThankYou").find('#_proposerEmail').prepend('<a href="mailto:'+String(teamDB.feed.entry[myProposerID].gsx$emailaddress.$t)+'">'+String(teamDB.feed.entry[myProposerID].gsx$emailaddress.$t)+'</a>');
				$("#emailReceiver").attr({'value':String(teamDB.feed.entry[myProposerID].gsx$emailaddress.$t)});
				$("._page_lastThankYou").find('#_proposerTitle').html(String(teamDB.feed.entry[myProposerID].gsx$title.$t));
				$("._page_lastThankYou").find('#_proposerPhone').html(String(teamDB.feed.entry[myProposerID].gsx$phone.$t));
			}
			$("._page_lastThankYou").find('#_proposer').html(String(json.feed.entry[40].gsx$content.$t));
			
			/* -- Unique Page Thank You -- */


			/* -- populate pages --*/
			/* -- populate pages --*/
			/* -- populate pages --*/


			/* -- Apply Color --*/
			
			
			$("._proposalHeaderText, nav.colored, nav.light.colored, .c-hamburger--htx").css({"background":myKeyColor});
			$("#_page_thankYou").css({"background":myBrandColor, "color":"#FFF"});
			
			$("#project-navigation ul li#prevProject a, #project-navigation ul li#nextProject a").hover(
				function(){
					$(this).css("background-color", myKeyColor);
				}, 
				function(){
					$(this).css("background-color", "inherit");
				}
			);
			$("nav.light .main-menu li.active a").css({"color":myKeyColor});
			$(".highlight, nav.transparent .main-menu li.active a, nav.dark .main-menu li.active a, .parallax .quote i, #filters ul li a.active h3, .home3 .slabtextdone .slabtext.second-child, nav.dark .main-menu li.active a, .highlight, nav.transparent .main-menu li.active a, nav.dark .main-menu li.active a").css({"color":myKeyColor});
			$(".tags-list li a, .pages li a, .post-title a, .main-menu a, nav.dark .main-menu a, nav.light .main-menu a, nav.light .main-menu a, nav.dark .main-menu a, .service-box, .post-tags li a").hover(
				function(){
					$(this).css("color", myKeyColor);
				}, 
				function(){
					$(this).css("color", "inherit");
				}
			);
			
			/* -- Apply Color --*/
			
			function _createURLParameter(t){
				t = replaceAll(t," ", "");
				t = replaceAll(t,"&", "and");
				
				return t;
			}
			/* -- Call Functions for Externals -- */
			
			_initializePreloader();
			_externalStickyNav();
			getReadyForFullSizeImage();
			home_parallax();
			fullscreenImgHeight();
			
			
			var refreshIntervalId = setInterval(fname, 2000); 

			function fname(){
				
				clearInterval(refreshIntervalId);
				
				jQuery('.milestone-counter').appear(function(){
					$('.milestone-counter').each(function(){
						dataperc = $(this).attr('data-perc'),
						$(this).find('.milestone-count').delay(6000).countTo({
							from: 0,
							to: dataperc,
							speed: 100,
							refreshInterval: 3
						});
					});
				});
			}
			
		}
		
		// --- Toggle Grey and White Pages
		function _stripePage(greyOrNot){
			if(greyOrNot === ""){
				greyOrNot = "grey";
			}else{
			    greyOrNot = "";
			}
			return greyOrNot;
		}
		// --- Toggle Grey and White Pages
				
				
		function _checkMyClient(clientName){
			
			var i=0;
			while(i<clientDB.feed.entry.length){
				if(clientDB.feed.entry[i].gsx$clientname.$t == clientName){
					myClientID = i;	
				}
				i++;
			}
		}	
		
		function _checkMyProposer(proposerName){
			
			var i=0;
			while(i<teamDB.feed.entry.length){
				if(teamDB.feed.entry[i].gsx$name.$t == proposerName){
					myProposerID = i;	
				}
				i++;
			}
		}
		
		function _applyClientName(json){
			for(var i=0; i<json.feed.entry.length; i++){
				replaceAll(String(json.feed.entry[i].gsx$content.$t), '&COMP_NAME', String(json.feed.entry[0].gsx$content.$t));
			}
			return json;
		}
		
		function replaceAll(str, find, replace1) {
			//
		  	return str.replace(new RegExp(find, 'g'), replace1);
		}
		
		function isYoutube(url){

			if (url.search("youtube.com") === -1){
				return false;
			}else{
				var vars = {};
				url.replace( 
					/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
					function( m, key, value ) { // callback
						vars[key] = value !== undefined ? value : '';
						if(vars[key] !== undefined){
							url = vars[key];
						}
					}
				)
				return url;

			}
			
		}
		
		var timer1;
		timer1 = setInterval(function(){
			
			getTargetDimensions();
			$('.page-wrap').css({'visibility':'visible'}).delay(400).animate({'opacity':1});
			$('#_header-logo').css({'left': Math.round($(window).width()/2) + 'px','width': '0px'});
			$('#_header-cross').css({'left': Math.round($(window).width()/2) + 'px','width': '0px'});
			$('#_header-simmer').css({'left': Math.round($(window).width()/2) + 'px','width': '0px'});
			$('#_header-logo').css({'left': target_headerLogo2.posx,'top': target_headerLogo2.posy});
			$('#_header-cross').css({'left': target_headerCross.posx,'top': target_headerCross.posy});
			$('#_header-simmer').css({'left': target_headerLogo1.posx,'top': target_headerLogo1.posy});
			$('._proposalHeaderText').css({'display':'inherit','width':'100%','height':'100%', 'top':'0px', 'left':'0px'});
			$('._proposalHeaderTitle').css({'display':'inherit', 'width':'100%','height':'50%', 'top':'0px', 'left':'0px'});
			$('._proposalHeaderDate').css({'display':'inherit', 'width':'100%','height':'50%', 'top':'50%', 'left':'0px'});
			$('._proposalLine').css({'background-color':'white', 'height':'1px', 'left':'50%'});
			
			_startAnimation();
			clearInterval(timer1);
		}, 1500);
		
		function _startAnimation(){
			$('._proposalLine').css({'display':'inherit'}).delay(800).animate({'left':'10%', 'width':$('._proposalHeaderTitle h3').width() * 0.8});
			$('._proposalHeaderText').delay(0).animate({'opacity':'.8'});
			$('._proposalHeaderTitle h3').delay(1200).css({'opacity':0, 'display':'inherit'}).animate({top:($(window).height()*0.4 - $('._proposalHeaderTitle h3').height()),'opacity':1}, function(){});
			$('._proposalHeaderDate h3').delay(1200).css({'opacity':0, 'display':'inherit'}).animate({top:'45%','opacity':1}, function(){_slideTitle();});
		}
		
		function _startHovering(t, counter){
			
			if(counter>20){
				t = 3000;
			}else{
				counter+=1;
			}
			var rotateTimer = setTimeout(function() {
				$('#_header-cross').rotate({
					angle: 45,
					animateTo: 315,
					easing: $.easing.easeInOutExpo,
					callback: _startHovering(t, counter)
				});
				clearInterval(rotateTimer);
			},t);
		}
		
		var interValForInitialValidation;
		var countInterValForInitialValidation = 0;
		function _slideTitle(){
			console.log('AAAAAAA + ' + $('#_header-logo').css({'display':'inherit'}).css('width'));
			_startHovering(100,0);
			$('#_header-logo').css({'display':'inherit'}).delay(1000).animate({
				'width': target_headerLogo2.width,
				'left': target_headerLogo2.posx,
				'top': target_headerLogo2.posy
			}, 400);
			$('#_header-cross').css({'display':'inherit'}).delay(1600).animate({
				'width': target_headerCross.width,
				'left': target_headerCross.posx,
				'top': target_headerCross.posy
			}, 400);
			$('#_header-simmer').css({'display':'inherit'}).delay(1200).animate({
				'width': target_headerLogo1.width,
				'left': target_headerLogo1.posx,
				'top': target_headerLogo1.posy
			}, 400, function(){interValForInitialValidation = setInterval(resize,2000)});
			
		}
			
			
			var timer;
			$(window).resize(function() {
				
				if (timer !== false) {
					clearTimeout(timer);
				}
				timer = setTimeout(resize, 200);
			});
		
		function getTargetDimensions(){
			if($(window).width() < 1200){
				$('._pageTextContnt, ._pageTitle').css({'padding-left':'20px', 'padding-right':'20px'});
				$('#initialPage').css({'display':'none'});
				$('#_header-simmer').css({'width':(2*$(window).width()/11)+ 'px'});
				target_headerLogo1 = { width:  $('#_header-simmer').width(), posx: Math.round(6.5*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-simmer').height()/2) + 'px' };
				$('#_header-cross').css({'width':(0.4*$(window).width()/11)+ 'px'});
				target_headerCross = { width: $('#_header-cross').width(), posx: Math.round(5.4*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-cross').height()/2) + 'px' };
				$('#_header-logo').css({'width':(2*$(window).width()/11)+ 'px'});
				target_headerLogo2 = { width: $('#_header-logo').width(), posx: Math.round(2.5*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-logo').height()/2) + 'px' };
			}else{
				$('._pageTextContnt, ._pageTitle').css({'padding-left':'0px', 'padding-right':'0px'});
				$('#initialPage').css({'display':'inherit'});
			$('#_header-simmer').css({'width':(1*$(window).width()/11)+ 'px'});
			target_headerLogo1 = { width:  $('#_header-simmer').width(), posx: Math.round(6*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-simmer').height()/2) + 'px' };
			$('#_header-cross').css({'width':(0.2*$(window).width()/11)+ 'px'});
			target_headerCross = { width: $('#_header-cross').width(), posx: Math.round(5.4*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-cross').height()/2) + 'px' };
			$('#_header-logo').css({'width':(1*$(window).width()/11)+ 'px'});
			target_headerLogo2 = { width: $('#_header-logo').width(), posx: Math.round(4*$(window).width()/11) + 'px', posy: Math.round(3*$(window).height()/5-$('#_header-logo').height()/2) + 'px' };
			
			}
		}
							
		function resize(){
				
				// Resizing Interval for Loading Failure
				if(countInterValForInitialValidation <10){
					countInterValForInitialValidation ++;
				}else{
					clearInterval(interValForInitialValidation);
				}
				// Resizing Interval for Loading Failure


				getTargetDimensions();
				
				
				if($(window).width() < 1200){
					
					$('._proposalHeaderTitle h3').css({'font-size':'2rem'});
				}else{
					$('._proposalLine').css({'top':'42%'});
					$('._proposalHeaderTitle h3').css({'font-size':'4rem'});
				}
				
				$('._proposalLine').css({'width':$('._proposalHeaderTitle h3').width() * 0.8});
				$('._proposalHeaderTitle h3').css({top:($(window).height()*0.4 - $('._proposalHeaderTitle h3').height())});
				$('._proposalLine').css({top:($(window).height()*0.42)});
				$('._proposalHeaderDate h3').css({top:($(window).height()*0.45)});
				
				$('#_header-simmer').css({'width': target_headerLogo1.width, 'left': target_headerLogo1.posx,'top': target_headerLogo1.posy});
				$('#_header-cross').css({'width': target_headerCross.width, 'left': target_headerCross.posx,'top': target_headerCross.posy});
				$('#_header-logo').css({'width': target_headerLogo2.width, 'left': target_headerLogo2.posx,'top': target_headerLogo2.posy});
		}

});
	
	