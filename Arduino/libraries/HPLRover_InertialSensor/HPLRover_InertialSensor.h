#ifndef HPLRover_InertialSensor_h
#define HPLRover_InertialSensor_h
#include <SPI.h>
#include <Arduino_Mega_ISR_Registry.h>
#include <AP_PeriodicProcess.h>
#include <AP_ADC.h>
#include <AP_InertialSensor.h>
#include <AP_Math.h>
#include <AP_Common.h>
#include "Arduino.h"

class HPLRover_InertialSensor
{
  public:
  	
	struct ins_accel_offsets_type {					
		float 	accel_offset_x;
		float 	accel_offset_y;
		float 	accel_offset_z;
	};

	
	struct ins_accel_scale_type {					
		float 	accel_scale_x;
		float 	accel_scale_y;
		float 	accel_scale_z;
	};

	
	struct ins_gyro_offsets_type {					
		float 	gyro_offset_x;
		float 	gyro_offset_y;
		float 	gyro_offset_z;
	};
		
	
	struct ins_msg_type {					
		float 	accel_x;
		float 	accel_y;
		float 	accel_z;
		float   length;
		float 	gyro_x;
		float 	gyro_y;
		float 	gyro_z;
		float 	temperature;			
	};		

	
	static struct ins_accel_offsets_type	ins_accel_offsets;
	static struct ins_accel_scale_type		ins_accel_scale;
	static struct ins_gyro_offsets_type		ins_gyro_offsets;	
	static struct ins_msg_type				ins_msg;
	
	
     HPLRover_InertialSensor();        //Constructor
	 void init(AP_InertialSensor_MPU6000 &insmpu6000, Arduino_Mega_ISR_Registry &isr_registry, AP_TimerProcess &scheduler);
     void read(HPLRover_InertialSensor &ins, AP_InertialSensor_MPU6000 &insmpu6000);
	 void output(HPLRover_InertialSensor &ins);
	 void log(HPLRover_InertialSensor &ins);  

  private:
		float 	accel_x_offset;
		float 	accel_y_offset;
		float 	accel_z_offset;
	
};

#endif
