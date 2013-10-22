

#include <Event.h>
#include <Timer.h>


#include <HPLRover_Radio.h>
#include <HPLRover_Motors.h>
#include <HPLRover_GPS.h>
#include <HPLRover_Compass.h>
#include <HPLRover_Sensors.h>




HPLRover_Radio hplrover_radio;
HPLRover_Motors hplrover_motors;
HPLRover_GPS hplrover_gps;
HPLRover_Compass hplrover_compass;
HPLRover_Sensors hplrover_sensors;


Timer scheduler;


 
// Setup is called when the sketch starts
void setup() {
  Serial.begin(9600);        


  scheduler.every(200, hplrover_gps.update_gps, 0);
  scheduler.every(200, hplrover_compass.update_compass, 0);
  scheduler.every(200, hplrover_sensors.read_sensors, 0); 
  scheduler.every(200, hplrover_radio.send_radio_data_stream, 0); 
  scheduler.every(1000, one_second_loop, 0);
  
}



// loop() is called rapidly while the sketch is running
void loop() {
 scheduler.update();
 
 fast_loop();
 
}  



void fast_loop() {
  Serial.println("fast loop");
  hplrover_radio.read_radio_data_stream();
  hplrover_motors.output();
}  
  

void one_second_loop(void* context) 
{
    Serial.println("One second loop");
//    read_power();
}



