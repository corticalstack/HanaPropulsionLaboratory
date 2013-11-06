#include "Arduino.h"
#include "HPLRover_Notify.h"
#include "HPLRover_Notify.h"


struct HPLRover_Notify::notify_type HPLRover_Notify::notify;

HPLRover_Notify::HPLRover_Notify() {

}

// Init
void HPLRover_Notify::init(void) {

	HPLRover_Notify::notify.initialising 				= false;
	HPLRover_Notify::notify.armed						= false;
	HPLRover_Notify::notify.radio_failsafe				= false;
	HPLRover_Notify::notify.power_failsafe				= false;
	HPLRover_Notify::notify.gps_failsafe				= false;
	HPLRover_Notify::notify.cockpit_heartbeat			= false;
	HPLRover_Notify::notify.cockpit_heartbeat_tick		= 0;

}

