function flightDirectorNextMissionId(){
	try {
		
		var callStmt,
			resultSet,
			nextMissionId       = 0,
			conn				= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
			p_callback			= $.request.parameters.get('callback');
		
		callStmt = conn.prepareCall('call "_SYS_BIC"."hpl.missioncontrol.procedures/set_flightDirector_missionId_sql"( )');
 
		if (callStmt.execute()) {
			conn.commit();
			callStmt.close();
			callStmt = conn.prepareCall('call "_SYS_BIC"."hpl.missioncontrol.procedures/get_flightDirector_sql"( flightDirector => ? )');
			if (callStmt.execute()) {
				resultSet = callStmt.getResultSet();
				while (resultSet.next()) {
					nextMissionId = resultSet.getString(1);	
				}					
				callStmt.close();
			}
		}
		  
		conn.close();

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
	}
}

flightDirectorNextMissionId();