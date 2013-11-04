#include "Arduino.h"
#include "HPLRover_Radio.h"
#include "HPLRover_Common.h"
#include "HPLRover_Command.h"


HPLRover_Radio::HPLRover_Radio() {
	serial_count = 0;   
}


// Init
void HPLRover_Radio::init() {
 
}


void HPLRover_Radio::read_radio_data_stream(HPLRover_Command &command) {

//  Serial.println("Read radio data stream");
  
  if (Serial.available()) 
  {
    serial_char = Serial.read();                               // read individual byte from serial connection
  
    switch (serial_char) {
      case ':' :  
        buffer[serial_count] = null_terminator;
        command_register(command, buffer, serial_count);
        clear_buffer();
        break;
      case ']' :
        cmd_process = true;
        break;
      default:
        buffer[serial_count] = serial_char;                   // add byte to buffer string
        serial_count++;
        if (serial_count > 100)                      // overflow, dump and restart
        {
          clear_buffer();
          Serial.flush();
        }            
    }
  }

}


void HPLRover_Radio::send_radio_data_stream(void* context) {
  //Serial.println("Send radio data stream");
}


void HPLRover_Radio::command_register(HPLRover_Command &command, char buffer[], int command_length) {   // deals with standardized input from serial connection

    last_gcs_heartbeat_ms = millis();
	
	if (buffer[0] == cmd_throttle) {
		command.cmd_in_motors.throttle_rx = true;
		command.cmd_in_motors.throttle_val = (int)strtod(&buffer[1], NULL);
	}
 
	
	if (buffer[0] == cmd_stop) {
		command.cmd_in_motors.stop_rx = true;
	}
 
 
	if (buffer[0] == cmd_step) {
		command.cmd_in_motors.step_rx = true;
	}

  
	if (buffer[0] == cmd_direction) {
		command.cmd_in_motors.direction_rx = true;
		command.cmd_in_motors.direction_val = buffer[1];
	}
  

	if (buffer[0] == cmd_heading) {
		command.cmd_in_motors.heading_rx = true;
		command.cmd_in_motors.heading_val = (int)strtod(&buffer[1], NULL);
	}


	if (buffer[0] == cmd_rotate) {
		command.cmd_in_motors.rotate_rx = true;
		command.cmd_in_motors.rotate_val = (int)strtod(&buffer[1], NULL);
	}
	
	
	if (buffer[0] == cmd_cam_sweep) {
		command.cmd_in_cam.sweep_rx = true;
	}

 
	if (buffer[0] == cmd_cam_pan) {
		command.cmd_in_cam.pan_rx = true;
		command.cmd_in_cam.pan_val = (int)strtod(&buffer[1], NULL);
	}


	if (buffer[0] == cmd_cam_tilt) {
		command.cmd_in_cam.tilt_rx = true;
		command.cmd_in_cam.tilt_val = (int)strtod(&buffer[1], NULL);
	}
   

	if (buffer[0] == cmd_lights_mainbeam) {
		command.cmd_in_lights.lights_mainbeam_rx = true;
		command.cmd_in_lights.lights_mainbeam_val = buffer[1];
	}

}


void HPLRover_Radio::clear_buffer() { // empties command buffer from serial connection

  serial_count = 0; // reset buffer placement
  buffer[serial_count] = null_terminator; 
}


void HPLRover_Radio::test_call() { 

  Serial.println("Radio test call executed");

}
