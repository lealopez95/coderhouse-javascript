validateYesNoPrompt = (message) => {
    const retry = true;
    while(retry) {
        let answer = prompt(message);
        if (!answer) {
            alert("Por favor ingrese una respuesta valida.");
        } else {
            switch(answer.trim().toLowerCase()) {
                case 's' || 'si':
                   return true;
                case 'n' || 'no':
                    return false;
                default:
                    alert("Por favor ingrese una respuesta valida.");
                    break;
            }
        }
    }
}

validateStringPrompt = (message) => {
    const retry = true;
    while(retry) {
        const answer = prompt(message);
        if (!answer || answer === '' || answer === undefined ) {
            alert("Por favor ingrese un texto valido.");
        } else {
            return answer.trim().toLowerCase();
        }
    }
}

validateNumberPrompt = (message) => {
    let retry = true;
    while(retry) {
        const answer = parseInt(prompt(message));
        if (isNaN(answer)) {
            alert("Por favor ingrese un numero valido.");
        } else {
            return answer;
        }
    }
}