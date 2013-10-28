#ifndef HPLRover_Common_h
#define HPLRover_Common_h

#include "Arduino.h"

// Ardupilot digital output pin assignments
const int pin_leftmotor = 12;
const int pin_rightmotor = 11;
const int pin_light_left_mainbeam = 6;
const int pin_light_right_mainbeam = 3;
const int pin_cam_pan = 8;
const int pin_cam_tilt = 7;



static boolean     cmd_process               = false;

// Control commands
const char   cmd_throttle             = 'V';
const char   cmd_direction            = 'D';
const char   cmd_heading              = 'H';
const char   cmd_rotate               = 'R';
const char   cmd_stop                 = 'X';
const char   cmd_step                 = 'S';


const char   cmd_cam_pan              = 'P';
const char   cmd_cam_tilt             = 'T';
const char   cmd_cam_sweep            = 'W';

const char   cmd_lights_mainbeam      = 'L';


// Command values
const char   cmd_val_on               = '1';
const char   cmd_val_off              = '0';
const int    cmd_velocity_val_allstop = 90;
const char   cmd_val_forward          = 'F';
const char   cmd_val_left             = 'L';
const char   cmd_val_right            = 'R';
const char   cmd_val_up               = 'U';
const char   cmd_val_down             = 'D';



// Motor control
const int internal_velocity_map_ratio 	= 70;
const int internal_heading_map_ratio  	= 50;
const float throttle_curve_power 		= 3.1359;
const float heading_curve_power 		= 2.8159;
const int throttle_deadzone_val       	= 3;


const int motor_calibration_adjust    = 10;
const int left_motors_trim_val        = 3;
const int right_motors_trim_val       = 0;

const int max_left_throttle_reverse_val       = 20;
const int max_left_throttle_forward_val       = 160;

const int max_right_throttle_reverse_val      = 20;
const int max_right_throttle_forward_val      = 160;


const char null_terminator             = '\0';


class HPLRover_Common
{
  public:
    HPLRover_Common();        //Constructor
};

#endif
