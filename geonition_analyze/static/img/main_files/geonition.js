
/*
The base object for geonition javascript function
all functions should be under gnt.<app name>.<function name>(<params>)
*/
var gnt = {};


/*
Version of applications

Each application has to update this object.
*/
gnt.app_version = {};
gnt.app_version.geonition_client = "2.0.0";

/*
configure parameters

default values below
*/
gnt.config = {};
gnt.config.CSRF_cookie_name = "softgis_csrf";
gnt.config.api_full_url = "http://localhost:8000";


/*
added to all AJAX calls to the server
*/
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken",
                             getCookie(gnt.config.CSRF_cookie_name));
    }
});

/*
 add tje json2.js file for compatibility with older browsers and
 browsers that does not support JSON stringify etc.
*/

/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());



    /*
 authentication related functions
*/
gnt.auth = {};

/*
 This function registers a new user
 
 The function takes the following parameters:
 username - username of the user to be created (required)
 password - password for the user to be created (required)
 callback_function - function to be called after the response is received (optional)
 
 The callback_function will be passed the following parameters in a JSON object:
 status_code = 201/400/409
 message = message from server
*/
gnt.auth.register =
    function(username, password, callback_function) {
        var data = {};
        data['username'] = (username !== undefined) ? username : null;
        data['password'] = (password !== undefined) ? password : null;
       
        //add_CSRF_token_in_request_header();
    
        $.ajax({
            url: gnt.config.api_full_url + '/user/register/',
            type: "POST",
            data: JSON.stringify(data),
            success: function(data, textStatus, jqXHR){
                if(callback_function !== undefined) {
                    callback_function(data, textStatus, jqXHR);
                    }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(callback_function !== undefined) {
                    callback_function(jqXHR, textStatus, errorThrown);
                    }
                },
            dataType: "json",
            beforeSend: function(xhr){
                //for cross site authentication using CORS
                xhr.withCredentials = true;
            }
        });
    };

/*
 This function signs a user into the service.
 
 The function requires two parameters:
 username - The username of the user to sign in (required)
 password - The password of the user (required)
 callback_function - This function is called when the response is received from
                    the server. (optional)
                    
 The callback_function will be passed the following parameters in a JSON object:
 status_code = 201/400/409
 message = message from server
*/
gnt.auth.login =
function(username, password, callback_function) {
    var data = {};
    data['username'] = (username !== undefined) ? username : null;
    data['password'] = (password !== undefined) ? password : null;

    //add_CSRF_token_in_request_header();
      
    $.ajax({
      url: gnt.config.api_full_url + '/user/login/',
      type: "POST",
      data: JSON.stringify(data),
      async: false,
      contentType: "application/json",
      success: function(data, textStatus, jqXHR){
                    if(callback_function !== undefined) {
                        callback_function(data, textStatus, jqXHR);
                    }
        },
      error: function(jqXHR, textStatus, errorThrown) {
                    if(callback_function !== undefined) {
                        callback_function(jqXHR, textStatus, errorThrown);    
                    }
      }, 
      dataType: "json",
      beforeSend: function(xhr){
        //for cross site authentication using CORS
       xhr.withCredentials = true;
      }
    });
};

/*
 The logout function send a logout request to the server
 
 The server returns 200 if logout successfull and
 400 if an error occured (no one is logged in)
 
 The logout function takes as parameter a callback function
 which will be passed the following parameters:
 status_code = 200
 message = message from server
*/
gnt.auth.logout =
function(callback_function) {
    
    $.ajax({
      url: gnt.config.api_full_url + '/user/logout/',
      type: "GET",
      data: {},
      async: false,
      success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
            }
        },
      error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);    
            }
      }, 
      dataType: "json"

    });
};


