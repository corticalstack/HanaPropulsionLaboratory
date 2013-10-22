#ifndef HPLRover_Compass_h
#define HPLRover_Compass_h

#include "Arduino.h"

class HPLRover_Compass
{
  public:
    HPLRover_Compass();        //Constructor
    static void update_compass(void* context);
};

#endif
