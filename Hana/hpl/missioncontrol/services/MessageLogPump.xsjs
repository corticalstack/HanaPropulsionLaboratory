function messageLogPump(){
	try {
		
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
			pstmt,
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
	
		var messageFeedFields = p_feed.split(',');
		
		switch(p_messageCategoryId) {
		
			//Notify
            case messageCategoryId.notify:
				var commsTick = '';
				
				query = 'INSERT INTO "hpl.missioncontrol.data::messageNotifyLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messageNotifyLogId".nextval,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);

				switch(p_messageId) {
					case messageId.commsTick:  
						commsTick = messageFeedFields[0].substr(1); 
					break;
				}
				
				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,commsTick);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
			
				
			//Drive
			case messageCategoryId.drive: 
				var leftEngineThrust  = '',
					rightEngineThrust = '';
				query = 'INSERT INTO "hpl.missioncontrol.data::messageDriveLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messageDriveLogId".nextval,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
				
				switch(p_messageId) {
					case messageId.thrust: 
						leftEngineThrust  = messageFeedFields[0];
						rightEngineThrust = messageFeedFields[1];
						break;
				}
				
				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,leftEngineThrust);
				pstmt.setString(8,rightEngineThrust);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
			
				
			//Sensor
			case messageCategoryId.sensor: 
				var camera         = '',
					inertialAccelX = '',
					inertialAccelY = '',
					inertialAccelZ = '',
					proximityRear  = '',
					proximityFront = '',
					proximityCam   = '';	
				
				query = 'INSERT INTO "hpl.missioncontrol.data::messageSensorLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messageSensorLogId".nextval,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
				
				switch(p_messageId) {
					case messageId.camera: 
						camera = messageFeedFields[0];
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

				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,camera);
				pstmt.setString(8,inertialAccelX);
				pstmt.setString(9,inertialAccelY);
				pstmt.setString(10,inertialAccelZ);
				pstmt.setString(11,proximityRear);
				pstmt.setString(12,proximityFront);
				pstmt.setString(13,proximityCam);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
				
				
			//Navigation
			case messageCategoryId.navigation: 
				var gpsSolFixType   = '',		
					gpsSolNumSats   = '',
					gpsPosLongitude = '',
					gpsPosLattitude = '',
					gpsPosAltitude  = '',
					gpsVelHeading   = '',
					gpsVelSpeedCms  = '',
					compassBearing  = '';
				
				query = 'INSERT INTO "hpl.missioncontrol.data::messageNavigationLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messageNavigationLogId".nextval,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
				
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

				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,gpsSolFixType);
				pstmt.setString(8,gpsSolNumSats);
				pstmt.setString(9,gpsPosLongitude);
				pstmt.setString(10,gpsPosLattitude);
				pstmt.setString(11,gpsPosAltitude);
				pstmt.setString(12,gpsVelHeading);
				pstmt.setString(13,gpsVelSpeedCms);
				pstmt.setString(14,compassBearing);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
				
				
			case messageCategoryId.power: 
				var voltage          = messageFeedFields[0],		
					current          = messageFeedFields[1],
					amps             = messageFeedFields[2],
					consumedMah      = messageFeedFields[3],
					batteryRemaining = messageFeedFields[4];
				
				query = 'INSERT INTO "hpl.missioncontrol.data::messagePowerLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messagePowerLogId".nextval,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);

				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,voltage);
				pstmt.setString(8,current);
				pstmt.setString(9,amps);
				pstmt.setString(10,consumedMah);
				pstmt.setString(11,batteryRemaining);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
			
			case messageCategoryId.cockpit: 
				var direction	  = '',	
					heading       = '',
					throttle      = '',
					rotate	      = '',
					stop          = '',
                    cameraPanTilt = '',
					weaponActive  = '',	
					weaponFire    = '',
					weaponStop	  = '',
					mapType       = '',
					mapZoom       = '',
					laser         = '';
				
				query = 'INSERT INTO "hpl.missioncontrol.data::messageCockpitLog" values("MISSIONCONTROL"."hpl.missioncontrol.data::messageCockpitLogId".nextval,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
					
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
				
				pstmt.setString(1,p_missionId);  
				pstmt.setString(2,p_vehicleId);  
				pstmt.setString(3,p_pilotId);
				pstmt.setString(4,p_keyFrame);
				pstmt.setString(5,p_messageId);
				pstmt.setString(6,p_timeStamp);
				pstmt.setString(7,direction);
				pstmt.setString(8,heading);
				pstmt.setString(9,throttle);
				pstmt.setString(10,rotate);
				pstmt.setString(11,stop);
				pstmt.setString(12,cameraPanTilt);
				pstmt.setString(13,weaponActive);
				pstmt.setString(14,weaponFire);
				pstmt.setString(15,weaponStop);
				pstmt.setString(16,mapType);
				pstmt.setString(17,mapZoom);
				pstmt.setString(18,laser);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
		}
		

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
	}
}

messageLogPump();