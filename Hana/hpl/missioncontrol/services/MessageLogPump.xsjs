function messageLogPump(){
	try {
		var conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");
		var missionId = $.request.parameters.get('missionId');
		var vehicleId = $.request.parameters.get('vehicleId');
		var pilotId = $.request.parameters.get('pilotId');
		var messageCategoryId = $.request.parameters.get('messageCategoryId');
		var messageId = $.request.parameters.get('messageId');
		var loggedAt = $.request.parameters.get('loggedAt');
		var feed = $.request.parameters.get('feed');	
		var query = 'INSERT INTO "hpl.missioncontrol.data::messageLog" values(?,?,?,?,?,?,?)';
		var pstmt = conn.prepareStatement(query);
	
		pstmt.setString(1,missionId);  
		pstmt.setString(2,vehicleId);  
		pstmt.setString(3,pilotId);
		pstmt.setString(4,messageCategoryId);
		pstmt.setString(5,messageId);
		pstmt.setString(6,loggedAt);
		pstmt.setString(7,feed);
		pstmt.execute();  
		conn.commit();  
		conn.close();
	
		$.response.setBody(missionId);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	}
}

messageLogPump();