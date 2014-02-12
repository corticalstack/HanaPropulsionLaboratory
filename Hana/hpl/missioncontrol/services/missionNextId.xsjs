function missionNextId(){
    var callStmt            = null,
		resultSet,
		nextMissionId       = 0,
		conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		p_callback			= $.request.parameters.get('callback');
	
	try {
		callStmt = conn.prepareCall('call "MISSIONCONTROL"."hpl.missioncontrol.procedures::get_mission_nextId"( ex_missionId_tt => ? )');
		if (callStmt.execute()) {
			conn.commit();
			resultSet = callStmt.getResultSet();
			while (resultSet.next()) {
				nextMissionId = resultSet.getString(1);	
			}					
		}

	    var bodyContent = JSON.stringify({
              "nextMissionId": nextMissionId
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

missionNextId();