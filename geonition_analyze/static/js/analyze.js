/*
 TODO (remove tese comments later)
 
 - remove the options from the add property key options as they
 are used, e.g. no situation where property is both true and false
 at the same time
 - make the layers and the form submt work
 - make queries to the geonition db to get data
 - layer view should be updated according to the gntlayers model
*/

/*
 Model of the analysis application
 
 The layers are an array of layer objects
 with the information needed to visualize
 each layer. The order of the array is the
 order of the layers visualizations on the
 map. The first one is on top of the next ones etc.
 
 explanation of layer variables:
 name - name of layer
 type - type of layer (point, polyline, polygon)
 color - color of the layer (hex)
 data - a featurecollection of the layer
 feature_query - array of triples that the features in this layer fulfill
 profile_query - array of triples that the profiles in this layer fulfill
*/
var gntlayers = [];


/*
 Functions
*/

/* add layer form related functionality */
var index = 0;
function add_query_row(fieldset_selector) {
    //duplicates the rows or show the first row
    var node = $(fieldset_selector + ' .row:first').clone();
    node.append('<span id="remove_query' +
                index +
                '" class="remove_query">' +
                '<span class="ui-icon ui-icon-circle-minus"></span>' +
                '<span>Remove</span></span>');
    node.appendTo(fieldset_selector);
    
    $(node).children().filter('select.query_key').change(query_key_select_handler);
    $(node).children().filter('select').attr('value', '');
    $(node).children().filter('span.query_pair').remove();

    //add the remove functionality
    $('#remove_query' + index).click(function() {
        //duplicate row in fieldset
        remove_query_row(this);
    });
    index++;
}

function remove_query_row(node) {
    $(node).parent().remove();
}

function query_key_select_handler(e) {
    var node = $(e.currentTarget).children().filter(':selected');
    var class_name = node[0].className;
    var query_elements = $('.query_elements:first').children();
    
    var siblings = $(e.currentTarget).parent().children().filter('.query_pair');
    $(siblings).remove();
    
    if (node.hasClass(class_name)) {
        var pair_input = $(query_elements).filter('.' + class_name);
        $(pair_input).clone().appendTo($(e.currentTarget).parent());
    }   
}

/*
 This function updates the layers
 according to the information in
 gnt layers model
*/
function update_layer_view() {
    console.log("update layer view");
    console.log(gntlayers);
    
    
    console.log($('div.layer'));
    
    for(var i = 0; i < gntlayers.length; i++) {
        
        var layer_class = gntlayers[i].name.split(' ').join('_');
        layer_class = layer_class + '_' + gntlayers[i].type;
        
        //if the layer is already added then do nothing
        if($('div.layer.' + layer_class).length !== 0) {
            continue;
        } else {
            console.log(gntlayers[i].name);
            console.log('div.layer.' + gntlayers[i].type);
            node = $('div.layer.hidden.' + gntlayers[i].type).clone()[0];
            console.log("node to append to layers");
            console.log(node);
        
            //append to layers
            $('#layers').append(node);
        
            //make it visible
            $(node).removeClass('hidden');
        
            //add an identifier to the node
            $(node).addClass(layer_class);
            console.log(node);
        
            //change the name in the node
            $('.' + layer_class + ' .layer_name').html(gntlayers[i].name);
        
            break;
        }
    }
}

function process_layer(layer) {
    console.log("process layer");
    console.log(layer);
    
    var get_params = '?';
    var query_list;
    var query;
    for(var i = 0; i < layer.geography_query.length; i++) {
        console.log(layer.geography_query[i]);
        query_list = layer.geography_query[i];
        query = '';
        
        if (query_list[1] === '=') {
            query = query_list.join('');
        }
        if (get_params === '?') {
            get_params = get_params + query;
        } else {
            get_params = get_params + '&' + query;
        }
        console.log(get_params);
    }
    
    for(var i = 0; i < layer.profile_query.length; i++) {
        console.log(layer.profile_query[i]);
        
        query_list = layer.profile_query[i];
        query = '';
        
        if (query_list[1] === '=') {
            query = query_list.join('');
        }
        
        if (get_params === '?') {
            get_params = get_params + query;
        } else {
            get_params = get_params + '&' + query;
        }
        console.log(get_params);
    }
    
    //make the profile query
    gnt.opensocial_people.get_list_of_persons('@all', '@self' + get_params, console.log);
}

function visualize_layer() {
    console.log("visualize layer function");
}

