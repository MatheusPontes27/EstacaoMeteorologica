// api/data.js
let dataStore = []; // Armazena os dados recebidos

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Recebe os dados
        const data = req.body;
        data.timestamp = new Date().toISOString(); // Adiciona timestamp
        dataStore.push(data);
        console.log('Dados recebidos:', data);
        res.status(200).send('Dados recebidos com sucesso!');
    } else if (req.method === 'GET') {
        // Envia os dados para o frontend
        res.status(200).json(dataStore);
    } else {
        res.status(405).end(); // Método não permitido
    }
}
