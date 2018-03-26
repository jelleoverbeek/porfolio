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
            let rect = item.getBoundingClientRect(),
                startYear = item.dataset.yearStart,
                endYear = item.dataset.yearEnd;

            if(startYear <= currentYear && endYear >= currentYear || endYear === "now") {
                this.makeSticky(item);

                if(rect.y <= 0) {
                    item.style.position = "fixed";
                    item.style.top = "0";
                }
            } else if(startYear === currentYear) {
                item.style.position = "absolute";
                item.style.top = this.calculateEndPosition(item);
            } else {
                this.unmakeSticky(item);
            }
        });
    },
    calculateEndPosition: function (item) {
        let itemRect = item.getBoundingClientRect();
        let itemHeight = itemRect.height;
        let topPosition = "";

        this.years.forEach((year) => {
            let yearRect = year.getBoundingClientRect();
            if(year.dataset.year === item.dataset.yearEnd) {
                topPosition = year.offsetTop + yearRect.height - (itemHeight/2) + "px";
            }
        });

        return topPosition;
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