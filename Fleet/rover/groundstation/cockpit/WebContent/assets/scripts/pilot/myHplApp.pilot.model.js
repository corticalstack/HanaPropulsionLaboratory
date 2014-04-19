(function(myHplApp) {
 
	myHplApp.pilot.model = myHplApp.pilot.model || {};
	

	var roster = [];
	
	myHplApp.pilot.model.getRoster = function() {
		return roster;
	};

	
	myHplApp.pilot.model.pushRoster = function(pilot) {
		roster.push(pilot);
	};

	
	myHplApp.pilot.model.getPilotById = function(id) {
		
		for (var i = 0; i < roster.length; i++) {
		    if (roster[i].pilotId == id) {
		    	return roster[i];
		    }
		}
	};
	
	

	
} (myHplApp = window.myHplApp || {}));
