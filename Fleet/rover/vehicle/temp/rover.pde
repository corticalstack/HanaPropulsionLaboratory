#include <Event.h>
#include <Timer.h>


#include <Servo.h>

Timer t;

const char null_terminator             = '\0';
char serial_char;                                     // value for each byte read in from serial comms
int serial_count                       = 0;           // current length of command


// Hardware

const int pin_leftmotor = 3;
const int pin_rightmotor = 2;
const int pin_light_left_mainbeam = 7;
const int pin_light_right_mainbeam = 8;
const int pin_cam_pan = 9;
const int pin_cam_tilt = 10;

const int pin_sharp_ir = 5;


Servo servo_leftmotors,
      servo_rightmotors,
      servo_cam_pan,
      servo_cam_tilt;


// Command control
const int max_cmd_size                = 100;
char buffer[max_cmd_size];                             // buffer for serial commands



// Commands

const char   cmd_velocity             = 'V';
const char   cmd_direction            = 'D';
const char   cmd_heading              = 'H';
const char   cmd_rotate               = 'R';
const char   cmd_stop                 = 'X';
const char   cmd_step                 = 'S';

const char   cmd_cam_pan              = 'P';
const char   cmd_cam_tilt             = 'T';
const char   cmd_cam_sweep            = 'W';

const char   cmd_lights_mainbeam      = 'L';


// Commands received
boolean     cmd_process               = false;
boolean     cmd_velocity_rx           = false;
boolean     cmd_direction_rx          = false;
boolean     cmd_heading_rx            = false;
boolean     cmd_rotate_rx             = false;
boolean     cmd_stop_rx               = false;
boolean     cmd_step_rx               = false;
boolean     cmd_pan_rx                = false;
boolean     cmd_tilt_rx               = false;
boolean     cmd_lights_mainbeam_rx    = false;
boolean     cmd_cam_pan_rx            = false;
boolean     cmd_cam_tilt_rx           = false;
boolean     cmd_cam_sweep_rx          = false;


// Command values
const char   cmd_val_on               = '1';
const char   cmd_val_off              = '0';
const int    cmd_velocity_val_allstop = 90;
const char   cmd_val_forward          = 'F';
const char   cmd_val_left             = 'L';
const char   cmd_val_right            = 'R';
const char   cmd_val_up               = 'U';
const char   cmd_val_down             = 'D';

int          cmd_velocity_val;
char         cmd_direction_val;
int          cmd_heading_val;
char         cmd_rotate_val;
int          cmd_pan_val;
int          cmd_tilt_val;
int          cmd_lights_mainbeam_val;
char         cmd_cam_pan_val;
char         cmd_cam_tilt_val;

// Motor control
const int internal_velocity_map_ratio = 70;
const int internal_heading_map_ratio  = 50;

const int motor_calibration_adjust    = 10;
const int left_velocity_val_trim      = 0;
const int right_velocity_val_trim     = 0;

const int left_velocity_val_min       = 20;
const int left_velocity_val_max       = 160;

const int right_velocity_val_min      = 20;
const int right_velocity_val_max      = 160;


float internal_velocity_val_float;
int internal_velocity_val;
int left_velocity_val;
int right_velocity_val;


float internal_heading_val_float;
int internal_heading_val;



// Pan cam control
int last_pan_pos = 0;
int last_tilt_pos = 0;
int pos_goto = 0;
int sharp_ir_val = 0;

const int cam_pan_val_min       = 0;
const int cam_pan_val_max       = 180;
const int cam_pan_val_centre    = 90;


const int cam_tilt_val_min      = 0;
const int cam_tilt_val_max      = 100;
const int cam_tilt_val_centre   = 100;



void setup() {                                        // initialization loop for pin types and initial values

//  Serial.begin(9600);                                 // Initialise serial interface
  Serial.begin(57600);

  delay(2000);                                        // Delay for Sabertooth sync
  
  servo_leftmotors.attach(pin_leftmotor);             // Use PWM pin 2 to control Sabertooth.
  servo_rightmotors.attach(pin_rightmotor);           // Use PWM 3 to control Sabertooth.
    
  pinMode(pin_light_left_mainbeam, OUTPUT);     
  pinMode(pin_light_right_mainbeam, OUTPUT);     

  clear_buffer();
  cmd_process = false;
  
  t.every(100, get_sharp_ir);

}


void loop() {       
  
  t.update();
  
  get_command(); 
  
  if (cmd_process)
  {
     command_lights();
     command_motor();
     command_step();
     command_cam_pan();
     command_cam_tilt();
     command_cam_sweep();
     clear_buffer();
     reset_command_tx();
     cmd_process = false;
  }
  
  
  
}


