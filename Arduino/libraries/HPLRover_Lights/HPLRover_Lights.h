#ifndef HPLRover_Lights_h
#define HPLRover_Lights_h

#include "Arduino.h"

#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>

class HPLRover_Lights {
	public:
		HPLRover_Lights();        //Constructor
		void init(void);
		void toggle_headlights(HPLRover_Command &command, HPLRover_Notify &notify);		

	private:

};

#endif
