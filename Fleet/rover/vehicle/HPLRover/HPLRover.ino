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
#include <HPLRover_Lights.h>
#include <HPLRover_Weapons.h>
#include <stdlib.h>
#include <SPI.h>
#include <Arduino_Mega_ISR_Registry.h>
#include <AP_PeriodicProcess.h>
#include <AP_ADC.h>
#include <AP_InertialSensor.h>
#include <AP_Math.h>
#include <AP_Common.h>


HPLRover_Common                hplrover_common;
HPLRover_Command               hplrover_command;
HPLRover_Power                 hplrover_power;
HPLRover_Notify                hplrover_notify;
HPLRover_Radio                 hplrover_radio;
HPLRover_Motors                hplrover_motors;
HPLRover_GPS                   hplrover_gps;
HPLRover_Compass               hplrover_compass;
HPLRover_InertialSensor        hplrover_inertialsensor;
HPLRover_SharpSensor           hplrover_sharpsensor;
HPLRover_Camera                hplrover_camera;
HPLRover_Lights                hplrover_lights;


Arduino_Mega_ISR_Registry      isr_registry;
AP_TimerProcess                apm_scheduler;
AP_InertialSensor_MPU6000      insmpu6000;


Timer                          hpl_scheduler;

Servo                          servo_leftmotors,
                               servo_rightmotors,
                               servo_pancam,
                               servo_tiltcam;


void setup(void) {
  rover_init();
 
//  hpl_scheduler.every(10, ms10_loop, 0);
//  hpl_scheduler.every(20, ms20_loop, 0);
  hpl_scheduler.every(50, ms50_loop, 0);
  hpl_scheduler.every(100, ms100_loop, 0);
  hpl_scheduler.every(200, ms200_loop, 0);
  hpl_scheduler.every(500, ms500_loop, 0);
  hpl_scheduler.every(1000, one_second_loop, 0);
  hpl_scheduler.every(2000, two_second_loop, 0);
    
}



void loop(void) { 
  hpl_scheduler.update();
  fast_loop(); 
}  


void fast_loop(void) {   
  hplrover_radio.read_radio_data_stream(hplrover_command, hplrover_notify);  

  if ((millis() - hplrover_notify.notify.cockpit_heartbeat_tick) > cockpit_heartbeat_threshold) {
    hplrover_notify.notify.cockpit_heartbeat = false;
  }
  
    
  if (hplrover_notify.notify.cockpit_heartbeat == true && hplrover_notify.notify.armed == false) {
    rover_arm();
  }
  
    
  #if defined DEBUG_MOTORS
    start_ms = millis();
  #endif
  
  hplrover_motors.output(hplrover_motors, hplrover_command, hplrover_notify, hplrover_sharpsensor, servo_leftmotors, servo_rightmotors);  
  #if defined DEBUG_MOTORS
    stop_ms = millis();
    Serial.print("Motors output - ");
    Serial.println(stop_ms - start_ms);
  #endif
  
  if (hplrover_notify.notify.gps_init == true) {
    hplrover_gps.read(hplrover_gps);
  }
  
}  
  

void ms10_loop(void* context) {
}


void ms20_loop(void* context) {
}


void ms50_loop(void* context) {
  if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }
  
  hplrover_camera.output(hplrover_command, servo_pancam, servo_tiltcam);
  hplrover_camera.output_msg();
  hplrover_notify.output(hplrover_notify);    
}


void ms100_loop(void* context) {
  if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }
  
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
      hplrover_motors.output_thrust(hplrover_motors);
      break;
  }  
  
}


void ms200_loop(void* context) {
  if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }

  hplrover_sharpsensor.read_front_bumper(hplrover_sharpsensor);
  hplrover_sharpsensor.read_rear_bumper(hplrover_sharpsensor);
  hplrover_sharpsensor.read_cam_mounted(hplrover_sharpsensor);
  hplrover_sharpsensor.output(hplrover_sharpsensor);
}


void ms500_loop(void* context) {
    if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }

  hplrover_lights.toggle_laser(hplrover_command, hplrover_notify);
}



void one_second_loop(void* context) {
  if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }

  hplrover_power.read(hplrover_power, hplrover_common);
  hplrover_power.output(hplrover_power);

  hplrover_common.last_time_millis = millis();
  hplrover_common.last_time_micros = micros();
}


void two_second_loop(void* context) {
  if (hplrover_notify.notify.cockpit_heartbeat == false || hplrover_notify.notify.armed == false) {
    return;    
  }

  hplrover_gps.output_sol(hplrover_gps); 
  hplrover_notify.notify.power_failsafe = hplrover_power.exhausted(hplrover_power, hplrover_common);
}  


void rover_init(void) {
  Serial.begin(57600);        
 
  hplrover_common.last_time_millis = millis();
  hplrover_common.last_time_micros = micros();

  servo_leftmotors.attach(pin_leftmotor);            
  servo_rightmotors.attach(pin_rightmotor);  
 
  pinMode(pin_light_laser, OUTPUT);     
//  pinMode(pin_light_mainbeam_right, OUTPUT);    

  scheduler_switch = 0;
   
  servo_pancam.attach(pin_pancam);             
  servo_tiltcam.attach(pin_tiltcam);           
}


void rover_arm(void) {  
  Serial.flush();
  delay(2);
  
  hplrover_notify.output_systems_power_up(hplrover_notify);
  delay(2);

  hplrover_gps.init();  
  hplrover_notify.output_gps_init(hplrover_notify);
  delay(2);

  hplrover_inertialsensor.init(insmpu6000, isr_registry, apm_scheduler);  
  hplrover_notify.output_inertial_init(hplrover_notify);
  delay(2);
  
  hplrover_compass.init();  
  hplrover_notify.output_compass_init(hplrover_notify);
  
  hplrover_notify.output_arming(hplrover_notify);
  hplrover_camera.sweep(servo_pancam, servo_tiltcam);
  hplrover_notify.output_armed(hplrover_notify);
  
  hplrover_common.last_time_millis = millis();
  hplrover_common.last_time_micros = micros();

}



