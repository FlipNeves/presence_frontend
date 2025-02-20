function switchTab(event) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const targetTab = event.target.getAttribute('data-tab');
    event.target.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', switchTab);
});

async function loadPresences() {
    try {
        const response = await fetch('https://presence-m38v.onrender.com/presence');
        if (response.ok) {
            const presences = await response.json();
            const presenceList = document.getElementById('presenceList');
            presenceList.innerHTML = '';

            presences.forEach((presence) => {
                const li = document.createElement('li');
                li.textContent = presence.name;
                presenceList.appendChild(li);
            });
        } else {
            console.error('Erro ao carregar presenças');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

document.getElementById('presenceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://presence-m38v.onrender.com/presence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'Presença registrada com sucesso!';
            loadPresences();
        } else {
            document.getElementById('message').textContent = 'Erro ao registrar presença. Tente novamente.';
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

loadPresences();