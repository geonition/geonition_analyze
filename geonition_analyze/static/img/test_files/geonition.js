
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
gnt.config.CSRF_cookie_name = "csrftoken";
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
            url: gnt.config.api_full_url + '/auth/register/',
            type: "POST",
            data: JSON.stringify(data),
            success: function(data){
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
      url: gnt.config.api_full_url + '/auth/login/',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data){
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
      url: gnt.config.api_full_url + '/auth/logout/',
      type: "GET",
      data: {},
      async: false,
      success: function(data){
            if(callback_function !== undefined) {
                callback_function(data);
            }
        },
      error: function(e) {
            if(callback_function !== undefined) {
                callback_function(e);    
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
            url: gnt.config.api_full_url + '/auth/session/',
            type: "POST",
            data: {},
            async: false,
            success: function(data){
                if(callback_function !== undefined) {
                    callback_function(data);
                }
            },
            error: function(e) {
                if(callback_function !== undefined) {
                    callback_function(e);
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
      url: gnt.config.api_full_url + '/auth/session/',
      type: "DELETE",
      data: {},
      success: function(data){
                    if(callback_function !== undefined) {
                        callback_function(data);
                    }
        },
      error: function(e) {
                    if(callback_function !== undefined) {
                        callback_function(e);    
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
      url: gnt.config.api_full_url + '/auth/session/',
      type: "GET",
      data: {},
      success: function(data){
                    if(callback_function !== undefined) {
                        callback_function(data);
                    }
        },
      error: function(e) {
                    if(callback_function !== undefined) {
                        callback_function(e);    
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
    url: gnt.config.api_full_url + '/auth/newpassword/',
    type: "POST",
    data: JSON.stringify(data),
    success: function(data){
                  if(callback_function !== undefined) {
                      console.debug(data);
                      callback_function(data);
                  }
      },
    error: function(e) {
                  if(callback_function !== undefined) {
                      callback_function(e);    
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
        url: gnt.config.api_full_url + '/auth/changepassword/',
        type: "POST",
        data: JSON.stringify(data),
        success: function(data){
                      if(callback_function !== undefined) {
                          callback_function(data);
                      }
          },
        error: function(e) {
                      if(callback_function !== undefined) {
                          callback_function(e);    
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
email_rest application javascript functions
*/
gnt.email_rest = {};

/*
helper function to check regular expressions
*/
gnt.email_rest.checkRegexp =
function(o, regexp) {
    if ( !( regexp.test( o ) ) ) {
        return false;
    } else {
        return true;
    }
};

gnt.email_rest.validate_email =
function(email_address) {
    if (email_address != null && email_address.length > 6){
	isEmailValid = gnt.email_rest.checkRegexp( email_address, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	if (!isEmailValid){
	    return false;
	} else {
	    return true;
	}
    } else {
	return false;
    }
};

gnt.email_rest.get_email =
function(callback_function) {
      
	$.ajax({
	  url: '/email/email/',
	  type: "GET",
	  data: {},
	  success: function(data){
			if(callback_function !== undefined) {
			    callback_function(data);
			}
	    },
	  error: function(e) {
                      if(callback_function !== undefined) {
                          callback_function(e);    
                      }
        },  
	  dataType: "json"
	});
};


gnt.email_rest.save_email =
function (email, callback_function) {

    if (!gnt.email_rest.validate_email(email.email)){
	if(callback_function !== undefined) {
	    var e = {"status" : 400, "responseText" : "Email address is invalid"}; 
	    callback_function(e);
	}
    }
    
    $.ajax({
	url: '/email/email/',
	type: "POST",
	data: {'value': email},
	contentType: 'application/json',
	success: function(data){
	    if(callback_function !== undefined) {
		callback_function(data);
		}
	    },
	error: function(e) {
	    if(callback_function !== undefined) {
		callback_function(e);
	    }
	},
	dataType: "json"
    });
};

/*
typeString
Default: 'GET'

The type of request to make ("POST" or "GET"), default is "GET". 
Note: Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.
*/
gnt.email_rest.delete_email =
function(callback_function) {
	$.ajax({
	  url: '/email/email/',
	  type: "DELETE",
	  data: {},
	  success: function(data){
				if(callback_function !== undefined) {
				    callback_function(data);	
				}	
	   },
       error: function(e) {
                      if(callback_function !== undefined) {
                          callback_function(e);    
                      }
       },  
	  dataType: "text"
	});
}


    

gnt['data_processing'] = {};

/*
 This function sends a json object
 to the server and recieved a csv file
 back with the information in the json
*/
gnt.data_processing['json_to_csv'] =
    function(json_object, callback_function) {
        
        $.ajax({
            url: "/data/json_to_csv",
            type: "POST",
            data: JSON.stringify(json_object),
            contentType: "application/json",
            success: function(data){
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
            beforeSend: function(xhr){
                //for cross site authentication using CORS
                xhr.withCredentials = true;
                }
        });
    };

/*
 This function sends a geojson featurecollection
 to the server and recieved a csv file
 back with the information in the geojson featurecollection
*/
gnt.data_processing['geojson_to_csv'] =
    function(json_object, callback_function) {
        console.log("send post");
        $.ajax({
            url: "/data/geojson_to_csv",
            type: "POST",
            data: JSON.stringify(json_object),
            contentType: "application/json",
            success: function(data){
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
            beforeSend: function(xhr){
                //for cross site authentication using CORS
                xhr.withCredentials = true;
                }
        });
    };

/*
 UNION function that returns the union of the two featurecollections
 according to the id of the features.
 
 Make sure all features have an id assigned to them before using this
 function. This function will throw an error if no id is found.
*/
gnt.data_processing['featurecollection_union'] =
function(featurecollection1, featurecollection2) {
    var featurecollection = featurecollection1;
    
    var ids = {}; //set of ids in the union
    for(var i = 0; i < featurecollection.features.length; i++) {
	ids[featurecollection.features[i].id] = true;
    }
    for(var j = 0; j < featurecollection2.features.length; j++) {
	var feat = featurecollection2.features[j];
	if(ids[feat.id] === undefined) {
	    featurecollection.features.push(feat);
	}
    }
    return featurecollection;
}

/*
 INTERSECT function that returns the intersect of two featurecollections
 according to their assigned id.
 
 If no id is signed to a feature it will throw an error.
*/
gnt.data_processing['featurecollection_intersect'] =
function(featurecollection1, featurecollection2) {
    var featurecollection = {
	"type": "FeatureCollection",
	"features": []
	};
    
    for(var i = 0; i < featurecollection1.features.length; i++) {
	for(var j = 0; j < featurecollection2.features.length; j++) {
	    if(featurecollection1.features[i].id === featurecollection2.features[j].id) {
		featurecollection.features.push(featurecollection1.features[i]);
		break;
	    }
	}
    }
    return featurecollection;
}

/*
 COMPLEMENT function that returns a new featurecollection with features
 that can be found in featurecollection1 but not in featurecollection2.
 
 Based on feature id, if id does not exist in a feature this function
 throws an error
*/
gnt.data_processing['featurecollection_complement'] =
function(featurecollection1, featurecollection2) {
    var featurecollection = featurecollection1;
    
    for(var i = 0; i < featurecollection.features.length; i++) {
	for(var j = 0; j < featurecollection2.features.length; j++) {
	    
	    if(featurecollection.features[i].id === featurecollection2.features[j].id) {
		featurecollection.features.splice(i, 1);
		i--;
		break;
	    }
	}
    }
    return featurecollection;
}

    
gnt['opensocial_people'] = {};

/*
This function retrives a list of person objects. The list of people
that is returned has a connection from user and belongs to group.

*/
gnt.opensocial_people['get_list_of_persons'] =
function(user, group, callback_function) {
    
    $.ajax({
        url: "/opensocial-2.0/people/" + user + "/" + group,
        type: "GET",
        contentType: "application/json",
        success: function(data){
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
        url: "/opensocial-2.0/people/" + user + "/@self",
        type: "PUT",
        data: JSON.stringify(person_object),
        contentType: "application/json",
        success: function(data){
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
        beforeSend: function(xhr){
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
        url: "/opensocial-2.0/people/@supportedFields?types=" + with_values,
        type: "GET",
        contentType: "application/json",
        success: function(data){
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
        url: "/opensocial-2.0/people/" + initial_user + "/" + group,
        type: "POST",
        data: JSON.stringify(target_user_person_object),
        contentType: "application/json",
        success: function(data){
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
        url: "/opensocial-2.0/people/" + initial_user + "/" + group + "/" + target_user,
        type: "DELETE",
        contentType: "application/json",
        success: function(data){
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
        url: "/geo/" + limit_params,
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
function(feature_or_featurecollection, callback_function) {
    $.ajax({
        url: "/geo/",
        type: "POST",
        data: JSON.stringify(feature_or_featurecollection),
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
        url: "/geo/",
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
function(feature_or_featurecollection, callback_function) {
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
        url: "/geo/?ids=" + JSON.stringify(feature_ids_array),
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




