#include "Arduino.h"
#include "Servo.h"

#include "HPLRover_Camera.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>

HPLRover_Camera::HPLRover_Camera() {
}

void HPLRover_Camera::output(HPLRover_Command &command, Servo &servo_pancam, Servo &servo_tiltcam) {
	int internal_pan_val;
	int internal_tilt_val;	
    bool pan_negative_val = false;
	bool tilt_negative_val = false;

	
	if (command.cmd_in_cam.pan_rx == false && command.cmd_in_cam.tilt_rx == false) {
       return;
    }


	internal_pan_val  = command.cmd_in_cam.pan_val;
	internal_tilt_val = command.cmd_in_cam.tilt_val;
	
	
	if (internal_pan_val < 0) {
		internal_pan_val = internal_pan_val * -1;
		pan_negative_val = true;
	}

	
	if (internal_tilt_val < 0) {
		internal_tilt_val = internal_tilt_val * -1;
		tilt_negative_val = true;
	}

	
	internal_pan_val  = get_pan_curved(internal_pan_val);
	internal_tilt_val = get_tilt_curved(internal_tilt_val);
	
	
	if (internal_pan_val <= cam_pan_deadzone_val ) {
		internal_pan_val = 0;
	}
	
	
	if (internal_tilt_val <= cam_tilt_deadzone_val) {
		internal_tilt_val = 0;
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
	
	cam_last_pan_val = internal_pan_val;
	cam_last_tilt_val = internal_tilt_val;
	
	if (internal_pan_val < cam_last_pan_val) {
		command.cmd_in_cam.pan_rx = 0;
		command.cmd_in_cam.pan_val = 0;
	}

	if (internal_tilt_val < cam_last_tilt_val) {
		command.cmd_in_cam.tilt_rx = 0;
		command.cmd_in_cam.tilt_val = 0;
	}
	
}


int HPLRover_Camera::get_pan_curved(int pan_val) {
	
	pan_val = pow(pan_val, cam_pan_curve_power) / 10000;
	return pan_val;
}


int HPLRover_Camera::get_tilt_curved(int tilt_val) {
	
	tilt_val = pow(tilt_val, cam_tilt_curve_power) / 10000;	
	return tilt_val;
}


void HPLRover_Camera::sweep(Servo &servo_pancam, Servo &servo_tiltcam) {

  for (cam_last_pan_pos = cam_pan_val_centre; cam_last_pan_pos < cam_pan_val_max; cam_last_pan_pos += 1) {
    servo_pancam.write(cam_last_pan_pos);
    delay(cam_sweep_delay);                      
  }

  
  for (cam_last_tilt_pos = cam_tilt_val_min; cam_last_tilt_pos < cam_tilt_val_max; cam_last_tilt_pos += 1) { 
    servo_tiltcam.write(cam_last_tilt_pos); 
    delay(cam_sweep_delay);
  }


  for (cam_last_tilt_pos = cam_tilt_val_max; cam_last_tilt_pos>=cam_tilt_val_min; cam_last_tilt_pos -= 1) {                               
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


