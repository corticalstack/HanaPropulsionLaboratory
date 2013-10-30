#ifndef HPLRover_GPS_h
#define HPLRover_GPS_h

#include "Arduino.h"

class HPLRover_GPS
{
  public:
  
  public:
  
		struct gps_msg_nav_posllh_type {
			long gps_ms;
			long longitude;
			long lattitude;
			long height;
			long height_msl;
			int hori_acc_est;
			int vert_acc_est;		
		};	
	
	
		struct gps_msg_nav_velned_type {					
			long gps_ms;
			int north_velocity_cm_s;
			int east_velocity_cm_s;
			int down_velocity_cm_s;
			int speed_3d_cm_s;
			int ground_speed_2d_cm_s;
			float heading;
			int speed_acc_est;
			int course_acc_est;
		};		
	
		
		static struct gps_msg_nav_posllh_type gps_msg_nav_posllh;
		static struct gps_msg_nav_velned_type gps_msg_nav_velned;
		
		
    HPLRover_GPS();        //Constructor
	 void init(void);
     void update(HPLRover_GPS &gps);
     void enableMsg(unsigned char id, boolean enable);

	 void printHex(unsigned char val);
	 void sendCmd(unsigned char len, byte data[]);
	 void output(HPLRover_GPS &gps);
	 
  
  private:
	 void set_nav_posllh_gps_ms(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_longitude(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_lattitude(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_height(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_height_msl(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_hori_acc_est(HPLRover_GPS &gps, long val);
	 void set_nav_posllh_vert_acc_est(HPLRover_GPS &gps, unsigned long val);
	 void set_nav_velned_gps_ms(HPLRover_GPS &gps, long val);
	 void set_nav_velned_north_velocity_cm_s(HPLRover_GPS &gps, long val);
	 void set_nav_velned_east_velocity_cm_s(HPLRover_GPS &gps, long val);
	 void set_nav_velned_down_velocity_cm_s(HPLRover_GPS &gps, long val);
	 void set_nav_velned_speed_3d_cm_s(HPLRover_GPS &gps, long val);
	 void set_nav_velned_ground_speed_2d_cm_s(HPLRover_GPS &gps, long val);
	 void set_nav_velned_heading(HPLRover_GPS &gps, long val);
	 void set_nav_velned_speed_acc_est(HPLRover_GPS &gps, long val);
	 void set_nav_velned_course_acc_est(HPLRover_GPS &gps, long val);
	
};

#endif
