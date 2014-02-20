function missionLogPump(){
	var query,
		pstmt,
		conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");

	
	var geo = {
			longitude: 6.892922,
			latitude:  46.475062,
	};
		
	
	
	var messageText = '';		
			
	try {
        
		query = 'SELECT ID from "MISSIONCONTROL"."SPATIALSHAPES" where SHAPE.ST_Contains( new ST_Point(' + geo.longitude + ',' + geo.latitude + ') ) = 1';		
		pstmt = conn.prepareStatement(query);						

		var rs = pstmt.executeQuery();  

		while (rs.next()) {
			messageText = rs.getString(1);
		}

		var bodyContent = JSON.stringify({
              "data": messageText
        });


		$.response.contentType = "application/json";   
		$.response.setBody(bodyContent);  
		$.response.status = $.net.http.OK;  
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	} finally {
  
		conn.close();
	}
}

missionLogPump();