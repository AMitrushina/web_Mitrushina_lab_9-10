let forma = document.querySelector('#form')
let login = document.querySelector('#username')
let password = document.querySelector('#password')

forma.addEventListener('submit', function (event) {
    event.preventDefault()
    let inputs = document.querySelectorAll('.input');
    let valid = true;
    removeValidation()

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            valid = false;
            inputs[i].parentNode.appendChild(ErrorMsg());
        }
    }

    if (validateEmail() === false) {
      valid = false
    }

    if (valid) {
      let re;
      let data = {
        username: login.value,
        password: password.value
      };
      fetch("/server", { 
        method: "POST", 
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .finally(() => alert("Данные успешно отправлены"))
      .then(response => response.text())
      .then(obj => console.log(obj))
    }
  })

function ErrorMsg(){
  let errorMessage = document.createElement('p');
  errorMessage.className = 'error'
  errorMessage.textContent = 'Заполните поле';
  errorMessage.style.margin=0;
  errorMessage.style.color = 'red';
  return errorMessage
}
  
  let removeValidation = function () {
    let errors = forma.querySelectorAll('.error')
  
    for (var i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
  }

  function validateEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = login.value;
    if(reg.test(address) == false) {
       alert('Ваш email не проходит валидацию, проверьте правильность ввода');
       return false;
    }
 }