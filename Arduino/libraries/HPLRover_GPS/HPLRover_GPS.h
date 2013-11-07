#ifndef HPLRover_GPS_h
#define HPLRover_GPS_h

#include "Arduino.h"

class HPLRover_GPS
{
  public:

		struct gps_msg_nav_sol_type {					
			long 	gps_ms;
			int		fix_type;
			int 	acc_est_3d;
			int     number_sv;
		};		

		
		struct gps_msg_nav_posllh_type {
			long 	gps_ms;
			long 	longitude;
			long 	lattitude;
			long 	height;
			long 	height_msl;
			int 	hori_acc_est;
			int 	vert_acc_est;		
		};	
	
	
		struct gps_msg_nav_velned_type {					
			long 	gps_ms;
			int 	north_velocity_cm_s;
			int 	east_velocity_cm_s;
			int 	down_velocity_cm_s;
			int 	speed_3d_cm_s;
			int 	ground_speed_2d_cm_s;
			float 	heading;
			int 	speed_acc_est;
			int 	course_acc_est;
		};		

		
		static struct gps_msg_nav_sol_type 		gps_msg_nav_sol;
		static struct gps_msg_nav_posllh_type 	gps_msg_nav_posllh;
		static struct gps_msg_nav_velned_type 	gps_msg_nav_velned;
		
		
     HPLRover_GPS();        //Constructor
	 void init(void);
     void read(HPLRover_GPS &gps);
	 void output_sol(HPLRover_GPS &gps);
	 void output_posllh(HPLRover_GPS &gps);
	 void output_velned(HPLRover_GPS &gps);
	 void log(HPLRover_GPS &gps);
  
  private:
     void enable_msg(unsigned char id, boolean enable);
	 void send_cmd(unsigned char len, byte data[]);
	 
	 void set_nav_sol_gps_ms(HPLRover_GPS &gps, long val);	 
	 void set_nav_sol_fix_type(HPLRover_GPS &gps, long val);
	 void set_nav_sol_acc_est_3d(HPLRover_GPS &gps, long val);
	 void set_nav_sol_number_sv(HPLRover_GPS &gps, long val);
	 
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
