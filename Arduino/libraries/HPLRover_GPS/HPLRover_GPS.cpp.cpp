#include "Arduino.h"
#include "HPLRover_GPS.h"
#include "HPLRover_Common.h"
#include <PString.h>

struct HPLRover_GPS::gps_msg_nav_posllh_type HPLRover_GPS::gps_msg_nav_posllh;
struct HPLRover_GPS::gps_msg_nav_velned_type HPLRover_GPS::gps_msg_nav_velned;


HPLRover_GPS::HPLRover_GPS()
{

}


void HPLRover_GPS::init() {
  Serial.println("GPS Constructor");
  Serial1.begin(38400);
  lstate = state = 0;
  
  // Modify these to control which messages are sent from module
  enableMsg(gps_posllh_msg, true);    // Enable position messages
  enableMsg(gps_sbas_msg, true);      // Enable SBAS messages
  enableMsg(gps_velned_msg, true);    // Enable velocity messages
  enableMsg(gps_status_msg, true);    // Enable status messages
  enableMsg(gps_sol_msg, true);       // Enable soluton messages
  enableMsg(gps_dop_msg, true);       // Enable DOP messages
  enableMsg(gps_dgps_msg, true);     // Disable DGPS messages
  

}


void HPLRover_GPS::update(HPLRover_GPS &gps) {
  
	if (Serial1.available()) {
		unsigned char cc = Serial1.read();
		switch (state) {
			case 0:    // wait for sync 1 (0xB5)
				ck1 = ck2 = 0;
				if (cc == 0xB5) {
					state++;
				}
				break;
			
			case 1:    // wait for sync 2 (0x62)
				if (cc == 0x62) {
					state++;
				}
				else {
					state = 0;
				}
				break;
      
			case 2:    // wait for class code
				code = cc;
				ck1 += cc;
				ck2 += ck1;
				state++;
				break;
				
			case 3:    // wait for Id
				id = cc;
				ck1 += cc;
				ck2 += ck1;
				state++;
				break;
				
			case 4:    // wait for length byte 1
				length = cc;
				ck1 += cc;
				ck2 += ck1;
				state++;
				break;
				
			case 5:    // wait for length byte 2
				length |= (unsigned int) cc << 8;
				ck1 += cc;
				ck2 += ck1;
				idx = 0;
				state++;
				if (length > MAX_LENGTH) {
					state= 0;
				}
				break;
				
			case 6:    // wait for <length> payload bytes
				data[idx++] = cc;
				ck1 += cc;
				ck2 += ck1;
				if (idx >= length) {
					state++;
				}
				break;
				
			case 7:    // wait for checksum 1
				chk1 = cc;
				state++;
				break;
				
			case 8:    // wait for checksum 2
				chk2 = cc;
				boolean checkOk = ck1 == chk1  &&  ck2 == chk2;
				if (checkOk) {
					switch (code) {
						case 0x01:      // NAV-
							switch (id) {
								case 0x02:  // NAV-POSLLH
									set_nav_posllh_gps_ms(gps, LONG(0));
									set_nav_posllh_longitude(gps, LONG(4));
									set_nav_posllh_lattitude(gps, LONG(8));
									set_nav_posllh_height(gps, LONG(12));
									set_nav_posllh_height_msl(gps, LONG(16));
									set_nav_posllh_hori_acc_est(gps, ULONG(20));
									set_nav_posllh_vert_acc_est(gps, ULONG(24));			  				  
									break;
									
								case 0x12:  // NAV-VELNED				
									set_nav_velned_gps_ms(gps, LONG(0));
									set_nav_velned_north_velocity_cm_s(gps, LONG(4));
									set_nav_velned_east_velocity_cm_s(gps, LONG(8));
									set_nav_velned_down_velocity_cm_s(gps, LONG(12));
									set_nav_velned_speed_3d_cm_s(gps, LONG(16));
									set_nav_velned_ground_speed_2d_cm_s(gps, LONG(20));
									set_nav_velned_heading(gps, LONG(24));
									set_nav_velned_speed_acc_est(gps, LONG(28));
									set_nav_velned_course_acc_est(gps, LONG(32));
									break;
							}              
					}
				}
				state = 0;
				break;
		}
	}
}


void HPLRover_GPS::enableMsg(unsigned char id, boolean enable) {
	//               MSG   NAV   < length >  NAV
	byte cmdBuf[] = {0x06, 0x01, 0x03, 0x00, 0x01, id, enable ? 1 : 0};
	sendCmd(sizeof(cmdBuf), cmdBuf);
}


void HPLRover_GPS::set_nav_posllh_gps_ms(HPLRover_GPS &gps, long val) {
	Serial.println(val);
	gps.gps_msg_nav_posllh.gps_ms = val;
}


