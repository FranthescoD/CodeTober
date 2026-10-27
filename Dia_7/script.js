// ==========================================
// DIA 7: Lógica do Widget de Clima em Tempo Real
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    const weatherCard = document.getElementById('weather-card');
    const cityInput = document.getElementById('city-search-input');
    const searchBtn = document.getElementById('city-search-btn');
    const geoBtn = document.getElementById('geo-btn');

    const locationName = document.getElementById('location-name');
    const conditionDesc = document.getElementById('condition-desc');
    const temperature = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');

    const tempMinMax = document.getElementById('temp-min-max');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const apparentTemp = document.getElementById('apparent-temp');
    const hourlyScroll = document.getElementById('hourly-scroll');

    // Mapeamento de códigos WMO para descrições e ícones
    const getWeatherInfo = (code) => {
        switch (code) {
            case 0:
                return { desc: 'Ensolarado', icon: '☀️', theme: 'theme-sunny' };
            case 1:
            case 2:
                return { desc: 'Parcialmente Nublado', icon: '⛅', theme: 'theme-cloudy' };
            case 3:
                return { desc: 'Nublado', icon: '☁️', theme: 'theme-cloudy' };
            case 45:
            case 48:
                return { desc: 'Nevoeiro', icon: '🌫️', theme: 'theme-cloudy' };
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                return { desc: 'Garoa', icon: '🌧️', theme: 'theme-rainy' };
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                return { desc: 'Chuvoso', icon: '🌧️', theme: 'theme-rainy' };
            case 71:
            case 73:
            case 75:
            case 77:
                return { desc: 'Neve', icon: '❄️', theme: 'theme-snow' };
            case 80:
            case 81:
            case 82:
                return { desc: 'Pancadas de Chuva', icon: '🌦️', theme: 'theme-rainy' };
            case 95:
            case 96:
            case 99:
                return { desc: 'Tempestade', icon: '⚡', theme: 'theme-storm' };
            default:
                return { desc: 'Bom', icon: '🌤️', theme: 'theme-sunny' };
        }
    };

    // Atualizar classes de tema no card
    const setTheme = (themeClass) => {
        weatherCard.classList.remove('theme-sunny', 'theme-rainy', 'theme-cloudy', 'theme-storm', 'theme-snow');
        weatherCard.classList.add(themeClass);
    };

    // Buscar dados do clima por coordenadas
    const fetchWeather = async (lat, lon, cityName) => {
        try {
            locationName.textContent = cityName;
            conditionDesc.textContent = 'Carregando...';

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&timezone=auto`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (!data.current) throw new Error('Dados indisponíveis');

            const current = data.current;
            const daily = data.daily;
            const hourly = data.hourly;

            const temp = Math.round(current.temperature_2m);
            const hum = current.relative_humidity_2m;
            const wind = Math.round(current.wind_speed_10m);
            const appTemp = Math.round(current.apparent_temperature);
            const weatherCode = current.weather_code;

            const minTemp = Math.round(daily.temperature_2m_min[0]);
            const maxTemp = Math.round(daily.temperature_2m_max[0]);

            const info = getWeatherInfo(weatherCode);

            // Atualizar UI
            temperature.textContent = temp;
            conditionDesc.textContent = info.desc;
            weatherIcon.textContent = info.icon;
            setTheme(info.theme);

            tempMinMax.textContent = `${minTemp}° / ${maxTemp}°`;
            humidity.textContent = `${hum}%`;
            windSpeed.textContent = `${wind} km/h`;
            apparentTemp.textContent = `${appTemp}°C`;

            // Previsão Horária (Próximas 24 horas a partir da hora atual)
            const currentHourIndex = new Date().getHours();
            hourlyScroll.innerHTML = '';

            for (let i = currentHourIndex; i < currentHourIndex + 24 && i < hourly.time.length; i++) {
                const timeStr = new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const hTemp = Math.round(hourly.temperature_2m[i]);
                const hCode = hourly.weather_code[i];
                const hInfo = getWeatherInfo(hCode);

                const item = document.createElement('div');
                item.className = 'hourly-item';
                item.innerHTML = `
                    <span class="hourly-time">${timeStr}</span>
                    <span class="hourly-icon">${hInfo.icon}</span>
                    <span class="hourly-temp">${hTemp}°</span>
                `;
                hourlyScroll.appendChild(item);
            }

        } catch (error) {
            console.error('Erro ao buscar clima:', error);
            conditionDesc.textContent = 'Erro ao carregar dados';
            locationName.textContent = cityName || 'Local desconhecido';
        }
    };

    // Buscar cidade por nome usando Geocoding API do Open-Meteo
    const searchCity = async (query) => {
        if (!query.trim()) return;
        try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pt&format=json`;
            const response = await fetch(geoUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const city = data.results[0];
                const name = `${city.name}, ${city.admin1 || city.country || ''}`;
                fetchWeather(city.latitude, city.longitude, name);
            } else {
                alert('Cidade não encontrada.');
            }
        } catch (error) {
            console.error('Erro na busca de cidade:', error);
            alert('Erro ao buscar cidade.');
        }
    };

    // Eventos de busca
    searchBtn.addEventListener('click', () => {
        searchCity(cityInput.value);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCity(cityInput.value);
        }
    });

    // Geolocalização do usuário
    geoBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            conditionDesc.textContent = 'Obtendo localização...';
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(lat, lon, 'Sua Localização');
                },
                (error) => {
                    console.error('Erro de geolocalização:', error);
                    alert('Não foi possível obter sua localização. Usando São Paulo por padrão.');
                    fetchWeather(-23.5505, -46.6333, 'São Paulo, Brasil');
                }
            );
        } else {
            alert('Geolocalização não suportada pelo seu navegador.');
            fetchWeather(-23.5505, -46.6333, 'São Paulo, Brasil');
        }
    });

    // Inicialização padrão (São Paulo, Brasil)
    fetchWeather(-23.5505, -46.6333, 'São Paulo, Brasil');

});
