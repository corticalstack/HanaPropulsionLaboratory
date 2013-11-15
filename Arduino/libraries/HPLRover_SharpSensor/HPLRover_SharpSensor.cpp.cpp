#include "Arduino.h"
#include "HPLRover_SharpSensor.h"
#include "HPLRover_Common.h"
#include <PString.h>

struct HPLRover_SharpSensor::sharpsensor_msg_type 		HPLRover_SharpSensor::sharpsensor_msg;


HPLRover_SharpSensor::HPLRover_SharpSensor() {
}

void HPLRover_SharpSensor::init() {
}


void HPLRover_SharpSensor::read_front_bumper(HPLRover_SharpSensor &sharpsensor) {
	sharpsensor.sharpsensor_msg.sensor2_valuecm  = sensor_map_sharp2d120x(analogRead(pin_sharp2d120x_2_front), sharp2d120x_2_sensor_in, sharp2d120x_sensor_out, 48);    
	sharpsensor.sharpsensor_msg.sensor2_valuecm	 = constrain(sharpsensor.sharpsensor_msg.sensor2_valuecm, sensor_sharp2d120x_min_distcm, sensor_sharp2d120x_max_distcm);		
}

void HPLRover_SharpSensor::read_rear_bumper(HPLRover_SharpSensor &sharpsensor) {
	sharpsensor.sharpsensor_msg.sensor1_valuecm  = sensor_map_sharp2d120x(analogRead(pin_sharp2d120x_1_rear), sharp2d120x_1_sensor_in, sharp2d120x_sensor_out, 48);     
	sharpsensor.sharpsensor_msg.sensor1_valuecm	= constrain(sharpsensor.sharpsensor_msg.sensor1_valuecm, sensor_sharp2d120x_min_distcm, sensor_sharp2d120x_max_distcm);	
}


void HPLRover_SharpSensor::read_cam_mounted(HPLRover_SharpSensor &sharpsensor) {
	sharpsensor.sharpsensor_msg.sensor3_valuecm  = sensor_map_sharp2y0a02(analogRead(pin_sharp2y0a02_cam_mounted));
	sharpsensor.sharpsensor_msg.sensor3_valuecm  = constrain(sharpsensor.sharpsensor_msg.sensor3_valuecm, sensor_sharp2y0a02_min_distcm, sensor_sharp2y0a02_max_distcm);
}


float HPLRover_SharpSensor::sensor_map_sharp2y0a02(float sensor_val) {
	return (9462 / (sensor_val - 16.92));
}


float HPLRover_SharpSensor::sensor_map_sharp2d120x(float sensor_val, float * sensor_in, float * sensor_out, uint8_t size) {

	// Check sensor value is within range
	if (sensor_val <= sensor_in[0]) {
		return sensor_out[0];
	}
  
  
	if (sensor_val >= sensor_in[size-1]) {
		return sensor_out[size-1];
	}

	// Search right interval
	uint8_t pos = 1;  
	while(sensor_val > sensor_in[pos]) {
		pos++;
	}

	// Handle exact "points" in the _in array
	if (sensor_val == sensor_in[pos]) {
		return sensor_out[pos];
	}

	// Interpolate in the right segment for the rest
	return (sensor_val - sensor_in[pos-1]) * (sensor_out[pos] - sensor_out[pos-1]) / (sensor_in[pos] - sensor_in[pos-1]) + sensor_out[pos-1];
}


void HPLRover_SharpSensor::output(HPLRover_SharpSensor &sharpsensor) {
  	
}	


void HPLRover_SharpSensor::log(HPLRover_SharpSensor &sharpsensor) {
  	Serial.print("Sensor 1 cm: ");
	Serial.println(sharpsensor.sharpsensor_msg.sensor1_valuecm);

  	Serial.print("Sensor 2 cm: ");
	Serial.println(sharpsensor.sharpsensor_msg.sensor2_valuecm);
	
  	Serial.print("Sensor 3 cm: ");
	Serial.println(sharpsensor.sharpsensor_msg.sensor3_valuecm);	
}	
