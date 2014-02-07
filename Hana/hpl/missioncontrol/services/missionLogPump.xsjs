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

	
	
	var commsTick           = 0,
		voltage             = 0,		
		current             = 0,
		amps                = 0,
		consumedMah         = 0,
        batteryRemaining    = 0,
        cameraPanPos        = 0,
        inertialAccelX      = 0,
        inertialAccelY      = 0,
        inertialAccelZ      = 0,
        proximityRear       = 0,
        proximityFront      = 0,
        proximityCam        = 0,	
        leftEngineThrust    = 0,
        rightEngineThrust   = 0,
        gpsSolFixType       = 0,		
        gpsSolNumSats       = 0,
        gpsPosLongitude     = 0,
        gpsPosLattitude     = 0,
        gpsPosAltitude      = 0,
        gpsVelHeading       = 0,
        gpsVelSpeedCms      = 0,
        compassBearing      = 0,    
        direction           = '',	
        heading             = 0,
        throttle            = 0,
        rotate              = 0,
        stop                = '',
        cameraPanTilt       = '',
        weaponActive        = '',	
        weaponFire          = '',
        weaponStop			= '',
        mapType             = '',
        mapZoom             = '',
        laser               = 0;
		
		
			
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
						commsTick = parseInt(messageFeedFields[0].substr(1),10); 
					break;
				}
				break;

			// Drive
            case messageCategoryId.drive:		
				switch(p_messageId) {
					case messageId.thrust: 
						leftEngineThrust  =  parseInt(messageFeedFields[0],10);
						rightEngineThrust =  parseInt(messageFeedFields[1],10);
						break;
				}
				break;
			
				
			// Sensor
            case messageCategoryId.sensor:
				switch(p_messageId) {
					case messageId.camera: 
						cameraPanPos = parseInt(messageFeedFields[0],10);
						break;
					case messageId.inertial: 
						inertialAccelX = parseFloat(messageFeedFields[0]);
						inertialAccelY = parseFloat(messageFeedFields[1]);
						inertialAccelZ = parseFloat(messageFeedFields[2]);
						break;
					case messageId.distance: 
						proximityRear  = parseFloat(messageFeedFields[0]);
						proximityFront = parseFloat(messageFeedFields[1]);
						proximityCam   = parseFloat(messageFeedFields[2]);
						break;
				}
				break;
				
				
			// Navigation
            case messageCategoryId.navigation:
				switch(p_messageId) {
					case messageId.gpsSol:
						gpsSolFixType = parseInt(messageFeedFields[0],10);		
						gpsSolNumSats = parseInt(messageFeedFields[1],10);
						break;
					case messageId.gpsPos:
						gpsPosLongitude = parseFloat(messageFeedFields[0]);
						gpsPosLattitude = parseFloat(messageFeedFields[1]);
						gpsPosAltitude  = parseFloat(messageFeedFields[2]);
						break;
					case messageId.gpsVel:
						gpsVelHeading  = parseInt(messageFeedFields[0],10);
						gpsVelSpeedCms = parseFloat(messageFeedFields[1]);							
						break;
					case messageId.compass:
						compassBearing = parseFloat(messageFeedFields[0]);
						break;						
				}
				break;
				
				
			// Power	
			case messageCategoryId.power: 
                voltage          = parseFloat(messageFeedFields[0]);		
                current          = parseFloat(messageFeedFields[1]);
                amps             = parseFloat(messageFeedFields[2]);
                consumedMah      = parseInt(messageFeedFields[3],10);
                batteryRemaining = parseFloat(messageFeedFields[4]);
				break;

				
			//Cockpit	
			case messageCategoryId.cockpit: 
				switch(p_messageId) {	
					case messageId.direction:
						direction = messageFeedFields[0];
						break;
					case messageId.heading:
						heading = parseInt(messageFeedFields[0],10);
						break;
					case messageId.thrust:
						throttle = parseInt(messageFeedFields[0],10);
						break;						
					case messageId.rotate:
						rotate = parseInt(messageFeedFields[0],10);
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
						laser = parseInt(messageFeedFields[0],10);
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
		pstmt.setInt(8,commsTick);
		pstmt.setDecimal(9,voltage);
		pstmt.setDecimal(10,current);
		pstmt.setDecimal(11,amps);
		pstmt.setInt(12,consumedMah);
		pstmt.setDecimal(13,batteryRemaining);
		pstmt.setInt(14,cameraPanPos);
		pstmt.setDecimal(15,inertialAccelX);
		pstmt.setDecimal(16,inertialAccelY);
		pstmt.setDecimal(17,inertialAccelZ);
		pstmt.setDecimal(18,proximityRear);
		pstmt.setDecimal(19,proximityFront);
		pstmt.setDecimal(20,proximityCam);
		pstmt.setInt(21,leftEngineThrust);
		pstmt.setInt(22,rightEngineThrust);
		pstmt.setInt(23,gpsSolFixType);
		pstmt.setInt(24,gpsSolNumSats);
		pstmt.setDecimal(25,gpsPosLongitude);
		pstmt.setDecimal(26,gpsPosLattitude);
		pstmt.setDecimal(27,gpsPosAltitude);
		pstmt.setInt(28,gpsVelHeading);
		pstmt.setDecimal(29,gpsVelSpeedCms);
		pstmt.setDecimal(30,compassBearing);
		pstmt.setString(31,direction);
		pstmt.setInt(32,heading);
		pstmt.setInt(33,throttle);
		pstmt.setInt(34,rotate);
		pstmt.setString(35,stop);
		pstmt.setString(36,cameraPanTilt);
		pstmt.setString(37,weaponActive);
		pstmt.setString(38,weaponFire);
		pstmt.setString(39,weaponStop);
		pstmt.setString(40,mapType);
		pstmt.setString(41,mapZoom);
		pstmt.setInt(42,laser);

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