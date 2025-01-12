#include <DHT.h>
#include <Adafruit_Sensor.h> // Ensure the Adafruit Unified Sensor library is installed

// Pin Definitions
#define SOIL_MOISTURE_PIN A0  // Soil moisture sensor analog pin
#define LIGHT_SENSOR_PIN A1   // Light sensor analog pin
#define DHT_PIN 2             // DHT sensor pin
#define MOTOR_PIN 3           // Motor control pin

// DHT Sensor Type
#define DHT_TYPE DHT11        // Define DHT type (DHT11)

// Initialize DHT sensor
DHT dht(DHT_PIN, DHT_TYPE);

// Thresholds
#define SOIL_DRY_THRESHOLD 40 // Soil moisture below this value triggers motor ON
#define SOIL_WET_THRESHOLD 60 // Soil moisture above this value triggers motor OFF

void setup() {
  // Initialize Serial Monitor
  Serial.begin(9600);

  // Initialize DHT Sensor
  dht.begin();

  // Initialize Motor Pin
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW); // Ensure motor starts off

  // Initialize Sensor Pins
  pinMode(SOIL_MOISTURE_PIN, INPUT);
  pinMode(LIGHT_SENSOR_PIN, INPUT);

  Serial.println("System Initialized!");
}

void loop() {
  // Read Soil Moisture Sensor
  int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
  float soilMoisturePercentage = map(soilMoistureValue, 0, 1023, 0, 100);

  // Read Light Intensity Sensor
  int lightIntensityValue = analogRead(LIGHT_SENSOR_PIN);
  float lightIntensityPercentage = map(lightIntensityValue, 0, 1023, 0, 100);

  // Read DHT Sensor Data
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Check for DHT Sensor Read Errors
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Error reading from DHT sensor!");
    delay(2000); // Wait before retrying
    return;
  }

  // Control Motor Based on Soil Moisture
  if (soilMoisturePercentage < SOIL_DRY_THRESHOLD) {
    digitalWrite(MOTOR_PIN, HIGH); // Turn motor ON
    Serial.println("Motor ON: Soil is dry.");
  } else if (soilMoisturePercentage > SOIL_WET_THRESHOLD) {
    digitalWrite(MOTOR_PIN, LOW); // Turn motor OFF
    Serial.println("Motor OFF: Soil moisture is sufficient.");
  } else {
    Serial.println("Soil moisture in neutral range, motor unchanged.");
  }

  // Log Sensor Data
  Serial.print("Soil Moisture (%): ");
  Serial.print(soilMoisturePercentage);
  Serial.print(", Light Intensity (%): ");
  Serial.print(lightIntensityPercentage);
  Serial.print(", Humidity (%): ");
  Serial.print(humidity);
  Serial.print(", Temperature (°C): ");
  Serial.print(temperature);
  Serial.print(", Motor State: ");
  Serial.println(digitalRead(MOTOR_PIN)); // Log motor state

  // Delay for Stability
  delay(2000);
}




