let inputs = document.querySelectorAll("input");
// Errors je objekat u kojem "cuvamo" greske!
let errors = {
  ime_prezime: [],
  korisnicko_ime: [],
  email: [],
  lozinka: [],
  ponovi_lozinku: [],
};
// For loop da provjerimo vrijednost svih polja
inputs.forEach((element) => {
  //Kad promjenimo nesto u polju("CHANGE"), aktivira se eventListner
  element.addEventListener("change", (e) => {
    let currentInput = e.target; //trenutno polje koje smo promjenili
    let inputValue = currentInput.value; //vrijednost polja, text koji smo unjeli u polje
    let inputName = currentInput.getAttribute("name"); //Ime trenutnog polja

    //Polje mora imat vise od 4 znaka/slova
    if (inputValue.length > 4) {
      errors[inputName] = []; // Za svaki input ispraznimo
      switch (inputName) {
        case "ime_prezime":
          let validation = inputValue.trim(); //Uklanja razmak na pocetku/kraju upisanog texta
          validation = validation.split(" ");
          if (validation.length < 2) {
            errors[inputName].push("Moras napisati ime i prezime");
          }
          console.log(validation);
          break;

        case "email":
          if (!validateEmail(inputValue)) {
            errors[inputName].push("Neispravna email adresa");
          }
          break;

        case "ponovi_lozinku":
          let lozinka = document.querySelector('input[name="lozinka"]').value;
          if (inputValue !== lozinka) {
            errors[inputName].push("Lozinke se ne poklapaju");
          }
      }
    } else {
      errors[inputName] = ["Ne moze imati manje od 5 karaktera"];
    }
    populateErrors();
  });
});

const populateErrors = () => {
  for (let elemer of document.querySelectorAll("ul")) {
    elemer.remove(); // Brisemo greske da se ne stackuju
  }

  // Uzima keys iz objekta
  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`input[name="${key}"]`);
    let parentElement = input.parentElement; //Roditelj elementa(polja)
    let errorsElement = document.createElement("ul"); //Stvaramo <ul></ul> element
    parentElement.appendChild(errorsElement); // uzimamo UL element i stavljamo u DIV

    errors[key].forEach((error) => {
      let li = document.createElement("li"); //Pravimo jedan item unutar liste
      li.innerText = error;
      errorsElement.appendChild(li);
    });
  }
};

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
