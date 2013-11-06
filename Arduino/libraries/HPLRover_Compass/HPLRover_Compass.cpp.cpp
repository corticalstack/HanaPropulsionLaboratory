#include "Arduino.h"
#include "HPLRover_Compass.h"
#include "HPLRover_Common.h"
#include <Wire.h>
#include <PString.h>

struct HPLRover_Compass::compass_msg_type 		HPLRover_Compass::compass_msg;


HPLRover_Compass::HPLRover_Compass() {
}

void HPLRover_Compass::init() {
	Wire.begin();
  
	//Put the HMC5883 IC into the correct operating mode
	Wire.beginTransmission(compass_address); 
	Wire.write(compass_sel_mode_register); 
	Wire.write(compass_continuous_mode); 
	Wire.endTransmission();
}


void HPLRover_Compass::read(HPLRover_Compass &compass) {
	int   magx 				= 0;
	int   magy 				= 0;
	int   magz 				= 0; 
	float magx_adjusted 	= 0;
	float magy_adjusted 	= 0;
	float magz_adjusted 	= 0;
    float heading_radian    = 0;
	float heading_degrees   = 0;
	
	//Tell the HMC5883 where to begin reading data
	Wire.beginTransmission(compass_address);
	Wire.write(compass_sel_reg3_xmsb); 
	Wire.endTransmission();
  
 
	//Read data from each axis, 2 registers per axis
	Wire.requestFrom(compass_address, 6);
	if (6<=Wire.available()) {
		magx = Wire.read()<<8; 	//X msb
		magx |= Wire.read(); 	//X lsb
		magz = Wire.read()<<8; 	//Z msb
		magz |= Wire.read(); 	//Z lsb
		magy = Wire.read()<<8; 	//Y msb
		magy |= Wire.read(); 	//Y lsb
	}
 
    
	magx_adjusted = (magx + compass_magx_offset) * compass_magx_scale;
	magy_adjusted = (magy - compass_magy_offset);
	magz_adjusted = magz;
      
      
	heading_radian = atan2(magx_adjusted, magy_adjusted);
	if (heading_radian < 0) {
		heading_radian += 2*PI;
	}
   
   
	heading_degrees = heading_radian * (180/M_PI); 
	heading_degrees -= 180;

	if (heading_degrees < 0){
		heading_degrees += 360;
	}

	
	compass.compass_msg.magx 			= magx_adjusted;
	compass.compass_msg.magy 			= magy_adjusted;
	compass.compass_msg.magz 			= magz_adjusted;
	compass.compass_msg.heading_degrees = heading_degrees;
	
}


void HPLRover_Compass::output(HPLRover_Compass &compass) {
  
	char msg_buffer[40];
	PString msg_compass_str(msg_buffer, sizeof(msg_buffer));
	msg_compass_str += msg_compass;
	msg_compass_str += compass.compass_msg.magx;
	msg_compass_str += comma_separator;
	msg_compass_str += compass.compass_msg.magy;
	msg_compass_str += comma_separator;
	msg_compass_str += compass.compass_msg.magz;	
	msg_compass_str += comma_separator;
	msg_compass_str += compass.compass_msg.heading_degrees;
	msg_compass_str += msg_terminator;  
	Serial.println(msg_compass_str);
}	
