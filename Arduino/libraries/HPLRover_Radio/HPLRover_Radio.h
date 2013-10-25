#ifndef HPLRover_Radio_h
#define HPLRover_Radio_h

#include "Arduino.h"
#include <HPLRover_Command.h>


class HPLRover_Radio {
  public:
    	
	//Constructor
    HPLRover_Radio();        
		
	void read_radio_data_stream(HPLRover_Command &command);
	
	static void send_radio_data_stream(void* context);
	void clear_buffer();
	void test_call();
	
	
	
  private:
	char serial_char;                                     // value for each byte read in from serial comms
	int serial_count;                                 // current length of command
	char buffer[100];                             // buffer for serial commands

	//Initialise the radio
	void init();
	
	void command_register(HPLRover_Command &command, char buffer[], int command_length);
	
};

#endif
