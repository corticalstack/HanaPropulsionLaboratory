#include "Arduino.h"
#include "HPLRover_Radio.h"
#include "HPLRover_Common.h"


struct HPLRover_Radio::data_stream_command_in_type HPLRover_Radio::radio_cmd_in;

HPLRover_Radio::HPLRover_Radio()
{
	serial_count = 0;   
}


// Init
void HPLRover_Radio::init()
{
 
}


void HPLRover_Radio::read_radio_data_stream()
{

  Serial.println("Read radio data stream");
  
  if (Serial.available()) 
  {
    serial_char = Serial.read();                               // read individual byte from serial connection
  
    switch (serial_char) {
      case ':' :  
        buffer[serial_count] = null_terminator;
        stream_register(buffer, serial_count);
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


void HPLRover_Radio::send_radio_data_stream(void* context)
{
  Serial.println("Send radio data stream");
}


void HPLRover_Radio::stream_register(char command[], int command_length) {   // deals with standardized input from serial connection

  if (command[0] == cmd_stop) 
  {
    HPLRover_Radio::radio_cmd_in.stop_rx = true;
  }
 
 
  if (command[0] == cmd_step) 
  {
    HPLRover_Radio::radio_cmd_in.step_rx = true;
  }
 

  if (command[0] == cmd_cam_sweep) 
  {
    HPLRover_Radio::radio_cmd_in.cam_sweep_rx = true;
  }

  
  if (command[0] == cmd_velocity) 
  {
    HPLRover_Radio::radio_cmd_in.velocity_rx = true;
    HPLRover_Radio::radio_cmd_in.velocity_val = (int)strtod(&command[1], NULL);
  }
 
  
  if (command[0] == cmd_direction) 
  {
    HPLRover_Radio::radio_cmd_in.direction_rx = true;
    HPLRover_Radio::radio_cmd_in.direction_val = command[1];
  }


  if (command[0] == cmd_cam_pan) 
  {
    HPLRover_Radio::radio_cmd_in.cam_pan_rx = true;
    HPLRover_Radio::radio_cmd_in.cam_pan_val = command[1];
  }


  if (command[0] == cmd_cam_tilt) 
  {
    HPLRover_Radio::radio_cmd_in.cam_tilt_rx = true;
    HPLRover_Radio::radio_cmd_in.cam_tilt_val = command[1];
  }
 
  
  if (command[0] == cmd_heading)
  {
    HPLRover_Radio::radio_cmd_in.heading_rx = true;
    HPLRover_Radio::radio_cmd_in.heading_val = (int)strtod(&command[1], NULL);
  }


  if (command[0] == cmd_rotate) 
  {
    HPLRover_Radio::radio_cmd_in.rotate_rx = true;
    HPLRover_Radio::radio_cmd_in.rotate_val = command[1];
  }


  if (command[0] == cmd_cam_pan) 
  {
    HPLRover_Radio::radio_cmd_in.cam_pan_rx = true;
    HPLRover_Radio::radio_cmd_in.cam_pan_val = (int)strtod(&command[1], NULL);
  }


  if (command[0] == cmd_cam_tilt) 
  {
    HPLRover_Radio::radio_cmd_in.cam_tilt_rx = true;
    HPLRover_Radio::radio_cmd_in.cam_tilt_val = (int)strtod(&command[1], NULL);
  }

  if (command[0] == cmd_lights_mainbeam) 
  {
    HPLRover_Radio::radio_cmd_in.lights_mainbeam_rx = true;
    HPLRover_Radio::radio_cmd_in.lights_mainbeam_val = command[1];
  }

}


void HPLRover_Radio::clear_buffer() { // empties command buffer from serial connection

  serial_count = 0; // reset buffer placement
  buffer[serial_count] = null_terminator; 
}


void HPLRover_Radio::test_call() { 

  Serial.println("Radio test call executed");

}
