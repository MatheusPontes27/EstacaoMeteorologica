

let lastDataReceivedTime = Date.now();
const offlineThreshold = 15000;
let lastDataCount = 0;
let repeatCount = 0;

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Data: ${day}/${month}/${year} , Hora: ${hours}:${minutes}`;
}

function fetchData() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);

            const currentDataCount = data.length;

            if (currentDataCount === lastDataCount) {
                repeatCount++;
                console.log('Número de dados repetidos:', repeatCount);
            } else {
                repeatCount = 0;
            }

            if (repeatCount >= 3) {
                console.log('Dados repetidos detectados, mostrando mensagem de offline');
                showOfflineMessage();
            } else {
                if (data.length > 0) {
                    const latestData = data[data.length - 1];

                    if (isValidData(latestData)) {
                        document.getElementById('timestamp').innerText = formatDate(latestData.timestamp);
                        document.getElementById('temperature').innerText = `Temperatura: ${latestData.temperature} °C`;
                        document.getElementById('humidity').innerText = `Umidade: ${latestData.humidity} %`;
                        document.getElementById('pressure').innerText = `Pressão: ${latestData.pressure} hPa`;
                        document.getElementById('altitude').innerText = `Altitude: ${latestData.altitude} m`;
                        document.getElementById('location').innerText = `Cidade: ${latestData.city}`;
                        document.getElementById('offline-message').style.display = 'none';
                        document.getElementById('weather-info').style.display = 'block';
                        lastDataReceivedTime = Date.now();
                    } else {
                        console.log('Dados recebidos inválidos, mostrando mensagem de offline');
                        showOfflineMessage();
                    }
                } else {
                    console.log('Sem dados, mostrando mensagem de offline');
                    showOfflineMessage();
                }
            }
            
            lastDataCount = currentDataCount;
        })
        .catch(error => {
            console.error('Erro na operação fetch:', error);
            showOfflineMessage();
        });
}

function isValidData(data) {
    return data.timestamp && data.temperature !== undefined && data.humidity !== undefined && data.pressure !== undefined && data.altitude !== undefined && data.city;
}

function showOfflineMessage() {
    console.log('Exibindo mensagem de offline');
    document.getElementById('weather-info').style.display = 'none';
    document.getElementById('offline-message').style.display = 'block';
}

function checkForOffline() {
    const currentTime = Date.now();
    if (currentTime - lastDataReceivedTime > offlineThreshold) {
        console.log('Detectado offline, atualizando a interface');
        showOfflineMessage();
    }
}

// Atualizar dados a cada 5 segundos
setInterval(fetchData, 5000);

// Verificar o status de offline a cada 5 segundos
setInterval(checkForOffline, 5000);

// Fetch imediatamente para garantir que a página exiba dados se disponíveis
fetchData();

// Função para capturar a localização do usuário
// Comentado, pois agora estamos utilizando o nome da cidade
/*
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').innerText = "Geolocalização não é suportada pelo seu navegador.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude.toFixed(4);
    const longitude = position.coords.longitude.toFixed(4);
    document.getElementById('location').innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerText = "Permissão negada para acessar sua localização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerText = "Informações de localização indisponíveis.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerText = "A solicitação para obter a localização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerText = "Ocorreu um erro desconhecido.";
            break;
    }
}

// Chama a função para obter a localização ao carregar a página
getUserLocation();
*/
