#ifndef HPLRover_Weapons_h
#define HPLRover_Weapons_h

#include "Arduino.h"

#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>

class HPLRover_Weapons {
	public:
		HPLRover_Weapons();        //Constructor
		void init(void);
		void toggle_gun_left(HPLRover_Command &command, HPLRover_Notify &notify);		
		void toggle_gun_right(HPLRover_Command &command, HPLRover_Notify &notify);		

	private:

};

#endif
