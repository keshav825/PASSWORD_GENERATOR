
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");

const indicator = document.querySelector("[data-indicator]");
const generator = document.querySelector(".generate_button");

const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = "~!@#()*&^_+?/<>{}:";

let password = "";
let passwordLength = 10;
let checkCount = 0;

// Initialize
handleSlider();
handlecheckboxchange();


// Slider function
function handleSlider() {

    inputSlider.value = passwordLength;

    lengthDisplay.innerText = passwordLength;

}


// Strength indicator
function setIndicator(color) {

    indicator.style.backgroundColor = color;

}


// Random number between min and max-1
function getRaInteger(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}


// Generate random number
function generateRandomNumber() {

    return getRaInteger(0, 10);

}


// Generate lowercase
function generateLowerCase() {

    return String.fromCharCode(getRaInteger(97, 123));

}


// Generate uppercase
function generateUppercase() {

    return String.fromCharCode(getRaInteger(65, 91));

}


// Generate symbol
function generatesymbol() {

    const randomNum = getRaInteger(0, symbols.length);

    return symbols.charAt(randomNum);

}


// Calculate password strength
function calStrength() {

    let hasupper = uppercaseCheck.checked;

    let haslower = lowercaseCheck.checked;

    let hasnumber = numberCheck.checked;

    let hassymbol = symbolCheck.checked;

    if (
        hasupper &&
        haslower &&
        (hasnumber || hassymbol) &&
        passwordLength >= 8
    ) {

        setIndicator("#0f0");

    } else {

        setIndicator("#f00");

    }

}


// Handle checkbox changes
function handlecheckboxchange() {

    checkCount = 0;

    allCheckbox.forEach((checkbox) => {

        if (checkbox.checked) {

            checkCount++;

        }

    });

    if (passwordLength < checkCount) {

        passwordLength = checkCount;

        handleSlider();

    }

    calStrength();

}


// Add event listener to all checkboxes
allCheckbox.forEach((checkbox) => {

    checkbox.addEventListener("change", handlecheckboxchange);

});


// Shuffle password
function shufflePassword(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let j = getRaInteger(0, i + 1);

        let temp = array[i];

        array[i] = array[j];

        array[j] = temp;

    }

    return array.join("");

}


// Copy password
async function copycontent() {

    try {

        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMsg.innerText = "Copied";

    } catch (error) {

        copyMsg.innerText = "Failed";

    }

    copyMsg.classList.add("active");

    setTimeout(() => {

        copyMsg.classList.remove("active");

    }, 2000);

}


// Slider event
inputSlider.addEventListener("input", (e) => {

    passwordLength = Number(e.target.value);

    handleSlider();

    calStrength();

});


// Copy button event
copyBtn.addEventListener("click", () => {

    if (passwordDisplay.value) {

        copycontent();

    }

});


// Generate password event
generator.addEventListener("click", () => {

    if (checkCount <= 0) {

        alert("Please select at least one checkbox!");

        return;

    }

    if (passwordLength < checkCount) {

        passwordLength = checkCount;

        handleSlider();

    }

    password = "";

    let funcArr = [];


    // Store selected functions
    if (uppercaseCheck.checked) {

        funcArr.push(generateUppercase);

    }

    if (lowercaseCheck.checked) {

        funcArr.push(generateLowerCase);

    }

    if (numberCheck.checked) {

        funcArr.push(generateRandomNumber);

    }

    if (symbolCheck.checked) {

        funcArr.push(generatesymbol);

    }


    // Generate at least one character from each selected category
    for (let i = 0; i < funcArr.length; i++) {

        password += funcArr[i]();

    }


    // Generate remaining characters
    for (let i = 0; i < passwordLength - funcArr.length; i++) {

        let randIndex = getRaInteger(0, funcArr.length);

        password += funcArr[randIndex]();

    }


    // Shuffle password
    password = shufflePassword(Array.from(password));


    // Display password
    passwordDisplay.value = password;


    // Calculate strength
    calStrength();

});
