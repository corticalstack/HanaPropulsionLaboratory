function missionCreate(){
	var query,
		pstmt,
		conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		p_missionId			= $.request.parameters.get('missionId'),
		p_vehicleId			= $.request.parameters.get('vehicleId'),
		p_pilotId			= $.request.parameters.get('pilotId'),
		p_timeStamp			= $.request.parameters.get('_'),
		timeStamp0			= 0,
		longitude			= "0",
		lattitude			= "0",
		altitude			= "0",
		p_callback			= $.request.parameters.get('callback');

	try {
		query = 'INSERT INTO "hpl.missioncontrol.data::mission" values(?,?,?,?,?,?,?,?)';
		pstmt = conn.prepareStatement(query);

		p_timeStamp = parseInt(p_timeStamp, 10);
		pstmt.setString(1,p_missionId);  
		pstmt.setString(2,p_vehicleId);  
		pstmt.setString(3,p_pilotId);
		pstmt.setBigInt(4,p_timeStamp);
		pstmt.setBigInt(5,timeStamp0);
		pstmt.setString(6,longitude);
		pstmt.setString(7,lattitude);
		pstmt.setString(8,altitude);
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

missionCreate();