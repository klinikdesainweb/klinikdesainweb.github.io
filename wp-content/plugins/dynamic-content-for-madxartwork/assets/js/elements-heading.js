( function( $ ) {
	var WidgetElementsTitleDCEHandler = function( $scope, $ ) {
		//console.log( 'pppppppppppppppp '+$scope );
		//alert('dce js'+$scope)
	};
	
	// Make sure you run this code under madxartwork..
	$( window ).on( 'madxartwork/frontend/init', function() {
		madxartworkFrontend.hooks.addAction( 'frontend/element_ready/dyncontel-heading.default', WidgetElementsTitleDCEHandler );
	} );
} )( jQuery );
