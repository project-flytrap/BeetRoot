const forms = document.querySelectorAll('form');

// validation styles
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    if(!form.checkValidity()) {
      e.preventDefault();
    }

    form.classList.add('was-validated');
  });
});