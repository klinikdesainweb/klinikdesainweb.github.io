function get_Dyncontel_ElementSettings($element) {
        var elementSettings = [];
        var modelCID = $element.data('model-cid');
        if (madxartworkFrontend.isEditMode() && modelCID) {
            var settings = madxartworkFrontend.config.elements.data[modelCID];
            var type = settings.attributes.widgetType || settings.attributes.elType;
            var settingsKeys = madxartworkFrontend.config.elements.keys[ type ];
            if (!settingsKeys) {
                settingsKeys = madxartworkFrontend.config.elements.keys[type] = [];
                jQuery.each(settings.controls, function (name, control) {
                    if (control.frontend_available) {
                        settingsKeys.push(name);
                    }
                });
            }
            jQuery.each(settings.getActiveControls(), function (controlKey) {
                if (-1 !== settingsKeys.indexOf(controlKey)) {
                    elementSettings[ controlKey ] = settings.attributes[ controlKey ];
                }
            });
        } else {
            elementSettings = $element.data('settings') || {};
        }
        return elementSettings;
    }
    
(function ($) {
    var get_Dyncontel_ElementSettings = function ($element) {

        var elementSettings = {};
        var modelCID = $element.data('model-cid');

        if (madxartworkFrontend.isEditMode() && modelCID) {
            var settings = madxartworkFrontend.config.elements.data[ modelCID ];
            var settingsKeys = madxartworkFrontend.config.elements.keys[ settings.attributes.widgetType || settings.attributes.elType ];
            var type = settings.attributes.widgetType || settings.attributes.elType;
            if (!settingsKeys) {
                settingsKeys = madxartworkFrontend.config.elements.keys[type] = [];
                jQuery.each(settings.controls, function (name, control) {
                    if (control.frontend_available) {
                        settingsKeys.push(name);
                    }
                });
            }
            jQuery.each(settings.getActiveControls(), function (controlKey) {
                if (-1 !== settingsKeys.indexOf(controlKey)) {
                    elementSettings[ controlKey ] = settings.attributes[ controlKey ];
                }
            });
        } else {
            elementSettings = $element.data('settings') || [];
        }
        return elementSettings;
    };

})(jQuery);