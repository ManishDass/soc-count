#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiClientSecure.h>
#include <ESP8266WebServer.h>
#include <YoutubeApi.h>
#include <ArduinoJson.h>
#include <TM1637Display.h>
#include <WiFiUdp.h>
#include <ESP8266HTTPClient.h>

// Network credentials
const char *ssid = "WiFi Fever";
const char *password = "Agartala1";

#define DEGREE_SYMBOL 0b01100011
#define C_SYMBOL 0b00111001

// Static IP configuration
IPAddress local_IP(192, 168, 1, 150);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   // Optional
IPAddress secondaryDNS(8, 8, 4, 4); // Optional

// Google API key 2nd one
#define API_KEY "AIzaSyCYkjwjv7h9rovSpIn4n3nXblNKDjE5q6k"

// YouTube channel ID
#define CHANNEL_ID "UCEGRaTSnDX6zbhjD92e7XOw"

// API Key for authentication
#define AUTH_KEY "ae55df63-7f1f-4c41-be1e-c1bfcb1a4a7e"

// TM1637 display pins
#define CLK 2
#define DIO 0

// Create an instance of the display
TM1637Display display(CLK, DIO);

// Weather API credentials
const char *apiKey = "b1fd6e14799699504191b6bdbcadfc35";
const char *city = "kumarghat";

// Timing variables
unsigned long weather_lasttime = 0;       // Last time the weather API was called
const unsigned long weather_mtbs = 96000; // Minimum time between API calls (e.g., 5 seconds)
bool initialWeatherCall1 = true;
bool initialWeatherCall2 = true;
bool initialWeatherCall3 = true;
bool showIndianTime = false;

// Initialize the web server on port 80
ESP8266WebServer server(80);

// YouTube API objects
WiFiClientSecure client;
YoutubeApi api(API_KEY, client);

// NTP
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 19800); // UTC +5:30

// Variables to store API call intervals and display type
unsigned long api_mtbs = 60000; // mean time between API requests (1 minute)
unsigned long api_lasttime = 0; // last time API request was done
int displayType = 4;            // Default to subscriber count

void setup()
{
  client.setInsecure(); // Added due to core changes in ESP8266
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);

  // Configure static IP
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS))
  {
    Serial.println("STA Failed to configure");
  }

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Start the server
  server.begin();
  Serial.println("Server started");

  // Set default brightness to 4
  display.setBrightness(4);

  // Write here if u want to display something after bootup
  fetchIndianTime();

  // Define server paths
  server.on("/set-display-type", HTTP_GET, []()
            {
    if (server.hasArg("type")) {
      // Check for authentication
      if (!authenticateRequest(server)) {
        return server.requestAuthentication();
      }

      displayType = server.arg("type").toInt();
      Serial.println("Current Display: " + String(displayType));

      // Set CORS headers
      setCorsHeaders();

      server.send(200, "application/json", "{\"status\":\"success\", \"displayType\":" + String(displayType) + "}");

      // Update display immediately based on the new display type
      updateDisplay();
    } else {
      server.send(400, "application/json", "{\"status\":\"error\", \"message\":\"Invalid request\"}");
    } });

  server.on("/set-brightness", HTTP_GET, []()
            {
    if (server.hasArg("brightness")) {
      // Check for authentication
      if (!authenticateRequest(server)) {
        return server.requestAuthentication();
      }
      int brightnessLevel = server.arg("brightness").toInt();
      brightnessLevel = constrain(brightnessLevel, 0, 7);  // Constrain the value between 0 and 7
      // Turn off the display if brightness is 0
      if (brightnessLevel == 0) {
        display.clear();
      } else {
        display.setBrightness(brightnessLevel);
      }
      Serial.println("Brightness set to: " + String(brightnessLevel));

      // Set CORS headers
      setCorsHeaders();

      server.send(200, "application/json", "{\"status\":\"success\", \"brightness\":" + String(brightnessLevel) + "}");

      // Update the display if brightness is not 0
      if (brightnessLevel != 0) {
        updateBrightness();
      }
    } else {
      server.send(400, "application/json", "{\"status\":\"error\", \"message\":\"Invalid request\"}");
    } });

  // Handle CORS preflight requests
  server.on("/set-display-type", HTTP_OPTIONS, handleOptions);
  server.on("/set-brightness", HTTP_OPTIONS, handleOptions);
}

