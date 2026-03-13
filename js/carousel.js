let imagesBase = [];
let currentIndex = 0;

window.onload = function () {
    let saved = localStorage.getItem("carouselImages");

    if (saved) {
        imagesBase = JSON.parse(saved);

        if (imagesBase.length > 0) {
            currentIndex = 0;
            displayImage();
        }
    }
};

function loadImages(event) {
    let files = event.target.files;

    for (let file of files) {
        let reader = new FileReader();

        reader.onload = function () {
            imagesBase.push({
                name: file.name,
                src: reader.result
            });

            localStorage.setItem("carouselImages", JSON.stringify(imagesBase));

            if (imagesBase.length === 1) {
                currentIndex = 0;
                displayImage();
            }
        };

        reader.readAsDataURL(file);
    }
}

function displayImage() {
    if (imagesBase.length === 0) {
        document.getElementById("carouselImage").src = "";
        return;
    }

    document.getElementById("carouselImage").src = imagesBase[currentIndex].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imagesBase.length;
    displayImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imagesBase.length) % imagesBase.length;
    displayImage();
}

function deleteImage() {
    let confirmDelete = confirm("Are you sure you want to delete this image?");

    if (!confirmDelete) {
        return;
    }

    imagesBase.splice(currentIndex, 1);
    localStorage.setItem("carouselImages", JSON.stringify(imagesBase));

    if (currentIndex >= imagesBase.length) {
        currentIndex = Math.max(0, imagesBase.length - 1);
    }

    if (imagesBase.length === 0) {
        document.getElementById("carouselImage").src = "";
        return;
    }

    displayImage();
}
