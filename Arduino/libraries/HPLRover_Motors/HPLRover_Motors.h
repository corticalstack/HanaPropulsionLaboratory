#ifndef HPLRover_Motors_h
#define HPLRover_Motors_h

#include "Arduino.h"
#include "Servo.h"

#include <HPLRover_Command.h>

			  
class HPLRover_Motors {

	public:
		HPLRover_Motors();        //Constructor
		void output(HPLRover_Command &command, Servo &servo_leftmotors, Servo &servo_rightmotors);
	
	private:
			
		void reset_motors(HPLRover_Command &command);
		void allstop(HPLRover_Command &command, Servo &servo_leftmotors, Servo &servo_rightmotors);		
		int get_throttle_curved(int throttle_val);
		int adjust_left_motors_for_trim(int throttle_val);
		int adjust_right_motors_for_trim(int throttle_val);		
        int get_heading_curved(int heading_val);
};

#endif
