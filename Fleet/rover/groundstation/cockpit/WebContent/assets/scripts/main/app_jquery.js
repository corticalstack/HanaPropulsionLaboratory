
$(document).bind("keydown", function(e) {
	   
	$("#lblKeyToStart").hide();
	$("#mlMainMenu").show();	
	$("#lnkSoloCampaign").show();
	$("#lnkMultiplayer").show();
	$("#lnkFreeride").show();
	$("#lnkSettings").show();
	$("#lnkQuit").show();
	
});




$.fn.hideBackgroundImage = function() {
	$(".bg").hide();
};


$.fn.showBackgroundImage = function() {
	$(".bg").show();
};


