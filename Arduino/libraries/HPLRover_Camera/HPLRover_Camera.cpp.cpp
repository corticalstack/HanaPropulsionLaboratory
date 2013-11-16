#include "Arduino.h"
#include "Servo.h"

#include "HPLRover_Camera.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>

HPLRover_Camera::HPLRover_Camera() {
}

void HPLRover_Camera::output(HPLRover_Command &command, Servo &servo_pancam, Servo &servo_tiltcam) {

	#if defined DEBUG_CAMERA
		start_ms = millis();
	#endif

	if (command.cmd_in_cam.pan_rx) {
		pancam(command, servo_pancam);
	}


	if (command.cmd_in_cam.tilt_rx) {
		tiltcam(command, servo_tiltcam);
	}
			
	#if defined DEBUG_CAMERA
		stop_ms = millis();
		Serial.print("camera output - ");
		Serial.println(stop_ms - start_ms);
	#endif

}


void HPLRover_Camera::pancam(HPLRover_Command &command, Servo &servo_pancam) {
	int internal_pan_val = 0;
	bool pan_negative_val = false;
	
	internal_pan_val  = command.cmd_in_cam.pan_val;
	
	if (internal_pan_val == 0) {
		command.cmd_in_cam.pan_rx = false;
		command.cmd_in_cam.pan_val = 0;	
		return;
	}
	
	
	if (internal_pan_val < 0) {
		internal_pan_val = internal_pan_val * -1;
		pan_negative_val = true;
	}

	
	if (pan_negative_val == true) {	
		cam_pos_goto = cam_last_pan_pos - internal_pan_val;
	} else {
		cam_pos_goto = cam_last_pan_pos + internal_pan_val;
	}
	
	
	if (cam_pos_goto < cam_pan_val_min) {
		cam_pos_goto = cam_pan_val_min;
	}
	
	if (cam_pos_goto > cam_pan_val_max) {
		cam_pos_goto = cam_pan_val_max;
	}
	
	servo_pancam.write(cam_pos_goto);
	cam_last_pan_pos = cam_pos_goto;
	
	
}


void HPLRover_Camera::tiltcam(HPLRover_Command &command, Servo &servo_tiltcam) {
	int internal_tilt_val = 0;	
	bool tilt_negative_val = false;
	
	internal_tilt_val = command.cmd_in_cam.tilt_val;
	
	if (internal_tilt_val == 0) {
		command.cmd_in_cam.tilt_rx = false;
		command.cmd_in_cam.tilt_val = 0;	
		return;
	}
	
	
	if (internal_tilt_val < 0) {
		internal_tilt_val = internal_tilt_val * -1;
		tilt_negative_val = true;
	}


	if (tilt_negative_val == true) {	
		cam_pos_goto = cam_last_tilt_pos - internal_tilt_val;
	} else {
		cam_pos_goto = cam_last_tilt_pos + internal_tilt_val;
	}

	if (cam_pos_goto < cam_tilt_val_min) {
		cam_pos_goto = cam_tilt_val_min;
	}
	
	if (cam_pos_goto > cam_tilt_val_max) {
		cam_pos_goto = cam_tilt_val_max;
	}
	
	servo_tiltcam.write(cam_pos_goto);
	cam_last_tilt_pos = cam_pos_goto;

}


void HPLRover_Camera::centre(Servo &servo_pancam, Servo &servo_tiltcam) {
	servo_tiltcam.write(cam_tilt_val_centre);
    servo_pancam.write(cam_pan_val_centre);              
}


void HPLRover_Camera::sweep(Servo &servo_pancam, Servo &servo_tiltcam) {
	
  for (cam_last_pan_pos = cam_pan_val_centre; cam_last_pan_pos < cam_pan_val_max; cam_last_pan_pos += 1) {
    servo_pancam.write(cam_last_pan_pos);
    delay(cam_sweep_delay);                      
  }

  
  for (cam_last_tilt_pos = cam_tilt_val_centre; cam_last_tilt_pos>=cam_tilt_val_min; cam_last_tilt_pos -= 1) {                               
    servo_tiltcam.write(cam_last_tilt_pos);
    delay(cam_sweep_delay);                       
  }
  
  for (cam_last_pan_pos = cam_pan_val_max; cam_last_pan_pos>=cam_pan_val_min; cam_last_pan_pos -= 1) {  
    servo_pancam.write(cam_last_pan_pos);              
    delay(cam_sweep_delay);
  }

  for (cam_last_tilt_pos = cam_tilt_val_min; cam_last_tilt_pos < cam_tilt_val_max; cam_last_tilt_pos += 1) { 
    servo_tiltcam.write(cam_last_tilt_pos); 
    delay(cam_sweep_delay);
  }


  for (cam_last_tilt_pos = cam_tilt_val_max; cam_last_tilt_pos>=cam_tilt_val_centre; cam_last_tilt_pos -= 1) {                               
    servo_tiltcam.write(cam_last_tilt_pos);
    delay(cam_sweep_delay);                       
  }

  for (cam_last_pan_pos = cam_pan_val_min; cam_last_pan_pos < cam_pan_val_centre; cam_last_pan_pos += 1) { 
    servo_pancam.write(cam_last_pan_pos);              
    delay(cam_sweep_delay);
  }

}




