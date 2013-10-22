#include <HPLRover_GPS.h>

#include <Event.h>
#include <Timer.h>








HPLRover_GPS hplrover_gps;






Timer scheduler;

 
// Setup is called when the sketch starts
void setup() {
    Serial.begin(9600);        


  scheduler.every(100, hplrover_gps.update_gps, 0);
//  scheduler.every(100, update_compass, 0);
//  scheduler.every(100, update_flight_recorder, 0);
//  scheduler.every(1000, one_second_loop, 0);
  
}



// loop() is called rapidly while the sketch is running
void loop() {
 scheduler.update();
 
 fast_loop();
 
}  



void fast_loop() {
  Serial.println("fast loop");
//  read_radio_data_stream();
//  read_ir_sensors();
//  send_radio_data_stream();
  
}  
  

void one_second_loop(void* context) 
{
    Serial.println("One second loop");
//    read_power();
}



