function missionDistanceTravelled(){
    var callStmt            = null,
		resultSet,
		distanceTravelledM  = '',
		conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		p_missionId			= $.request.parameters.get('missionId'),
        p_vehicleId			= $.request.parameters.get('vehicleId'),
		p_pilotId			= $.request.parameters.get('pilotId'),
		p_callback			= $.request.parameters.get('callback');
	
	try {
		callStmt = conn.prepareCall('call "MISSIONCONTROL"."hpl.missioncontrol.procedures::get_mission_distance_travelled"(im_missionid => ?, im_vehicleid => ?, im_pilotid => ?, ex_distance_travelled_tt => ? )');
		callStmt.setString(1,p_missionId);  
		callStmt.setString(2,p_vehicleId);
		callStmt.setString(3,p_pilotId);
		if (callStmt.execute()) {
			resultSet = callStmt.getResultSet();
			while (resultSet.next()) {
				distanceTravelledM = resultSet.getString(1);	
			}					
		}

	    var bodyContent = JSON.stringify({
              "distanceTravelledM": distanceTravelledM
        });

		var body = p_callback + '(' + bodyContent + ')';
		$.response.contentType = "application/json";   
		$.response.setBody(body);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	} finally {
		callStmt.close();
		conn.close();
	}
}

missionDistanceTravelled();