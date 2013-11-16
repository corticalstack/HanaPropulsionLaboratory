#include "Arduino.h"
#include "HPLRover_Command.h"
#include "HPLRover_Common.h"


struct HPLRover_Command::command_in_motors_type HPLRover_Command::cmd_in_motors;
struct HPLRover_Command::command_in_cam_type    HPLRover_Command::cmd_in_cam;
struct HPLRover_Command::command_in_lights_type HPLRover_Command::cmd_in_lights;


HPLRover_Command::HPLRover_Command() {

}

// Init
void HPLRover_Command::init(void) {

	HPLRover_Command::cmd_in_motors.throttle_rx 			= false;
	HPLRover_Command::cmd_in_motors.throttle_val 			= 0;  
	HPLRover_Command::cmd_in_motors.direction_rx 			= false;
	HPLRover_Command::cmd_in_motors.direction_val 			= 0;  
	HPLRover_Command::cmd_in_motors.heading_rx 				= false;
	HPLRover_Command::cmd_in_motors.heading_val 			= 0;  
	HPLRover_Command::cmd_in_motors.rotate_rx 				= false;
	HPLRover_Command::cmd_in_motors.stop_rx 				= false;
	HPLRover_Command::cmd_in_motors.step_rx 				= false;
  
	HPLRover_Command::cmd_in_cam.pan_rx 					= false;
	HPLRover_Command::cmd_in_cam.pan_val 					= 0;  
	HPLRover_Command::cmd_in_cam.tilt_rx 					= false;
	HPLRover_Command::cmd_in_cam.tilt_val 					= 0;  
	HPLRover_Command::cmd_in_cam.sweep_rx 					= false;

	HPLRover_Command::cmd_in_lights.toggle_headlights_rx 	= false;
}

