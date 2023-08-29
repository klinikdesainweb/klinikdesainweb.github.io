jQuery(function () {

    jQuery(window).on('load', function () {
        
        if (jQuery('#madxartwork-navigator').length) {
            // CLIPBOARD JS
            var copy_btn = '#madxartwork-navigator .madxartwork-navigator__element__infobox__copy, #madxartwork-navigator .madxartwork-navigator__element__infobox__copy_mini';
            new ClipboardJS(copy_btn);
            jQuery(copy_btn).on('click', function (e) {
                jQuery(copy_btn).addClass('animated').addClass('tada');
                setTimeout(function(){
                    jQuery(copy_btn).removeClass('animated').removeClass('tada');
                }, 3000);
            });

            // TIPSY
            jQuery('#madxartwork-navigator .tooltip-target').tipsy({
                // `n` for down, `s` for up
                gravity: 's',
                title: function title() {
                  return this.getAttribute('data-tooltip');
                }
            });

            //if (!jQuery('body').hasClass('admin-bar')) {
            jQuery('#madxartwork-navigator').fadeIn();

        }
    });

    jQuery('#wp-admin-bar-madxartwork-navigator > .ab-item').on('click', function () {
        if (jQuery('#madxartwork-navigator').length) {
            if (jQuery('#madxartwork-navigator').is(':visible')) {
                jQuery('#madxartwork-navigator__close').trigger('click');
            } else {
                jQuery('#madxartwork-navigator').toggle();
            }
            return false;
        }        
    });

    jQuery('#madxartwork-navigator__close').on('click', function () {
        if (jQuery('body').hasClass('admin-bar') && jQuery('#wp-admin-bar-madxartwork-navigator .ab-item').length) {
            jQuery('#madxartwork-navigator').hide();
        } else {
            jQuery('#madxartwork-navigator').toggleClass('madxartwork-closed');
            jQuery(this).toggleClass('eicon-close').toggleClass('eicon-preview-medium');
        }
        jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox').hide();
        jQuery('#madxartwork-navigator .madxartwork-editing').removeClass('madxartwork-editing');
        jQuery('.debug-bar-dce-highlight').removeClass('debug-bar-dce-highlight');
        return false;
    });

    jQuery('#madxartwork-navigator .madxartwork-navigator__close').on('click', function () {
        jQuery(this).closest('.madxartwork-navigator__element__infobox').hide();
        jQuery('.debug-bar-dce-highlight').removeClass('debug-bar-dce-highlight');
        jQuery('#madxartwork-navigator .madxartwork-navigator__item.madxartwork-editing').removeClass('madxartwork-editing');
        return false;
    });

    jQuery('#madxartwork-navigator__toggle-all').on('click', function () {
        jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox').hide();
        if (jQuery('#madxartwork-navigator .madxartwork-navigator__item + ul').first().is(':visible')) {
            jQuery('#madxartwork-navigator .madxartwork-navigator__item + ul').hide();
            jQuery('#madxartwork-navigator .madxartwork-navigator__item.madxartwork-active').removeClass('madxartwork-active');
        } else {
            jQuery('#madxartwork-navigator .madxartwork-navigator__item + ul').show();
            jQuery('#madxartwork-navigator .madxartwork-navigator__item').addClass('madxartwork-active');
        }
        return false;
    });

    jQuery('#madxartwork-navigator').on('mouseleave', function () {
        if (!jQuery('#madxartwork-navigator .madxartwork-navigator__item.madxartwork-editing').length) {
            jQuery('.debug-bar-dce-highlight').removeClass('debug-bar-dce-highlight');
        }
    });
    jQuery('#madxartwork-navigator .madxartwork-navigator__item').on('hover', function () {
        if (!jQuery('#madxartwork-navigator .madxartwork-navigator__item.madxartwork-editing').length) {
            jQuery('.debug-bar-dce-highlight').removeClass('debug-bar-dce-highlight');
            jQuery(jQuery(this).data('target')).toggleClass('debug-bar-dce-highlight');
        }
    });
    jQuery('#madxartwork-navigator .madxartwork-navigator__element__title, #madxartwork-navigator .madxartwork-navigator__element__element-type').on('click', function () {

        // hilight row
        if (!jQuery(this).closest('.madxartwork-navigator__item').hasClass('madxartwork-editing')) {
            jQuery('#madxartwork-navigator .madxartwork-editing').removeClass('madxartwork-editing');
        }
        jQuery(this).closest('.madxartwork-navigator__item').toggleClass('madxartwork-editing');

        // display element in page
        if (jQuery(this).closest('.madxartwork-navigator__item').find('.madxartwork-navigator__element__toggle .fa').hasClass('fa-eye-slash')) {
            jQuery(this).closest('.madxartwork-navigator__item').find('.madxartwork-navigator__element__toggle').trigger('click');
        }
        if (jQuery(jQuery(this).parent().data('target')).length) {
            if (jQuery(jQuery(this).parent().data('target')).offset().top) {
                jQuery('html, body').animate({
                    scrollTop: jQuery(jQuery(this).parent().data('target')).offset().top - jQuery('#wpadminbar').height()
                }, 1000);
            }
        }

        // hilight element in page
        if (!jQuery(jQuery(this).parent().data('target')).hasClass('debug-bar-dce-highlight')) {
            jQuery('.debug-bar-dce-highlight').removeClass('debug-bar-dce-highlight');
        }
        if (jQuery(this).closest('.madxartwork-navigator__item').hasClass('madxartwork-editing')) {
            jQuery(jQuery(this).closest('.madxartwork-navigator__item').data('target')).addClass('debug-bar-dce-highlight');
        } else {
            jQuery(jQuery(this).closest('.madxartwork-navigator__item').data('target')).removeClass('debug-bar-dce-highlight');
        }

        // open element info box
        jQuery(this).closest('.madxartwork-navigator__item').find('.madxartwork-navigator__element__info').trigger('click');

        return false;
    });


    jQuery('#madxartwork-navigator .madxartwork-navigator__element__list-toggle').on('click', function () {
        jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox').hide();
        jQuery(this).parent().toggleClass('madxartwork-active');
        jQuery(this).parent().siblings('.madxartwork-navigator__elements').toggle();
        return false;
    });
    jQuery('#madxartwork-navigator .madxartwork-navigator__element__toggle').on('click', function () {
        jQuery(jQuery(this).closest('.madxartwork-navigator__item').data('target')).toggleClass('dce-visibility-element-hidden');
        //jQuery(this).closest('.madxartwork-navigator__item').toggleClass('madxartwork-dce-hidden');
        var navigator__element = jQuery(this).closest('.madxartwork-navigator__element');
        navigator__element.toggleClass('madxartwork-navigator__element--hidden');
        navigator__element.children('.madxartwork-navigator__item').find('.fa').toggleClass('fa-eye').toggleClass('fa-eye-slash');
        navigator__element.children('.madxartwork-navigator__element__infobox').find('.fa').toggleClass('fa-eye').toggleClass('fa-eye-slash');
        return false;
    });
    jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox__toggle').on('click', function () {
        jQuery(this).closest('.madxartwork-navigator__element').find('.madxartwork-navigator__element__toggle').trigger('click');
        return false;
    });
    jQuery('#madxartwork-navigator .madxartwork-navigator__element__info').on('click', function () {
        if (!jQuery(this).closest('.madxartwork-navigator__element').children('.madxartwork-navigator__element__infobox:visible').length) {
            //if (jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox:visible').length) {
            jQuery('#madxartwork-navigator .madxartwork-navigator__element__infobox').hide();
            //}
        }
        jQuery(this).closest('.madxartwork-navigator__element').children('.madxartwork-navigator__element__infobox').toggle();
        return false;
    });
    jQuery(document).on('click', '.debug-bar-dce-highlight', function () {
        jQuery(this).removeClass('debug-bar-dce-highlight');
        return false;
    });

});