function bigApple() {
	
	var pstmt 			= null,
		rs				= null,
		conn  			= $.db.getConnection("hpl.missioncontrol.services::anonConn"),
		bodyContent 	= '',
		myCmd 			= $.request.parameters.get('cmd'),
		myPoi 			= $.request.parameters.get('poi'),
		myPoiFrom 		= $.request.parameters.get('poiFrom'),
		myPoiTo 		= $.request.parameters.get('poiTo'),		
		myDstM 			= $.request.parameters.get('dstM'),
		myQuery 		= null,
		geoShape 		= [];
	
		
	var poiOut = function(val){
		  var geometry = JSON.parse(val.getNString(3));
		  return {
			  "id": 	val.getInteger(1),
			  "name": 	val.getString(2),
              "geometry": geometry
       };
	};
	
	
	
	var distanceOut = function(val){
		  return {
			  "From": 				val.getString(1),
			  "To": 				val.getString(2),
			  "Distance(m)": 		val.getInteger(3)
		  };
	};

	
	var withinDistanceOut = function(val){
		
		  return {
			  "From": 				val.getString(1),
			  "To": 				val.getString(2),
			  "Distance(m)": 		myDstM,
			  "Within distance": 	val.getInteger(3) ? "Yes" : "No"
		  };
	};
	
	
	var intersectsOut = function(val){
		  return {
			  "From": 				val.getString(1),
			  "To": 				val.getString(2),
			  "Intersects": 		val.getInteger(3) ? "Yes" : "No"
		  };
	};

	
	var equalOut = function(val){
		  return {
			  "POI A": 				val.getString(1),
			  "POI B": 				val.getString(2),
			  "Spatially Equal": 	val.getInteger(3) ? "Yes" : "No"
		  };
	};
	
	
	function querySpatial(myQuery) {
		try {			 
			pstmt = conn.prepareStatement(myQuery.query);
			if (myQuery.id) {
				pstmt.setInt(1,myQuery.id);
			} else if (myQuery.dstM) {
				pstmt.setInt(1,myQuery.dstM);	
				pstmt.setInt(2,myQuery.idFrom);	
				pstmt.setInt(3,myQuery.idTo);
			} else {
				pstmt.setInt(1,myQuery.idFrom);	
				pstmt.setInt(2,myQuery.idTo);				
			}
			
			rs = pstmt.executeQuery();
			while (rs.next()) {
				geoShape.push(myQuery.fnOut(rs));
			}

			
			bodyContent = JSON.stringify({
	              "shape": geoShape
	       });
			$.response.setBody(bodyContent);  
		} catch (e) {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody(e.message);
			return;
		}
	}

	
	try {	
		switch (myCmd) {
			case "poi":
				myQuery = { query: 	'select id, name, shape.ST_AsGeoJSON() from SpatialLocations where id = ?',
							id:    	parseInt(myPoi,10),
							fnOut:  poiOut };				
				querySpatial(myQuery);
				break;
			case "dst":
				myQuery = { query: 	'select A.name as "From", B.name as "To", A.shape.ST_DISTANCE(B.shape) as "Distance(m)" from SpatialLocations A , SpatialLocations B where A.id = ? and B.id = ?',
							idFrom: parseInt(myPoiFrom,10),
							idTo:   parseInt(myPoiTo,10),
							fnOut:  distanceOut };				
				querySpatial(myQuery);
				break;
			case "wdst":
				myQuery = { query: 	'select A.name as "From", B.name as "To", A.shape.ST_WithinDISTANCE(B.shape,?) as "Distance(m)" from SpatialLocations A , SpatialLocations B where A.id = ? and B.id = ?',					
							dstM: 	parseInt(myDstM,10),
							idFrom: parseInt(myPoiFrom,10),
							idTo:   parseInt(myPoiTo,10),
							fnOut:  withinDistanceOut };				
				querySpatial(myQuery);
				break;
				
			case "int":
				myQuery = { query: 	'select A.name as "From", B.name as "To", A.shape.ST_Intersects(B.shape) as "Intersects" from SpatialLocations A , SpatialLocations B where A.id = ? and B.id = ?',
							idFrom: parseInt(myPoiFrom,10),
							idTo:   parseInt(myPoiTo,10),
							fnOut:  intersectsOut };				
				querySpatial(myQuery);
				break;

			case "eq":
				myQuery = { query: 	'select A.name as "POI A", B.name as "POI B", A.shape.ST_Equals(B.shape) as "Spatially Equal" from SpatialLocations A , SpatialLocations B where A.id = ? and B.id = ?',
							idFrom: parseInt(myPoiFrom,10),
							idTo:   parseInt(myPoiTo,10),
							fnOut:  equalOut };				
				querySpatial(myQuery);
				break;
				
			default:
				$.response.status = $.net.http.INTERNAL.SERVER.ERROR;
				$.response.setBody('Invalid cmd '+ myCmd);
		};
	} catch(e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	} finally {	
		if (rs != null) {
			rs.close();	
		}
		
		if (pstmt != null) {
			pstmt.close();	
		}
		
		if (conn != null) {
			conn.close();
		}
		
	}
	
}

bigApple();









