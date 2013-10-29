#ifndef HPLRover_Camera_h
#define HPLRover_Camera_h

#include "Arduino.h"
#include "Servo.h"

#include <HPLRover_Command.h>

			  
class HPLRover_Camera {

	public:
		HPLRover_Camera();        //Constructor
		void output(HPLRover_Command &command, Servo &servo_pancam, Servo &servo_tiltcam);
		void sweep(Servo &servo_pancam, Servo &servo_tiltcam);
		
	private:
		int get_pan_curved(int pan_val);
		int get_tilt_curved(int tilt_val);

};

#endif