void displayWeather(int value, bool flag)
{
  // Display the value on the TM1637 display
  display.showNumberDecEx(value, 0b01000000, false, 2, 0);

  // Custom segment encoding for degree symbol and 'C'
  uint8_t segments[4];
  segments[0] = display.encodeDigit((value / 10) % 10);
  segments[1] = display.encodeDigit(value % 10);

  if (flag)
  {
    segments[2] = DEGREE_SYMBOL; // Degree symbol (segments A, B, F, G)
    segments[3] = C_SYMBOL;      // 'C' (segments A, F, E, D)
  }
  else
  {
    segments[2] = 0; // Turn off segment 2
    segments[3] = 0; // Turn off segment 3
  }
  // Set the segments on the display
  display.setSegments(segments);
}

void loop()
{
  // Handle client requests
  server.handleClient();

  // Update NTP time
  timeClient.update();
}

void updateDisplay()
{
  String indianTime; // Declare indianTime outside the switch block
  bool resetWeatherCalls = true;

  switch (displayType)
  {
  case 0:
    display.showNumberDec(api.channelStats.subscriberCount, false);
    break;
  case 1:
    display.showNumberDec(api.channelStats.viewCount, false);
    break;
  case 2:
    display.showNumberDec(api.channelStats.commentCount, false);
    break;
  case 3:
    display.showNumberDec(api.channelStats.videoCount, false);
    break;
  case 4:
    fetchIndianTime(); // Assign the value here
    break;
  case 5:
    fetchAndDisplayWeather(0, true, initialWeatherCall1);
    resetWeatherCalls = false;
    break;
  case 6:
    fetchAndDisplayWeather(1, false, initialWeatherCall2);
    resetWeatherCalls = false;
    break;
  case 7:
    fetchAndDisplayWeather(2, true, initialWeatherCall3);
    resetWeatherCalls = false;
    break;
  default:
    fetchIndianTime();
  }

  if (resetWeatherCalls)
  {
    initialWeatherCall1 = true;
    initialWeatherCall2 = true;
    initialWeatherCall3 = true;
  }
}

void fetchAndDisplayWeather(int valueIndex, bool displayFlag, bool &initialCall)
{
  // Check if it's time to make the next weather API call
  if (initialCall || (millis() - weather_lasttime >= weather_mtbs))
  {
    weather_lasttime = millis(); // Update the last time before making the weather API call
    initialCall = false;

    // Fetch weather data
    int *weatherData = returnWeatherData();
    if (weatherData != nullptr)
    {
      // Display the weather data on the TM1637 display
      int valueToDisplay = weatherData[valueIndex];

      display.clear();
      delay(100); // Small delay to ensure the display is cleared

      // Display the value on the TM1637 display
      displayWeather(valueToDisplay, displayFlag);

      // Delay for demonstration purposes
      delay(1000);

      // Print weather data to the serial monitor
      Serial.print("Rounded Real Feel: ");
      Serial.print(weatherData[0]);
      Serial.print("C, Rounded Humidity: ");
      Serial.print(weatherData[1]);
      Serial.print("%, Rounded Actual Temp: ");
      Serial.print(weatherData[2]);
      Serial.println("C");
    }
    else
    {
      Serial.println("Error retrieving weather data");
    }
  }
}

