#include "Arduino.h"
#include "HPLRover_Power.h"
#include "HPLRover_Common.h"
#include <PString.h>

struct HPLRover_Power::power_msg_type 		HPLRover_Power::power_msg;


HPLRover_Power::HPLRover_Power() {
}

void HPLRover_Power::init() {
}


void HPLRover_Power::read(HPLRover_Power &power, HPLRover_Common &common) {
	float current_val 	= 0;
	float voltage_val 	= 0;
    
	voltage_val = analogRead(pin_voltage);
	power.power_msg.voltage = (voltage_val * (5.0f/1023.0f)) * power_volt_multiplier;
	
	
	power.power_msg.current = analogRead(pin_current);
	power.power_msg.current = power.power_msg.current / 10;
	
	
	power.power_msg.amps = (power.power_msg.current - power_current_amp_offset) * power_amp_per_volt;
    
	uint32_t now_time_micros = micros();
    float time_difference_micros = now_time_micros - common.last_time_micros;
    
	
	if (common.last_time_micros != 0 && time_difference_micros < 2000000.0f) {
		power.power_msg.consumed_current_mah += power.power_msg.amps * time_difference_micros * 0.0000002778f;
		common.last_time_micros = now_time_micros;
	}	

	power.power_msg.remaining_pct = capacity_remaining_pct(power);
}


float HPLRover_Power::capacity_remaining_pct(HPLRover_Power &power) {
	return (100.0f * (power_pack_capacity_mah_max - power.power_msg.consumed_current_mah) / power_pack_capacity_mah_max);
}



boolean HPLRover_Power::exhausted(HPLRover_Power &power, HPLRover_Common &common) {
		
	if ((power.power_msg.voltage != 0) && (power_pack_volt_min > 0) && (power.power_msg.voltage < power_pack_volt_min)) {
        // this is the first time our voltage has dropped below minimum so start timer
		if (_low_voltage_start_ms == 0) {
			_low_voltage_start_ms = common.last_time_millis;
        }else if (common.last_time_millis - _low_voltage_start_ms > power_low_volt_timeout_ms) {
            return true;
        }
    }else{
        // acceptable voltage so reset timer
        _low_voltage_start_ms = 0;
    }

    // check capacity if current monitoring is enabled
    if ((power_pack_capacity_mah_min > 0) && (power_pack_capacity_mah_max - power.power_msg.consumed_current_mah < power_pack_capacity_mah_min)) {
        return true;
    }

    // if we've gotten this far battery is ok
    return false;
}


void HPLRover_Power::output(HPLRover_Power &power) {
	char msg_buffer[35];
	PString msg_power_str(msg_buffer, sizeof(msg_buffer));
	msg_power_str += msg_power;
	msg_power_str += power.power_msg.voltage; 
	msg_power_str += comma_separator;
	msg_power_str += power.power_msg.current; 
	msg_power_str += comma_separator;
	msg_power_str += power.power_msg.amps;  
	msg_power_str += comma_separator;
	msg_power_str += power.power_msg.consumed_current_mah;
	msg_power_str += comma_separator;
	msg_power_str += power.power_msg.remaining_pct;
	msg_power_str += msg_terminator;  
	Serial.println(msg_power_str);
}


void HPLRover_Power::log(HPLRover_Power &power) {
	Serial.print("Power voltage: ");
	Serial.print(power.power_msg.voltage);
	Serial.print("   current: ");
	Serial.print(power.power_msg.current);
	Serial.print("   amps: ");
	Serial.print(power.power_msg.amps);
	Serial.print("   consumed current mah: ");
	Serial.print(power.power_msg.consumed_current_mah);
	Serial.print("   remaining pct: ");
	Serial.println(power.power_msg.remaining_pct);	
}

