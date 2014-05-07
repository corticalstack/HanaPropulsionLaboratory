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
			home:						'HOM'
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

	
	
	var commsTick                    = null,
		voltage                      = null,		
		current                      = null,
		amps                         = null,
		consumedMah                  = null,
        batteryRemaining             = null,
        cameraPanPos                 = null,
        inertialAccelX               = null,
        inertialAccelY               = null,
        inertialAccelZ               = null,
        proximityRear                = null,
        proximityFront               = null,
        proximityCam                 = null,	
        leftEngineThrust             = null,
        rightEngineThrust            = null,
        gpsSolFixType                = null,		
        gpsSolNumSats                = null,
        gpsPosLongitude              = null,
        gpsPosLatitude               = null,
        gpsPosAltitude               = null,
        gpsVelHeading                = null,
        gpsVelSpeedCms               = null,
        compassBearing               = null,    
        direction                    = null,	
        heading                      = null,
        throttle                     = null,
        rotate                       = null,
        stop                         = null,
        cameraPanTilt                = null,
        weaponActive                 = null,	
        weaponFire                   = null,
        weaponStop			         = null,
        mapType                      = null,
        mapZoom                      = null,
        laser                        = null,
        distanceTravelledPrevToHereM = null,
        distance 					 = null;
		
		
			
	try {
        p_timeStamp           = parseInt(p_timeStamp, 10);
        var messageFeedFields = p_feed.split(',');
		query = 'INSERT INTO "hpl.missioncontrol.data::MC.Mission.MissionLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::missionLogId".nextval,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';		
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
						gpsSolFixType		 = parseInt(messageFeedFields[0],10);		
						gpsSolNumSats 		 = parseInt(messageFeedFields[1],10);
						break;
					case messageId.gpsPos:
						gpsPosLongitude      = parseFloat(messageFeedFields[0]);
						gpsPosLatitude       = parseFloat(messageFeedFields[1]);
						gpsPosAltitude       = parseFloat(messageFeedFields[2]);
						distance			 = parseFloat(messageFeedFields[3]);
						break;
					case messageId.gpsVel:
						gpsVelHeading  		 = parseInt(messageFeedFields[0],10);
						gpsVelSpeedCms 		 = parseFloat(messageFeedFields[1]);							
						break;
					case messageId.compass:
						compassBearing 		 = parseFloat(messageFeedFields[0]);
						break;
					case messageId.home:
						distance 			 = parseFloat(messageFeedFields[0]);
						break;
					case messageId.distance:
						distance 			 = parseFloat(messageFeedFields[0]);
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
		
		if (commsTick == null) {
			pstmt.setNull(8);
		}
		else {
			pstmt.setInt(8,commsTick);
		}
		
		
		if (voltage == null) {
			pstmt.setNull(9);
		}
		else {
			pstmt.setDecimal(9,voltage);			
		} 
		

		if (current == null) {
			pstmt.setNull(10);
		}
		else {
			pstmt.setDecimal(10,current);	
		}
		
		
		if (amps == null) {
			pstmt.setNull(11);
		}
		else {
			pstmt.setDecimal(11,amps);			
		}

		
		if (consumedMah == null) {
			pstmt.setNull(12);
		}
		else {
			pstmt.setInt(12,consumedMah);	
		}
		
		
		if (batteryRemaining == null) {
			pstmt.setNull(13);
		}
		else {
			pstmt.setDecimal(13,batteryRemaining);	
		}
		
		
		if (cameraPanPos == null) {
			pstmt.setNull(14);
		}
		else {
			pstmt.setInt(14,cameraPanPos);	
		}
		
		
		if (inertialAccelX == null) {
			pstmt.setNull(15);
		}
		else {
			pstmt.setDecimal(15,inertialAccelX);	
		}
		
		
		if (inertialAccelY == null) {
			pstmt.setNull(16);
		}
		else {
			pstmt.setDecimal(16,inertialAccelY);
		}
		
		
		
		if (inertialAccelY== null) {
			pstmt.setNull(17);
		}
		else {
			pstmt.setDecimal(17,inertialAccelZ);	
		}
		
		
		if (proximityRear == null) {
			pstmt.setNull(18);
		}
		else {
			pstmt.setDecimal(18,proximityRear);			
		}


		if (proximityFront == null) {
			pstmt.setNull(19);
		}
		else {
			pstmt.setDecimal(19,proximityFront);			
		}

		
		if (proximityCam == null) {
			pstmt.setNull(20);
		}
		else {
			pstmt.setDecimal(20,proximityCam);			
		}

		
		if (leftEngineThrust == null) {
			pstmt.setNull(21);
		}
		else {
			pstmt.setInt(21,leftEngineThrust);	
		}
		
		
		if (rightEngineThrust == null) {
			pstmt.setNull(22);
		}
		else {
			pstmt.setInt(22,rightEngineThrust);			
		}

		
		if (gpsSolFixType == null) {
			pstmt.setNull(23);
		}
		else {
			pstmt.setInt(23,gpsSolFixType);			
		}

		
		if (gpsSolNumSats == null) {
			pstmt.setNull(24);
		}
		else {
			pstmt.setInt(24,gpsSolNumSats);			
		}

		
		if (gpsPosLongitude == null) {
			pstmt.setNull(25);
		}
		else {
			pstmt.setDecimal(25,gpsPosLongitude);
		}
		
		
		if (gpsPosLatitude == null) {
			pstmt.setNull(26);
		}
		else {
			pstmt.setDecimal(26,gpsPosLatitude);	
		}
		
		
		if (gpsPosAltitude == null) {
			pstmt.setNull(27);
		}
		else {
			pstmt.setDecimal(27,gpsPosAltitude);	
		}
		
		
		if (gpsVelHeading == null) {
			pstmt.setNull(28);
		}
		else {
			pstmt.setInt(28,gpsVelHeading);			
		}
		
		

		if (gpsVelSpeedCms == null) {
			pstmt.setNull(29);
		}
		else {
			pstmt.setDecimal(29,gpsVelSpeedCms);	
		}
		
		
		if (compassBearing == null) {
			pstmt.setNull(30);
		}
		else {
			pstmt.setDecimal(30,compassBearing);	
		}
		
		
		if (direction == null) {
			pstmt.setNull(31);
		}
		else {
			pstmt.setString(31,direction);	
		}
		
		
		if (heading == null) {
			pstmt.setNull(32);
		}
		else {
			pstmt.setInt(32,heading);	
		}
		
		
		if (throttle == null) {
			pstmt.setNull(33);
		}
		else {
			pstmt.setInt(33,throttle);	
		}
		
		
		if (rotate == null) {
			pstmt.setNull(34);
		}
		else {
			pstmt.setInt(34,rotate);			
		}
		

		if (stop == null) {
			pstmt.setNull(35);
		}
		else {
			pstmt.setString(35,stop);	
		}
		
		
		if (cameraPanTilt == null) {
			pstmt.setNull(36);
		}
		else {
			pstmt.setString(36,cameraPanTilt);			
		}

		
		if (weaponActive == null) {
			pstmt.setNull(37);
		}
		else {
			pstmt.setString(37,weaponActive);	
		}
		
		
		if (weaponFire == null) {
			pstmt.setNull(38);
		}
		else {
			pstmt.setString(38,weaponFire);	
		}
		
		
		if (weaponStop == null) {
			pstmt.setNull(39);
		}
		else {
			pstmt.setString(39,weaponStop);			
		}

		
		if (mapType == null) {
			pstmt.setNull(40);
		}
		else {
			pstmt.setString(40,mapType);	
		}
		
		
		if (mapZoom == null) {
			pstmt.setNull(41);
		}
		else {
			pstmt.setString(41,mapZoom);			
		}

		
		if (laser == null) {
			pstmt.setNull(42);
		}
		else {
			pstmt.setInt(42,laser);			
		}


		if (distance == null) {
			pstmt.setNull(43);
		}
		else {
			pstmt.setDecimal(43,distance);			
		}

		
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