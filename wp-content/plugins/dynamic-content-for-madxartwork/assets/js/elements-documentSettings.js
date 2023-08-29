( function( $ ) {
	var settings_page = {};

	
	// Change CallBack - - - - - - - - - - - - - - - - - - - - - - - - -

	function handlescroll_viewport ( newValue ) {
		if(newValue){
			// SI
			
		}else{
			// NO
			
		}
		
	}





	$( window ).on( 'madxartwork/frontend/init', function() {
		

	} );

	window.onload = function() {
		
	}
	
	$( document ).on( 'ready', function() {
		//alert($('.madxartwork[data-madxartwork-type=page]').length);
		if( typeof madxartworkFrontendConfig.settings.page !== 'undefined' ){
			if ( madxartworkFrontend.isEditMode() ){
				settings_page = madxartworkFrontendConfig.settings.page;
			}else{
				settings_page = JSON.parse( $('.madxartwork').attr('data-madxartwork-settings') ); //
			}
			
			//alert(settings_page.enable_scrollEffects);
			//console.log($('.madxartwork').attr('data-madxartwork-settings'));
			//alert(elementSettings.enable_scrollEffects);
			if( settings_page ){
				

				if ( madxartworkFrontend.isEditMode() ){
					/*madxartwork.once( 'preview:loaded', function() {
						// questo è il callBack di fine loading della preview

					} );*/
					madxartwork.settings.page.addChangeCallback( 'scroll_viewport', handlescroll_viewport );
					

					
					

				}
			}
		}
		
		

	} );
} )( jQuery );