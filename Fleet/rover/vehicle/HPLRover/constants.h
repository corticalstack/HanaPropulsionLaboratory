// -*- tab-width: 4; Mode: C++; c-basic-offset: 4; indent-tabs-mode: nil -*-

#ifndef _CONSTANTS_H
#define _CONSTANTS_H

const char   cmd_velocity             = 'V';
const char   cmd_direction            = 'D';
const char   cmd_heading              = 'H';
const char   cmd_rotate               = 'R';
const char   cmd_stop                 = 'X';
const char   cmd_step                 = 'S';

const char   cmd_cam_pan              = 'P';
const char   cmd_cam_tilt             = 'T';
const char   cmd_cam_sweep            = 'W';

const char   cmd_lights_mainbeam      = 'L';


// Command values
const char   cmd_val_on               = '1';
const char   cmd_val_off              = '0';
const int    cmd_velocity_val_allstop = 90;
const char   cmd_val_forward          = 'F';
const char   cmd_val_left             = 'L';
const char   cmd_val_right            = 'R';
const char   cmd_val_up               = 'U';
const char   cmd_val_down             = 'D';



// Motor control
const int internal_velocity_map_ratio = 70;
const int internal_heading_map_ratio  = 50;

const int motor_calibration_adjust    = 10;
const int left_velocity_val_trim      = 0;
const int right_velocity_val_trim     = 0;

const int left_velocity_val_min       = 20;
const int left_velocity_val_max       = 160;

const int right_velocity_val_min      = 20;
const int right_velocity_val_max      = 160;


const char null_terminator             = '\0';

#endif // _CONSTANTS_H
