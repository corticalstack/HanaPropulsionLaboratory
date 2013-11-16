#ifndef HPLRover_Notify_h
#define HPLRover_Notify_h

#include "Arduino.h"

class HPLRover_Notify {
	public:
  
		struct notify_type {
			bool initialising;
			bool armed;
			bool radio_failsafe;
			bool power_failsafe;
			bool gps_failsafe;
			bool cockpit_heartbeat;
			bool headlamps_on;
			unsigned long cockpit_heartbeat_tick;
		};	
	
		static struct notify_type 				notify;
		
		//Constructor
		HPLRover_Notify();       
	
	private:

		//Initialise notify
		void init();		
	
};

#endif
