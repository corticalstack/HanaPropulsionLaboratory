function scenarioTerrain(){
	function createShapeEntry(rs) {
		 return {
			 "terrainId": rs.getNString(2),
			 "shapeId": rs.getNString(3),
			 "shapeDescription": rs.getString(4),
			 "geometry": JSON.parse(rs.getNString(5)),
			 "hitpoints": rs.getString(6),
			 "healthpoints": rs.getString(7),
			 "multiplier": rs.getString(8),
			 "terrainName": rs.getString(9),
			 "strokeColourHex": rs.getString(10),
			 "strokeOpacity": rs.getString(11),
			 "strokeWeight": rs.getString(12),
			 "fillColourHex": rs.getString(13),
			 "fillOpacity": rs.getString(14)
		 };
	}
	
	var query,
	p_callback			= $.request.parameters.get('callback'),
	pstmt,
	conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");


	var geoCollection = [];
			
		
	try {
    
		query = 'select SCENARIOID, TERRAINID, SHAPEID, SHAPEDESCRIPTION, SHAPE.ST_AsGeoJSON() as "GEOJSON", HITPOINTS, HEALTHPOINTS, MULTIPLIER, TERRAINNAME, STROKECOLOURHEX, STROKEOPACITY, STROKEWEIGHT, FILLCOLOURHEX, FILLOPACITY from "_SYS_BIC"."hpl.missioncontrol.models/AT_SCENARIO_TERRAIN"';		
		pstmt = conn.prepareStatement(query);						

		var rs = pstmt.executeQuery();  

		while (rs.next()) {
			geoCollection.push(createShapeEntry(rs));
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

scenarioTerrain();