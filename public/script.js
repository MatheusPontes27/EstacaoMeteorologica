

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
            if (data.length > 0) {
                const latestData = data[data.length - 1]; // Obtém o último dado
                document.getElementById('timestamp').innerText = formatDate(latestData.timestamp);
                document.getElementById('temperature').innerText = `Temperatura: ${latestData.temperature} °C`;
                document.getElementById('humidity').innerText = `Umidade: ${latestData.humidity} %`;
                document.getElementById('offline-message').style.display = 'none'; // Esconde a mensagem de offline
            } else {
                showOfflineMessage();
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            showOfflineMessage();
        });
}

function showOfflineMessage() {
    document.getElementById('weather-info').style.display = 'none'; // Esconde os dados do tempo
    document.getElementById('offline-message').style.display = 'block'; // Mostra a mensagem de offline
}

// Atualizar dados a cada 5 segundos
setInterval(fetchData, 5000);
fetchData(); // Fetch imediatamente
