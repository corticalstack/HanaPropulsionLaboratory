function escape(v1){
	var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	return v2; 
}

function getMessage(messageClass, messageNumber, p1, p2, p3, p4) {
	var messageText = '';
	var lang = $.session.language.substring(0, 2);

	var conn = $.db.getConnection("hpl.missioncontrol.services::anonConn");

	var query = 'SELECT "DESCRIPTION" FROM "hpl.missioncontrol.data::MC.Util.Messages" ' +
			    'WHERE "MESSAGECLASS" = ? AND "MESSAGENUMBER" = ? AND "LANGUAGE" = ? ';
	
	var pstmt = conn.prepareStatement(query);
	pstmt.setString(1, messageClass);
	pstmt.setString(2, messageNumber);
	pstmt.setString(3, lang);
	var rs = pstmt.executeQuery();

	while (rs.next()) {
		messageText = rs.getNString(1);
	}

	if (messageText === '') {
		lang = 'en';
		pstmt.setString(1, messageClass);
		pstmt.setString(2, messageNumber);
		pstmt.setString(3, lang);
		rs = pstmt.executeQuery();
		while (rs.next()) {
			messageText = rs.getNString(1);
		}
	}

	rs.close();
	pstmt.close();

    if(p1) { messageText = messageText.replace("&1", escape(p1.toString())); }
    if(p2) { messageText = messageText.replace("&2", escape(p2.toString())); }
    if(p3) { messageText = messageText.replace("&3", escape(p3.toString())); }
    if(p4) { messageText = messageText.replace("&4", escape(p4.toString())); }
	return messageText;
}