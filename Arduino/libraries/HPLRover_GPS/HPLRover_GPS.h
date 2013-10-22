#ifndef HPLRover_GPS_h
#define HPLRover_GPS_h

#include "Arduino.h"

class HPLRover_GPS
{
  public:
    HPLRover_GPS();        //Constructor
    static void update_gps(void* context);
};

#endif
