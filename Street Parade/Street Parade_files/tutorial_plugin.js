(function( $ ){

	$.fn.tutorial_plugin = function( arguments ) {  
		
		var remove_hash = function(url){
			var index = url.indexOf('#');
			if(index >= 0){
				url = url.substr(0,index);
			}
			return url;
		}
		
		var add_hash_to_href = function(element, hash){
			var path = element.attr('href');
			path += '#' + hash;
			element.attr('href', path);
		}
		
		var add_hash_to_form = function(button, hash){
			var form = button.parentsUntil('form').parent();
			var action = form.attr('action');
			if( typeof action === 'undefined' || action === false ){
				action = '';
			}
			action += '#' + hash;
			form.attr('action', action);
		}
		

		
		var obj_copy = function(obj){
			var out = {};
			for (i in obj) {
				if (typeof obj[i] == 'object') {
			        out[i] = obj_copy(obj[i]);
			    }
			    else{
			        out[i] = obj[i];
			    }
			}
			return out;
		}
		
		var is_dialog_open = function(){
			var is_open = false;
			if('dialog_id' in settings){
				$.each(settings['dialog_id'], function(index, value){
					if($('#' + value).dialog( "isOpen" )){
						is_open = true;
					}
	    		});
			}
			return is_open;
		}
	
	    // Create some defaults, extending them with any options that were provided
	    var settings = $.extend( {
	    	'alert_placement'	: 'bottom',
	    	'info_placement'	: 'right',
	    	'info_left'			: 0,
	    	'info_right'		: 0,
	    	'info_top'			: 0,
	    	'info_bottom'		: 0,
	    	'is_form'			: false,
	    }, arguments);
	    
	    //if('info_element' in settings){
	    //	settings['info_element'] = $('.' + settings['info_element']);
	    //}
	    //else{
	    //	settings['info_element'] = $(this);
	    //}

	
	    return this.each(function() {        
	
	    	var main_action = $(this);
	    	
	    	var block_link = function(e){
				e.preventDefault();
				$('.popup-marker').popover('hide');
				$('.allow-continiue-popup-marker').popover('hide');
				main_action.popover('hide');
				$(this).popover('show');

			  	return false;
			}
	    	
	    	
	    	
	    	var options = {
					trigger 	: 'manual',
					html		: true,
					placement	: settings['alert_placement'],
					title	  	: settings['title'],
					
					content:function () {
						var content_span = $(document.createElement('span'));

						
						//if ($(this).is(main_action)){
						//	content_span.append(settings['pre_alert_html']);
						//}
						//else if ($(this).hasClass('allow-continiue-popup-marker')){
						//	content_span.append($(this).attr('data-alert'));
						//}
						//else{
						//	content_span.append(settings['alert_html']);
						//}
						content_span.append($(this).attr('data-alert'));
		    			
		    			
		    			var content_link = $(document.createElement('a'));
		    			content_link.text(settings['skip_command']);
		    			
		    			if($(this).attr('type') == 'submit'){
	
		    				content_link.addClass('tooltip-submit-link');
		    				$(document).off("click", '.tooltip-submit-link');
		    				$(document).on("click", '.tooltip-submit-link', $(this), function(event){ 
		    					if (event.data.is(main_action)){
		    						var action_value = event.data.parentsUntil('form').parent().attr('action');
		    						action_value = remove_hash(action_value);
		    						event.data.parentsUntil('form').parent().attr('action', action_value);
		    					}
		    					event.data.parentsUntil('form').parent().submit();
		    				});   
		    			}
		    			else if( typeof $(this).attr('href') !== 'undefined' && $(this).attr('href') !== false &&
		    					(typeof $(this).attr('has-click') === 'undefined' || $(this).attr('has-click') === false)){
		    				var href = $(this).attr("href");
		    				if ($(this).is(main_action)){
		    					href = remove_hash(href);
		    				}
		    				content_link.attr('href', href);
		    			}
		    			else{
		    				var path = window.location.pathname + window.location.search;
		    				// ??? window.location.href = path;
		    				content_link.attr('href', path);
		    			}
		    			
		    			content_span.append(content_link);
		    			return content_span;
		            }
			}
	
	    	var collection = $('a, button');
			collection = collection.not(this);
	    	if('allow_continiue' in settings){
	    		$.each(settings['allow_continiue'], function(index, value){
	    			collection = collection.not('.' + value['element_class']);
	    		});
			}
	    	if('language_class' in settings){
	    		collection = collection.not('.' + settings['language_class']);
	    	}

	    	if('allow_click' in settings){
	    		$.each(settings['allow_click'], function(index, value){
	    			var selector_allow_click = '.' + value;
		    		collection = collection.not(selector_allow_click);
		    		collection = collection.not(selector_allow_click + ' a');
		    		collection = collection.not(selector_allow_click + ' button');
	    		});
	    		
			}
			collection.addClass('popup-marker');
			
			var click_events_set = new Array();
			var i = 0;
			$('.popup-marker').each(function(){
				 var events = $(this).data('events');
				 if( events && events['click'] ){
					 $(this).attr('has-click', true);
					 
					 if('refresh_after' in settings){
						 var events_array = new Array();
						 var j = 0;
						 $.each( events['click'], function(ind, val){
							 events_array[j] = obj_copy(val);
							 j++
						 });
						 click_events_set[i] = {
													 'element' 	: $(this),
													 'event'	: events_array,
						 						};
					 }
					 i++;
				 }
			});
			
			
			$('.popup-marker').unbind("click");
			
			$('.popup-marker').attr('data-alert',settings['alert_html']);
			$('.popup-marker').popover(options);
			$('.popup-marker').click(block_link);
			
			$('html:not(:.popover)').click(function(e) {
				$('.popup-marker').popover('hide');
				$('.allow-continiue-popup-marker').popover('hide');
				main_action.popover('hide');
			});

			
			if('pre_action' in settings){
				$(this).attr('data-alert',settings['pre_alert_html']);
				$(this).popover(options);
	    		$(this).click(function(e){
	    			if(settings['pre_action']()){
	    				return true;
	    			}
	    			$('.popup-marker').popover('hide');
	    			$('.allow-continiue-popup-marker').popover('hide');
					$(this).popover('show');
	    			return false;
	    		});
	    	}

			
			if('allow_continiue' in settings){
				$.each(settings['allow_continiue'], function(index, value){
					if('pre_action' in value){
						var collection = $('.' + value['element_class']).not(main_action);
						collection.addClass('allow-continiue-popup-marker');
						collection.attr('data-alert',value['pre_alert_html']);
						collection.popover(options);
						collection.click(function(){
							if(value['pre_action']()){
			    				return true;
			    			}
							
			    			$('.popup-marker').popover('hide');
			    			$('.allow-continiue-popup-marker').popover('hide');
			    			main_action.popover('hide');
							$(this).popover('show');
							
			    			return false;
						});
					}
	    		});
				
			}
			
			$('.' + settings['info_element']).attr('data-alert', settings['content']);
			$('.' + settings['info_element']).popover({
				
				trigger 	: 'manual',
				placement	: settings['info_placement'],
				template	:'<div class="popover main-popover" style="margin-left:' + settings['info_left'] + 'px; margin-right:' + settings['info_right'] + 'px; margin-top:' + settings['info_top'] +
					+'px; margin-bottom:' + settings['info_bottom'] + 'px;"><div class="popover-inner"><h2 class="popover-title main-popover-title"></h2><div class="popover-content"><div></div></div></div></div>',
				title	  	: settings['title'],
				content 	: function(){return $(this).attr('data-alert')},
			}).popover('show');

			if('next_step' in settings){
				if(settings['is_form']){	
					add_hash_to_form($(this),  settings['next_step']);
				}
				else{
					add_hash_to_href($(this), settings['next_step']);
				}
				if('allow_continiue' in settings){
					$.each(settings['allow_continiue'], function(index, value){
						$('.' + value['element_class']).each(function(){
							if(!$(this).is(main_action)){		
								if('next_step' in value){
									var hash = value['next_step'];
								}
								else{
									var hash = settings['next_step'];
								}
								
								if('is_form' in value && value['is_form']){
									add_hash_to_form($(this), hash);
								}
								else{
									add_hash_to_href($(this), hash);
								}
							}
						});
		    		});
					
				}
			}
			
			if(('language_step' in settings) && ('language_class' in settings) ){
				$('.' + settings['language_class']).each(function(){				
					add_hash_to_href($(this), settings['language_step']);
				});
			}
			
			$(window).resize(function() {
				$('.' + settings['info_element']).popover('hide');
				var is_open = is_dialog_open();
				if(!is_open){
					$('.' + settings['info_element']).popover('show');
				}
				
				$('.popup-marker').popover('hide');
    			$('.allow-continiue-popup-marker').popover('hide');
				main_action.popover('hide');
			});
			
			
			if('dialog_id' in settings){
				$.each(settings['dialog_id'], function(index, value){
					$('#' + value).bind('dialogopen', function(event) {
						$('.' + settings['info_element']).popover('hide');
						$('.popup-marker').popover('hide');
		    			$('.allow-continiue-popup-marker').popover('hide');
						main_action.popover('hide');
					 });

					
					$('#' + value).bind('dialogclose', function(event) {			
						$('.popup-marker').popover('hide');
		    			$('.allow-continiue-popup-marker').popover('hide');
						main_action.popover('hide');
						$('.' + settings['info_element']).popover('show');
					 });
	    		});
			}
			
			if('refresh_after' in settings){
				$('#' + settings['refresh_after']['element_id']).bind(settings['refresh_after']['action'], function(event, data) {
					$('.popup-marker').unbind("click");

					$.each(click_events_set, function(index, value){
						$.each( value['event'], function(){
							if(typeof this == 'object'){
								value['element'].bind('click', this);
							}
						});
					});
					
					if(('language_step' in settings) && ('language_class' in settings) ){
						$('.' + settings['language_class']).each(function(){	
							var href = $(this).attr('href');
							$(this).attr('href', remove_hash(href));
						});
					}
					
					
					
					$('.' + settings['info_element']).popover('hide');
					$('.' + settings['info_element']).attr('data-alert', settings['refresh_after']['new_content']);
					/*
					$('div.main-popover').remove();
					$('.' + settings['info_element']).popover({
							trigger 	: 'manual',
							placement	: settings['info_placement'],
							template	:'<div class="popover main-popover" style="margin-left:' + settings['info_left'] + 'px; margin-right:' + settings['info_right'] + 'px; margin-top:' + settings['info_top'] +
								+'px; margin-bottom:' + settings['info_bottom'] + 'px;"><div class="popover-inner"><h2 class="popover-title main-popover-title"></h2><div class="popover-content"><div></div></div></div></div>',
							title	  	: settings['title'],
							content 	: settings['refresh_after']['new_content'],
					});
					*/
					var is_open = is_dialog_open();
					if(!is_open){
						$('.' + settings['info_element']).popover('show');
					}
					$('#' + settings['refresh_after']['element_id']).unbind(settings['refresh_after']['action']);
					if('block_after' in settings){
						$('#' + settings['block_after']['element_id']).unbind(settings['block_after']['action']);
					}
				});
				
			}
			
			if('block_after' in settings){
				$('#' + settings['block_after']['element_id']).bind(settings['block_after']['action'], function(event, data) {
					$('.' + settings['block_after']['block_class']).click(function(){return false;});
				});
			}

	    });
	
	  };
	})( jQuery );