(function ($) {

    // --------------------------
    /*function handleGoToPage ( newValue ) {
     alert(newValue);
     if(newValue){
     // SI
     alert('Gooo');
     //$('.dce-go-to-page-template').attr('href','Ciaooooooo');
     }else{
     // NO
     }
     }*/
    //alert($('.unfold-yes .dce-content').height());


    $(window).on('madxartwork/frontend/init', function () {
        /*alert(madxartworkFrontend.isEditMode());
         if ( madxartworkFrontend.isEditMode() ){
         madxartwork.settings.page.addChangeCallback( 'other_post_source', handleGoToPage );
         }*/

        //alert('main');
        if (madxartworkFrontend.isEditMode()) {
            madxartwork.channels.editor.on('dceMain:previewPage', function (e, editor) {
                //alert(e);
                var model = e.getOption('editedElementView').getEditModel(),
                        currentElementType = model.get('elType');
                //var model = editor.getOption('other_post_source').getEditModel();
                //alert(model);
                //madxartwork.$preview[0].contentWindow.location = 'XXX';
                //console.log(modelE);
                //alert('ss');

            });
        }
    });

})(jQuery);