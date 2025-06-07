const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const clipboardPara = document.querySelector('.clipboard p');
const clipButton = document.querySelector('.clipboard button');
const angle = document.querySelector("#angle");
let color1  = "#FD1D1D";
let color2 = "#FCB045";

function hexGenerator(){
    const hexValue = "0123456789ABCDEF";
    let hex = "#";
    for (let i=0; i < 6; i++){
        // Generate random index from 0 to 15;
        const idx = Math.floor(Math.random() * 16);
        hex = hex + hexValue[idx];
    }
    return hex;
}

function decideFontColor(hex){
    // Extract rgb from hex
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // These r, g, b values are then used in the luminance formula to find the font color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? "black" : 'white';
}

function handleGradient(){
    if (angle.value > 360) angle.value = 360;
    else if (angle.value < 0) angle.value = 0;
    document.body.style.background = `linear-gradient(${angle.value}deg, ${color1}, ${color2})`;
    clipboardPara.innerText = `background: linear-gradient(${angle.value}deg, ${color1}, ${color2})`;
    // Reset the ClipButton
    clipButton.innerHTML = `<i class="fa-solid fa-clipboard"></i> Copy to clipboard`;
}

function handleButton1(){
    color1 = hexGenerator();
    btn1.innerText = color1;
    btn1.style.backgroundColor = color1;
    btn1.style.color = decideFontColor(color1);
    handleGradient();
}
function handleButton2(){
    color2 = hexGenerator();
    btn2.innerText = color2;
    btn2.style.backgroundColor = color2;
    btn2.style.color = decideFontColor(color2);
    handleGradient();
}


clipButton.addEventListener('click', () => {
    navigator.clipboard.writeText(clipboardPara.innerText);
    clipButton.innerHTML = `<i class="fa-solid fa-clipboard-check"></i> CSS Code Copied!`;
})

btn1.addEventListener('click', handleButton1);
btn2.addEventListener('click', handleButton2);
angle.addEventListener('change', handleGradient);