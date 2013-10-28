#ifndef HPLRover_Command_h
#define HPLRover_Command_h

#include "Arduino.h"

class HPLRover_Command {
	public:
  
		struct command_in_motors_type {
			boolean throttle_rx;
			int     throttle_val;
		
			boolean direction_rx;
			char    direction_val;
		
			boolean heading_rx;
			int     heading_val;
		
			boolean rotate_rx;
			char    rotate_val;
		
			boolean stop_rx;
			boolean step_rx;
		};	
	
	
		struct command_in_lights_type {					
			boolean lights_mainbeam_rx;
			int     lights_mainbeam_val;
		};		
	
	
		struct command_in_cam_type {	
			boolean cam_pan_rx;
			char    cam_pan_val;
				
			boolean cam_tilt_rx;
			char    cam_tilt_val;
		
			boolean cam_sweep_rx;		
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
