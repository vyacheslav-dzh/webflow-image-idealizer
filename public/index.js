var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const image_input = document.getElementById('image-input');
const width_input = document.getElementById('input-image-width');
const height_input = document.getElementById('input-image-height');
document.getElementById("form").onsubmit = formSubmitF;
image_input.addEventListener('change', imageLoadF);
let width = 0;
let height = 0;
let result_url;
let image_file = null;
width_input.onchange = (event) => {
    const target = event.target;
    if (target.value) {
        width = parseInt(target.value);
    }
    image_input.dispatchEvent(new Event('change'));
};
height_input.onchange = (event) => {
    const target = event.target;
    if (target.value) {
        height = parseInt(target.value);
    }
    image_input.dispatchEvent(new Event('change'));
};
function imageLoadF(event) {
    const target = event.target;
    if (!target.files[0])
        return;
    image_file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image_file);
    reader.addEventListener('load', (event) => {
        let image_url = event.target.result;
        let img = document.createElement('img');
        img.src = image_url;
        img.onload = (event) => {
            const target = event.target;
            const canvas = document.createElement('canvas');
            const ratio = width / target.width > 0 ? width / target.width : 1;
            canvas.width = width > 0 ? width : target.width;
            canvas.height = target.height * ratio;
            console.log(width, target.width, width / target.width);
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            result_url = context.canvas.toDataURL('image/webp', 70);
        };
    });
    document.getElementById('img-name').innerText = image_file.name;
}
function formSubmitF(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        if (!result_url || !image_file)
            return;
        const download_link = document.createElement('a');
        download_link.href = result_url;
        download_link.setAttribute('download', '');
        download_link.click();
    });
}