function submit_layer_form() {
    var input_nodes = $('form').filter(':visible')[0].elements;
    console.log($(input_nodes).filter('input[name=layer_name]').val());
    var name_of_layer = $(input_nodes).filter('input[name=layer_name]').val();
    console.log($(input_nodes).filter('select[name=geometry_type]').val());
    var geometry_type = $(input_nodes).filter('select[name=geometry_type]').val();
    console.log($(input_nodes).filter('fieldset.geography :input'));
    var geography_query_elem = $(input_nodes).filter('fieldset.geography :input');
    console.log($(input_nodes).filter('fieldset.profile :input'));
    var profile_query_elem = $(input_nodes).filter('fieldset.profile :input');
    
    var new_layer = {
        'name': name_of_layer,
        'type': geometry_type,
        'geography_query': [],
        'profile_query': []
    };
    
    var temp_q = [];
    for(var i = 0; i < geography_query_elem.length; i++) {
        if(geography_query_elem[i].name === 'query_key') {
            temp_q.push(geography_query_elem[i].value);
        } else if (geography_query_elem[i].name === 'query_condition') {
            temp_q.push(geography_query_elem[i].value);
        } else if (geography_query_elem[i].name === 'query_value') {
            temp_q.push(geography_query_elem[i].value);
            new_layer.geography_query.push(temp_q);
            temp_q = [];
        }
    }
    
    for(var i = 0; i < profile_query_elem.length; i++) {
        if(profile_query_elem[i].name === 'query_key') {
            temp_q.push(profile_query_elem[i].value);
        } else if (profile_query_elem[i].name === 'query_condition') {
            temp_q.push(profile_query_elem[i].value);
        } else if (profile_query_elem[i].name === 'query_value') {
            temp_q.push(profile_query_elem[i].value);
            new_layer.profile_query.push(temp_q);
            temp_q = [];
        }
    }
    gntlayers.push(new_layer);
    console.log(new_layer);
    update_layer_view();
    process_layer(new_layer);
}

/* dialogs */
$('#add_layer_dialog').dialog({
    autoOpen: false,
    modal: true,
    title: 'Add layer',
    buttons: {
        'Add layer': function(event) {
            submit_layer_form();
            //close the form
            $(this).dialog('close');
        },
        'Cancel': function(event) {
            $(this).dialog('close');
        }
    },
    height: 600,
    maxHeight: 590,
    open: function() {
        for(var i = 0; i < document.forms.length; i++) {
            document.forms[i].reset();
        }
    },
    width: 600
});

$('#remove_layer_dialog').dialog({
    autoOpen: false,
    title: 'Remove layer',
    buttons: {
        'Remove layer': function(event) {$(this).dialog('close');},
        'Cancel': function(event) {$(this).dialog('close');}
    }
});
$('#edit_layer_dialog').dialog({
    autoOpen: false,
    modal: true,
    title: 'Edit layer',
    buttons: {
        'Update layer': function(event) {$(this).dialog('close');},
        'Cancel': function(event) {$(this).dialog('close');}
    },
    height: 600,
    maxHeight: 590,
    width: 600
});

/* colorpickers */
$('#layers .layer_type_color svg').ColorPicker({
    onSubmit: function(hsb, hex, rgb, el) {
        if($(el).children().attr('fill') !== 'none') {
            $(el).children().attr('fill', '#' + hex);
        }
        if($(el).children().attr('stroke') !== undefined) {
            $(el).children().attr('stroke', '#' + hex);
        }
	$(el).ColorPickerHide();
    }
});

/* add events handlers */

/* toolbar */
$('#add_layer').click(function() {
    $('#add_layer_dialog').dialog('open');
});
$('#show_all_layers').click(function() {
    $('.layer input:checkbox').attr('checked', true);
});
$('#hide_all_layers').click(function() {
    $('.layer input:checkbox').attr('checked', false);
});

/* toolbar end */

/* layer functionality */
$('.remove_layer a').click(function() {
    $('#remove_layer_dialog').dialog('open');
});
$('.edit_layer a').click(function() {
    $('#edit_layer_dialog').dialog('open');
});

/* for the form adding layers*/
$('.add_query.geography').click(function() {
    add_query_row('.ui-dialog fieldset.geography');
});
$('.add_query.profile').click(function() {
    add_query_row('.ui-dialog fieldset.profile');
});
$('select.query_key').change(query_key_select_handler);

/* show and hide the help */

//check if the help checkbox is checked or not
if ($('#help').checked) {
    $('.help').show();
} else {
    $('.help').hide();    
}

$('#help').change(function(event) {
    if(this.checked) {
        $('.help').show();
    } else {
        $('.help').hide();
    }
});

/* end of adding event handlers */
