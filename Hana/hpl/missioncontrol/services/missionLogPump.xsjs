function missionLogPump(){
	var messageCategoryId = {
			notify:						'NOT',
			drive:						'DRI',
			sensor:						'SEN',
			navigation:					'NAV',
			power:						'POW',
			cockpit:					'COC',
	};
	
	var messageId = {
			arming:						'ARM',
			armed:						'ARD',			
			battery:					'BAT',
			camera:						'CAM',
			compass:					'CPS',			
			compassInit:				'CPI',
			commsTick:					'COM',			
			distance:					'DST',
			direction:					'DIR',
			inertial:					'INE',
			inertialInit:				'INI',
			gpsInit:					'GPI',
			gpsPos:						'GPP',			
			gpsSol:						'GPS',
			gpsVel:						'GPV',
			heading:					'HDG',
			laser:						'LAS',
			mapType:					'MPT',
			mapZoom:					'MPZ',
			motor:						'MTR',
			powerFailsafe:				'PFS',			
			rotate:						'ROT',			
			stop:						'STP',
			systemsPowerUp:				'SPU',
			thrust:						'THR',
			thrustFailsafe:				'TFS',
			weaponActive:				'WEA',			
			weaponFire:					'WEF',
			weaponStop:					'WES',			
	};
	
	var query,
		pstmt				= null,
		conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		p_missionId			= $.request.parameters.get('missionId'),
		p_vehicleId			= $.request.parameters.get('vehicleId'),
		p_pilotId			= $.request.parameters.get('pilotId'),
		p_keyFrame			= $.request.parameters.get('keyFrame'),
		p_messageCategoryId	= $.request.parameters.get('messageCategoryId'),
		p_messageId			= $.request.parameters.get('messageId'),
		p_feed				= $.request.parameters.get('feed'),	
		p_timeStamp			= $.request.parameters.get('_'),		
		p_callback			= $.request.parameters.get('callback');
	
	var commsTick           = '',
		voltage             = '',		
		current             = '',
		amps                = '',
		consumedMah         = '',
        batteryRemaining    = '',
        cameraPanPos        = '',
        inertialAccelX      = '',
        inertialAccelY      = '',
        inertialAccelZ      = '',
        proximityRear       = '',
        proximityFront      = '',
        proximityCam        = '',	
        leftEngineThrust    = '',
        rightEngineThrust   = '',
        gpsSolFixType       = '',		
        gpsSolNumSats       = '',
        gpsPosLongitude     = '',
        gpsPosLattitude     = '',
        gpsPosAltitude      = '',
        gpsVelHeading       = '',
        gpsVelSpeedCms      = '',
        compassBearing      = '',    
        direction           = '',	
        heading             = '',
        throttle            = '',
        rotate              = '',
        stop                = '',
        cameraPanTilt       = '',
        weaponActive        = '',	
        weaponFire          = '',
        weaponStop			= '',
        mapType             = '',
        mapZoom             = '',
        laser               = '';
		
		
			
	try {
        p_timeStamp           = parseInt(p_timeStamp, 10);
        var messageFeedFields = p_feed.split(',');
		query = 'INSERT INTO "hpl.missioncontrol.data::missionLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::missionLogId".nextval,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';		
		pstmt = conn.prepareStatement(query);
		
		switch(p_messageCategoryId) {
		
			// Notify
            case messageCategoryId.notify:
				switch(p_messageId) {
					case messageId.commsTick:  
						commsTick = messageFeedFields[0].substr(1); 
					break;
				}
				break;

			// Drive
            case messageCategoryId.drive:		
				switch(p_messageId) {
					case messageId.thrust: 
						leftEngineThrust  = messageFeedFields[0];
						rightEngineThrust = messageFeedFields[1];
						break;
				}
				break;
			
				
			// Sensor
            case messageCategoryId.sensor:
				switch(p_messageId) {
					case messageId.camera: 
						cameraPanPos = messageFeedFields[0];
						break;
					case messageId.inertial: 
						inertialAccelX = messageFeedFields[0];
						inertialAccelY = messageFeedFields[1];
						inertialAccelZ = messageFeedFields[2];
						break;
					case messageId.distance: 
						proximityRear  = messageFeedFields[0];
						proximityFront = messageFeedFields[1];
						proximityCam   = messageFeedFields[2];
						break;
				}
				break;
				
				
			// Navigation
            case messageCategoryId.navigation:
				switch(p_messageId) {
					case messageId.gpsSol:
						gpsSolFixType = messageFeedFields[0];		
						gpsSolNumSats = messageFeedFields[1];
						break;
					case messageId.gpsPos:
						gpsPosLongitude = messageFeedFields[0];
						gpsPosLattitude = messageFeedFields[1];
						gpsPosAltitude  = messageFeedFields[2];
						break;
					case messageId.gpsVel:
						gpsVelHeading = messageFeedFields[0];
						if (messageFeedFields[1] < 500) {
							gpsVelSpeedCms = messageFeedFields[1];							
						}
						break;
					case messageId.compass:
						compassBearing = messageFeedFields[0];
						break;						
				}
				break;
				
				
			// Power	
			case messageCategoryId.power: 
                voltage          = messageFeedFields[0];		
                current          = messageFeedFields[1];
                amps             = messageFeedFields[2];
                consumedMah      = messageFeedFields[3];
                batteryRemaining = messageFeedFields[4];
				break;

				
			//Cockpit	
			case messageCategoryId.cockpit: 
				switch(p_messageId) {	
					case messageId.direction:
						direction = messageFeedFields[0];
						break;
					case messageId.heading:
						heading = messageFeedFields[0];
						break;
					case messageId.thrust:
						throttle = messageFeedFields[0];
						break;						
					case messageId.rotate:
						rotate = messageFeedFields[0];
						break;						
					case messageId.stop:
						stop = messageFeedFields[0];
						break;						
					case messageId.camera:
						cameraPanTilt = messageFeedFields[0];
						break;						
					case messageId.weaponActive:
						weaponActive = messageFeedFields[0];
						break;						
					case messageId.weaponFire:
						weaponFire = messageFeedFields[0];
						break;
					case messageId.weaponStop:
						weaponStop = messageFeedFields[0];
						break;						
					case messageId.mapType:
						mapType = messageFeedFields[0];
						break;						
					case messageId.mapZoom:
						mapZoom = messageFeedFields[0];
						break;						
					case messageId.laser:
						laser = messageFeedFields[0];
						break;						
				}
				break;
		}
				
		pstmt.setString(1,p_missionId);  
		pstmt.setString(2,p_vehicleId);  
		pstmt.setString(3,p_pilotId);
		pstmt.setString(4,p_keyFrame);
		pstmt.setBigInt(5,p_timeStamp);		
		pstmt.setString(6,p_messageCategoryId);		
		pstmt.setString(7,p_messageId);
		pstmt.setString(8,commsTick);
		pstmt.setString(9,voltage);
		pstmt.setString(10,current);
		pstmt.setString(11,amps);
		pstmt.setString(12,consumedMah);
		pstmt.setString(13,batteryRemaining);
		pstmt.setString(14,cameraPanPos);
		pstmt.setString(15,inertialAccelX);
		pstmt.setString(16,inertialAccelY);
		pstmt.setString(17,inertialAccelZ);
		pstmt.setString(18,proximityRear);
		pstmt.setString(19,proximityFront);
		pstmt.setString(20,proximityCam);
		pstmt.setString(21,leftEngineThrust);
		pstmt.setString(22,rightEngineThrust);
		pstmt.setString(23,gpsSolFixType);
		pstmt.setString(24,gpsSolNumSats);
		pstmt.setString(25,gpsPosLongitude);
		pstmt.setString(26,gpsPosLattitude);
		pstmt.setString(27,gpsPosAltitude);
		pstmt.setString(28,gpsVelHeading);
		pstmt.setString(29,gpsVelSpeedCms);
		pstmt.setString(30,compassBearing);
		pstmt.setString(31,direction);
		pstmt.setString(32,heading);
		pstmt.setString(33,throttle);
		pstmt.setString(34,rotate);
		pstmt.setString(35,stop);
		pstmt.setString(36,cameraPanTilt);
		pstmt.setString(37,weaponActive);
		pstmt.setString(38,weaponFire);
		pstmt.setString(39,weaponStop);
		pstmt.setString(40,mapType);
		pstmt.setString(41,mapZoom);
		pstmt.setString(42,laser);

		pstmt.execute();  

		
	    var bodyContent = JSON.stringify({
              "data": p_missionId
        });

		var body = p_callback + '(' + bodyContent + ')';
		$.response.contentType = "application/json";   
		$.response.setBody(body);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	} finally {
		conn.commit();  
		conn.close();
	}
}

missionLogPump();