#ifndef HPLRover_Command_h
#define HPLRover_Command_h

#include "Arduino.h"

class HPLRover_Command {
	public:
  
		struct command_in_motors_type {
			bool throttle_rx;
			int  throttle_val;
		
			bool direction_rx;
			char direction_val;
		
			bool heading_rx;
			int  heading_val;
		
			bool rotate_rx;
			int  rotate_val;
		
			bool stop_rx;
			bool step_rx;
		};	
	
	
		struct command_in_lights_type {					
			bool lights_mainbeam_rx;
			int  lights_mainbeam_val;
		};		
	
	
		struct command_in_cam_type {	
			bool pan_rx;
			int  pan_val;
				
			bool tilt_rx;
			int  tilt_val;
		
			bool sweep_rx;		
		};		
	
		static struct command_in_motors_type 	cmd_in_motors;
		static struct command_in_lights_type 	cmd_in_lights;
		static struct command_in_cam_type 		cmd_in_cam;		
		
		//Constructor
		HPLRover_Command();       
	
	private:

	
	
		//Initialise the command
		void init();		
	
};

#endif
