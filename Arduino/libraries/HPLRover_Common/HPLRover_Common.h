#ifndef HPLRover_Common_h
#define HPLRover_Common_h

#include "Arduino.h"
//#define DEBUG_RADIO
//#define DEBUG_MOTORS
//#define DEBUG_GPS
//#define DEBUG_COMPASS
//#define DEBUG_INERTIAL
//#define DEBUG_SENSORS
//#define DEBUG_CAMERA

static 					uint32_t current_time_ms;
static 					uint32_t last_gcs_heartbeat_ms;
static 					uint32_t last_cam_pass_ms;
static 					uint32_t start_ms;
static 					uint32_t stop_ms;


const unsigned long 	cockpit_heartbeat_threshold 		= 1000;
static bool  			cmd_process               			= false;
static int  			scheduler_switch                    = 0;


// Ardupilot digital output pin assignments
const int 				pin_leftmotor 						= 12;
const int 				pin_rightmotor 						= 11;
const int 				pin_light_laser 					= 2;
const int 				pin_gun1 							= 3;  
const int 				pin_gun2 							= 6;  
const int 				pin_pancam 							= 7;
const int 				pin_tiltcam 						= 8;
const int               pin_sharp2d120x_1_rear              = 6;
const int               pin_sharp2d120x_2_front             = 8;
const int               pin_sharp2y0a02_cam_mounted         = 7;
const int               pin_current					        = 12;
const int               pin_voltage					        = 13;


// Power
const float				power_pack_capacity_mah_max			= 10000.00;
const float				power_pack_capacity_mah_min			= 500.00;
const float				power_pack_volt_min   				= 7.4;
const float				power_volt_multiplier				= 10.45;
const float				power_current_amp_offset            = 0;
const float				power_amp_per_volt		            = 17;
const uint32_t          power_low_volt_timeout_ms           = 10000;
const char 				msg_power		 					= 'B';


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

const char   			cmd_weapons_gun1					= 'F';
const char   			cmd_weapons_gun2					= 'G';

const char   			cmd_lights_toggle_headlights		= 'M';
const char   			cmd_lights_toggle_laser				= 'L';


// Command values
const char   			cmd_val_on               			= '1';
const char   			cmd_val_off              			= '0';
const int    			cmd_velocity_val_allstop 			= 90;
const char   			cmd_val_forward          			= 'F';
const char   			cmd_val_reverse          			= 'R';


// Notify
const char 				msg_notify		 					= 'N';
const char 				msg_notify_thrust_failsafe			= 'T';
const char 				msg_notify_power_failsafe			= 'P';
const char 				msg_notify_comms_tick				= 'C';
const char 				msg_notify_systems_power_up			= 'S';
const char 				msg_notify_gps_init					= 'G';
const char 				msg_notify_inertial_init			= 'I';
const char 				msg_notify_compass_init				= 'M';
const char 				msg_notify_arming					= 'A';
const char 				msg_notify_armed					= 'B';


// Motor control
const int 				internal_velocity_map_ratio 		= 60;
const int 				internal_heading_map_ratio  		= 65;
const int 				internal_rotate_map_ratio  			= 65;
const float 			throttle_curve_power 				= 3.1359;
const float 			heading_curve_power 				= 2.6959;
const int 				throttle_deadzone_val       		= 7;
const int 				heading_deadzone_val       			= 1;
const int 				rotate_deadzone_val       			= 7;
const int 				rotate_offset		       			= 4;


const int 				motor_calibration_adjust    		= 10;
const int 				left_motors_trim_val        		= 0;
const int 				right_motors_trim_val       		= 0;

const int 				max_left_throttle_reverse_val       = 40;
const int 				max_left_throttle_forward_val       = 140;

const int 				max_right_throttle_reverse_val      = 40;
const int 				max_right_throttle_forward_val      = 140;

const char 				msg_motors_thrust 					= 'M';

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

const int 				cam_tilt_val_min      				= 90;
const int 				cam_tilt_val_max      				= 180;
const int 				cam_tilt_val_centre   				= 122;

const int 				cam_sweep_delay       				= 25;

const char 				msg_camera		 					= 'F';

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

const int 				gps_read_tick_max	 				= 30;
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


//Sharp Sensors
const char 				msg_sharpsensor 					= 'D';
const int               sensor_sharp_smooth_num_readings    = 5;
const float 			sensor_sharp2d120x_min_distcm       = 4.0;
const float 			sensor_sharp2d120x_max_distcm       = 30.0;

const float 			sensor_sharp2y0a02_min_distcm       = 20.0;
const float 			sensor_sharp2y0a02_max_distcm       = 150.0;

const float 			sensor_bumper_front_min_distcm		= 7.0;
const float 			sensor_bumper_rear_min_distcm		= 8.0;

static float 			sharp2d120x_sensor_out[] 			= { 30.0, 29.0, 28.0, 27.0, 26.0, 25.0, 24.0, 23.0, 22.0, 21.5, 21.0, 
																20.5, 20.0, 19.5, 19.0, 18.5, 18.0, 17.5, 17.0, 16.5, 16.0, 
																15.5, 15.0, 14.5, 14.0, 13.5, 13.0, 12.5, 12.0, 11.5, 11.0, 
																10.5, 10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 
																5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 0 };  // 48

static float			sharp2d120x_1_sensor_in[]  			= { 80, 84, 88, 92, 96, 100, 104, 108, 109, 112, 116, 
																119, 123, 124, 128, 132, 137, 140, 144, 152, 156, 
																160, 167, 171, 179, 183, 191, 196, 207, 215, 222, 
																234, 245, 257, 272, 287, 303, 322, 340, 366, 392, 
																425, 452, 493, 546, 586, 615, 999 }; 


static float 			sharp2d120x_2_sensor_in[]  			= { 73, 77, 81, 85, 90, 94, 98, 102, 106, 110, 114, 
																117, 118, 121, 125, 129, 133, 137, 141, 145, 149,
																157, 160, 169, 173, 180, 188, 192, 200, 211, 216,
																227, 239, 249, 265, 280, 296, 314, 337, 363, 392,
																418, 447, 483, 532, 590, 618, 999 }; 


//Misc
const char 				comma_separator             		= ',';
const char 				null_terminator             		= '\0';
const char	 			msg_terminator             		    = ']';


class HPLRover_Common
{
  public:
    HPLRover_Common();        //Constructor
	
	uint32_t 			last_time_millis;
	uint32_t 			last_time_micros;
};

#endif
