#include "Arduino.h"
#include "Servo.h"
#include <PString.h>
#include "HPLRover_Motors.h"
#include "HPLRover_Common.h"
#include <HPLRover_Command.h>
#include <HPLRover_Notify.h>
#include <HPLRover_SharpSensor.h>

struct HPLRover_Motors::motors_msg_thrust_type 		HPLRover_Motors::motors_msg_thrust;

HPLRover_Motors::HPLRover_Motors() {
}

void HPLRover_Motors::output(HPLRover_Motors &motors, HPLRover_Command &command, HPLRover_Notify &notify, HPLRover_SharpSensor &sharpsensor, Servo &servo_leftmotors, Servo &servo_rightmotors) {
	
	int internal_throttle_val 	= 0;
	int left_throttle_val 		= 0;
	int right_throttle_val 		= 0;
    
	int internal_heading_val 	= 0;	
	bool heading_anti_clockwise = false;
	
	int internal_rotate_val 	= 0;	
	bool rotate_anti_clockwise 	= false;


	if (notify.notify.cockpit_heartbeat == false) {
		allstop(motors, command, servo_leftmotors, servo_rightmotors);
		reset_motors(command);
		return;
	}

	
	if (notify.notify.power_failsafe == true) {
		allstop(motors, command, servo_leftmotors, servo_rightmotors);
		reset_motors(command);
	}
	
	
	if (command.cmd_in_motors.stop_rx) { 
	  allstop(motors, command, servo_leftmotors, servo_rightmotors);
	  reset_motors(command);
      return;
    }
	
	
	if (command.cmd_in_motors.direction_rx == false && command.cmd_in_motors.rotate_rx == false) {
       return;
    }
		
	
	internal_heading_val = command.cmd_in_motors.heading_val;
	if (internal_heading_val < 0) {
		internal_heading_val = internal_heading_val * -1;
		heading_anti_clockwise = true;
	}
	
	
	internal_rotate_val = command.cmd_in_motors.rotate_val;	
	if (internal_rotate_val < 0) {
		internal_rotate_val = internal_rotate_val * -1;
		rotate_anti_clockwise = true;
	}
	
	
	internal_throttle_val = get_throttle_curved(command.cmd_in_motors.throttle_val);
	internal_heading_val  = get_heading_curved(internal_heading_val);	
	internal_rotate_val   = get_rotate_curved(internal_rotate_val);
	
	
	if ((command.cmd_in_motors.direction_rx == true && internal_throttle_val <= throttle_deadzone_val) || 
	    (command.cmd_in_motors.rotate_rx    == true && internal_rotate_val   <= rotate_deadzone_val)) {
		allstop(motors, command, servo_leftmotors, servo_rightmotors);
		reset_motors(command);
		return;
    }

	
	switch (command.cmd_in_motors.direction_val) {
		case cmd_val_forward:
			sharpsensor.read_front_bumper(sharpsensor);
			break;
		case cmd_val_reverse:
			sharpsensor.read_rear_bumper(sharpsensor);
			break;
	}
	
	
	
//	if (command.cmd_in_motors.direction_val == cmd_val_forward && (sharpsensor.sharpsensor_msg.sensor2_valuecm < (sensor_bumper_front_min_distcm + ((internal_throttle_val / 100) * 50)))) {
//		allstop(motors, command, servo_leftmotors, servo_rightmotors);
//		reset_motors(command);
//		notify.notify.thrust_failsafe = true;
//		return;
//	}


	if (command.cmd_in_motors.direction_val == cmd_val_reverse && (sharpsensor.sharpsensor_msg.sensor1_valuecm < (sensor_bumper_rear_min_distcm + ((internal_throttle_val / 100) * 50)))) {
		allstop(motors, command, servo_leftmotors, servo_rightmotors);
		reset_motors(command);
		notify.notify.thrust_failsafe = true;
		return;
	}
	
			
	if (command.cmd_in_motors.rotate_rx && !command.cmd_in_motors.direction_rx) {
	   rotate(motors, command, internal_rotate_val, rotate_anti_clockwise, servo_leftmotors, servo_rightmotors);
	   reset_motors(command);
	   return;
	}
    

    left_throttle_val     = adjust_left_throttle_for_trim(internal_throttle_val);
    right_throttle_val    = adjust_right_throttle_for_trim(internal_throttle_val);

        
    if(command.cmd_in_motors.direction_rx) {
       if(command.cmd_in_motors.direction_val == cmd_val_forward) {
           left_throttle_val = left_throttle_val + 90;
           right_throttle_val = right_throttle_val + 90;
           if (heading_anti_clockwise == false) {
             left_throttle_val = left_throttle_val + internal_heading_val;
           }
           else
           {
             right_throttle_val = right_throttle_val + internal_heading_val;
           }
       }
       else
       {
           left_throttle_val = 90 - left_throttle_val;
           right_throttle_val = 90 - right_throttle_val;         
           if (heading_anti_clockwise == false) {
             left_throttle_val = left_throttle_val - internal_heading_val;
           }
           else
           {
             right_throttle_val = right_throttle_val - internal_heading_val;
           }
       }
    }
    
	
	
	left_throttle_val  = adjust_left_throttle_for_limits(left_throttle_val);
	right_throttle_val = adjust_right_throttle_for_limits(right_throttle_val);
        
	servo_leftmotors.write(left_throttle_val);
    servo_rightmotors.write(right_throttle_val);	
	
	motors.motors_msg_thrust.left_throttle_val 	= left_throttle_val;
	motors.motors_msg_thrust.right_throttle_val = right_throttle_val;
}

