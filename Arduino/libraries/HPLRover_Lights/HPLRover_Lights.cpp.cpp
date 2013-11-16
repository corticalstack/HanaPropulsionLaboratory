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
		digitalWrite(pin_light_mainbeam_left, HIGH);   
		digitalWrite(pin_light_mainbeam_right, HIGH); 
	}
	else
	{
		digitalWrite(pin_light_mainbeam_left, LOW);   
		digitalWrite(pin_light_mainbeam_right, LOW); 	
	}
	

	notify.notify.headlamps_on 					= !notify.notify.headlamps_on;	
	command.cmd_in_lights.toggle_headlights_rx 	= false;	
}


