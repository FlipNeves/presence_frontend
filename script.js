function switchTab(event) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    if (event.target.classList.contains('tab-button')) {
        const targetTab = event.target.getAttribute('data-tab');
        event.target.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    }
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

            if (presenceList) {
                presenceList.innerHTML = '';

                presences.forEach((presence) => {
                    const li = document.createElement('li');
                    li.textContent = `${presence.name}`;
                    presenceList.appendChild(li);
                });
            }
        } else {
            console.error('Erro ao carregar presenças');
            alert('Este é um ambiente gratuito e o servidor pode estar com instabilidade. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Este é um ambiente gratuito e o servidor pode estar com instabilidade. Por favor, tente novamente mais tarde.');
    }
}

document.getElementById('presenceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;

    document.getElementById('message').textContent = '';

    try {
        const response = await fetch('https://presence-m38v.onrender.com/presence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'Presença registrada com sucesso!';
            loadPresences();
            document.getElementById('presenceForm').reset();
        } else {
            document.getElementById('message').textContent = 'Erro ao registrar presença. Tente novamente.';
            alert('Este é um ambiente gratuito e o servidor pode estar com instabilidade. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('message').textContent = 'Erro ao conectar com o servidor.';
        alert('Este é um ambiente gratuito e o servidor pode estar com instabilidade. Por favor, tente novamente mais tarde.');
    }
});

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('bloodTypeModal');
    const overlay = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
});

loadPresences();