String fetchIndianTime()
{
  HTTPClient http;
  String payload;
  String time;

  WiFiClient client; // Create a WiFiClient object
  // Make a GET request to fetch Indian time from an API
  http.begin(client, "http://worldtimeapi.org/api/timezone/Asia/Kolkata"); // Pass by reference
  int httpCode = http.GET();

  if (httpCode > 0)
  {                             // Check for a successful response
    payload = http.getString(); // Get the response payload
  }

  http.end(); // Close the connection

  // Parse the JSON payload and extract the time
  int dateTimeIndex = payload.indexOf("\"datetime\":");
  if (dateTimeIndex != -1)
  {
    // Extract the datetime string
    String dateTimeString = payload.substring(dateTimeIndex + 12, dateTimeIndex + 31); // Extract the datetime string (e.g., "2024-05-16T16:40:51")
    // Extract the time part
    int timeIndex = dateTimeString.indexOf('T');
    if (timeIndex != -1)
    {
      time = dateTimeString.substring(timeIndex + 1, timeIndex + 6); // Extract the time part ("16:40") from "T16:40:51"
      // Convert hours and minutes to integers
      int hours = (time.substring(0, 2)).toInt();
      int minutes = (time.substring(3)).toInt();

      // Convert to 12-hour format
      if (hours >= 12)
      {
        if (hours > 12)
        {
          hours -= 12;
        }
      }
      else if (hours == 0)
      {
        hours = 12;
      }

      // Display hours and minutes with middle colon on TM1637 display
      display.showNumberDecEx(hours * 100 + minutes, 0b01000000, true);

      // Format the time string without AM/PM
      time = String(hours) + ":" + (minutes < 10 ? "0" : "") + String(minutes);
    }
  }

  return time;
}

// Function to fetch weather data
int *returnWeatherData()
{
  static int weatherData[3]; // Array to store the rounded-off values
  WiFiClientSecure client;
  HTTPClient http;
  String payload;
  String url = String("https://api.openweathermap.org/data/2.5/weather?q=") + city + "&appid=" + apiKey + "&units=metric";

  client.setInsecure(); // Use this line to skip SSL certificate verification (not recommended for production)
  http.begin(client, url);
  int httpCode = http.GET();

  Serial.print("HTTP Response Code: ");
  Serial.println(httpCode);

  if (httpCode > 0)
  {
    payload = http.getString();
    // Serial.println("Payload received:");
    // Serial.println(payload);

    // Check if the response contains an error message
    if (payload.indexOf("cod") != -1 && payload.indexOf("message") != -1)
    {
      Serial.println("Error message from API:");
      Serial.println(payload);
      http.end();
      return nullptr;
    }
  }
  else
  {
    Serial.print("HTTP GET request failed, error: ");
    Serial.println(http.errorToString(httpCode).c_str());
    http.end();
    return nullptr;
  }

  http.end();

  if (payload.length() == 0)
  {
    Serial.println("Error fetching data");
    return nullptr;
  }

  DynamicJsonDocument doc(2048);
  DeserializationError error = deserializeJson(doc, payload);

  if (error)
  {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return nullptr;
  }

  float realFeel = doc["main"]["feels_like"];
  float humidity = doc["main"]["humidity"];
  float actualTemp = doc["main"]["temp"];

  weatherData[0] = round(realFeel);
  weatherData[1] = round(humidity);
  weatherData[2] = round(actualTemp);

  return weatherData;
}

void updateBrightness()
{
  // Re-update the display to ensure brightness change is reflected
  updateDisplay();
}

void displayTime()
{
  // Re-update the display to ensure brightness change is reflected
  updateDisplay();
}

bool authenticateRequest(ESP8266WebServer &server)
{
  // Get the authorization header
  String authHeader = server.header("Authorization");

  // Check if the authorization header exists and starts with "Bearer"
  if (authHeader.startsWith("Bearer "))
  {
    // Extract the token part from the header
    String token = authHeader.substring(7);

    // Check if the token matches the expected token
    if (token.equals(AUTH_KEY))
    {
      // Authentication successful
      return true;
    }
  }
  // Authentication failed
  return false;
}

void setCorsHeaders()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Max-Age", "600");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
}

void handleOptions()
{
  setCorsHeaders();
  server.send(204); // No Content response
}
