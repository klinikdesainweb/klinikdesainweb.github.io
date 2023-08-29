/*
 * DCE EDITOR
 * dynamic.ooo
 */

/******************************************************************************/

jQuery(window).on('madxartwork:init', function () {
    // Add Control Handlers
    madxartwork.hooks.addAction('panel/open_editor/widget/form', onPanelShowFormFields);
});
jQuery(window).on('load', function () {
    jQuery(document).on('change', '.madxartwork-control-custom_id input', function() {
       updateFormFieldsSelect(); 
    });
    jQuery(document).on('click', '.madxartwork-control-form_fields .madxartwork-repeater-add', function() {
       updateFormFieldsSelect(); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-form_fields .madxartwork-repeater-row-tool', function() {
       updateFormFieldsSelect(); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_form_fields', function() {
       updateFormFieldsSelect(); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_submit_button', function() {
       updateFormFieldsSelect('.madxartwork-control-dce_field_visibility_field select'); 
       updateFormFieldsSelect('.madxartwork-control-dce_field_visibility_field_multiple select'); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_dce_form_email', function() {
        updateFormFieldsSelect('.madxartwork-control-dce_form_email_condition_field select', 'dce_form_email_repeater'); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_dce_form_redirect', function() {
        console.log('duplicate section_dce_form_redirect');
        updateFormFieldsSelect('.madxartwork-control-dce_form_redirect_condition_field select', 'dce_form_redirect_repeater'); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_dce_form_save', function() {
        updateFormFieldsSelect('.madxartwork-control-dce_form_save_metas select'); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_dce_form_paypal', function() {
        updateFormFieldsSelect('.madxartwork-control-dce_form_paypal_condition_field select'); 
    });
    jQuery(document).on('mouseup', '.madxartwork-control-section_dce_form_max', function() {
        updateFormFieldsSelect('.madxartwork-control-dce_form_max_field_field select'); 
    });
    
    jQuery(document).on('mouseup', '.madxartwork-repeater-tool-duplicate, .madxartwork-repeater-add', function() {        
        var repeater = jQuery(this).closest('.madxartwork-control-type-repeater');
        if (repeater.hasClass('madxartwork-control-dce_form_redirect_repeater')) {
            jQuery('.madxartwork-control-section_dce_form_redirect').trigger('mouseup');
        }
        if (repeater.hasClass('madxartwork-control-dce_form_email_repeater')) {
            jQuery('.madxartwork-control-dce_form_email_repeater').trigger('mouseup');
        }        
    });
    
    
    jQuery(document).on('change', '.madxartwork-control-field_label input', function() {
        if (jQuery(this).val()) {
            var custom_id = jQuery(this).closest('.madxartwork-repeater-row-controls').find('.madxartwork-control-custom_id input').first();
            if (custom_id) {
                if (custom_id.val().substr(0,6) == 'field_') {
                    //custom_id.val(jQuery(this).val().toLowerCase().split(' ').join('_'));
                    /*custom_id.trigger( "keydown" );
                    custom_id.trigger( "keypress" );
                    custom_id.trigger( "keyup" );
                    custom_id.trigger( 'update' );
                    custom_id.trigger( "change" );*/
                    //alert(custom_id.val());
                    //custom_id.closest('.madxartwork-control').trigger( 'update' );
                    //jQuery(document).trigger( 'update', '#'+custom_id.attr('id') );
                    //custom_id.closest('.madxartwork-control').trigger( "change" );
                }
            }
        }
    });
});


function onPanelShowFormFields(panel, model) {
    updateFormFieldsSelect();
}
function updateFormFieldsSelect(section_input = '', section_name = '') {
    // wait until madxartwork do its things
    setTimeout(function(){
        var custom_ids = [];
        if (madxartworkFrontend.config.elements.data[dce_model_cid]) {
            var settings = madxartworkFrontend.config.elements.data[dce_model_cid].attributes;
            var fields = settings['form_fields'];
            var options = '';
            if (section_input) {
                var options = '<option value="">No field</option>';
            }
            jQuery(fields.models).each(function(index,element){
                custom_ids.push(element.attributes.custom_id);
                var field_label = '[' + element.attributes.custom_id + '] (' + element.attributes.field_type + ')';
                if (element.attributes.field_label) {
                    if (element.attributes.field_label.length > 20) {
                        field_label = element.attributes.field_label.substr(0, 20)  + '… ' + field_label;
                    } else {
                        field_label = element.attributes.field_label + ' ' + field_label;
                    }
                }
                options += '<option value="'+element.attributes.custom_id+'">'+field_label+'</option>';
            });
            jQuery(fields.models).each(function(index,element){
                var custom_id_input = false;
                jQuery(".madxartwork-control-custom_id input").each(function(index,input){
                    if (jQuery(this).val() == element.attributes.custom_id) {
                        custom_id_input = jQuery(this);
                    }
                });
                if (section_input) {
                    // custom field selector
                    var select = jQuery(section_input).first();
                    if (select) {
                        if (select.closest('.madxartwork-control-type-repeater').length) {
                            if (select.closest('.madxartwork-control-type-repeater').hasClass('madxartwork-control-'+section_name)) {
                                // in repeater
                                jQuery(section_input).each(function(index, select){
                                    var data_setting = jQuery(this).attr('data-setting');
                                    var ids = settings[section_name]['models'][index]['attributes'][data_setting];
                                    updateFormSelect(jQuery(this), options, ids, custom_id_input);
                                });
                            }
                        } else {             
                            // single field
                            var data_setting = select.data('setting');
                            var ids = settings[data_setting];
                            updateFormSelect(select, options, ids, custom_id_input);
                        }
                    }
                } else {
                    //console.log('udpate field visibility');
                    var ids = element.attributes.dce_field_visibility_field;
                    var ids_multiple = element.attributes.dce_field_visibility_field_multiple;
                    if (custom_id_input) {                    
                        // each field
                        var select = custom_id_input.closest('.madxartwork-repeater-row-controls').find('.madxartwork-control-dce_field_visibility_field select').first();
                        var select_multiple = custom_id_input.closest('.madxartwork-repeater-row-controls').find('.madxartwork-control-dce_field_visibility_field_multiple select').first();
                    } else {
                        // for submit btn
                        var ids = settings.dce_field_visibility_field;
                        var select = jQuery('.madxartwork-control-dce_field_visibility_field select').first();
                        var select_multiple = jQuery('.madxartwork-control-dce_field_visibility_field_multiple select').first();
                    }
                    updateFormSelect(select, options, ids, custom_id_input);
                    updateFormSelect(select_multiple, options, ids_multiple, custom_id_input);
                }            
            });
        }
        //console.log('form fields refreshed');
    }, 1000);
}

function updateFormSelect(select, options, ids, custom_id_input) {
    if (select) {
        var is_select2 = false;
        if (select.hasClass("select2-hidden-accessible")) {
            // Select2 has been initialized
            console.log('dce update form select - destroy');
            select.select2('destroy');
            is_select2 = true;
        }
        select.html(options);
        if (custom_id_input) {
            // remove itself
            select.find("option[value='"+custom_id_input.val()+"']").remove();
        }
        select.val(ids);
        if (is_select2) {            
            // Select2 has been initialized
            select.select2();
        }
    }
}
