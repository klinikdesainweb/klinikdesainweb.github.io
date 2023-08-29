( function( $ ) {
	var WidgetElements_ParallaxHandler = function( $scope, $ ) {
		//console.log( $scope );
		//alert('Parallax');

		var scene = $scope.find('#scene');
		var parallax = new Parallax( scene[0] );
		
	};
	
	// Make sure you run this code under madxartwork..
	$( window ).on( 'madxartwork/frontend/init', function() {
		madxartworkFrontend.hooks.addAction( 'frontend/element_ready/dyncontel-parallax.default', WidgetElements_ParallaxHandler );
	} );
} )( jQuery );
