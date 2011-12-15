
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
$('select.query_key').change(function(e) {
    console.log($(e.currentTarget));
    console.log($(e.currentTarget).filter(':selected'));
});


/* end of adding event handlers */

/* dialogs */
$('#add_layer_dialog').dialog({
    autoOpen: false,
    modal: true,
    title: 'Add layer',
    buttons: {
        'Add layer': function(event) {$(this).dialog('close');},
        'Cancel': function(event) {$(this).dialog('close');}
    },
    height: 600,
    maxHeight: 590,
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
$('#layers svg').ColorPicker({
    onChange: function(hsb, hex, rgb) {
        
    },
    onSubmit: function(hsb, hex, rgb, el) {
	$(el).ColorPickerHide();
    },
});


 