void HPLRover_Motors::reset_motors(HPLRover_Command &command) {
  command.cmd_in_motors.stop_rx = false;

  command.cmd_in_motors.heading_rx = false;
  command.cmd_in_motors.heading_val = 0;

  command.cmd_in_motors.direction_rx = false;
  command.cmd_in_motors.direction_val = 0;

  command.cmd_in_motors.rotate_rx = false;
  command.cmd_in_motors.rotate_val = 0;
}


void HPLRover_Motors::allstop(HPLRover_Motors &motors, HPLRover_Command &command, Servo &servo_leftmotors, Servo &servo_rightmotors) {
  servo_leftmotors.write(cmd_velocity_val_allstop);
  servo_rightmotors.write(cmd_velocity_val_allstop);
  
  motors.motors_msg_thrust.left_throttle_val  = cmd_velocity_val_allstop;
  motors.motors_msg_thrust.right_throttle_val = cmd_velocity_val_allstop;

}


void HPLRover_Motors::rotate(HPLRover_Motors &motors, HPLRover_Command &command, int rotate_val, bool anti_clockwise, Servo &servo_leftmotors, Servo &servo_rightmotors) {
	int left_throttle_val;
	int right_throttle_val;

	if (anti_clockwise) {
		left_throttle_val = 90 - rotate_val;
        right_throttle_val = 90 + rotate_val;
	}
	else
	{
		left_throttle_val = 90 + rotate_val;
        right_throttle_val = 90 - rotate_val;
	}
	
	
	left_throttle_val 	= adjust_left_throttle_for_limits(left_throttle_val);
	right_throttle_val	= adjust_right_throttle_for_limits(right_throttle_val);
	    
	servo_leftmotors.write(left_throttle_val);
    servo_rightmotors.write(right_throttle_val);	
	
    motors.motors_msg_thrust.left_throttle_val  = left_throttle_val;
    motors.motors_msg_thrust.right_throttle_val = right_throttle_val;

}


int HPLRover_Motors::get_throttle_curved(int throttle_val) {
	float internal_velocity_val_float;
	
	internal_velocity_val_float = float(throttle_val) / 100 * float(internal_velocity_map_ratio);
    throttle_val = internal_velocity_val_float;

//	throttle_val = pow(throttle_val, throttle_curve_power) / 10000;

	return throttle_val;
}


int HPLRover_Motors::get_heading_curved(int heading_val) {
	float internal_heading_val_float;
	
	internal_heading_val_float = float(heading_val) / 100 * float(internal_heading_map_ratio);
    heading_val = internal_heading_val_float;
	
	if (heading_val <= heading_deadzone_val) {
		heading_val = 0;
	}
	
	return heading_val;
}


int HPLRover_Motors::get_rotate_curved(int rotate_val) {
	float internal_rotate_val_float;
	
	internal_rotate_val_float = float(rotate_val) / 100 * float(internal_rotate_map_ratio);
    rotate_val = internal_rotate_val_float;
	
	if (rotate_val <= rotate_deadzone_val) {
		rotate_val = 0;
	}
	
	rotate_val += rotate_offset;
	return rotate_val;
}


int HPLRover_Motors::adjust_left_throttle_for_trim(int throttle_val) {
    throttle_val = throttle_val + left_motors_trim_val;
	return throttle_val;
}


int HPLRover_Motors::adjust_right_throttle_for_trim(int throttle_val) {
    throttle_val = throttle_val + right_motors_trim_val;
	return throttle_val;
}


int HPLRover_Motors::adjust_left_throttle_for_limits(int throttle_val) {
    if (throttle_val < max_left_throttle_reverse_val) {
		throttle_val = max_left_throttle_reverse_val;
    } 
 
    if (throttle_val > max_left_throttle_forward_val) {
		throttle_val = max_left_throttle_forward_val;
    } 

	return throttle_val;
}


int HPLRover_Motors::adjust_right_throttle_for_limits(int throttle_val) {
    if (throttle_val < max_right_throttle_reverse_val) {
		throttle_val = max_right_throttle_reverse_val;
    } 
    
    if (throttle_val > max_right_throttle_forward_val) {
		throttle_val = max_right_throttle_forward_val;
    } 

	return throttle_val;
}

void HPLRover_Motors::output_thrust(HPLRover_Motors &motors) {  
	
	char motors_buffer[20];
	PString motors_str(motors_buffer, sizeof(motors_buffer));
	motors_str += msg_motors_thrust;
	motors_str += motors.motors_msg_thrust.left_throttle_val;
	motors_str += comma_separator;
	motors_str += motors.motors_msg_thrust.right_throttle_val;
	motors_str += msg_terminator;  
	Serial.println(motors_str);	
	
}