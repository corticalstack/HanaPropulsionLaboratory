#ifndef HPLRover_Compass_h
#define HPLRover_Compass_h

#include "Arduino.h"

class HPLRover_Compass 
{
  public:
  
  		struct compass_msg_type {					
			float 	magx;
			float	magy;
			float 	magz;
			float	heading_degrees;
		};		
		
		
		static struct compass_msg_type	compass_msg;
		
    HPLRover_Compass();        //Constructor
	void init(void);
    void read(HPLRover_Compass &compass);
	void output(HPLRover_Compass &compass);
};

#endif
