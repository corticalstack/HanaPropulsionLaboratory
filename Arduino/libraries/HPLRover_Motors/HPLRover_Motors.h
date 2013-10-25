#ifndef HPLRover_Motors_h
#define HPLRover_Motors_h

#include "Arduino.h"
#include <HPLRover_Command.h>

class HPLRover_Motors {

  public:
    HPLRover_Motors();        //Constructor
	void output(HPLRover_Command &command);

};

#endif
