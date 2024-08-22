class gmgallery {
    constructor(parent) {
        this.parent = parent;
        this.popup;
    }
    create(attribute = null) {
        let imgsContainer;

        if (typeof this.parent == "object") {
            imgsContainer = this.parent;
        } else {
            imgsContainer = document.querySelector(this.parent);
        }

        let images;
        if (attribute) {
            images = imgsContainer.querySelectorAll(`img[${attribute}]`);
        } else {
            images = imgsContainer.querySelectorAll('img');
        }
        if (images) {
            images.forEach(img => {
                img.addEventListener('click', e => {
                    this.append(images, Array.from(images).indexOf(e.currentTarget))
                })
            });
        }
    }
    append(imgs, index = 0) {
        this.popup = document.createElement('div');
        let leftArrow = document.createElement('div'),
            rightArrow = document.createElement('div'),
            imgElement = document.createElement('img'),
            close = document.createElement('div');

        this.popup.classList.add('gm-gallery-popup');
        leftArrow.classList.add('gm-gallery-left-arrow');
        rightArrow.classList.add('gm-gallery-right-arrow');
        close.classList.add('gm-gallery-close-button');

        leftArrow.innerHTML = `&lt;`;
        rightArrow.innerHTML = `&gt;`;
        close.innerHTML = `X`;

        imgElement.src = imgs[index].src;

        leftArrow.addEventListener('click', leftMove);
        rightArrow.addEventListener('click', rightMove);


        this.popup.addEventListener('click', e => {
            if (e.target == this.popup) {
                this.close();
            }
        })
        close.addEventListener('click', e => {
            this.close();
        })
        window.onkeyup = e => {
            
            if (e.which == 27) {
                this.close();
            }
            if (e.which == 39) {
                rightMove()
            }
            if (e.which == 37) {
                leftMove()
            }
        }

        this.popup.appendChild(imgElement)
        this.popup.appendChild(leftArrow)
        this.popup.appendChild(rightArrow)
        this.popup.appendChild(close)
        document.body.appendChild(this.popup);

        function leftMove() {
            index == 0 ? index = imgs.length - 1 : index--;
            imgElement.src = imgs[index].src;
        }
        function rightMove() {
            index == imgs.length - 1 ? index = 0 : index++;
            imgElement.src = imgs[index].src;
        }
    }
    close() {
        this.popup.remove()
    }
}