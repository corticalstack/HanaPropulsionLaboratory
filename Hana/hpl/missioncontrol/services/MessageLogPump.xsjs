function messageLogPump(){
	try {
		var query;
		var pstmt;
		var conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");
		var missionId = $.request.parameters.get('missionId');
		var vehicleId = $.request.parameters.get('vehicleId');
		var pilotId = $.request.parameters.get('pilotId');
		var keyFrame = $.request.parameters.get('keyFrame');
		var messageCategoryId = $.request.parameters.get('messageCategoryId');
		var messageId = $.request.parameters.get('messageId');
		var feed = $.request.parameters.get('feed');	
		var timeStamp = $.request.parameters.get('_');		
		var callback= $.request.parameters.get('callback');

		var messageFeedFields = feed.split(',');
		
		switch(messageCategoryId) {
			case 'NOT':  //Notify				
				var commsTick = '';
				query = 'INSERT INTO "hpl.missioncontrol.data::messageNotifyLog" values(?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);

				switch(messageId) {
					case 'C':  //Comms Tick
						commsTick = messageFeedFields[0].substr(1); 
					break;
				}
				pstmt.setString(1,missionId);  
				pstmt.setString(2,vehicleId);  
				pstmt.setString(3,pilotId);
				pstmt.setString(4,keyFrame);
				pstmt.setString(5,messageId);
				pstmt.setString(6,timeStamp);
				pstmt.setString(7,commsTick);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;

			case 'DRI':  //Drive
				var stop = '';
				var direction = '';
				var heading = '';
				var rotate = '';
				var leftEngineThrust = '';
				var rightEngineThrust = '';
				query = 'INSERT INTO "hpl.missioncontrol.data::messageDriveLog" values(?,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
				switch(messageId) {
					case 'T':  //Thrust
						leftEngineThrust  = messageFeedFields[0];
						rightEngineThrust = messageFeedFields[1];
						break;
				}
				pstmt.setString(1,missionId);  
				pstmt.setString(2,vehicleId);  
				pstmt.setString(3,pilotId);
				pstmt.setString(4,keyFrame);
				pstmt.setString(5,messageId);
				pstmt.setString(6,timeStamp);
				pstmt.setString(7,stop);
				pstmt.setString(8,direction);
				pstmt.setString(9,heading);
				pstmt.setString(10,rotate);
				pstmt.setString(11,leftEngineThrust);
				pstmt.setString(12,rightEngineThrust);
				pstmt.execute();  
				conn.commit();  
				conn.close();
				break;
			case 'SEN':  //Sensor
				var compass = '';
				var inertialAccelX = '';
				var inertialAccelY = '';
				var inertialAccelZ = '';
				var proximityRear = '';
				var proximityFront = '';
				var proximityCam = '';	
				query = 'INSERT INTO "hpl.missioncontrol.data::messageSensorLog" values(?,?,?,?,?,?,?,?,?,?,?,?,?)';
				pstmt = conn.prepareStatement(query);
				switch(messageId) {
					case 'C':  //Compass
						compass = messageFeedFields[0];
						break;
					case 'I':  //Inertial
						inertialAccelX = messageFeedFields[0];
						inertialAccelY = messageFeedFields[1];
						inertialAccelZ = messageFeedFields[2];
						break;
					case 'D':  //proximity
						proximityRear = messageFeedFields[0];
						proximityFront = messageFeedFields[1];
						proximityCam = messageFeedFields[2];
						break;
				}
				pstmt.setString(1,missionId);  
				pstmt.setString(2,vehicleId);  
				pstmt.setString(3,pilotId);
				pstmt.setString(4,keyFrame);
				pstmt.setString(5,messageId);
				pstmt.setString(6,timeStamp);
				pstmt.setString(7,compass);
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
				
			case 'LIT':  //Lights,
				break;
				
			case 'NAV':  //Navigation,
				break;
				
			case 'POW':  //Power,
				break;
			
			case 'WEA':  //Weapon
				break;
		}
		
	

	    var bodyContent = JSON.stringify({
              "data": missionId
        });

		var body = callback + '(' + bodyContent + ')';
		$.response.contentType = "application/json";   
		$.response.setBody(body);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	}
}

messageLogPump();