#include <FastSerial.h>
#include <Event.h>
#include <Timer.h>
#include <Servo.h>
#include <Wire.h>
#include <PString.h>


#include <HPLRover_Common.h>
#include <HPLRover_Command.h>
#include <HPLRover_Power.h>
#include <HPLRover_Notify.h>
#include <HPLRover_Radio.h>
#include <HPLRover_Motors.h>
#include <HPLRover_GPS.h>
#include <HPLRover_Compass.h>
#include <HPLRover_InertialSensor.h>
#include <HPLRover_SharpSensor.h>
#include <HPLRover_Camera.h>
#include <stdlib.h>
#include <SPI.h>
#include <Arduino_Mega_ISR_Registry.h>
#include <AP_PeriodicProcess.h>
#include <AP_ADC.h>
#include <AP_InertialSensor.h>
#include <AP_GPS.h>
#include <AP_Math.h>
#include <AP_Common.h>



HPLRover_Common              hplrover_common;
HPLRover_Command             hplrover_command;
HPLRover_Power               hplrover_power;
HPLRover_Notify              hplrover_notify;
HPLRover_Radio               hplrover_radio;
HPLRover_Motors              hplrover_motors;
HPLRover_GPS                 hplrover_gps;
HPLRover_Compass             hplrover_compass;
HPLRover_InertialSensor      hplrover_inertialsensor;
HPLRover_SharpSensor         hplrover_sharpsensor;
HPLRover_Camera              hplrover_camera;
Arduino_Mega_ISR_Registry    isr_registry;
AP_TimerProcess              apm_scheduler;
AP_InertialSensor_MPU6000    insmpu6000;


Timer hpl_scheduler;

Servo servo_leftmotors,
      servo_rightmotors,
      servo_pancam,
      servo_tiltcam;


AP_GPS_UBLOX gps(&Serial1);

void setup(void) {
  rover_init();
 
  hpl_scheduler.every(20, ms20_loop, 0);
  hpl_scheduler.every(50, ms50_loop, 0);
  hpl_scheduler.every(100, ms100_loop, 0);
  hpl_scheduler.every(200, ms200_loop, 0);
  hpl_scheduler.every(1000, one_second_loop, 0);
  hpl_scheduler.every(2000, two_second_loop, 0);
    
}



void loop(void) { 
  hpl_scheduler.update();
  fast_loop(); 
}  


void fast_loop(void) {   
  hplrover_radio.read_radio_data_stream(hplrover_command, hplrover_notify);  

  #if defined DEBUG_MOTORS
    start_ms = millis();
  #endif
  hplrover_motors.output(hplrover_command, hplrover_notify, hplrover_sharpsensor, servo_leftmotors, servo_rightmotors);  
  #if defined DEBUG_MOTORS
    stop_ms = millis();
    Serial.print("Motors output - ");
    Serial.println(stop_ms - start_ms);
  #endif
   
}  
  


void ms20_loop(void* context) {
  hplrover_gps.read(hplrover_gps, gps);
}


void ms50_loop(void* context) {
  hplrover_camera.output(hplrover_command, servo_pancam, servo_tiltcam);
}


void ms100_loop(void* context) {
  
  switch (scheduler_switch) {
    case 0:
      scheduler_switch = 1;
      hplrover_inertialsensor.read(hplrover_inertialsensor, insmpu6000);
      hplrover_compass.read(hplrover_compass);
      hplrover_inertialsensor.output(hplrover_inertialsensor);    
      hplrover_compass.output(hplrover_compass);  
      break;
    case 1:
      scheduler_switch = 0;
      hplrover_gps.output_posllh(hplrover_gps);
      hplrover_gps.output_velned(hplrover_gps);      
      break;
  }  
  
}


void ms200_loop(void* context) {
  hplrover_sharpsensor.read_front_bumper(hplrover_sharpsensor);
  hplrover_sharpsensor.read_rear_bumper(hplrover_sharpsensor);
  hplrover_sharpsensor.read_cam_mounted(hplrover_sharpsensor);
}


void ms500_loop(void* context) {

}



void one_second_loop(void* context) {
  hplrover_power.read(hplrover_power, hplrover_common);
  hplrover_power.output(hplrover_power);

  hplrover_common.last_time_millis = millis();
  hplrover_common.last_time_micros = micros();
}


void two_second_loop(void* context) {
  hplrover_gps.output_sol(hplrover_gps); 
  hplrover_notify.notify.power_failsafe = hplrover_power.exhausted(hplrover_power, hplrover_common);
}  


void rover_init(void) {
  Serial.begin(57600);        
 
  hplrover_common.last_time_millis = millis();
  hplrover_common.last_time_micros = micros();

  servo_leftmotors.attach(pin_leftmotor);            
  servo_rightmotors.attach(pin_rightmotor);          

  servo_pancam.attach(pin_pancam);             
  servo_tiltcam.attach(pin_tiltcam);           
  
  scheduler_switch = 0;
  
  hplrover_gps.init(gps);  
  hplrover_inertialsensor.init(insmpu6000, isr_registry, apm_scheduler);  
  hplrover_compass.init();  
  rover_arm();
}


void rover_arm(void) {  
   hplrover_camera.sweep(servo_pancam, servo_tiltcam);
}



