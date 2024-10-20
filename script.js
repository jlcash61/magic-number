function kaprekarRoutine(numberStr) {
    let iterations = [];
    do {
        // Ensure number is 4 digits long by padding with zeros if necessary
        numberStr = numberStr.padStart(4, '0');

        // Create highest and lowest possible numbers
        let descending = numberStr.split('').sort((a, b) => b - a).join('');
        let ascending = numberStr.split('').sort((a, b) => a - b).join('');

        // Convert to integers and subtract
        let result = parseInt(descending) - parseInt(ascending);
        let resultStr = result.toString().padStart(4, '0');

        iterations.push(`${descending} - ${ascending} = ${resultStr}`);
        numberStr = resultStr;

        // Handle case if number is 0000
        if (numberStr === "0000") {
            break;
        }
    } while (numberStr !== "6174");

    return iterations;
}

async function calculate() {
    let numberInput = document.getElementById("number-input").value;
    if (!/^[0-9]{1,4}$/.test(numberInput) || new Set(numberInput).size === 1) {
        alert("Please enter a valid 4-digit number with at least two different digits.");
        return;
    }

    // Automatically pad the number to 4 digits and alert the user
    if (numberInput.length < 4) {
        numberInput = numberInput.padStart(4, '0');
        alert("Input has been automatically padded to 4 digits: " + numberInput);
    }

    let results = kaprekarRoutine(numberInput);
    let resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
        let iterationElement = document.createElement("div");
        iterationElement.className = "iteration-step";
        iterationElement.style.animationDelay = `${i * 0.5}s`;
        iterationElement.innerText = results[i];
        resultContainer.appendChild(iterationElement);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    let finalMessage = document.createElement("div");
    finalMessage.className = "iteration-step";
    finalMessage.style.animationDelay = `${results.length * 0.5}s`;
    finalMessage.innerText = "\nKaprekar's Constant reached: 6174";
    resultContainer.appendChild(finalMessage);
}

function showAbout() {
    alert("Kaprekar's Constant App\n\n" +
          "This app demonstrates Kaprekar's Constant, also known as 6174.\n" +
          "For any valid 4-digit number (with at least two different digits),\n" +
          "the process of arranging digits in descending and ascending order,\n" +
          "subtracting, and repeating, will eventually converge to 6174.\n" +
          "This app allows you to see each iteration of that process. \n" +
          "                      Brought to you by TiBorg 2024");
}

function toggleNightMode() {
    document.body.classList.toggle("night-mode");
}

// Generate random floating prime numbers in the background
document.addEventListener("DOMContentLoaded", () => {
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
    const primeBackground = document.querySelector('.prime-background');

    for (let i = 0; i < 30; i++) {
        const primeElement = document.createElement('div');
        primeElement.className = 'prime-number';
        primeElement.innerText = primeNumbers[Math.floor(Math.random() * primeNumbers.length)];
        primeElement.style.top = Math.random() * 100 + 'vh';
        primeElement.style.left = Math.random() * 100 + 'vw';
        primeElement.style.animationDuration = 10 + Math.random() * 10 + 's';
        primeElement.style.animationDelay = Math.random() * 5 + 's';
        primeBackground.appendChild(primeElement);
    }
});