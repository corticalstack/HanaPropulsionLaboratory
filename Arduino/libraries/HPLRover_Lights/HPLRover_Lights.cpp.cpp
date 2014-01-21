#include "Arduino.h"
#include "HPLRover_Lights.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>


HPLRover_Lights::HPLRover_Lights() {
}

void HPLRover_Lights::init() {

}


void HPLRover_Lights::toggle_headlights(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_lights.toggle_headlights_rx == false) { 
	  return;
	}
	
    if (notify.notify.headlamps_on == false) {
	//
	}
	else
	{
	//
	}
	

	notify.notify.headlamps_on 					= !notify.notify.headlamps_on;	
	command.cmd_in_lights.toggle_headlights_rx 	= false;	
}

void HPLRover_Lights::toggle_laser(HPLRover_Command &command, HPLRover_Notify &notify) {

  	if (command.cmd_in_lights.toggle_laser_rx == false) { 
	  return;
	}
	
    if (notify.notify.laser_on == false) {
		digitalWrite(pin_light_laser, HIGH);   
	}
	else
	{
		digitalWrite(pin_light_laser, LOW);   
	}
	

	notify.notify.laser_on 					= !notify.notify.laser_on;	
	command.cmd_in_lights.toggle_laser_rx 	= false;	
}

