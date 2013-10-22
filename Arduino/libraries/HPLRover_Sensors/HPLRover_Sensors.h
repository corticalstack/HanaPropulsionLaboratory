#ifndef HPLRover_Sensors_h
#define HPLRover_Sensors_h

#include "Arduino.h"

class HPLRover_Sensors
{
  public:
    HPLRover_Sensors();        //Constructor
	static void read_sensors(void* context);
};

#endif
