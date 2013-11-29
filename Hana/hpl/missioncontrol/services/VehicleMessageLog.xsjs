function logVehicleMessage(){
	var conn = $.db.getConnection();
	var msg = $.request.parameters.get('msg');
	var vehicleId = msg.substr(0,3);
	var msgId     = msg.substr(3,3);
	var loggedAt  = msg.substr(6,13);     
	var feed      = msg.substr(19,255);
	 
	
	
	var query = 'INSERT INTO "hpl.missioncontrol.data::vehicleMessageLog" values(?,?,?,?)';
	var st = conn.prepareStatement(query);
	st.setString(1,vehicleId);  
	st.setString(2,msgId);  
	st.setString(3,loggedAt);
	st.setString(4,feed);
	st.execute();  
	conn.commit();  
	conn.close();
	
	 $.response.addHeader("Access-Control-Allow-Origin", "*");  
	 $.response.setBody(msgId);  
     $.response.status = $.net.http.OK;  
	 
}

logVehicleMessage();
