#include <PString.h>

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
#include <HPLRover_Camera.h>
#include <stdlib.h>


HPLRover_Command hplrover_command;
HPLRover_Radio   hplrover_radio;
HPLRover_Motors  hplrover_motors;
HPLRover_GPS     hplrover_gps;
HPLRover_Compass hplrover_compass;
HPLRover_Sensors hplrover_sensors;
HPLRover_Camera  hplrover_camera;



Timer scheduler;

Servo servo_leftmotors,
      servo_rightmotors,
      servo_pancam,
      servo_tiltcam;
      
 
// Setup is called when the sketch starts
void setup(void) {
  rover_init();
  
  scheduler.every(200, hplrover_compass.update_compass, 0);
  scheduler.every(200, hplrover_sensors.read_sensors, 0); 
  scheduler.every(200, hplrover_radio.send_radio_data_stream, 0); 
  scheduler.every(50,  ms5_loop, 0);
  scheduler.every(1000, one_second_loop, 0);
    
}



// loop() is called rapidly while the sketch is running
void loop(void) {
 
 scheduler.update();

 fast_loop();
 
}  



void fast_loop(void) {
  hplrover_radio.read_radio_data_stream(hplrover_command);
  hplrover_motors.output(hplrover_command, servo_leftmotors, servo_rightmotors);
  hplrover_gps.update(hplrover_gps);
  hplrover_gps.output(hplrover_gps);
}  
  

void ms5_loop(void* context) 
{
  hplrover_camera.output(hplrover_command, servo_pancam, servo_tiltcam);

}


void one_second_loop(void* context) 
{
//    read_power();
}


void rover_init(void) {
  Serial.begin(9600);        

 
  servo_leftmotors.attach(pin_leftmotor);             // Use PWM pin 2 to control Sabertooth.
  servo_rightmotors.attach(pin_rightmotor);           // Use PWM 3 to control Sabertooth.

  servo_pancam.attach(pin_pancam);             
  servo_tiltcam.attach(pin_tiltcam);           

  hplrover_gps.init();  
  rover_arm();


}


void rover_arm(void) {  
   hplrover_camera.sweep(servo_pancam, servo_tiltcam);
}



