#ifndef HPLRover_Power_h
#define HPLRover_Power_h

#include "Arduino.h"
#include <HPLRover_Common.h>

class HPLRover_Power {
	public:
  
		struct power_msg_type {					
			float 	voltage; 
			float	current; 
			float 	amps;  
			float 	consumed_current_mah;
			float   remaining_pct;
		};		
		
		
		static struct power_msg_type	power_msg;
		
		HPLRover_Power();        //Constructor
		void init(void);
		void read(HPLRover_Power &power, HPLRover_Common &common);
		float capacity_remaining_pct(HPLRover_Power &power);
		boolean exhausted(HPLRover_Power &power, HPLRover_Common &common);
		void output(HPLRover_Power &power);
		void log(HPLRover_Power &power);
	private:
		uint32_t 			_low_voltage_start_ms;
};

#endif
