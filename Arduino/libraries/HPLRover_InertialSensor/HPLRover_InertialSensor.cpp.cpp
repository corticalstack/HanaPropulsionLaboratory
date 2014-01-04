#include "Arduino.h"
#include "HPLRover_InertialSensor.h"
#include "HPLRover_Common.h"
#include <PString.h>
#include <SPI.h>
#include <Arduino_Mega_ISR_Registry.h>
#include <AP_PeriodicProcess.h>
#include <AP_ADC.h>
#include <AP_InertialSensor.h>
#include <AP_Math.h>
#include <AP_Common.h>


struct HPLRover_InertialSensor::ins_accel_offsets_type	HPLRover_InertialSensor::ins_accel_offsets;
struct HPLRover_InertialSensor::ins_accel_scale_type	HPLRover_InertialSensor::ins_accel_scale;
struct HPLRover_InertialSensor::ins_gyro_offsets_type	HPLRover_InertialSensor::ins_gyro_offsets;
struct HPLRover_InertialSensor::ins_msg_type			HPLRover_InertialSensor::ins_msg;

	
HPLRover_InertialSensor::HPLRover_InertialSensor() {

}


void HPLRover_InertialSensor::init(AP_InertialSensor_MPU6000 &insmpu6000, Arduino_Mega_ISR_Registry &isr_registry, AP_TimerProcess &scheduler) {
    SPI.begin();
    SPI.setClockDivider(SPI_CLOCK_DIV16); // 1MHZ SPI rate

    isr_registry.init();
    scheduler.init(&isr_registry);

    // we need to stop the barometer from holding the SPI bus
    pinMode(40, OUTPUT);
    digitalWrite(40, HIGH);
	
	insmpu6000.init(AP_InertialSensor::COLD_START, 
					AP_InertialSensor::RATE_100HZ,
					delay, 
					NULL, 
					&scheduler);	

	accel_x_offset = 0.32;
	accel_y_offset = 0.40;
	accel_z_offset = -9.92;
	
}


void HPLRover_InertialSensor::read(HPLRover_InertialSensor &ins, AP_InertialSensor_MPU6000 &insmpu6000) {

	#if defined debug_inertial
		start_ms = millis();
	#endif

	Vector3f accel;
    Vector3f gyro;
    float temperature;
    float length;

	insmpu6000.update();
	 
	while( insmpu6000.num_samples_available() < 8 * 1 ) {
		delay(1);
    }

    // read samples from ins
    insmpu6000.update();
	
    accel 					= insmpu6000.get_accel();
    gyro 					= insmpu6000.get_gyro();
    temperature 			= insmpu6000.temperature();
    length 					= sqrt(accel.x*accel.x + accel.y*accel.y + accel.z*accel.z);

	ins.ins_msg.accel_x 	= accel.x - accel_x_offset;
	ins.ins_msg.accel_y 	= accel.y - accel_y_offset;
	ins.ins_msg.accel_z 	= accel.z - accel_z_offset;
	
	ins.ins_msg.length 		= length;
	ins.ins_msg.gyro_x 		= gyro.x;
	ins.ins_msg.gyro_y 		= gyro.y;
	ins.ins_msg.gyro_z 		= gyro.z;

	ins.ins_msg.temperature = temperature;		
	
	#if defined debug_inertial
		stop_ms = millis();
		Serial.print("Inertial read - ");
		Serial.println(stop_ms - start_ms);
	#endif

}


void HPLRover_InertialSensor::output(HPLRover_InertialSensor &ins) {  
	
	#if defined DEBUG_INERTIAL
		start_ms = millis();
	#endif
	
	char ins_buffer[50];
	PString ins_str(ins_buffer, sizeof(ins_buffer));
	ins_str += msg_ins;
    ins_str += ins.ins_msg.accel_x;
	ins_str += comma_separator;
	ins_str += ins.ins_msg.accel_y;
	ins_str += comma_separator;
	ins_str += ins.ins_msg.accel_z;
	ins_str += comma_separator;
//	ins_str += ins.ins_msg.length;
//	ins_str += comma_separator;
//  ins_str += ins.ins_msg.gyro_x;
//	ins_str += comma_separator;
//	ins_str += ins.ins_msg.gyro_y;
//	ins_str += comma_separator;
//	ins_str += ins.ins_msg.gyro_z;
//	ins_str += comma_separator;
	ins_str += ins.ins_msg.temperature;
	ins_str += msg_terminator;  
	Serial.println(ins_str);	
	
	#if defined DEBUG_INERTIAL
		stop_ms = millis();
		Serial.print("Inertial output - ");
		Serial.println(stop_ms - start_ms);
	#endif
	
}


void HPLRover_InertialSensor::log(HPLRover_InertialSensor &ins) {

	Serial.print("Accel X:");
	Serial.print(ins.ins_msg.accel_x);
	Serial.print("  Y:");
	Serial.print(ins.ins_msg.accel_y);
	Serial.print("  Z:");		   
	Serial.print(ins.ins_msg.accel_z);
	Serial.print("    Length:");		   
	Serial.print(ins.ins_msg.length);
	Serial.print("  Gyro X:");
	Serial.print(ins.ins_msg.gyro_x);
	Serial.print("  Y:");
	Serial.print(ins.ins_msg.gyro_y);
	Serial.print("  Z:");
	Serial.print(ins.ins_msg.gyro_z);
	Serial.print("    Temperature:");
	Serial.println(ins.ins_msg.temperature);

}