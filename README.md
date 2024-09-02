<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Estação Meteorológica</h1>

<p>Este projeto é uma aplicação web que exibe dados meteorológicos em tempo real coletados de uma estação meteorológica local. O design é inspirado em widgets de tempo modernos, focando em uma interface limpa e amigável.</p>

<h2>📋 Visão Geral</h2>
<p>A aplicação mostra informações de:</p>
<ul>
    <li><strong>Data e Hora</strong>: Formato legível e amigável ao usuário.</li>
    <li><strong>Temperatura</strong>: Exibida em graus Celsius (°C).</li>
    <li><strong>Umidade</strong>: Exibida como porcentagem (%).</li>
</ul>
<p>Os dados são atualizados automaticamente a cada 5 segundos, garantindo que o usuário sempre veja as informações mais recentes.</p>

<h2>🌐 Acesso ao Projeto</h2>
<p>Você pode acessar o projeto através do link abaixo. Lembre-se de que os dados só serão exibidos caso a estação meteorológica esteja ligada:</p>
<p><a href="https://estacao-meteorologica-jet.vercel.app" target="_blank">estacao-meteorologica-jet.vercel.app</a></p>

<h2>🚀 Tecnologias Utilizadas</h2>
<ul>
    <li><strong>HTML</strong>: Estrutura básica da aplicação.</li>
    <li><strong>CSS</strong>: Estilização da interface para criar um design atrativo.</li>
    <li><strong>JavaScript</strong>: Script para buscar e atualizar os dados da estação.</li>
    <li><strong>Node.js (Vercel Serverless Functions)</strong>: Para fornecer a API que retorna os dados meteorológicos.</li>
</ul>

<h2>📂 Estrutura do Projeto</h2>

<pre class="code-block">
/api
  └── data.js          # Script do servidor que retorna os dados meteorológicos
/public
  ├── index.html       # Página principal da aplicação
  ├── styles.css       # Estilos da aplicação
  └── script.js        # Script para atualização dos dados
README.md               # Documentação do projeto
</pre>

<h1>Estação Meteorológica com ESP8266</h1>
<p>Este projeto implementa uma estação meteorológica usando uma placa <code>ESP8266</code>, uma tela <code>I2C</code>, e um sensor de temperatura e umidade <code>DHT22</code>. A programação foi feita para captar os dados de temperatura e umidade e exibi-los na tela, além de enviá-los para um servidor configurado na Vercel.</p>

<h2>Descrição do Hardware</h2>
    <ul>
        <li><strong>Placa:</strong> ESP8266</li>
        <li><strong>Tela:</strong> I2C OLED (128x64)</li>
        <li><strong>Sensor:</strong> DHT22 (temperatura e umidade)</li>
    </ul>

<h2>Programação</h2>
    <p>O código abaixo foi desenvolvido para controlar a estação meteorológica, capturando e exibindo os dados coletados.</p>
    <pre>
#include &lt;Wire.h&gt;
#include &lt;Adafruit_GFX.h&gt;
#include &lt;Adafruit_SSD1306.h&gt;
#include &lt;DHT.h&gt;
#include &lt;NTPClient.h&gt;
#include &lt;WiFiUdp.h&gt;
#include &lt;ESP8266WiFi.h&gt;
#include &lt;WiFiClientSecure.h&gt;

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &amp;Wire, OLED_RESET);

#define DHTPIN D5
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "xxxx";
const char* password = "xxxx";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -10800);

unsigned long previousMillis = 0;
const unsigned long interval = 5000;

const char* serverHost = "xxxx";
const int serverPort = 443;

WiFiClientSecure client;

enum DisplayState {
  SHOW_TEMP,
  SHOW_HUMIDITY,
  SHOW_TIME
};

DisplayState currentState = SHOW_TEMP;

void drawLogo() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("CearaBytes WS");
  display.drawLine(0, 10, SCREEN_WIDTH, 10, SSD1306_WHITE);
  display.setCursor(0, 20);
  display.println("Conectando Wi-Fi...");
  display.display();
  delay(2000);
}

void displayTemperature(float temperature) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Temperatura");
  
  display.setTextSize(2);
  display.setCursor(0, 20);
  display.print(temperature);
  display.print(" C");
  display.display();
}

void displayHumidity(float humidity) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Umidade");
  
  display.setTextSize(2);
  display.setCursor(0, 20);
  display.print(humidity);
  display.print(" %");
  display.display();
}

void displayTime() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Hora");
  
  display.setTextSize(2);
  display.setCursor(0, 20);
  display.print(timeClient.getFormattedTime());
  display.display();
}

