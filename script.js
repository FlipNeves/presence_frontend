document.getElementById('presenceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://presence-m38v.onrender.com/presence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = 'Presença registrada com sucesso!';
            document.getElementById('presenceForm').reset();
            loadPresences(); // Recarrega a lista de presenças após registrar uma nova
        } else {
            const errorData = await response.json();
            document.getElementById('message').textContent = `Erro: ${errorData.error}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = `Erro: ${error.message}`;
    }
});

async function loadPresences() {
    try {
        const response = await fetch('https://presence-m38v.onrender.com/presence');
        if (response.ok) {
            const presences = await response.json();
            const presenceList = document.getElementById('presenceList');
            const presenceTitle = document.getElementById('presenceTitle');
            const form = document.getElementById('form');
            
            presenceList.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens
            presenceTitle.innerHTML = 'Lista de presença:'; // Atualiza o título
            form.classList.add('hidden');

            presences.forEach((presence, index) => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = `${index + 1}`;
                li.appendChild(span);
                li.appendChild(document.createTextNode(` - ${presence.name}`));
                presenceList.appendChild(li);
            });
        } else {
            console.error('Erro ao carregar presenças');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carrega a lista de presenças quando a página é carregada
// document.addEventListener('DOMContentLoaded', loadPresences);