const name = window.prompt('Please enter your name:');
let number = 0;
let shouldContinue = true;
while (shouldContinue) {
    let answer = window.prompt('Please enter a number to accumulate. Type "ESC" to exit');
    if(answer === "ESC" || answer ==="esc" || answer ==="Esc" ) {
        shouldContinue = false;
    } else {
        number+= parseInt(answer);
        window.alert("The result until now is: " + number);
    }
}
window.alert("good bye: " + name);