$("#npost-form").focusout(function() {
		if ($("#npost-username").val() !== "") {
			$("#npost-message").hide('slow');
		}
	});

$("#npost-account").click(function() {
		//hidePostMessages();
		$("#npost-message").html("Adding " + $(this).attr('placeholder'));
		$("#npost-message").show('slow');
		//$("#npost-account-writing").show('slow');
	});

	$("#npost-email").click(function() {
		$("#npost-message").html("Adding " + $(this).attr('placeholder'));
		$("#npost-message").show('slow');
		/*
		hidePostMessages();
		$("#npost-email-writing").show('slow');
		*/
	});

	$("#npost-username").click(function() {
		$("#npost-message").html("Adding " + $(this).attr('placeholder'));
		$("#npost-message").show('slow');
	});

	$("#npost-password").click(function() {
		$("#npost-message").html("Adding " + $(this).attr('placeholder'));
		$("#npost-message").show('slow');
	});

	$("#npost-comment").click(function() {
		$("#npost-message").html("Adding " + $(this).attr('placeholder'));
		$("#npost-message").show('slow');
	});