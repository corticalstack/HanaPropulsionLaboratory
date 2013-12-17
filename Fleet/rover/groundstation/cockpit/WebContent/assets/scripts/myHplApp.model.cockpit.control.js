(function(myHplApp) {
 
	myHplApp.model.cockpit.control = myHplApp.model.cockpit.control || {};
	

	var deviceConfig = {
			inputToggleHeadlights:  	'FACE_2',
			inputDirection: 			'FACE_4',
			inputStop: 					'FACE_3',
			inputThrottle:  			'RIGHT_BOTTOM_SHOULDER',
			inputHeading:  				'LEFT_STICK_X',
			inputRotate: 				'RIGHT_STICK_X',
			inputCamPanLeft:  			'DPAD_LEFT',
			inputCamPanRight:           'DPAD_RIGHT',
			inputCamTiltUp: 			'DPAD_UP',
			inputCamTiltDown:           'DPAD_DOWN',
			inputGoogleMapTypeChange:   'LEFT_TOP_SHOULDER',
			inputGoogleMapZoom: 		'LEFT_BOTTOM_SHOULDER',
			inputThrottlePadLeft:     	'SELECT_BACK',
			inputThrottlePadRight:     	'START_FORWARD'
	};
	
} (myHplApp = window.myHplApp || {}));	
	