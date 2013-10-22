#include "Arduino.h"
#include "HPLRover_Radio.h"

HPLRover_Radio::HPLRover_Radio()
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
        if (serial_count > max_cmd_size)                      // overflow, dump and restart
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
    cmd_stop_rx = true;
  }
 
 
  if (command[0] == cmd_step) 
  {
    cmd_step_rx = true;
  }
 

  if (command[0] == cmd_cam_sweep) 
  {
    cmd_cam_sweep_rx = true;
  }

  
  if (command[0] == cmd_velocity) 
  {
    cmd_velocity_rx = true;
    cmd_velocity_val = (int)strtod(&command[1], NULL);
  }
 
  
  if (command[0] == cmd_direction) 
  {
    cmd_direction_rx = true;
    cmd_direction_val = command[1];
  }


  if (command[0] == cmd_cam_pan) 
  {
    cmd_cam_pan_rx = true;
    cmd_cam_pan_val = command[1];
  }


  if (command[0] == cmd_cam_tilt) 
  {
    cmd_cam_tilt_rx = true;
    cmd_cam_tilt_val = command[1];
  }
 
  
  if (command[0] == cmd_heading)
  {
    cmd_heading_rx = true;
    cmd_heading_val = (int)strtod(&command[1], NULL);
  }


  if (command[0] == cmd_rotate) 
  {
    cmd_rotate_rx = true;
    cmd_rotate_val = command[1];
  }


  if (command[0] == cmd_cam_pan) 
  {
    cmd_pan_rx = true;
    cmd_pan_val = (int)strtod(&command[1], NULL);
  }


  if (command[0] == cmd_cam_tilt) 
  {
    cmd_tilt_rx = true;
    cmd_tilt_val = (int)strtod(&command[1], NULL);
  }

  if (command[0] == cmd_lights_mainbeam) 
  {
    cmd_lights_mainbeam_rx = true;
    cmd_lights_mainbeam_val = command[1];
  }

  
  // done processing commands
  if (Serial.available() <= 0) {
//    Serial.print('A', BYTE);   // send a capital A
  }

}


void HPLRover_Radio::clear_buffer() { // empties command buffer from serial connection

  serial_count = 0; // reset buffer placement
  buffer[serial_count] = null_terminator; 
}
