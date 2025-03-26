# 🚀 Hana Propulsion Laboratory

A comprehensive robotics platform for rover control, telemetry, and mission analytics.

## 📋 Description

Hana Propulsion Laboratory (HPL) is an integrated robotics ecosystem that combines hardware control, vehicle implementation, ground station interfaces, and mission analytics. The platform enables the operation of remotely controlled rovers with real-time telemetry, data collection, and comprehensive mission analysis.

## 🔧 Components

### Arduino Libraries
The core of the rover's functionality is implemented through a collection of Arduino libraries:

- **Core Systems**
  - `HPLRover_Common` - Common utilities and shared functionality
  - `HPLRover_Command` - Command processing and interpretation
  - `HPLRover_Power` - Power management and monitoring
  - `HPLRover_Notify` - System notifications and status reporting

- **Sensors & Navigation**
  - `HPLRover_GPS` - GPS positioning and navigation
  - `HPLRover_Compass` - Directional orientation
  - `HPLRover_InertialSensor` - Motion and acceleration sensing
  - `HPLRover_SharpSensor` - Proximity detection

- **Control & Interaction**
  - `HPLRover_Motors` - Motor control and movement
  - `HPLRover_Camera` - Camera control and video streaming
  - `HPLRover_Lights` - Lighting control
  - `HPLRover_Radio` - Communication with ground station
  - `HPLRover_Weapons` - Weapon systems control

### Fleet
The Fleet component manages the rover vehicles and ground station:

- **Vehicle**
  - `HPLRover.ino` - Main Arduino sketch for rover operation
  - Implements scheduling, sensor reading, and command execution

- **Ground Station**
  - `roverlink.js` - Node.js server for communication with the rover
  - `radiocamstream.html` - Web interface for camera streaming
  - Web-based cockpit for rover control

### Mission Control
Built on SAP HANA, the mission control system provides comprehensive analytics:

- **Data Models**
  - Mission tracking and telemetry storage
  - Performance analytics (speed, altitude, distance)
  - Achievement and goal tracking

- **Analytics Views**
  - Distance traveled
  - Average/max/min speed and altitude
  - Mission achievements
  - Pilot performance metrics

## 🛠️ Setup Guide

### Prerequisites
- Arduino IDE
- Node.js and npm
- SAP HANA environment (for mission control)
- Required hardware components:
  - Arduino Mega (or compatible)
  - GPS module
  - Compass module
  - MPU6000 inertial sensor
  - Sharp proximity sensors
  - Servo motors
  - Camera module
  - Radio communication module

### Hardware Setup
1. Assemble the rover hardware according to your specific design
2. Connect the components to the Arduino following standard pinout configurations
3. Upload the `HPLRover.ino` sketch to the Arduino

### Ground Station Setup
1. Install Node.js dependencies:
   ```
   cd Fleet/rover/groundstation
   npm install socket.io serialport bufferstream socket.io-wildcard
   ```
2. Configure the serial port in `roverlink.js` (default: `/dev/ttyUSB0`)
3. Start the ground station server:
   ```
   node roverlink.js
   ```
4. Open the cockpit interface in a web browser

### Mission Control Setup
1. Deploy the HANA XS application to your SAP HANA environment
2. Configure database connections and user roles
3. Access the mission control dashboard through the HANA XS application URL

## 🚗 Usage

### Rover Operation
1. Power on the rover
2. Start the ground station server
3. Connect to the rover through the ground station interface
4. Use the cockpit controls to navigate and operate the rover
5. Monitor telemetry and sensor data in real-time

### Mission Analysis
1. Access the mission control dashboard
2. Select missions to analyze
3. View performance metrics, achievements, and telemetry data
4. Generate reports on rover and pilot performance

## 🏗️ Architecture

The system follows a three-tier architecture:

1. **Hardware Layer** (Arduino)
   - Sensor integration and hardware control
   - Real-time processing and command execution
   - Telemetry collection and transmission

2. **Communication Layer** (Node.js)
   - Bidirectional communication between rover and ground station
   - Command transmission and telemetry reception
   - Video streaming and real-time feedback

3. **Analytics Layer** (SAP HANA)
   - Data storage and processing
   - Performance analytics and reporting
   - Mission tracking and achievement monitoring

## 📝 License

See the [LICENSE](LICENSE) file for details.
