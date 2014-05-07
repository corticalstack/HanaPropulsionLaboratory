function scenarioGoal(){
	function createGoalEntry(rs) {
		 return {
			 "scenarioId": rs.getNString(1),
			 "goalSetId": rs.getNString(2),
			 "goalId": rs.getNString(3),
			 "goalName": rs.getNString(4),
			 "visualUri": rs.getNString(5),
			 "goalDescription": rs.getNString(6),
			 "sort": rs.getInteger(7),
			 "rank": rs.getInteger(8),
			 "messageCategoryId": rs.getNString(9),
			 "messageId": rs.getNString(10),
			 "geometry": rs.getNString(11),
			 "timeLimitS": rs.getInteger(12),
			 "complete": rs.getNString(13)
		 };
	}
	
	var query,
	p_callback			= $.request.parameters.get('callback'),
	pstmt,
	conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");


	var geoCollection = [];
			
		
	try {
    
		query = 'select SCENARIOID, GOALSETID, GOALID, GOALNAME, VISUALURI, GOALDESCRIPTION, SORT, RANK, MESSAGECATEGORYID_MESSAGECATEGORYID, MESSAGEID_MESSAGEID, SHAPE.ST_AsWKT() as "SHAPEWKT", TIMELIMITS, COMPLETE from "_SYS_BIC"."hpl.missioncontrol.models/AT_SCENARIO_GOAL"';		
		pstmt = conn.prepareStatement(query);						

		var rs = pstmt.executeQuery();  

		while (rs.next()) {
			geoCollection.push(createGoalEntry(rs));
		}

		var bodyContent = JSON.stringify({
			"geoCollection": geoCollection 
		});

		var body = p_callback + '(' + bodyContent + ')';
		$.response.contentType = "application/json";   
		$.response.setBody(body);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	} finally {

		conn.close();
	}

}

scenarioGoal();