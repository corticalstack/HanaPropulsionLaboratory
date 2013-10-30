#ifndef HPLRover_Common_h
#define HPLRover_Common_h

#include "Arduino.h"

static uint32_t current_time_ms;
static uint32_t last_gcs_heartbeat_ms;
static uint32_t last_cam_pass_ms;

// Ardupilot digital output pin assignments
const int 		pin_leftmotor 						= 12;
const int 		pin_rightmotor 						= 11;
const int 		pin_light_left_mainbeam 			= 6;
const int 		pin_light_right_mainbeam 			= 3;
const int 		pin_pancam 							= 8;
const int 		pin_tiltcam 						= 7;



static bool  	cmd_process               			= false;

// Control commands
const char   	cmd_throttle             			= 'V';
const char   	cmd_direction            			= 'D';
const char   	cmd_heading              			= 'H';
const char   	cmd_rotate               			= 'R';
const char   	cmd_stop                 			= 'X';
const char   	cmd_step                 			= 'S';


const char   	cmd_cam_pan              			= 'P';
const char   	cmd_cam_tilt             			= 'T';
const char   	cmd_cam_sweep            			= 'W';

const char   	cmd_lights_mainbeam      			= 'L';


// Command values
const char   	cmd_val_on               			= '1';
const char   	cmd_val_off              			= '0';
const int    	cmd_velocity_val_allstop 			= 90;
const char   	cmd_val_forward          			= 'F';



// Motor control
const int 		internal_velocity_map_ratio 		= 70;
const int 		internal_heading_map_ratio  		= 50;
const float 	throttle_curve_power 				= 3.1359;
const float 	heading_curve_power 				= 2.6959;
const int 		throttle_deadzone_val       		= 1;


const int 		motor_calibration_adjust    		= 10;
const int 		left_motors_trim_val        		= 0;
const int 		right_motors_trim_val       		= 0;

const int 		max_left_throttle_reverse_val       = 20;
const int 		max_left_throttle_forward_val       = 160;

const int 		max_right_throttle_reverse_val      = 20;
const int 		max_right_throttle_forward_val      = 160;


// Camera Control
static int 		cam_last_pan_pos 					= 0;
static int 		cam_last_tilt_pos 					= 0;
static int 		cam_pos_goto 						= 0;
static int 		cam_last_pan_val						= 0;
static int 		cam_last_tilt_val					= 0;

const float 	cam_pan_curve_power 				= 2.6959;
const float 	cam_tilt_curve_power 				= 2.6959;
const int 		cam_pan_deadzone_val       			= 1;
const int 		cam_tilt_deadzone_val       		= 1;

const int 		cam_pan_val_min       				= 0;
const int 		cam_pan_val_max       				= 180;
const int 		cam_pan_val_centre    				= 90;

const int 		cam_tilt_val_min      				= 5;
const int 		cam_tilt_val_max      				= 100;
const int 		cam_tilt_val_centre   				= 55;

const int 		cam_sweep_delay       				= 25;


// GPS

#define MAX_LENGTH 512

const byte gps_posllh_msg = 0x02;
const byte gps_sbas_msg   = 0x32;
const byte gps_velned_msg = 0x12;
const byte gps_status_msg = 0x03;
const byte gps_sol_msg    = 0x06;
const byte gps_dop_msg    = 0x04;
const byte gps_dgps_msg   = 0x31;

#define LONG(X)    *(long*)(&data[X])
#define ULONG(X)   *(unsigned long*)(&data[X])
#define INT(X)     *(int*)(&data[X])
#define UINT(X)    *(unsigned int*)(&data[X])


static unsigned char  state, lstate, code, id, chk1, chk2, ck1, ck2;
static unsigned int  length, idx, cnt;

static unsigned char data[MAX_LENGTH];

static long lastTime = 0;







const char 		null_terminator             		= '\0';


class HPLRover_Common
{
  public:
    HPLRover_Common();        //Constructor
};

#endif
