#ifndef HPLRover_Radio_h
#define HPLRover_Radio_h

#include "Arduino.h"

class HPLRover_Radio 
{
  public:
  
  struct data_stream_command_in_type {
        boolean velocity_rx;
		int     velocity_val;
		
		boolean direction_rx;
		char    direction_val;
		
		boolean heading_rx;
		int     heading_val;
		
		boolean rotate_rx;
		char    rotate_val;
		
		boolean stop_rx;
		boolean step_rx;
				
		boolean lights_mainbeam_rx;
		int     lights_mainbeam_val;
		
		boolean cam_pan_rx;
		char    cam_pan_val;
				
		boolean cam_tilt_rx;
		char    cam_tilt_val;
		
		boolean cam_sweep_rx;		
    };
	
	
	static struct data_stream_command_in_type radio_cmd_in;
	
	//Constructor
    HPLRover_Radio();        
	
	//Initialise the radio
	void init();
	
	void read_radio_data_stream();
	
	static void send_radio_data_stream(void* context);
	
	
	
	
  private:
	char serial_char;                                     // value for each byte read in from serial comms
	int serial_count;                                 // current length of command
	char buffer[100];                             // buffer for serial commands
	
	void stream_register(char command[], int command_length);
	void clear_buffer();
};

#endif