void HPLRover_GPS::set_nav_posllh_longitude(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_posllh.longitude = val;
}


void HPLRover_GPS::set_nav_posllh_lattitude(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_posllh.lattitude = val;
}


void HPLRover_GPS::set_nav_posllh_height(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_posllh.height = val;
}


void HPLRover_GPS::set_nav_posllh_height_msl(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_posllh.height_msl = val;
}


void HPLRover_GPS::set_nav_posllh_hori_acc_est(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_posllh.hori_acc_est = val;
}


void HPLRover_GPS::set_nav_posllh_vert_acc_est(HPLRover_GPS &gps, unsigned long val) {
	gps.gps_msg_nav_posllh.vert_acc_est = val;
}


void HPLRover_GPS::set_nav_velned_gps_ms(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.gps_ms = val;
}

void HPLRover_GPS::set_nav_velned_north_velocity_cm_s(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.north_velocity_cm_s = val;
}


void HPLRover_GPS::set_nav_velned_east_velocity_cm_s(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.east_velocity_cm_s = val;
}


void HPLRover_GPS::set_nav_velned_down_velocity_cm_s(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.down_velocity_cm_s = val;
}


void HPLRover_GPS::set_nav_velned_speed_3d_cm_s(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.speed_3d_cm_s = val;
}


void HPLRover_GPS::set_nav_velned_ground_speed_2d_cm_s(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.ground_speed_2d_cm_s = val;
}


void HPLRover_GPS::set_nav_velned_heading(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.heading = val;
}


void HPLRover_GPS::set_nav_velned_speed_acc_est(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.speed_acc_est = val;
}


void HPLRover_GPS::set_nav_velned_course_acc_est(HPLRover_GPS &gps, long val) {
	gps.gps_msg_nav_velned.course_acc_est = val;
}

			
void HPLRover_GPS::printHex(unsigned char val) {
  Serial.println("printhex");
  if (val < 0x10)
    Serial.print("0");
  Serial.print(val, HEX);
}

void HPLRover_GPS::sendCmd(unsigned char len, byte data[]) {
  Serial1.write(0xB5);
  Serial1.write(0x62);
  unsigned char chk1 = 0, chk2 = 0;
  for (unsigned char ii = 0; ii < len; ii++) {
    unsigned char cc = data[ii];
    Serial1.write(cc);
    chk1 += cc;
    chk2 += chk1;
  }
  Serial1.write(chk1);
  Serial1.write(chk2);
}




void HPLRover_GPS::output(HPLRover_GPS &gps) {
	Serial.println("PosLLH message");
	Serial.print("GPS MS");
	Serial.println(gps.gps_msg_nav_posllh.gps_ms);
	
	Serial.print("Longitude");
	Serial.println(gps.gps_msg_nav_posllh.longitude);
	
	Serial.print("Lattitude");
	Serial.println(gps.gps_msg_nav_posllh.lattitude);
	
	Serial.print("Height");
	Serial.println(gps.gps_msg_nav_posllh.height);
	
	Serial.print("Height MSL");
	Serial.println(gps.gps_msg_nav_posllh.height_msl);
	
	Serial.print("Horizontal accuracy estimate");	
	Serial.println(gps.gps_msg_nav_posllh.hori_acc_est);
	
	Serial.print("Vertical accuracy estimate");		
	Serial.println(gps.gps_msg_nav_posllh.vert_acc_est);		

	
	Serial.println(" ");
	Serial.println("Velned message");
	Serial.print("GPS MS");
	Serial.println(gps.gps_msg_nav_velned.gps_ms);
	
	Serial.print("North velocity cm/s");
	Serial.println(gps.gps_msg_nav_velned.north_velocity_cm_s);
	
	Serial.print("East velocity cm/s");
	Serial.println(gps.gps_msg_nav_velned.east_velocity_cm_s);
	
	Serial.print("Down velocity cm/s");
	Serial.println(gps.gps_msg_nav_velned.down_velocity_cm_s);
	
	Serial.print("Speed 3D cm/s");
	Serial.println(gps.gps_msg_nav_velned.speed_3d_cm_s);
	
	Serial.print("Ground speed 2D cm/s");
	Serial.println(gps.gps_msg_nav_velned.ground_speed_2d_cm_s);
	
	Serial.print("Heading");
	Serial.println(gps.gps_msg_nav_velned.heading);
	
	Serial.print("Speed accuracy estimate");
	Serial.println(gps.gps_msg_nav_velned.speed_acc_est);
	
	Serial.print("Course accuracy estimate");
	Serial.println(gps.gps_msg_nav_velned.course_acc_est);

}