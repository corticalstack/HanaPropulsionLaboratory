#ifndef HPLRover_SharpSensor_h
#define HPLRover_SharpSensor_h

#include "Arduino.h"

class HPLRover_SharpSensor 
{
  public:
  
  		struct sharpsensor_msg_type {					
			float 	sensor1_valuecm;  //rear in cm
			float	sensor2_valuecm;  //front cm
			float 	sensor3_valuecm;  //pan-mounted cm
		};		
		
		
		static struct sharpsensor_msg_type	sharpsensor_msg;
		
    HPLRover_SharpSensor();        //Constructor
	void init(void);
    void read_front_bumper(HPLRover_SharpSensor &sharpsensor);
	void read_rear_bumper(HPLRover_SharpSensor &sharpsensor);	
	void read_cam_mounted(HPLRover_SharpSensor &sharpsensor);
	float sensor_map_sharp2d120x(float sensor_val, float * sensor_in, float * sensor_out, uint8_t size);
	float sensor_map_sharp2y0a02(float sensor_val);
	void output(HPLRover_SharpSensor &sharpsensor);
	void log(HPLRover_SharpSensor &sharpsensor);
};

#endif
