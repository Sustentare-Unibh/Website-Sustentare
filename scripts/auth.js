async function registrarConta() {
  const form = document.getElementById('form-cadastro');
  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:8080/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Erro no cadastro');
    }

    alert(result.success);
    form.reset();
  } catch (error) {
    console.error('Erro:', error);
    alert(error.message);
  }
}   