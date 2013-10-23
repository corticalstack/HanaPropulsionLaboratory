#include "Arduino.h"
#include "HPLRover_Motors.h"
#include <HPLRover_Radio.h>

extern HPLRover_Radio hplrover_radio;

HPLRover_Motors::HPLRover_Motors()
{
}

void HPLRover_Motors::output(HPLRover_Radio &radio)
{

  Serial.println("Motor output");
  Serial.println(radio.radio_cmd_in.stop_rx);
  
  radio.test_call();
  

  
  
}
