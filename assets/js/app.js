const timeline = {
    wrapper: document.querySelector(".timeline"),
    years: document.querySelectorAll(".timeline .timeline-path__year"),
    items: document.querySelectorAll(".timeline .timeline-item"),
    makeSticky: function (element) {
        element.classList.remove("invisible")
    },
    unmakeSticky: function (element) {
        element.classList.add("invisible")
    },
    checkPosition: function (ev) {
        let currentYear = 0;

        this.years.forEach((year) => {
            let rect = year.getBoundingClientRect();

            console.log();

            if(rect.y + rect.height <= 0) {
                currentYear = year.dataset.year;
            }
        });

        this.items.forEach((item) => {
            let startYear = item.dataset.yearStart,
                endYear = item.dataset.yearEnd;

            if(startYear < currentYear && endYear >= currentYear || endYear === "now") {
                this.makeSticky(item);
            } else {
                this.unmakeSticky(item);
            }
        });
    },
    setPositions: function () {
        this.years.forEach((year) => {
            let yearRect = year.getBoundingClientRect();
            let currentYear = year.dataset.year;

            this.items.forEach((item) => {
                if(item.dataset.yearEnd === currentYear) {
                    let itemRect = item.getBoundingClientRect();
                    let itemHeight = itemRect.height;
                    item.style.top = year.offsetTop + yearRect.height - (itemHeight/2) + "px";
                }
            });
        });
    },
    init: function () {
        this.setPositions();

        window.addEventListener("scroll", (ev) => {
            this.checkPosition(ev);
        });
    }
};

if(document.querySelector(".timeline")) {
    timeline.init();
}