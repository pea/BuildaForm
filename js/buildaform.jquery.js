// Notes
// ID is misleading. It can mean either a CSS ID or Class name

// Dependencies: jQuery, jQuery UI Sortable, Handlebars

(function($){
    $.fn.buildaform = function(options) {
        
        // Function: Base Buildaform plugin

        // Set default variables

        var defaults = {
            insert_json: false, // Variable containing JSON. We'll turn it into a form for editing, otherwise start fresh
            select_type_container_id: '#select_type_container', // ID of the Select Type container
            input_container_id: '#input_container', // ID of the input row container
            select_type_template_id: '#select_type_template', // ID of Select Type template
            select_type_id: '#select_type', // ID of Select Type dropdown
            add_input_id: '#add_input', // ID of Select Type submit button
            input_row_id: '.input_row', // General ID if input row (not type specific)
            remove_input_id: '.remove_input', // ID of remove link
            text_input_template_id: '#text_input_template', // ID of text box input row template

            checkbox_input_template_id: '#checkbox_input_template', // ID of checkbox input row template
            checkbox_input_option_template_id: '#checkbox_input_option_template', // ID of checkbox input row option template
            checkbox_input_option_container_id: '.checkbox_input_option_container', // ID of checkbox option sub-row container
            checkbox_option_row_id: '.checkbox_option_row', // ID of checkbox option sub-row row
            add_checkbox_option_id: '.add_option', // ID of checkbox option add link
            remove_checkbox_option_id: '.remove_checkbox_option', // ID of checkbox option remove link

            radio_input_template_id: '#radio_input_template', // ID of radio input row template
            radio_input_option_template_id: '#radio_input_option_template', // ID of radio input row option template
            radio_input_option_container_id: '.radio_input_option_container', // ID of radio option sub-row container
            radio_option_row_id: '.radio_option_row', // ID of radio option sub-row row
            add_radio_option_id: '.add_option', // ID of radio option add link
            remove_radio_option_id: '.remove_radio_option', // ID of radio option remove link

            select_input_template_id: '#select_input_template', // ID of select input row template
            select_input_option_template_id: '#select_input_option_template', // ID of select input row option template
            select_input_option_container_id: '.select_input_option_container', // ID of select option sub-row container
            select_option_row_id: '.select_option_row', // ID of select option sub-row row
            add_select_option_id: '.add_option', // ID of select option add link
            remove_select_option_id: '.remove_select_option', // ID of select option remove link

            save_id: '#save',

            input_label_id: '.input_label', // ID of input label
            input_name_id: '.input_name', // ID of input name

            onSave: function(){} // Triggers when user clicks 'save' (wants to output JSON)
        };

        var options = $.extend(defaults, options);

        // Set template variables

        var templates = {
            select_type_template: $(options.select_type_template_id).html(),
            text_input_template: Handlebars.compile($(options.text_input_template_id).html()),
            checkbox_input_template: Handlebars.compile($(options.checkbox_input_template_id).html()),
            radio_input_template: Handlebars.compile($(options.radio_input_template_id).html()),
            select_input_template: Handlebars.compile($(options.select_input_template_id).html()),
            checkbox_input_option_template: Handlebars.compile($(options.checkbox_input_option_template_id).html()),
            radio_input_option_template: Handlebars.compile($(options.radio_input_option_template_id).html()),
            select_input_option_template: Handlebars.compile($(options.select_input_option_template_id).html())
        }

        // Form builder

        var buildaform = {
            // Add new input row
            add: function(type){
                // Appends new input row
                if(type == 'text'){
                    // Insert text input item
                    var input_name = this.generate_input_name({prefix: 'text'}); // Generate form input to be inserted into template
                    var data = {
                        input_name: input_name,
                        input_label: ''
                    };
                    obj.find(options.input_container_id).append(templates.text_input_template(data)); // Generate HTML and append
                }
                if(type == 'checkbox'){
                    // Insert checkbox input item
                    var data = {
                        input_label: ''
                    };
                    obj.find(options.input_container_id).append(templates.checkbox_input_template(data));
                }
                if(type == 'radio'){
                    // Insert radio input item
                    var input_name = this.generate_input_name({prefix: 'radio'}); // Generate form input to be inserted into template
                    var data = {
                        input_label: '',
                        input_name: input_name
                    };
                    obj.find(options.input_container_id).append(templates.radio_input_template(data));
                }
                if(type == 'select'){
                    // Insert select input item
                    var input_name = this.generate_input_name({prefix: 'select'}); // Generate form input to be inserted into template
                    var data = {
                        input_label: '',
                        input_name: input_name
                    };
                    obj.find(options.input_container_id).append(templates.select_input_template(data));
                }
            },
            // Delete input row
            delete: function(row){
                $(row).remove();
            },
            // Checkbox specific actions
            checkbox: {
                // Add new checkbox option row
                add: function(row){
                    var input_name = buildaform.generate_input_name({prefix: 'checkbox'}); // Generate form input to be inserted into template
                    var data = {
                        input_name: input_name,
                        input_label: ''
                    };
                    $(row).find(options.checkbox_input_option_container_id).append(templates.checkbox_input_option_template(data));
                },
                delete: function(row){
                    $(row).remove();
                }
            },
            // Radio specific actions
            radio: {
                // Add new radio option row
                add: function(row){
                    var data = {
                        input_label: '',
                        input_value: ''
                    };
                    $(row).find(options.radio_input_option_container_id).append(templates.radio_input_option_template(data));
                },
                delete: function(row){
                    $(row).remove();
                }
            },
            // Select specific actions
            select: {
                // Add new select option row
                add: function(row){
                    var data = {
                        input_label: '',
                        input_value: ''
                    };
                    $(row).find(options.select_input_option_container_id).append(templates.select_input_option_template(data));
                },
                delete: function(row){
                    $(row).remove();
                }
            },
            // Generates an input name to be inserted into template
            generate_input_name: function(data){
                var input_names = [];
                $(options.input_container_id).find(options.input_name_id).each(function(k, item){ 
                    input_names.push($(item).val());
                });
                var num = 1;
                var input_name = data.prefix + '_' + num;
                while($.inArray(input_name, input_names) >= 0){
                    num += 1;
                    input_name = data.prefix + '_' + num;
                }
                return input_name;
            }
        }

        var output = {
            json: function(){
                // Function: Outputs form as JSON
                var results = [];
                var checkbox_items = [];
                var radio_items = [];
                var select_items = [];
                // Loop through all input items
                obj.find(options.input_container_id).find(options.input_row_id).each(function() {
                    var type = $(this).attr('data-type');
                    // Text input
                    if(type == 'text'){
                        results.push({
                            type: type,
                            label: $(this).find(options.input_label_id).val(),
                            name: $(this).find(options.input_name_id).val()
                        });
                    }
                    // Checkbox
                    if(type == 'checkbox'){
                        $(this).find(options.checkbox_option_row_id).each(function(){
                            checkbox_items.push({
                                label: $(this).find('input[data-type=\'checkbox_option\']').val(),
                                name: $(this).find(options.input_name_id).val()
                            });
                        });
                        results.push({
                            type: type,
                            label: $(this).find(options.input_label_id).val(),
                            options: checkbox_items
                        });
                        checkbox_items = [];
                    }
                    // Radio
                    if(type == 'radio'){
                        $(this).find(options.radio_option_row_id).each(function(){
                            radio_items.push({
                                label: $(this).find('input[data-type=\'radio_option\']').val(),
                                value: $(this).find('input[data-type=\'radio_value\']').val()
                            });
                        })
                        results.push({
                            type: type,
                            label: $(this).find(options.input_label_id).val(),
                            options: radio_items,
                            name: $(this).find(options.input_name_id).val()
                        });
                        radio_items = [];
                    }
                    // Select
                    if(type == 'select'){
                        $(this).find(options.select_option_row_id).each(function(){
                            select_items.push({
                                label: $(this).find('input[data-type=\'select_option\']').val(),
                                value: $(this).find('input[data-type=\'select_value\']').val()
                            });
                        })
                        results.push({
                            type: type,
                            label: $(this).find(options.input_label_id).val(),
                            options: select_items,
                            name: $(this).find(options.input_name_id).val()
                        });
                        select_items = [];
                    }
                });
                return JSON.stringify(results);
            }
        }

        var insert = {
            json_to_edit: function(json){
                // Function: Insert form from JSON (for editing)
                if(json != false){
                    var json = jQuery.parseJSON(json);
                    $.each(json, function(k, item){
                        // Append text input row
                        if(item.type == 'text'){
                            var data = {
                                input_name: item.name,
                                input_label: item.label
                            };
                            $(options.input_container_id).append(templates.text_input_template(data));
                        }
                        // Append checkbox input row
                        if(item.type == 'checkbox'){
                            // Insert parent
                            var data = {input_label: item.label};
                            $(options.input_container_id).append(templates.checkbox_input_template(data));
                            // Insert children
                            $.each(item.options, function(k, option_item){
                                var data = {
                                    input_name: option_item.name,
                                    input_label: option_item.label   
                                }
                                $(options.checkbox_input_option_container_id).append(templates.checkbox_input_option_template(data));
                            });
                        }
                        // Append radio input row
                        if(item.type == 'radio'){
                            // Insert parent
                            var data = {input_label: item.label, input_name: item.name};
                            $(options.input_container_id).append(templates.radio_input_template(data));
                            // Insert children
                            $.each(item.options, function(k, option_item){
                                var data = {
                                    input_label: option_item.label,
                                    input_value: option_item.value
                                }
                                $(options.radio_input_option_container_id).append(templates.radio_input_option_template(data));
                            });
                        }
                        // Append select input row
                        if(item.type == 'select'){
                            // Insert parent
                            var data = {input_label: item.label, input_name: item.name};
                            $(options.input_container_id).append(templates.select_input_template(data));
                            // Insert children
                            $.each(item.options, function(k, option_item){
                                var data = {
                                    input_label: option_item.label,
                                    input_value: option_item.value
                                }
                                $(options.select_input_option_container_id).append(templates.select_input_option_template(data));
                            });
                        }
                    });
                }
            }
        }

        // Rendering, initiation and events. And any other crap that doesn't fit anywhere else

        return this.each(function() {

            obj = $(this);
            
            // Initiate jQuery UI sortable plugin
            // Note: We allow user to sort but we don't actually retrieve the 
            // order. This is because the json outputted is in the order of the DOM elements 
            // which Sortable orders.
            obj.find(options.input_container_id).sortable({items: options.input_row_id});

            // Append Select Type select box
            obj.find(options.select_type_container_id).append(templates.select_type_template);
            
            // If form supplied in JSON format render it for editing
            insert.json_to_edit(options.insert_json);

            // User clicks Select Type submit button
            $(options.add_input_id).live('click', function(){
                var type = $(options.select_type_id).val();
                buildaform.add(type);
            });

            // User clicks remove link on input row
            $(options.remove_input_id).live('click', function(){
                var row = $(this).parents(options.input_row_id);
                buildaform.delete(row);
            });

            // User clicks checkbox add link
            $(options.add_checkbox_option_id).live('click', function(){
                var row = $(this).parents(options.input_row_id);
                buildaform.checkbox.add(row);
            });

            // User clicks checkbox remove option link
            $(options.remove_checkbox_option_id).live('click', function(){
                var row = $(this).parents(options.checkbox_option_row_id);
                buildaform.checkbox.delete(row);
            });

            // User clicks radio add link
            $(options.add_radio_option_id).live('click', function(){
                var row = $(this).parents(options.input_row_id);
                buildaform.radio.add(row);
            });

            // User clicks radio remove option link
            $(options.remove_radio_option_id).live('click', function(){
                var row = $(this).parents(options.radio_option_row_id);
                buildaform.radio.delete(row);
            });

            // User clicks select add link
            $(options.add_select_option_id).live('click', function(){
                var row = $(this).parents(options.input_row_id);
                buildaform.select.add(row);
            });

            // User clicks select remove option link
            $(options.remove_select_option_id).live('click', function(){
                var row = $(this).parents(options.select_option_row_id);
                buildaform.select.delete(row);
            });

            // User clicks the save link
            $(options.save_id).live('click', function(){
                var json_output = output.json();
                options.onSave(json_output);
                //$('#debug').html(json_output); // Debug
            });
        });
    };
    
    $.fn.buildaform.json_to_html = function(options){
        
        // Function: Convert JSON object to HTML
        
        var defaults = {
            json: [], // JSON to convert to HTML
            container_id: '#buildaform_preview', // The container the HTML inputs will be appended to
            input_text_template_id: '#input_text_template', // Template of the sample text input
            input_checkbox_template_id: '#input_checkbox_template', // Template of the sample checkbox input
            input_radio_template_id: '#input_radio_template', // Template of the sample radio input
            input_select_template_id: '#input_select_template', // Template of the sample select input
        }
        
        var options = $.extend(defaults, options);
        
        // Load templates
        var templates = {
            input_text_template: Handlebars.compile($(options.input_text_template_id).html()),
            input_checkbox_template: Handlebars.compile($(options.input_checkbox_template_id).html()),
            input_radio_template: Handlebars.compile($(options.input_radio_template_id).html()),
            input_select_template: Handlebars.compile($(options.input_select_template_id).html())
        }
        
        // Empty sample container before refilling
        $(options.container_id).html('');
        // Cycle through JSON and append templated version to container
        $.each(jQuery.parseJSON(options.json), function(k, item){
            // Append text input row
            if(item.type == 'text'){
                var data = {
                    name: item.name,
                    label: item.label
                };
                $(options.container_id).append(templates.input_text_template(data));
            }
            if(item.type == 'checkbox'){
                var data = {
                    name: item.name,
                    label: item.label,
                    options: item.options
                };
                $(options.container_id).append(templates.input_checkbox_template(data));
            }
            if(item.type == 'radio'){
                // Start: Compile array of options
                // Note: Handlebars.js seems to get confused with the name variable
                // when looping through the options since it isn't inside the array.
                // So we'll just add the name to the array for now
                var radio_options = [];
                $.each(item.options, function(k, radio_item){
                    radio_options.push({
                        name: item.name,
                        label: radio_item.label,
                        value: radio_item.value
                    });
                });
                // End: Compile array of options
                var data = {
                    name: item.name,
                    label: item.label,
                    options: radio_options
                };
                $(options.container_id).append(templates.input_radio_template(data));
            }
            if(item.type == 'select'){
                var data = {
                    name: item.name,
                    label: item.label,
                    options: item.options
                };
                console.log(item);
                $(options.container_id).append(templates.input_select_template(data));
            }
        });
          
    }
})(jQuery);