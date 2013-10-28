#include <Event.h>
#include <Timer.h>

#include <Servo.h>

#include <HPLRover_Common.h>
#include <HPLRover_Command.h>
#include <HPLRover_Radio.h>
#include <HPLRover_Motors.h>
#include <HPLRover_GPS.h>
#include <HPLRover_Compass.h>
#include <HPLRover_Sensors.h>



HPLRover_Command hplrover_command;
HPLRover_Radio   hplrover_radio;
HPLRover_Motors  hplrover_motors;
HPLRover_GPS     hplrover_gps;
HPLRover_Compass hplrover_compass;
HPLRover_Sensors hplrover_sensors;



Timer scheduler;

Servo servo_leftmotors,
      servo_rightmotors,
      servo_cam_pan,
      servo_cam_tilt;
      
 
// Setup is called when the sketch starts
void setup(void) {
  Serial.begin(9600);        

  init_commands();
 
  servo_leftmotors.attach(pin_leftmotor);             // Use PWM pin 2 to control Sabertooth.
  servo_rightmotors.attach(pin_rightmotor);           // Use PWM 3 to control Sabertooth.
  
  scheduler.every(200, hplrover_gps.update_gps, 0);
  scheduler.every(200, hplrover_compass.update_compass, 0);
  scheduler.every(200, hplrover_sensors.read_sensors, 0); 
  scheduler.every(200, hplrover_radio.send_radio_data_stream, 0); 
  scheduler.every(1000, one_second_loop, 0);
  
}



// loop() is called rapidly while the sketch is running
void loop(void) {
 scheduler.update();
 
 fast_loop();
 
}  



void fast_loop(void) {
  hplrover_radio.read_radio_data_stream(hplrover_command);
  hplrover_motors.output(hplrover_command, servo_leftmotors, servo_rightmotors );
}  
  

void one_second_loop(void* context) 
{
//    read_power();
}


void init_commands(void) {
   
}
