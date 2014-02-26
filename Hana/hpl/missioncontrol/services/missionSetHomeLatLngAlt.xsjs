function missionSetHomeLatLngAlt(){
	var query,
		pstmt,
		conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		p_missionId			= $.request.parameters.get('missionId'),
		p_vehicleId			= $.request.parameters.get('vehicleId'),
		p_pilotId			= $.request.parameters.get('pilotId'),
		p_longitude			= $.request.parameters.get('longitude'),
		p_latitude			= $.request.parameters.get('latitude'),
		p_altitude			= $.request.parameters.get('altitude'),
		p_callback			= $.request.parameters.get('callback');

	try {
		query = 'UPDATE "hpl.missioncontrol.data::MC.Mission.Mission" SET HOMEGPSPOSLONGITUDE=?, HOMEGPSPOSLATITUDE=?, HOMEGPSPOSALTITUDE=? where MISSIONID=? and "VEHICLEID.VEHICLEID"=? and "PILOTID.PILOTID"=?';
		pstmt = conn.prepareStatement(query);
		
		pstmt.setString(1,p_longitude);
		pstmt.setString(2,p_latitude);
		pstmt.setString(3,p_altitude);
		pstmt.setString(4,p_missionId);  
		pstmt.setString(5,p_vehicleId);  
		pstmt.setString(6,p_pilotId);
		pstmt.executeUpdate();  
		
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

missionSetHomeLatLngAlt();