/*
This method creates a session for an anonymous user
so that the anonymoususer can save features and
profile values to other softgis apps.
*/
gnt.auth.create_session =
    function(callback_function) {
        console.log(callback_function);
        $.ajax({
            url: gnt.config.api_full_url + '/user/session/',
            type: "POST",
            data: {},
            async: false,
            success: function(data, textStatus, jqXHR){
                if(callback_function !== undefined) {
                    callback_function(data, textStatus, jqXHR);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(callback_function !== undefined) {
                    callback_function(jqXHR, textStatus, errorThrown);
                }
            },
            dataType: "text",
            beforeSend: function(xhr){
                //for cross site authentication using CORS
                xhr.withCredentials = true;
            }
        });  
    };

/*
This method deletes the anonymoususers session
*/
gnt.auth.delete_session =
function(callback_function) {
      
    $.ajax({
      url: gnt.config.api_full_url + '/user/session/',
      type: "DELETE",
      data: {},
      async: false,
      success: function(data, textStatus, jqXHR){
                    if(callback_function !== undefined) {
                        callback_function(data, textStatus, jqXHR);
                    }
        },
      error: function(jqXHR, textStatus, errorThrown) {
                    if(callback_function !== undefined) {
                        callback_function(jqXHR, textStatus, errorThrown);    
                    }
      }, 
      dataType: "text",
      beforeSend: function(xhr){
        //for cross site authentication using CORS
       xhr.withCredentials = true;
      }
    });
    
};

/*
This method gets the session key for this user
*/
gnt.auth.get_session =
function(callback_function) {
    
      $.ajax({
      url: gnt.config.api_full_url + '/user/session/',
      type: "GET",
      data: {},
      success: function(data, textStatus, jqXHR){
                    if(callback_function !== undefined) {
                        callback_function(data, textStatus, jqXHR);
                    }
        },
      error: function(jqXHR, textStatus, errorThrown) {
                    if(callback_function !== undefined) {
                        callback_function(jqXHR, textStatus, errorThrown);    
                    }
      }, 
      dataType: "text",
      beforeSend: function(xhr){
        //for cross site authentication using CORS
       xhr.withCredentials = true;
      }
    });
    
    
};

/*
 This function send a new password for the user
 with the given email.
 
 The user is expected to be signed out when requesting
 a new password.
 
 Takes as parameters:
 email - email of the person that needs a new password (required)
 callback_function - the function to be called when a response from the server
                    is received (optional)
*/
gnt.auth.new_password = 
function(email, callback_function) {

    var data = {};
    data['email'] = (email !== undefined) ? email : null;
    
    //add_CSRF_token_in_request_header();
      
      
    $.ajax({
    url: gnt.config.api_full_url + '/user/newpassword/',
    type: "POST",
    data: JSON.stringify(data),
    success: function(data, textStatus, jqXHR){
                  if(callback_function !== undefined) {
                      callback_function(data, textStatus, jqXHR);
                  }
      },
    error: function(jqXHR, textStatus, errorThrown) {
                  if(callback_function !== undefined) {
                      callback_function(jqXHR, textStatus, errorThrown);    
                  }
    }, 
    dataType: "text",
    beforeSend: function(xhr){
      //for cross site authentication using CORS
      xhr.withCredentials = true;
    }
  });
};

/*
 This function changes the password for a user.
 
 It takes as parameters:
 new_password - the new password to change the old one to (required)
 callback_function - a callback function that will be called when a reponse
                    from the server is received (optional)
*/
gnt.auth.change_password = 
function(old_password, new_password, callback_function) { 
    var data = {};
    data['old_password'] = (old_password !== undefined) ? old_password : null;
    data['new_password'] = (new_password !== undefined) ? new_password : null;
    
    //add_CSRF_token_in_request_header();
      
      
    $.ajax({
        url: gnt.config.api_full_url + '/user/changepassword/',
        type: "POST",
        data: JSON.stringify(data),
        success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
                      if(callback_function !== undefined) {
                          callback_function(jqXHR, textStatus, errorThrown);    
                      }
        }, 
        dataType: "text",
        beforeSend: function(xhr){
          //for cross site authentication using CORS
         xhr.withCredentials = true;
        }
    });
};


    
gnt['opensocial_people'] = {};

/*
This function retrives a list of person objects. The list of people
that is returned has a connection from user and belongs to group.

If the user is set as @all and the group as @self
it will retrieve all users.

If you want to put additional restrictions you can add
limiting parameters to the group e.g. @self?age=40&married=true

*/
gnt.opensocial_people['get_list_of_persons'] =
function(user, group, callback_function) {
    
    $.ajax({
        url: "/profile/people/" + user + "/" + group,
        type: "GET",
        contentType: "application/json",
        success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
                }
            },
        error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);
            }
        },
        dataType: "json",
        beforeSend: function(xhr){
            //for cross site authentication using CORS
            xhr.withCredentials = true;
            }
    });
};

/*
 This function retrieves one person object from the server.
 The argument given is the user name which is unique.
 
*/
gnt.opensocial_people['get_person'] =
function(user, callback_function) {
    
    if(user === undefined) {
        user = '@me';
    }
    
    gnt.opensocial_people.get_list_of_persons(user,
                                              '@self',
                                              callback_function);
};

/*
 This function updates the information of a person with the unique
 username,
*/
gnt.opensocial_people['update_person'] =
function(user, person_object, callback_function) {
    
    $.ajax({
        url: "/profile/people/" + user + "/@self",
        type: "PUT",
        data: JSON.stringify(person_object),
        contentType: "application/json",
        success: function(data, textStatus, jqXHR) {
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
                }
            },
        error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);
            }
        },
        dataType: "json",
        beforeSend: function(xhr) {
            //for cross site authentication using CORS
            xhr.withCredentials = true;
            }
    });
};

