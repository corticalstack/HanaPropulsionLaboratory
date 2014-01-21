#ifndef HPLRover_Notify_h
#define HPLRover_Notify_h

#include "Arduino.h"

class HPLRover_Notify {
	public:
  
		struct notify_type {
			bool systems_power_up;
			bool armed;
			bool radio_failsafe;
			bool power_failsafe;
			bool gps_init;			
			bool inertial_init;			
			bool compass_init;			
			bool thrust_failsafe;			
			bool cockpit_heartbeat;						
			bool weapons_gun_left_on;
			bool weapons_gun_right_on;
			bool headlamps_on;
			bool laser_on;
			unsigned long cockpit_heartbeat_tick;
		};	
	
		static struct notify_type 				notify;
		
		//Constructor
		HPLRover_Notify();   
		void output(HPLRover_Notify &notify);
		void output_systems_power_up(HPLRover_Notify &notify);
		void output_gps_init(HPLRover_Notify &notify);
		void output_inertial_init(HPLRover_Notify &notify);
		void output_compass_init(HPLRover_Notify &notify);
		void output_arming(HPLRover_Notify &notify);
		void output_armed(HPLRover_Notify &notify);
		
	private:

		//Initialise notify
		void init();		
	
};

#endif
