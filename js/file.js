const file = document.getElementById('file');
const image = document.getElementById('image');



function renderFile (e) {
    console.log(8, e)
    const fr = new FileReader();
    fr.readAsDataURL(file.files[0])
    fr.onload = function(e) {
        image.src = fr.result
        image.style.width = '550px';
        image.style.height = 'auto';
    }
    
}


file.addEventListener('change', renderFile)