void get_command() { 

  if (Serial.available()) 
  {
    serial_char = Serial.read();                               // read individual byte from serial connection
  
    switch (serial_char) {
      case ':' :  
        buffer[serial_count] = null_terminator;
        command_register(buffer, serial_count);
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


void command_register(char command[], int command_length) {   // deals with standardized input from serial connection

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

void command_motor() {
//    Serial.println("Command motor");
    
    if (cmd_stop_rx == false && cmd_direction_rx == false && cmd_rotate_rx == false) {
       return;
    }
       
    if (cmd_stop_rx) {
//      Serial.println("Stop");
      cmd_heading_val = 0;
      allstop();
      return;
    }

    internal_heading_val = 0;
    
    internal_velocity_val_float = float(cmd_velocity_val) / 100 * float(internal_velocity_map_ratio);
    internal_velocity_val = internal_velocity_val_float;


//    Serial.println("Adjusting for heading");
    internal_heading_val_float = float(cmd_heading_val) / 60 * float(internal_heading_map_ratio);
    internal_heading_val = internal_heading_val_float;    
//    Serial.println(internal_heading_val);
    
    left_velocity_val  = motor_calibration_adjust + left_velocity_val_trim  + internal_velocity_val;
    right_velocity_val = motor_calibration_adjust + right_velocity_val_trim + internal_velocity_val;
    
    if (cmd_rotate_rx == true && cmd_direction_rx == false) {
      cmd_direction_rx = true;
      cmd_direction_val = cmd_val_forward;
    }
    
    if(cmd_direction_rx) {
       if(cmd_direction_val == cmd_val_forward) {
//           Serial.println("Forward");
           left_velocity_val = left_velocity_val + 90;
           right_velocity_val = right_velocity_val + 90;
           if (internal_heading_val > 0) {
             left_velocity_val = left_velocity_val + internal_heading_val;
           }
           else
           {
             right_velocity_val = right_velocity_val + internal_heading_val;
           }
       }
       else
       {
//           Serial.println("Reverse");
           left_velocity_val = 90 - left_velocity_val;
           right_velocity_val = 90 - right_velocity_val;         
           if (internal_heading_val > 0) {
             left_velocity_val = left_velocity_val - internal_heading_val;
           }
           else
           {
             right_velocity_val = right_velocity_val - internal_heading_val;
           }
       }
    }
    
    
    if (left_velocity_val < left_velocity_val_min) {
      left_velocity_val = left_velocity_val_min;
    } 
 
    if (left_velocity_val > left_velocity_val_max) {
      left_velocity_val = left_velocity_val_max;
    } 
    
    if (right_velocity_val < right_velocity_val_min) {
      right_velocity_val = right_velocity_val_min;
    } 
    
    if (right_velocity_val > right_velocity_val_max) {
      right_velocity_val = right_velocity_val_max;
    } 
    

    if(cmd_rotate_rx) {
      if(cmd_rotate_val == cmd_val_right) {
//          Serial.println("Clockwise");
          right_velocity_val = 0;
       }
       else
       {
//         Serial.println("Counter Clockwise");
         left_velocity_val = 0;
      }
        
    }

    
    
//    Serial.println("Going with these velocities");
//    Serial.println(left_velocity_val);
//    Serial.println(right_velocity_val);
    
    servo_leftmotors.write(left_velocity_val);
    servo_rightmotors.write(right_velocity_val);

}


void command_lights() {
//  Serial.println("Command lights");
    
  if (cmd_lights_mainbeam_rx == false) {
       return;
  }
  
  if (cmd_lights_mainbeam_val == cmd_val_on) {
      digitalWrite(pin_light_left_mainbeam, HIGH);   
      digitalWrite(pin_light_right_mainbeam, HIGH);   
  }
  else
  {
      digitalWrite(pin_light_left_mainbeam, LOW);   
      digitalWrite(pin_light_right_mainbeam, LOW);   
    
  }
        
}


void command_step() {
//  Serial.println("Command step");
  if (cmd_step_rx == false) {  
    return;
  }

  delay(500);
  allstop();
 
}


void allstop() {
  servo_leftmotors.write(cmd_velocity_val_allstop);
  servo_rightmotors.write(cmd_velocity_val_allstop);
}


void command_cam_pan() {

  if (cmd_cam_pan_rx == false) {
    return;
  }

//  Serial.println("Command pan");
//  Serial.println(cmd_cam_pan_val);
  
  servo_cam_pan.attach(pin_cam_pan); 
  
  if (cmd_cam_pan_val == cmd_val_left) {
    cam_pan_left();
  }
  else
  {
    cam_pan_right();
  }
  
  servo_cam_pan.detach();   //Does this stop the servo jitter??


}


void command_cam_tilt() {

  if (cmd_cam_tilt_rx == false) {
    return;
  }

//  Serial.println("Command tilt");
//  Serial.println(cmd_cam_tilt_val);
  
  servo_cam_tilt.attach(pin_cam_tilt); 
  
  if (cmd_cam_tilt_val == cmd_val_up) {
    cam_tilt_up();
  }
  else
  {
    cam_tilt_down();
  }
  
  servo_cam_tilt.detach();   //Does this stop the servo jitter??


}


void cam_pan_left() {

  pos_goto = last_pan_pos - 10;
    
  if (pos_goto < cam_pan_val_min) {
    pos_goto = cam_pan_val_min;
   }
     
   for (last_pan_pos = last_pan_pos; last_pan_pos > pos_goto; last_pan_pos -= 1) {
     servo_cam_pan.write(last_pan_pos);
     delay(15);                      
   }
}


void cam_pan_right() {

  pos_goto = last_pan_pos + 10;
  if (pos_goto > cam_pan_val_max) {
    pos_goto = cam_pan_val_max;
  }

  for (last_pan_pos = last_pan_pos; last_pan_pos < pos_goto; last_pan_pos += 1) {
//    Serial.println(last_pan_pos);
    servo_cam_pan.write(last_pan_pos);
    delay(15);                      
  }
}


void cam_tilt_down() {

  pos_goto = last_tilt_pos - 10;
    
  if (pos_goto < cam_tilt_val_min) {
    pos_goto = cam_tilt_val_min;
   }
     
   for (last_tilt_pos = last_tilt_pos; last_tilt_pos > pos_goto; last_tilt_pos -= 1) {
     servo_cam_tilt.write(last_tilt_pos);
     delay(15);                      
   }
}


void cam_tilt_up() {

  pos_goto = last_tilt_pos + 10;
  if (pos_goto > cam_tilt_val_max) {
    pos_goto = cam_tilt_val_max;
  }

  for (last_tilt_pos = last_tilt_pos; last_tilt_pos < pos_goto; last_tilt_pos += 1) {
//    Serial.println(last_tilt_pos);
    servo_cam_tilt.write(last_tilt_pos);
    delay(15);                      
  }
}



void command_cam_sweep() {
  
  if (cmd_cam_sweep_rx == false) {
    return;
  }
  
  servo_cam_pan.attach(pin_cam_pan); 
  servo_cam_tilt.attach(pin_cam_tilt);
  
  for (last_pan_pos = cam_pan_val_centre; last_pan_pos < cam_pan_val_max; last_pan_pos += 1) {
    servo_cam_pan.write(last_pan_pos);
    delay(15);                      
  }

  
  for (last_tilt_pos = cam_tilt_val_min; last_tilt_pos < cam_tilt_val_max; last_tilt_pos += 1) { 
    servo_cam_tilt.write(last_tilt_pos); 
    delay(15);
  }


  for (last_tilt_pos = cam_tilt_val_max; last_tilt_pos>=cam_tilt_val_min; last_tilt_pos -= 1) {                               
    servo_cam_tilt.write(last_tilt_pos);
    delay(15);                       
  }
  
  for (last_pan_pos = cam_pan_val_max; last_pan_pos>=cam_pan_val_min; last_pan_pos -= 1) {  
    servo_cam_pan.write(last_pan_pos);              
    delay(15);
  }

  for (last_tilt_pos = cam_tilt_val_min; last_tilt_pos < cam_tilt_val_max; last_tilt_pos += 1) { 
    servo_cam_tilt.write(last_tilt_pos); 
    delay(15);
  }


  for (last_tilt_pos = cam_tilt_val_max; last_tilt_pos>=cam_tilt_val_min; last_tilt_pos -= 1) {                               
    servo_cam_tilt.write(last_tilt_pos);
    delay(15);                       
  }

  for (last_pan_pos = cam_pan_val_min; last_pan_pos < cam_pan_val_centre; last_pan_pos += 1) { 
    servo_cam_pan.write(last_pan_pos);              
    delay(15);
  }
  
  
  servo_cam_pan.detach();   //Does this stop the servo jitter??
  servo_cam_tilt.detach();
  
}


void clear_buffer() { // empties command buffer from serial connection

  serial_count = 0; // reset buffer placement
  buffer[serial_count] = null_terminator; 
}


void reset_command_tx() {
  cmd_velocity_rx               = false;
  cmd_direction_rx              = false;
  cmd_rotate_rx                 = false;
  cmd_heading_rx                = false;
  cmd_stop_rx                   = false;
  cmd_step_rx                   = false;
  cmd_pan_rx                    = false;
  cmd_tilt_rx                   = false;
  cmd_lights_mainbeam_rx        = false;
  cmd_cam_pan_rx                = false;
  cmd_cam_tilt_rx               = false;
  cmd_cam_sweep_rx              = false;
}  

void get_sharp_ir() {
  String command = "SR1";
  sharp_ir_val = analogRead(pin_sharp_ir);       // reads the value of the sharp sensor
  float distancecm = 30431 * pow(sharp_ir_val, -1.169); // centimeters
  char temp[10];
  String tempasstring;
  dtostrf(distancecm,1,2,temp);
  tempasstring = String(temp);
  String value = command + tempasstring + ":]";
  Serial.println(value);

}