void sendDataToServer(float temperature, float humidity) {
  if (!client.connect(serverHost, serverPort)) {
    Serial.println("Falha na conexão com o servidor.");
    return;
  }

  String postData = "{\"temperature\":\"" + String(temperature) + "\",\"humidity\":\"" + String(humidity) + "\"}";
  
  client.println("POST /api/data HTTP/1.1");
  client.println("Host: " + String(serverHost));
  client.println("Content-Type: application/json");
  client.println("Content-Length: " + String(postData.length()));
  client.println("Connection: close");
  client.println();
  client.println(postData);
  
  Serial.println("Dados enviados ao servidor: " + postData);
  client.stop();
}

void setup() {
  Serial.begin(115200);
  
  Wire.begin();
  
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Não foi possível encontrar a tela SSD1306."));
    for (;;);
  }

  drawLogo();

  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado ao Wi-Fi");
  Serial.println("IP: " + WiFi.localIP().toString());
  
  timeClient.begin();

  client.setInsecure(); 
}

void loop() {
  unsigned long currentMillis = millis();

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Desconectado do Wi-Fi. Tentando reconectar...");
    WiFi.reconnect();
    delay(5000);
  }

  timeClient.update();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Erro ao ler os dados do sensor DHT22.");
    } else {
      sendDataToServer(temperature, humidity);
      switch (currentState) {
        case SHOW_TEMP:
          displayTemperature(temperature);
          currentState = SHOW_HUMIDITY;
          break;
        case SHOW_HUMIDITY:
          displayHumidity(humidity);
          currentState = SHOW_TIME;
          break;
        case SHOW_TIME:
          displayTime();
          currentState = SHOW_TEMP;
          break;
      }
    }
  }
}
    </pre>

<h2>Detalhes Adicionais</h2>
    <p>A estação meteorológica foi criada com recursos próprios, utilizando uma tela I2C, placa ESP8266, e um sensor DHT22 para leitura de temperatura e umidade. Para mais detalhes, acesse o projeto completo pelo link abaixo:</p>

<p><a href="https://drive.google.com/drive/folders/1crjW9_hMJrUwn9UCxLemjw0F0bOJYe7r?usp=sharing" target="_blank">Link do Projeto Completo</a></p>
</body>
</html>


<h2>🔧 Como Configurar o Projeto</h2>
<ol>
    <li><strong>Clone o repositório:</strong></li>
    <pre class="code-block">git clone https://github.com/seu-usuario/seu-repositorio.git</pre>

  <li><strong>Instale as dependências:</strong></li>
    <p>Navegue até o diretório do projeto e instale as dependências necessárias (caso haja).</p>
    <pre class="code-block">npm install</pre>

  <li><strong>Rodando localmente:</strong></li>
    <p>Para testar o servidor localmente com as funções serverless do Vercel, use:</p>
    <pre class="code-block">vercel dev</pre>

  <li><strong>Deploy:</strong></li>
    <p>Faça o deploy para o Vercel com:</p>
    <pre class="code-block">vercel</pre>
</ol>

<h2>🌐 Utilização</h2>
<p>Após o deploy ou execução local, acesse a aplicação pelo navegador. A página irá exibir os dados da estação meteorológica, atualizando automaticamente a cada 5 segundos.</p>

<h2>📸 Preview</h2>
<p><img src="https://drive.google.com/uc?export=view&id=1rvYBN4yEopjDZHulINcdxNqLQ5PYK7hN" alt="Preview do Projeto" style="width:100%; max-width:700px;" alt="Preview do Projeto" style="width:100%; max-width:700px;"></p>

<h2>🤝 Contribuindo</h2>
<p>Se quiser contribuir para o projeto, siga estas etapas:</p>
<ol>
    <li>Fork o repositório.</li>
    <li>Crie uma branch para sua feature (<code>git checkout -b feature/sua-feature</code>).</li>
    <li>Commit suas mudanças (<code>git commit -m 'Adicionei nova feature'</code>).</li>
    <li>Dê push na branch (<code>git push origin feature/sua-feature</code>).</li>
    <li>Abra um Pull Request.</li>
</ol>

<h2>📝 Licença</h2>
<p>Este projeto está sob a licença MIT - veja o arquivo <a href="https://docs.google.com/document/d/11SCdh7_q3K1jROCbvaJlnIy1CmKoztZybKZnyiPUY2o/edit?usp=sharing">LICENSE</a> para mais detalhes.</p>

<hr>

<p>Desenvolvido por <a href="https://www.linkedin.com/in/matheusempontes/">Matheus Pontes</a>. Feito com paixão pela tecnologia e meteorologia! 🌦️</p>

</body>
</html>
