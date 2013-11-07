#ifndef HPLRover_Common_h
#define HPLRover_Common_h

#include "Arduino.h"

static 					uint32_t current_time_ms;
static 					uint32_t last_gcs_heartbeat_ms;
static 					uint32_t last_cam_pass_ms;

const unsigned long 	cockpit_heartbeat_threshold 		= 1000;
static bool  			cmd_process               			= false;
static int  			scheduler_switch                    = 0;


// Ardupilot digital output pin assignments
const int 				pin_leftmotor 						= 12;
const int 				pin_rightmotor 						= 11;
const int 				pin_light_left_mainbeam 			= 6;
const int 				pin_light_right_mainbeam 			= 3;
const int 				pin_pancam 							= 8;
const int 				pin_tiltcam 						= 7;





// Control commands
const char   			cmd_cockpit_heartbeat      			= 'B';

const char   			cmd_throttle             			= 'V';
const char   			cmd_direction            			= 'D';
const char   			cmd_heading              			= 'H';
const char   			cmd_rotate               			= 'R';
const char   			cmd_stop                 			= 'X';
const char   			cmd_step                 			= 'S';


const char   			cmd_cam_pan              			= 'P';
const char   			cmd_cam_tilt             			= 'T';
const char   			cmd_cam_sweep            			= 'W';

const char   			cmd_lights_mainbeam      			= 'L';


// Command values
const char   			cmd_val_on               			= '1';
const char   			cmd_val_off              			= '0';
const int    			cmd_velocity_val_allstop 			= 90;
const char   			cmd_val_forward          			= 'F';



// Motor control
const int 				internal_velocity_map_ratio 		= 60;
const int 				internal_heading_map_ratio  		= 65;
const int 				internal_rotate_map_ratio  			= 65;
const float 			throttle_curve_power 				= 3.1359;
const float 			heading_curve_power 				= 2.6959;
const int 				throttle_deadzone_val       		= 7;
const int 				heading_deadzone_val       			= 1;
const int 				rotate_deadzone_val       			= 7;


const int 				motor_calibration_adjust    		= 10;
const int 				left_motors_trim_val        		= 0;
const int 				right_motors_trim_val       		= 0;

const int 				max_left_throttle_reverse_val       = 40;
const int 				max_left_throttle_forward_val       = 140;

const int 				max_right_throttle_reverse_val      = 40;
const int 				max_right_throttle_forward_val      = 140;


// Camera Control
static int 				cam_last_pan_pos 					= 0;
static int 				cam_last_tilt_pos 					= 0;
static int 				cam_pos_goto 						= 0;
static int 				cam_last_pan_val					= 0;
static int 				cam_last_tilt_val					= 0;

const float 			cam_pan_curve_power 				= 2.6959;
const float 			cam_tilt_curve_power 				= 2.6959;
const int 				cam_pan_deadzone_val       			= 1;
const int 				cam_tilt_deadzone_val       		= 1;

const int 				cam_pan_val_min       				= 0;
const int 				cam_pan_val_max       				= 180;
const int 				cam_pan_val_centre    				= 90;

const int 				cam_tilt_val_min      				= 5;
const int 				cam_tilt_val_max      				= 100;
const int 				cam_tilt_val_centre   				= 55;

const int 				cam_sweep_delay       				= 25;


// GPS
#define 				MAX_LENGTH 							512
const byte 				gps_posllh_msg 						= 0x02;
const byte 				gps_sbas_msg   						= 0x32;
const byte 				gps_velned_msg 						= 0x12;
const byte 				gps_status_msg 						= 0x03;
const byte 				gps_sol_msg    						= 0x06;
const byte 				gps_dop_msg    						= 0x04;
const byte 				gps_dgps_msg   						= 0x31;

#define 				LONG(X)    							*(long*)(&data[X])
#define 				ULONG(X)   							*(unsigned long*)(&data[X])
#define 				INT(X)     							*(int*)(&data[X])
#define 				UINT(X)    							*(unsigned int*)(&data[X])


static unsigned char	state, 
						lstate, 
						code, 
						id, 
						chk1, 
						chk2, 
						ck1, 
						ck2;
						
static unsigned int  	length, 
						idx, 
						cnt;

static unsigned char 	data[MAX_LENGTH];

static long 			lastTime 							= 0;

const char 				msg_gps_nav_sol 					= 'S';
const char 				msg_gps_nav_posllh 					= 'P';
const char 				msg_gps_nav_velned 					= 'V';


// Compass
#define 				compass_address 					0x1E //0011110b, I2C 7bit address of HMC5883
const char				msg_compass							= 'C';
const byte              compass_sel_mode_register        	= 0x02;					//select mode register
const byte              compass_continuous_mode		        = 0x00;					//continuous measurement mode
const byte              compass_sel_reg3_xmsb				= 0x03;					//select register 3, X MSB register

const int 				compass_magx_offset 				= -160;
const int 				compass_magy_offset 				= -460;  
const float 			compass_magx_scale 					= 0.95639;


//Inertial Sensor
#define 				APM_HARDWARE_APM1 					1
#define 				APM_HARDWARE_APM2 					2
#define 				CONFIG_APM_HARDWARE 				APM_HARDWARE_APM2

const char				msg_ins								= 'I';


//Misc
const char 				comma_separator             		= ',';
const char 				null_terminator             		= '\0';
const char	 			msg_terminator             		    = ']';


class HPLRover_Common
{
  public:
    HPLRover_Common();        //Constructor
};

#endif
