#include "Arduino.h"
#include "HPLRover_Notify.h"
#include "HPLRover_Notify.h"
#include "HPLRover_Common.h"
#include <PString.h>

struct HPLRover_Notify::notify_type HPLRover_Notify::notify;

HPLRover_Notify::HPLRover_Notify() {

}

// Init
void HPLRover_Notify::init(void) {

	HPLRover_Notify::notify.systems_power_up			= false;
	HPLRover_Notify::notify.armed						= false;
	HPLRover_Notify::notify.radio_failsafe				= false;
	HPLRover_Notify::notify.power_failsafe				= false;
	HPLRover_Notify::notify.thrust_failsafe				= false;
	HPLRover_Notify::notify.gps_init					= false;
	HPLRover_Notify::notify.inertial_init				= false;
	HPLRover_Notify::notify.compass_init				= false;
	HPLRover_Notify::notify.cockpit_heartbeat			= false;
	HPLRover_Notify::notify.cockpit_heartbeat_tick		= 0;
	HPLRover_Notify::notify.headlamps_on				= false;
	HPLRover_Notify::notify.weapons_gun1_on             = false;
	HPLRover_Notify::notify.weapons_gun2_on             = false;

}

void HPLRover_Notify::output(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));

	if (notify.notify.thrust_failsafe == true) {
		notify.notify.thrust_failsafe = false;
		notify_str += msg_notify;
		notify_str += msg_notify_thrust_failsafe;
		notify_str += msg_terminator;  
		Serial.println(notify_str);
		notify_buffer[0] = null_terminator; //Clear buffer
	}

	if (notify.notify.power_failsafe == true) {
		notify_str += msg_notify;
		notify_str += msg_notify_power_failsafe;
		notify_str += msg_terminator;  
		Serial.println(notify_str);
		notify_buffer[0] = null_terminator; //Clear buffer
	}
	
	last_tick_span = millis() - notify.notify.cockpit_heartbeat_tick;
	notify_str += msg_notify;
	notify_str += msg_notify_comms_tick;
	notify_str += last_tick_span;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
	
}

void HPLRover_Notify::output_systems_power_up(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));

	notify.notify.systems_power_up = true;
	notify_str += msg_notify;
	notify_str += msg_notify_systems_power_up;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}

void HPLRover_Notify::output_gps_init(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));
	
	notify.notify.gps_init = true;
	notify_str += msg_notify;
	notify_str += msg_notify_gps_init;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}

void HPLRover_Notify::output_inertial_init(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));
	
	notify.notify.inertial_init = true;
	notify_str += msg_notify;
	notify_str += msg_notify_inertial_init;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}

void HPLRover_Notify::output_compass_init(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));
	
	notify.notify.compass_init = true;
	notify_str += msg_notify;
	notify_str += msg_notify_compass_init;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}

void HPLRover_Notify::output_arming(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));
	
	notify_str += msg_notify;
	notify_str += msg_notify_arming;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}

void HPLRover_Notify::output_armed(HPLRover_Notify &notify) {
	unsigned long last_tick_span;
	char notify_buffer[10];
	PString notify_str(notify_buffer, sizeof(notify_buffer));
	
	notify.notify.armed = true;
	notify_str += msg_notify;
	notify_str += msg_notify_armed;
	notify_str += msg_terminator;  
	Serial.println(notify_str);
	notify_buffer[0] = null_terminator; //Clear buffer
}