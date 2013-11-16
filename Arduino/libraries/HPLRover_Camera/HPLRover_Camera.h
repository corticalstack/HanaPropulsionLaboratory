#ifndef HPLRover_Camera_h
#define HPLRover_Camera_h

#include "Arduino.h"
#include "Servo.h"

#include <HPLRover_Command.h>

			  
class HPLRover_Camera {

	public:
		HPLRover_Camera();        //Constructor
		void output(HPLRover_Command &command, Servo &servo_pancam, Servo &servo_tiltcam);
		void centre(Servo &servo_pancam, Servo &servo_tiltcam);
		void sweep(Servo &servo_pancam, Servo &servo_tiltcam);
				
	private:
		void pancam(HPLRover_Command &command, Servo &servo_pancam);
		void tiltcam(HPLRover_Command &command, Servo &servo_tiltcam);
};

#endif
