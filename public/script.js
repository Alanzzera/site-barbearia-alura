document.getElementById('formContato').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
    // Coletando os dados do formulário
    const formData = {
      nome: document.getElementById('nomesobrenome').value.toLowerCase(),
      email: document.getElementById('email').value.toLowerCase(),
      telefone: document.getElementById('telefone').value,
      mensagem: document.getElementById('mensagem').value.toLowerCase(),
      contato: document.querySelector('input[name="contato"]:checked').value,
      horario: document.getElementById('horario').value,
      novidades: document.getElementById('novidades').querySelector('input').checked
    };
    
    // Enviar os dados como JSON usando fetch
    fetch('/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        // Limpar os campos do formulário se o envio for bem-sucedido
        document.getElementById('formContato').reset();
        
        // Exibir notificação de sucesso
        showNotification(); 
      } else {
        // Se a resposta não for ok, lançar um erro para o bloco catch
        throw new Error('Erro ao enviar contato');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
      // Exibir notificação de erro
      alert('Erro ao enviar contato');
    });
});

function showNotification() {
  const notification = document.getElementById('notification');
  notification.classList.remove('hidden');
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hidden');
  }, 5000);
}