

let lastDataReceivedTime = Date.now(); // Inicializa com o tempo atual
const offlineThreshold = 15000; // Tempo máximo (em ms) sem dados antes de mostrar a mensagem de offline

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
            if (data && data.length > 0) {
                const latestData = data[data.length - 1]; // Obtém o último dado
                document.getElementById('timestamp').innerText = formatDate(latestData.timestamp);
                document.getElementById('temperature').innerText = `Temperatura: ${latestData.temperature} °C`;
                document.getElementById('humidity').innerText = `Umidade: ${latestData.humidity} %`;
                document.getElementById('offline-message').style.display = 'none'; // Esconde a mensagem de offline
                document.getElementById('weather-info').style.display = 'block'; // Mostra os dados do tempo
                lastDataReceivedTime = Date.now(); // Atualiza o tempo da última recepção de dados
            } else {
                showOfflineMessage(); // Se não houver dados, exibe mensagem de offline
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            showOfflineMessage(); // Se houver erro na fetch, exibe mensagem de offline
        });
}

function showOfflineMessage() {
    document.getElementById('weather-info').style.display = 'none'; // Esconde os dados do tempo
    document.getElementById('offline-message').style.display = 'block'; // Mostra a mensagem de offline
}

function checkForOffline() {
    const currentTime = Date.now();
    if (currentTime - lastDataReceivedTime > offlineThreshold) {
        showOfflineMessage();
    }
}

// Atualizar dados a cada 5 segundos
setInterval(fetchData, 5000);
setInterval(checkForOffline, 10000); // Verifica o status de offline a cada 10 segundos
fetchData(); // Fetch imediatamente
