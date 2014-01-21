#include "Arduino.h"
#include "HPLRover_Weapons.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>


HPLRover_Weapons::HPLRover_Weapons() {
}

void HPLRover_Weapons::init() {

}


void HPLRover_Weapons::toggle_gun_left(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_weapons.toggle_gun_left_rx == false) { 
	  return;
	}
	
    if (notify.notify.weapons_gun_left_on == false) {
		digitalWrite(pin_gun_left, HIGH);   
	}
	else
	{
		digitalWrite(pin_gun_left, LOW);   
	}
	

	notify.notify.weapons_gun_left_on 			= !notify.notify.weapons_gun_left_on;	
	command.cmd_in_weapons.toggle_gun_left_rx 	= false;	
}

void HPLRover_Weapons::toggle_gun_right(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_weapons.toggle_gun_right_rx == false) { 
	  return;
	}
	
    if (notify.notify.weapons_gun_right_on == false) {
		digitalWrite(pin_gun_right, HIGH);   
	}
	else
	{
		digitalWrite(pin_gun_right, LOW);   
	}
	

	notify.notify.weapons_gun_right_on 			= !notify.notify.weapons_gun_right_on;	
	command.cmd_in_weapons.toggle_gun_right_rx 	= false;	
}

