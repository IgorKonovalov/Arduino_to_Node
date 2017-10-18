int sensorPin = A0;    // The potentiometer is connected to analog pin 0                  
int sensorValue;	// We declare another integer variable to store the value of the potentiometer

void setup()
{ 
  Serial.begin(9600);
}

void loop()
{
  sensorValue = analogRead(sensorPin);    
  Serial.println(sensorValue);
}

