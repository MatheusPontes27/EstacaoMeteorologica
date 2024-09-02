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
<p><img src="https://uploaddeimagens.com.br/imagens/5WT9aEg" alt="Preview do Projeto" style="width:100%; max-width:700px;"></p>

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
<p>Este projeto está sob a licença MIT - veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>

<hr>

<p>Desenvolvido por <a href="https://github.com/seu-usuario">Matheus Pontes</a>. Feito com paixão pela tecnologia e meteorologia! 🌦️</p>

</body>
</html>
