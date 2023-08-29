/*
 * DCE EDITOR
 * dynamic.ooo
 */

// SELECT2 everywhere
jQuery(window).on( 'load', function() {
//jQuery(window).on('madxartwork:init', function () {
//jQuery( window ).on( 'madxartwork/frontend/init', function() {
    if (jQuery.fn.select2) {
        if ( window.madxartworkFrontend ) {
            madxartworkFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
                jQuery('.madxartwork-control-type-select select').select2();
            } );
        }
        madxartwork.hooks.addAction( 'panel/open_editor/section', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
        madxartwork.hooks.addAction( 'panel/open_editor/column', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
        madxartwork.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
    }
    setInterval(function(){
        if (jQuery.fn.select2) {
            // add navigator element toggle
            jQuery('.madxartwork-control-type-select select').not('.select2-hidden-accessible').each(function(){
                jQuery(this).select2();
            });
        }
    }, 1000);
});

// Hide Description
jQuery(window).on( 'load', function() {
    if ( window.madxartworkFrontend ) {
        madxartworkFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
            description_to_abbr();
        } );
    }
    madxartwork.hooks.addAction( 'panel/open_editor/section', function( panel, model, view ) {
        description_to_abbr();
    } );
    madxartwork.hooks.addAction( 'panel/open_editor/column', function( panel, model, view ) {
        description_to_abbr();
    } );
    madxartwork.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
        description_to_abbr();
    } );

    setInterval(function(){
        // add navigator element toggle
        description_to_abbr();
    }, 1000);
});
function description_to_abbr() {
    jQuery('.madxartwork-control-field-description').not('.madxartwork-control-field-description-hidden').each(function() {
        var title = jQuery(this).siblings('.madxartwork-control-field').children('.madxartwork-control-title');
        if (title.text().trim()) {
            var text = jQuery(this).text();
            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            title.wrapInner('<abbr title="'+text+'"></abbr>');
            jQuery(this).addClass('madxartwork-control-field-description-hidden').hide();
            title.on('click', function() {
                jQuery(this).parent().siblings('.madxartwork-control-field-description').toggle();
                return false;
            });
        }
    });
}

jQuery(window).load(function() {
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();

    // get model CID on mouse dx click
    /*iFrameDOM.on('mousedown', '.madxartwork-element', function(event) {
        if (event.which == 3) {
            //iFrameDOM.find('body').on('contextmenu', function() {
            var eid = jQuery(this).data('id');
            var cid = jQuery(this).data('model-cid');
            var type = jQuery(this).data('element_type');
            dce_model_cid = cid;
            console.log(type + ' - ' + eid + ' - ' + cid);
            if (dce_model_cid) {
                return false;
            }
        }
        
    });*/
    
    // add EDIT Template on Context Menu
    iFrameDOM.on('mousedown', '.madxartwork-editor-active .madxartwork:not(.madxartwork-edit-mode)', function(event) {
        if (event.which == 3) {
            var template_id = jQuery(this).data('madxartwork-id');
            var post_id = iFrameDOM.find('.madxartwork-editor-active .madxartwork.madxartwork-edit-mode').data('madxartwork-id');
            if (template_id && post_id) {
                setTimeout(function(){
                    var menu = jQuery('.madxartwork-context-menu:visible');                
                    if (menu.length) {                    
                        menu.find('.madxartwork-context-menu-list__item-template').remove();
                        var edit_url = window.location.href.replace('post='+post_id, 'post='+template_id);
                        menu.find('.madxartwork-context-menu-list__item-edit').after('<div class="madxartwork-context-menu-list__item madxartwork-context-menu-list__item-template" onclick="window.open(\''+edit_url+'\'); return false;"><div class="madxartwork-context-menu-list__item__icon"><i class="eicon-edit"></i></div><div class="madxartwork-context-menu-list__item__title">Edit Template</div></div>');
                    }
                }, 10);
            }
        }
    });

});


