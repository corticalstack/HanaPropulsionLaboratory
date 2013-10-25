#include "Arduino.h"
#include "HPLRover_Motors.h"
#include <HPLRover_Command.h>

extern HPLRover_Command hplrover_command;

HPLRover_Motors::HPLRover_Motors() {
}

void HPLRover_Motors::output(HPLRover_Command &command) {

  Serial.println("Motor output");
  Serial.println(command.cmd_in_motors.stop_rx);
    
}
