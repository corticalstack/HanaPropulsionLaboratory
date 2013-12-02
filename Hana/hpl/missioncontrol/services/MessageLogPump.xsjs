function MessageLogPump(){
	var conn = $.db.getConnection("hpl.missioncontrol.services::AnonConn");
	var missionId = $.request.parameters.get('missionId');
	var vehicleId = $.request.parameters.get('vehicleId');
	var pilotId = $.request.parameters.get('pilotId');
	var messageCategoryId = $.request.parameters.get('messageCategoryId');
	var messageId = $.request.parameters.get('messageId');
	var loggedAt = $.request.parameters.get('loggedAt');
	var feed = $.request.parameters.get('feed');
	
	
	
	var query = 'INSERT INTO "hpl.missioncontrol.data::messageLog" values(?,?,?,?,?,?,?)';
	var st = conn.prepareStatement(query);
	st.setString(1,missionId);  
	st.setString(2,vehicleId);  
	st.setString(3,pilotId);
	st.setString(4,messageCategoryId);
	st.setString(5,messageId);
	st.setString(6,loggedAt);
	st.setString(7,feed);
	st.execute();  
	conn.commit();  
	conn.close();
	
    $.response.setBody(missionId);  
    $.response.status = $.net.http.OK;  
	 
}

MessageLogPump();
