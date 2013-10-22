#ifndef HPLRover_Radio_h
#define HPLRover_Radio_h

#include "Arduino.h"

class HPLRover_Radio : public Radio
{
  public:
	static const char   cmd_velocity             = 'V';
	static const char   cmd_direction            = 'D';
	static const char   cmd_heading              = 'H';
	static const char   cmd_rotate               = 'R';
	static const char   cmd_stop                 = 'X';
	static const char   cmd_step                 = 'S';

	static const char   cmd_cam_pan              = 'P';
	static const char   cmd_cam_tilt             = 'T';
	static const char   cmd_cam_sweep            = 'W';

	static const char   cmd_lights_mainbeam      = 'L';
	static boolean     cmd_process;
	static boolean     cmd_velocity_rx;
	static boolean     cmd_direction_rx;
	static boolean     cmd_heading_rx;
	static boolean     cmd_rotate_rx;
	static boolean     cmd_stop_rx;
	static boolean     cmd_step_rx;
	static boolean     cmd_pan_rx;
	static boolean     cmd_tilt_rx;
	static boolean     cmd_lights_mainbeam_rx;
	static boolean     cmd_cam_pan_rx;
	static boolean     cmd_cam_tilt_rx;
	static boolean     cmd_cam_sweep_rx;
	
	static int          cmd_velocity_val;
	static char         cmd_direction_val;
	static int          cmd_heading_val;
	static char         cmd_rotate_val;
	static int          cmd_pan_val;
	static int          cmd_tilt_val;
	static int          cmd_lights_mainbeam_val;
	static char         cmd_cam_pan_val;
	static char         cmd_cam_tilt_val;

    HPLRover_Radio();        //Constructor
	void read_radio_data_stream();
	static void send_radio_data_stream(void* context);
	void stream_register(char command[], int command_length);
	void clear_buffer();
	
  private: 
	char serial_char;                                     // value for each byte read in from serial comms
	static int serial_count;                                   // current length of command
	static const int max_cmd_size = 100;                
	static char buffer[max_cmd_size];                             // buffer for serial commands
	static const char null_terminator             = '\0';

};

#endif
