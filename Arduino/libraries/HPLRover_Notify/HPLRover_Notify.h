#ifndef HPLRover_Notify_h
#define HPLRover_Notify_h

#include "Arduino.h"

class HPLRover_Notify 
{
  public:
	
	
	/// notify_type - bitmask of notification types
    struct notify_type {
        uint16_t initialising       : 1;    // 1 if initialising and copter should not be moved
        uint16_t gps_status         : 2;    // 0 = no gps, 1 = no lock, 2 = 2d lock, 3 = 3d lock
        uint16_t gps_glitching      : 1;    // 1 if gps position is not good
        uint16_t armed              : 1;    // 0 = disarmed, 1 = armed
        uint16_t pre_arm_check      : 1;    // 0 = failing checks, 1 = passed
        uint16_t save_trim          : 1;    // 1 if gathering trim data
        uint16_t esc_calibration    : 1;    // 1 if calibrating escs
        uint16_t failsafe_radio     : 1;    // 1 if radio failsafe
        uint16_t failsafe_battery   : 1;    // 1 if battery failsafe
        uint16_t failsafe_gps       : 1;    // 1 if gps failsafe
    };
	
	
	// the notify flags are static to allow direct class access
    // without declaring the object
    static struct notify_type flags;
	
	
	//Constructor
    HPLRover_Notify();        
	
	//Initialise the radio
	void init();
	

};

#endif
