var POST_STORAGE = "kryptonite";
var POST_SESSION = "tmpPosts";
var POST_BACKUP =  "kryptonite_backup";
var EDIT_MODE = false;
var tmpPost = {};
var jsonData = {};
var posts = [];
var tmpID;

var encryptedStr;
var decryptedStr;
var phrase;

function createUser() {
	var username = "ville";
	var passphrase = "12345";
	var hashedPass = CryptoJS.SHA3(passphrase);
	localStorage.setItem("username", username);
	localStorage.setItem("phrase", hashedPass);
}

function getPhrase() {
	return localStorage.getItem("phrase");
}

function encrypt(_jsonStr, phrase) {
	encryptedStr = CryptoJS.AES.encrypt(_jsonStr, phrase);
	return encryptedStr;
}

function decrypt(_encryptedStr, _phrase) {
	decryptedStr = CryptoJS.AES.decrypt(_encryptedStr, _phrase).toString(CryptoJS.enc.Utf8);
	return decryptedStr;
}

function init() {
	$("#btn-undo-delete").hide();
	$("#btn-add-message").hide();

	createUser();
	
	if (getAllPosts() === null) {
		jsonData.posts = posts;
	} else {
		jsonData = getAllPosts();		
	}
	return jsonData;
}

function hidePostMessages() {
	$("#npost-account-writing").hide();
	$("#npost-email-writing").hide();
	$("#npost-username-writing").hide();
	$("#npost-password-writing").hide();
	$("#npost-comment-writing").hide();
}

function getFullDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}

function getNewPost() {
	var account = $("#npost-account").val();
	var date 	= getFullDate();
	var email 	= $("#npost-email").val();
	var uname 	= $("#npost-username").val();
	var pass 	= $("#npost-password").val();
	var comment = $("#npost-comment").val();

	var newPost = 
	{
		"account" 	: account,
		"date"		: date,
		"email"		: email,
		"uname" 	: uname,
		"pass" 		: pass,
		"comment" 	: comment
	};
	return newPost;
}

function setEditPostData() {
	var _id = getTmpID();
	$("#npost-account").val(jsonData.posts[_id].account);
	$("#npost-email").val(jsonData.posts[_id].email);
	$("#npost-username").val(jsonData.posts[_id].uname);
	$("#npost-password").val(jsonData.posts[_id].pass);
	$("#npost-comment").val(jsonData.posts[_id].comment);
}

function compareEditPost(_newPost) {
	
	var _id = getTmpID();
	var editPost = 
	{
		"account" 	: jsonData.posts[_id].account,
		"date"		: jsonData.posts[_id].date,
		"email"		: jsonData.posts[_id].email,
		"uname" 	: jsonData.posts[_id].uname,
		"pass" 		: jsonData.posts[_id].pass,
		"comment" 	: jsonData.posts[_id].comment
	};
	
	if (editPost.account 	!== _newPost.account)
		return false;
	if (editPost.email 		!== _newPost.email)
		return false;
	if (editPost.uname 		!== _newPost.uname)
		return false;
	if (editPost.pass 		!== _newPost.pass)
		return false;
	if (editPost.comment 	!== _newPost.comment)
		return false;
	else
		return true;

}

function validatePost() {
	
	if ($("#npost-account").val() === "") {
		return false;
	}
	else 
		return true;
}

function clearPostData() {	
	$("#npost-account").val("");
	$("#npost-email").val("");
	$("#npost-username").val("");
	$("#npost-password").val("");
	$("#npost-comment").val("");	
}

function addPost(_newPost) {
	jsonData.posts.push(_newPost);
}

function deletePost(_id) {
	jsonData.posts.splice(_id, 1);
}

function getAllPosts() {
	var encrypted = localStorage.getItem(POST_STORAGE);
	if (encrypted !== null) {
		decryptedStr = decrypt(encrypted, getPhrase());
		console.log("DECRYPTED");
		console.log(decryptedStr);
		return JSON.parse(decryptedStr);
	} else {
		return null;
	}
}

function stringMe(_jsonData) {
	return JSON.stringify(_jsonData)
}

function save(_jsonData) {
	saveStorage(_jsonData);
	generatePosts(_jsonData);
	bindEventToCollapsible();
}

function saveStorage(_jsonData) {
	console.log(_jsonData);
	var jsonDataStr = stringMe(_jsonData);
	encryptedStr = encrypt(jsonDataStr, getPhrase());
	localStorage.setItem(POST_STORAGE, encryptedStr);
	console.log("ENCRYPTED");
	console.log(localStorage.getItem(POST_STORAGE));
}

function deleteStorage() {
	localStorage.removeItem(POST_STORAGE);
}

