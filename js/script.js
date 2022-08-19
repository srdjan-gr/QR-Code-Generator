const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');


const clearInputOnPageLoad = () => {
    document.getElementById('url').value = '';
}
window.onload = clearInputOnPageLoad;


const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url === ''){
        alert('Please enter URL...')
    }else{
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            generateQrCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl, size);
            }, 50);
        }, 1000);
    }
};

const generateQrCode = (url, size) => {
    const qrcode = new QRCode ('qrcode', {
        text: url,
        width: size,
        height: size,
    })
} 

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('saveLink');
    if(saveBtn){
        saveBtn.remove();
    }
}

const createSaveBtn = (saveUrl, size) => {
    const link = document.createElement('a');
    link.id = 'saveLink';
    link.classList = 'bg-red-500 w-full rounded hover:bg-red-600 text-white font-bold py-2 w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = `qrcode-${size}x${size}`;
    link.innerHTML = 'Save Image';

    document.getElementById('generated').appendChild(link)
}

hideSpinner();
form.addEventListener('submit', onGenerateSubmit);

