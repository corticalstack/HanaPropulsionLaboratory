#include "Arduino.h"
#include "HPLRover_Weapons.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>


HPLRover_Weapons::HPLRover_Weapons() {
}

void HPLRover_Weapons::init() {

}


void HPLRover_Weapons::gun1(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_weapons.gun1_val == 0) { 
		digitalWrite(pin_gun1, LOW);   
		notify.notify.weapons_gun1_on = false;
	}
	else
	{
		digitalWrite(pin_gun1, HIGH);   
		notify.notify.weapons_gun1_on = true;
	}

}

void HPLRover_Weapons::gun2(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_weapons.gun2_val == 0) { 
		digitalWrite(pin_gun2, LOW);   
		notify.notify.weapons_gun2_on = false;
	}
	else
	{
		digitalWrite(pin_gun2, HIGH);   
		notify.notify.weapons_gun2_on = true;
	}

}

