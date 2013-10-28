#include "Arduino.h"
#include "Servo.h"

#include "HPLRover_Motors.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>


HPLRover_Motors::HPLRover_Motors() {
}

void HPLRover_Motors::output(HPLRover_Command &command, Servo &servo_leftmotors, Servo &servo_rightmotors) {

	int internal_throttle_val;
	int left_throttle_val;
	int right_throttle_val;


	int internal_heading_val;	
	
	
	if (command.cmd_in_motors.stop_rx == false && command.cmd_in_motors.direction_rx == false && command.cmd_in_motors.heading_rx == false) {
       return;
    }
       
	   
	internal_heading_val  = get_heading_curved(command.cmd_in_motors.heading_val);
	internal_throttle_val = get_throttle_curved(command.cmd_in_motors.throttle_val);
	
	
    if (command.cmd_in_motors.stop_rx || internal_throttle_val <= throttle_deadzone_val) {
      allstop(command, servo_leftmotors, servo_rightmotors);
	  reset_motors(command);
      return;
    }

    

    left_throttle_val     = adjust_left_motors_for_trim(internal_throttle_val);
    right_throttle_val    = adjust_right_motors_for_trim(internal_throttle_val);

        
    if(command.cmd_in_motors.direction_rx) {
       if(command.cmd_in_motors.direction_val == cmd_val_forward) {
//           Serial.println("Forward");
           left_throttle_val = left_throttle_val + 90;
           right_throttle_val = right_throttle_val + 90;
           if (internal_heading_val > 0) {
             left_throttle_val = left_throttle_val + internal_heading_val;
           }
           else
           {
             right_throttle_val = right_throttle_val - internal_heading_val;
           }
       }
       else
       {
//           Serial.println("Reverse");
           left_throttle_val = 90 - left_throttle_val;
           right_throttle_val = 90 - right_throttle_val;         
           if (internal_heading_val > 0) {
             left_throttle_val = left_throttle_val - internal_heading_val;
           }
           else
           {
             right_throttle_val = right_throttle_val - internal_heading_val;
           }
       }
    }
    
    
    if (left_throttle_val < max_left_throttle_reverse_val) {
      left_throttle_val = max_left_throttle_reverse_val;
    } 
 
    if (left_throttle_val > max_left_throttle_forward_val) {
      left_throttle_val = max_left_throttle_forward_val;
    } 
    
    if (right_throttle_val < max_right_throttle_reverse_val) {
      right_throttle_val = max_right_throttle_reverse_val;
    } 
    
    if (right_throttle_val > max_right_throttle_forward_val) {
      right_throttle_val = max_right_throttle_forward_val;
    } 
    


    
    
//    Serial.println("Going with these velocities");
//    Serial.println(left_throttle_val);
//    Serial.println(right_throttle_val);
    
    servo_leftmotors.write(left_throttle_val);
    servo_rightmotors.write(right_throttle_val);	
	
	
}

void HPLRover_Motors::reset_motors(HPLRover_Command &command) {
  command.cmd_in_motors.stop_rx = false;

  command.cmd_in_motors.heading_rx = false;
  command.cmd_in_motors.heading_val = 0;

  command.cmd_in_motors.direction_rx = false;
  command.cmd_in_motors.direction_val = 0;

  command.cmd_in_motors.rotate_rx = false;
}


void HPLRover_Motors::allstop(HPLRover_Command &command, Servo &servo_leftmotors, Servo &servo_rightmotors) {
  servo_leftmotors.write(cmd_velocity_val_allstop);
  servo_rightmotors.write(cmd_velocity_val_allstop);
}


int HPLRover_Motors::get_throttle_curved(int throttle_val) {
	
	throttle_val = pow(throttle_val, throttle_curve_power) / 10000;
	return throttle_val;
}


int HPLRover_Motors::get_heading_curved(int heading_val) {
    int temp_heading_val;

	temp_heading_val = heading_val;
	
	if (temp_heading_val < 0) {
		heading_val = temp_heading_val * -1;
	}
	
	heading_val = pow(heading_val, heading_curve_power) / 10000;
	
	if (temp_heading_val < 0) {
		heading_val = heading_val * -1;
	}
	
	return heading_val;
}


int HPLRover_Motors::adjust_left_motors_for_trim(int throttle_val) {
    throttle_val = throttle_val + left_motors_trim_val;
	return throttle_val;
}


int HPLRover_Motors::adjust_right_motors_for_trim(int throttle_val) {
    throttle_val = throttle_val + right_motors_trim_val;
	return throttle_val;
}