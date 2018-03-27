const autoplay = {
    vids: document.querySelectorAll("video"),
    play: function(vid) {
        vid.play().then(() => {
        }).catch((error) => {
            console.log(error);
        });
    },
    isVidVisible: function(vids, scrollPos) {

        vids.forEach((vid) => {
            let rect = vid.getBoundingClientRect();
            let horizontalCenterScrollPos = scrollPos + (window.innerHeight / 2);
            let visible = horizontalCenterScrollPos >= rect.y + (rect.height / 2);
            let bottomReached = horizontalCenterScrollPos <= rect.y + rect.height;

            if(visible && !bottomReached){
                this.play(vid);
            } else {
                vid.pause();
            }
        })
    },
    init: function () {
        window.addEventListener("scroll", (ev) => {
            this.isVidVisible(this.vids, window.scrollY);
        });
        console.log(this.vids);
    }
};

autoplay.init();