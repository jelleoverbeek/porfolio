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
            let topVisible = vid.offsetTop > scrollPos;
            let bottomVisible = vid.offsetTop + rect.height < scrollPos + window.innerHeight;

            if(topVisible && bottomVisible){
                this.play(vid);
            } else {
                vid.pause();
            }
        })
    },
    init: function () {
        window.addEventListener("scroll", (ev) => {
            this.isVidVisible(this.vids, window.pageYOffset);
        });

        this.isVidVisible(this.vids, window.pageYOffset);
    }
};

autoplay.init();