function setTmpPostID(_postID) {
	sessionStorage.setItem(POST_SESSION, _postID);
}

function generatePosts(_jsonData) {
	console.log(_jsonData)
	var LISTVIEW_S = '<ul data-role="listview" data-filter="true" data-input="#autocomplete-input">';
	var LISTVIEW_E = '</ul>'
	var POST_HTML = '';

	for (var i = 0; i < _jsonData.posts.length; i++) {
		POST_HTML 	+= '<div id="p'+i+'" data-role="collapsible" data-collapsed-icon="carat-r" data-expanded-icon="carat-u" data-iconpos="right">'
					+ '<h3>'
						+ _jsonData.posts[i].account
					+ '</h3>'
						+ '<ul data-role="listview">'
							+ '<li><img src="css/icons/date.png"><p>' 		+ _jsonData.posts[i].date 	+ '</p></li>'
							+ '<li><img src="css/icons/email.png"><p>'		+ _jsonData.posts[i].email	+ '</p></li>'
							+ '<li><img src="css/icons/username.png"><p>'	+ _jsonData.posts[i].uname	+ '</p></li>'
							+ '<li><img src="css/icons/key.png"><p>' 		+ _jsonData.posts[i].pass 	+ '</p></li>'
							+ '<li><img src="css/icons/comment.png"><p>' 	+ _jsonData.posts[i].comment+ '</p></li>'
						+ '</ul></div>';
	}
	$("#posts").html(LISTVIEW_S + POST_HTML + LISTVIEW_E).trigger("create");
}

function storePostsTmp(_jsonData) {
	sessionStorage.setItem(POST_SESSION, JSON.stringify(_jsonData));
}

function getStoredTmpPosts() {
	return JSON.parse(sessionStorage.getItem(POST_SESSION));
}

function bindEventToCollapsible() {
	$("div:jqmData(role='collapsible')").on("taphold",function(){
		var _id = $(this).attr('id');
		_id = _id.replace(/\D/g,'');
		setTmpID(_id);
		$("#popupMenu-heading").html("<h3>Let's do what with,<br>" +jsonData.posts[_id].account + "?</h3>");
		$("#popupMenu").popup('open');
	});
}

function setTmpID(_id) {
	tmpID = _id;
}

function getTmpID() {
	return tmpID;
}

function setEditMode(_mode) {
	EDIT_MODE = _mode;
}

function getEditMode() {
	return EDIT_MODE;
}

$(document).ready(function(){

/*-------->Buttons MAINVIEW */

	$("#btn-add").click(function() {
		setEditMode(false);
		clearPostData();
		$("#btn-add-message").hide();
	});

	$("#btn-edit").click(function() {
		setEditMode(true);
		setEditPostData();
	});

	$("#btn-delete").click(function() {
		$("#btn-undo-delete").show('slow');
		$("#btn-undo-delete").delay(5000).fadeOut('slow');
		storePostsTmp(jsonData);
		deletePost(getTmpID());
		save(jsonData);
	});

	$("#btn-undo-delete").click(function() {
		$("#btn-undo-delete").hide('slow');
		jsonData = getStoredTmpPosts();
		save(jsonData);
	});

/*---END--->Buttons MAINVIEW */

/*-------->Buttons ADD/EDIT POST */
	$("#btn-save").click(function() {
		
		if (validatePost() !== true) {
			$("#npost-account").val("I am your headline");
		}		
		var newPost = getNewPost();

		if (getEditMode() === true) {
			var check = compareEditPost(newPost);
			if (check !== true) {
				deletePost(getTmpID());
				addPost(newPost);
				save(jsonData);
				clearPostData();
			}
		} 
		else {
			addPost(newPost);
			save(jsonData);
			clearPostData();
		}
	});

	$("#btn-add-message").click(function() {
		$("#popup-tip").popup('open');
	});

	
	$("#npost-username").change(function() {
  		if ($("#npost-username").val().length > 4)
  			$("#btn-add-message").show('slow');
	});

	$("#npost-password").change(function() {
		if ($("#npost-password").val().length > 4)
			$("#btn-add-message").show('slow');
	});	

	$("#btn-popup-tip-ok").click(function() {
		$("#popup-tip-message").html("<p>Done!<br> You may turn this back on in <br>Menu->Settings</p>");
		$("div.ui-checkbox").hide();
		$("#popup-tip").delay(4000).fadeOut('slow');
		$("#btn-add-message").hide('slow');
	});

/*---END--->Buttons ADD/EDIT POST */

	(function () {
		//deleteStorage();
		var remyinder = init();
		generatePosts(remyinder);
    	bindEventToCollapsible();
    	$("#npost-message").hide();
	})();

});