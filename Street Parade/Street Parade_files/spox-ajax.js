// Wrapper $.spoxAjax, który zawiera domyślne zachowania do wykorzystania 
// w standardowym $.ajax. Wrapper $.spoxAjax przyjmuje takie same opcje jak 
// $.ajax oraz dodatkowo:
// 	target		 	obiekt jQuery, do której zapisane zostaną dane z odpowiedzi serwera
//	targetIdDialog	flaga określająca, czy target jest komponentem dialog z jQuery UI.
//					Jeśli nie zostanie ustawiona, to nastąpi automatyczne wykrycie, czy
//					przekazany obiekt jest komponentem dialog. Jeśli jest ustawiona, to
//					podana wartość nadpisuje wynik automatycznego testu.
//	afterSuccess	callback wywoływany, gdy otrzymana zostanie odpowiedź ze statusem
//					"success", pozwala na wykonanie dodatkowych czynności, otrzymuje
//					pojedynczy parametr zawierający dane otrzymane z serwera, np:
//					afterSuccess: function(data) { alert(data); }
//
// Format odpowiedzi oczekiwanej przez wrapper $.spoxAjax jest następujący:
// 	{
//		"status": "STATUS", 
//		"data": "DANE"
//	}
// gdzie STATUS przyjmuje wartość: "success", "error" lub "session_expired", a DANE
// mają postać kodu HTML do umieszczenia w elemencie target (w przypadku, gdy jest on
// zdefiniowany) lub dowolną postać (gdy element target nie jest zdefiniowany).
//
// Domyślny zachowanie jest zdefiniowane następująco:
// 1. Jeśli podano target, ustawienie opacity na 0.5 dla target oraz dodanie ajaksowego
// indicatora, wyśrodkowanego na target. Jeśli target jest dialogiem - otworzenie 
// dialoga. (beforeSend) 
// 2. Wywołanie $.ajax.
// 3. W przypadku błędu komunikacji (callback error z $.ajax) wyświetlenie dialoga z 
// informacją o wystąpieniu błędu.
// 4. W przypadku wygaśnięcia sesji - wyświetlenie dialoga z informacją.
// 5. W przypadku prawidłowej odpowiedzi z $.ajax sparawdzany jest status:
//  5.1. response.status == "success": zmiana opacity targetu na 1, ustawienie danych 
//	z odpowiedzi w targecie i wywołanie afterSuccess
//  5.2. response.status == "error": wyświetlenie komunikatu o błędzie
//  5.3. response.status == "session_expired": wyświetlenie komunikatu o konieczności
//  ponownego zalogowania
//
jQuery.extend( {
    spoxAjax: function(options) { 
    	var cleanup_ajax_indicator = function(){
    		settings.target.css({'opacity': 1});
			$(".spox-ajax-indicator-container").remove();
    	};
    	
    	var cleanup_target = function(){
    		if(settings.targetIsDialog){
				settings.target.dialog('close');
			}
    	}
    	
    	var default_options = {
    		success: function(response){
    			if(settings.target != undefined){
    				cleanup_ajax_indicator();
				}
    			
    			if(response.status == "success"){
    				if(settings.target != undefined){
    					settings.target.html(response.data);
    					
    					if(settings.targetIsDialog){
    						settings.target.dialog('option', 'position', 'center');
    					}
    				}
    				
    				if(settings.afterSuccess != undefined){
    					settings.afterSuccess(response.data);
    				}
    			}
    			else if(response.status == "session_expired"){
    				$("#ajax-session-expired").dialog('open');
    				cleanup_target();
    			}
    			else if(response.status == "error"){
    				$("#ajax-error").dialog('open');
    				cleanup_target();
    			}
    		},
    		
			error: function(){
				cleanup_ajax_indicator();
				cleanup_target();
				$("#ajax-error").dialog('open');
			},
			
			beforeSend: function(jqXHR, settings){
				if(settings.target != undefined){
					if(settings.targetIsDialog){
    					settings.target.dialog('open');
    				}
					
    				settings.target.css({'opacity': 0.5});
    				settings.target.prepend('<div class="spox-ajax-indicator-container" ' +
    						'style="width: 0px; height: 0px"><img src="' + 
    						MEDIA_URL + '/img/ajax.gif"/></div>');
    				$(".spox-ajax-indicator-container").center();
    				$(".spox-ajax-indicator-container > img").center();
				}
			},
			
			type: "GET",
			
			target: undefined,
			
			targetIsDialog: false
		};
    	
    	if(options.target.is(':data(dialog)')){
    		default_options.targetIsDialog = true;
    	}
    	
    	var settings = $.extend(default_options, options);
    	
		$.ajax(settings);
    }
});
	

