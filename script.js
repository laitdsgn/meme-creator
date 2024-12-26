
let imgMeme = document.getElementById('meme'); 
let memeText1 = document.getElementById('memeText1');
let memeText2 = document.getElementById('memeText2');
let label1 = document.getElementById('textInput');
let label2 = document.getElementById('textInput2');
let black = document.getElementById('black');
let white = document.getElementById('white');

function randomMeme() {
    let rand = Math.floor(Math.random() * 16);
    console.log(rand);


    const newImage = new Image();
    newImage.crossOrigin = "anonymous"; 
    newImage.src = `memes/${rand}.jpg`;


    newImage.onload = () => {
        imgMeme.src = newImage.src;
    };
}

function changeColor() {
    if (black.checked) {
        memeText1.style.color = 'black';
        memeText2.style.color = 'black';
        memeText1.style.textShadow = '2px 2px 5px white';
        memeText2.style.textShadow = '2px 2px 5px white';
    }
    if (white.checked) {
        memeText1.style.color = 'white';
        memeText2.style.color = 'white';
        memeText1.style.textShadow = '2px 2px 5px black';
        memeText2.style.textShadow = '2px 2px 5px black';
        
    }
}

black.addEventListener('change', changeColor);
white.addEventListener('change', changeColor);

function addTextToMeme() {
    let label1 = document.getElementById('textInput').value;
    let label2 = document.getElementById('textInput2').value;
    memeText1.innerText = label1;
    memeText2.innerText = label2;
}

label1.addEventListener('input', addTextToMeme);
label2.addEventListener('input', addTextToMeme);

randomMeme();



function downloadMeme() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const memeContainer = document.getElementById('memeContainer');
    const img = imgMeme;

    canvas.width = img.width;
    canvas.height = img.height;


    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';


    ctx.strokeText(memeText1.innerText, canvas.width / 2, 40);
    ctx.fillText(memeText1.innerText, canvas.width / 2, 40);


    ctx.strokeText(memeText2.innerText, canvas.width / 2, canvas.height - 20);
    ctx.fillText(memeText2.innerText, canvas.width / 2, canvas.height - 20);

    // Check if the meme image is loaded
    if (!img.src || !img.complete) {
        alert('No meme loaded or meme is still loading. Please try again!');
        return;
    }


    html2canvas(memeContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

