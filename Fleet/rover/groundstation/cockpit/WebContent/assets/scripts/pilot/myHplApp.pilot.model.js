(function(myHplApp) {
 
	myHplApp.pilot.model = myHplApp.pilot.model || {};
	

	var roster = [];
	
	myHplApp.pilot.model.getRoster = function() {
		return roster;
	};

	
	myHplApp.pilot.model.pushRoster = function(pilot) {
		roster.push(pilot);
	};

	
} (myHplApp = window.myHplApp || {}));