/*
 This function returns a array of key names
 or a JSON object where keys are connected
 with the type of the value.
 
 The types follow the JSON types defined
 at json.org
*/
gnt.opensocial_people['get_supported_fields'] =
function(with_values, callback_function) {
    
    if(with_values === undefined) {
        with_values = false;
    }
    $.ajax({
        url: "/profile/people/@supportedFields?types=" + with_values,
        type: "GET",
        contentType: "application/json",
        success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
                }
            },
        error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);
            }
        },
        dataType: "json",
        beforeSend: function(xhr){
            //for cross site authentication using CORS
            xhr.withCredentials = true;
            }
    });    
}

/*
 This function creates a relationship between two persons
*/
gnt.opensocial_people['create_relationship'] =
function(initial_user,
         group,
         target_user_person_object,
         callback_function) {
    
    $.ajax({
        url: "/profile/people/" + initial_user + "/" + group,
        type: "POST",
        data: JSON.stringify(target_user_person_object),
        contentType: "application/json",
        success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
                }
            },
        error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);
            }
        },
        dataType: "json",
        beforeSend: function(xhr){
            //for cross site authentication using CORS
            xhr.withCredentials = true;
            }
    });
};


/*
 This function deletes a relationship
*/
gnt.opensocial_people['delete_relationship'] =
function(initial_user,
         group,
         target_user,
         callback_function) {
    
    $.ajax({
        url: "/profile/people/" + initial_user + "/" + group + "/" + target_user,
        type: "DELETE",
        contentType: "application/json",
        success: function(data, textStatus, jqXHR){
            if(callback_function !== undefined) {
                callback_function(data, textStatus, jqXHR);
                }
            },
        error: function(jqXHR, textStatus, errorThrown) {
            if(callback_function !== undefined) {
                callback_function(jqXHR, textStatus, errorThrown);
            }
        },
        dataType: "json",
        beforeSend: function(xhr){
            //for cross site authentication using CORS
            xhr.withCredentials = true;
            }
    });
};


    /*
 javascript functions for the geojson_rest app
*/
gnt.app_version['geojson_rest'] = '2.0.0';
gnt['geo'] = {};

/*
gnt.geo.get_features retrieves features according to the limiting params

the limit_params is a GET string starting with a "?"

reserved keys for the limiting parameter include the
following:

user_id = id of user
time = time when the feature was valid

*/
gnt.geo['get_features'] =
function(limit_params, callback_function) {
    if(limit_params == undefined) {
        limit_params = "";
    }
    
    $.ajax({
        url: "/feature/" + limit_params,
        type: "GET",
        contentType: "application/json",
        success: function(data) {
            if(callback_function !== undefined) {
                callback_function(data);
                }
            },
        error: function(e) {
            if(callback_function !== undefined) {
                callback_function(e);
            }
        },
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        }
    });
};

/*
 create_feature function saves a new feature of features from a feature
 collection to the database
*/
gnt.geo['create_feature'] =
function(feature_or_feature_collection, callback_function) {
    $.ajax({
        url: "/feature/",
        type: "POST",
        data: JSON.stringify(feature_or_feature_collection),
        contentType: "application/json",
        success: function(data) {
            if(callback_function !== undefined) {
                callback_function(data);
            }
        },
        error: function(e) {
            if(callback_function !== undefined) {
                callback_function(e);
            }
        },
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        }
    });
};

/*
 update_feature, updates a feature with and id or a set of
 features in a featurecollection. All features in the collection
 should already have been saved once and should contain an id.
*/
gnt.geo['update_feature'] =
function(feature_or_feature_collection, callback_function) {
    $.ajax({
        url: "/feature/",
        type: "PUT",
        data: JSON.stringify(feature_or_feature_collection),
        contentType: "application/json",
        success: function(data) {
            if(callback_function) {
                callback_function(data);
            }
        },
        error: function(e) {
            if(callback_function) {
                callback_function(e);
            }
        },
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        }
    });
};

/*
 delete_feature, deletes the feature(s) with the given feature_id(s)
*/
gnt.geo['delete_feature'] =
function(feature_or_feature_collection, callback_function) {
    /*
    ensure the backwords compatibility
    New logic expects an array of ids
    If just one id is sent make it an array of length one
    */
    var feature_ids_array = [];
    var type = feature_or_feature_collection.type;
    var i = 0;
    
    if (type === "Feature"){
        feature_ids_array[0] = feature_or_feature_collection.id;
    }
    else if (type === "FeatureCollection") {
        for(i = 0; i < feature_or_feature_collection.features.length; i++){
            if (feature_or_feature_collection.features[i].id !== undefined){
                feature_ids_array.push(feature_or_feature_collection.features[i].id);
            }
        }
    }
    
    $.ajax({
        url: "/feature/?ids=" + JSON.stringify(feature_ids_array),
        type: "DELETE",
        success: function(data) {
            if(callback_function) {
                callback_function(data);
            }
        },
        error: function(e) {
            if(callback_function) {
                callback_function(e);
            }
        },
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        }    
    });
};




