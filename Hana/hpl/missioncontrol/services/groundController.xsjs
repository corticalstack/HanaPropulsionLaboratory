$.import("hpl.missioncontrol.services", "messages");
var messages = $.hpl.missioncontrol.services.messages;


function getPilots() {
	var body = '';
	
	try {
		var pilotsList = [];
		var conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");
		var query = "SELECT * FROM \"MISSIONCONTROL\".\"hpl.missioncontrol.data::pilot\"";
		var pstmt = conn.prepareStatement(query);
		var rs = pstmt.executeQuery();
		
		while (rs.next()) {
			pilotsList.push(rs.getString(1));
		}
		
		
		rs.close();
		pstmt.close();

		body = JSON.stringify({
			"pilots" : pilotsList
		});
		
		$.response.contentType = 'application/json; charset=UTF-8';
		$.response.setBody(body);
		$.response.status = $.net.http.OK;
		
		
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
	}

}	

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
	case "getPilots":
		getPilots();
		break;
	default:
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(messages.getMessage('HPL_MC_COMMON', '003', aCmd));
}