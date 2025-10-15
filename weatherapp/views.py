from django.shortcuts import render
import requests
from urllib.parse import quote
import random

def home(request):
    if request.method == 'POST':
        city = request.POST.get('city')
        weather_data = fetch_weather(city)
        forecast_data = fetch_forecast(city)
        return render(request, 'weatherapp.html', {
            "weather": weather_data,
            "forecast": forecast_data
        })
    return render(request, 'weatherapp.html', {"forecast": []})

def fetch_weather(city):
    API_KEY = "49cb20992d1c48bab5f55901250309"
    url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no"
    response = requests.get(url).json()
    
    if "error" in response:
        return {"city": city, "error": response["error"]["message"]}

    return {
        "city": response["location"]["name"],
        "temperature": response["current"]["temp_c"],   
        "description": response["current"]["condition"]["text"],
        "icon": response["current"]["condition"]["icon"],
        "background": fetch_image(city)
    }

def fetch_image(city):
    API_KEY = "52003180-fca23bcaf10bd85a59320d2a5"
    img_url = f"https://pixabay.com/api/?key={API_KEY}&q={quote(city)}&image_type=photo&orientation=horizontal&per_page=50"
    img_response = requests.get(img_url).json()
    if img_response.get("hits"):
        return random.choice(img_response["hits"])["largeImageURL"]
    return ""

def fetch_forecast(city):
    API_KEY = "49cb20992d1c48bab5f55901250309"
    url = f"http://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={city}&days=5&aqi=no&alerts=no"
    response = requests.get(url).json()

    if "error" in response:
        return []

    forecast_days = response["forecast"]["forecastday"]

    result = []
    for day in forecast_days:
        result.append({
            "date": day["date"],  
            "min_temp": day["day"]["mintemp_c"],  
            "max_temp": day["day"]["maxtemp_c"], 
            "description": day["day"]["condition"]["text"],
            "icon": day["day"]["condition"]["icon"]
        })

    return result
