const rooms = [
    {
        id: "hodnik",
        title: "Ulazni hodnik",
        image: "assets/images/hodnik.png",
        position: "center center",
        intro: "Hodnik je granica između sigurnosti doma i neizvjesnosti vanjskog svijeta. U romanu historijske okolnosti ne ostaju izvan kuće, nego ulaze u porodični život.",
        hotspots: [
            { id: "kaput", name: "Kaput", x: 16, y: 50, text: "Kaput podsjeća na odlazak, selidbe i nesigurnost." },
            { id: "kofer", name: "Stari kofer", x: 65, y: 72, text: "Kofer simbolizira život koji se često mora premještati zbog okolnosti koje čovjek ne bira." },
            { id: "vrata", name: "Vrata", x: 78, y: 43, text: "Vrata označavaju granicu između sigurnosti doma i neizvjesnosti vanjskog svijeta." }
        ]
    },
    {
        id: "kuhinja",
        title: "Kuhinja",
        image: "assets/images/kuhinja.png",
        position: "center center",
        intro: "Kuhinja je prostor svakodnevnice, rada i majčinstva. U njoj se čuva porodica, ali se u njoj osjeća i teret Fatimine/Timkine odgovornosti.",
        hotspots: [
            { id: "prazna-stolica", name: "Prazna stolica", x: 18, y: 63, text: "Prazna stolica podsjeća na odsutnost, čekanje i strah od gubitka." },
            { id: "sto", name: "Sto", x: 55, y: 68, text: "Sto predstavlja porodicu i svakodnevnu borbu da se život održi." },
            { id: "tijesto", name: "Tijesto", x: 48, y: 50, text: "Tijesto simbolizira rad, brigu, majčinstvo i ponavljanje svakodnevnih obaveza. Fatima/Timka je uvijek pravila hljeb, pa taj predmet dodatno pokazuje njenu stalnu brigu za porodicu." },
            { id: "prozor", name: "Prozor", x: 73, y: 29, text: "Prozor pokazuje Fatiminu/Timkinu vezu s vanjskim svijetom, ali i udaljenost od slobode." }
        ]
    },
    {
        id: "djecija-soba",
        title: "Dječija soba",
        image: "assets/images/djecija-soba.png",
        position: "center center",
        intro: "Dječija soba prikazuje najvažniji dio Fatiminog/Timkinog života: djecu, brigu, nježnost i strah za budućnost.",
        hotspots: [
            { id: "krevet", name: "Dječiji krevet", x: 74, y: 48, text: "Krevet predstavlja krhkost djece i Fatiminu/Timkinu potrebu da ih zaštiti." },
            { id: "igracka", name: "Drvena igračka", x: 38, y: 73, text: "Igračka simbolizira djetinjstvo koje mora postojati čak i u teškom vremenu." },
            { id: "cipele", name: "Mali par cipela", x: 49, y: 78, text: "Male cipele označavaju odrastanje, kretanje i život koji se nastavlja." },
            { id: "biljeska", name: "Porodična bilješka", x: 55, y: 43, text: "Porodična bilješka čuva tragove imena, nadimaka i bliskosti." }
        ]
    },
    {
        id: "prozor-zeljeznica",
        title: "Prozor prema željeznici",
        image: "assets/images/prozor-zeljeznica.png",
        position: "center center",
        intro: "Pogled prema željeznici povezuje prostor kuće s motivom skretnica. Šine, stanica i magla postaju simboli odlaska, čekanja i životnih pravaca.",
        hotspots: [
            { id: "sine", name: "Šine", x: 43, y: 63, text: "Šine predstavljaju pravac života koji nije uvijek slobodno izabran." },
            { id: "stanica", name: "Stanica", x: 63, y: 38, text: "Stanica je mjesto čekanja, odlazaka i neizvjesnosti." },
            { id: "magla", name: "Magla", x: 34, y: 34, text: "Magla simbolizira nejasnu budućnost i strah od onoga što dolazi." }
        ]
    },
    {
        id: "arhiva",
        title: "Arhiva sjećanja",
        image: "assets/images/arhiva.png",
        position: "center center",
        intro: "Arhiva sjećanja čuva ono što vrijeme ne može potpuno izbrisati. Fotografije, pisma i stari predmeti pokazuju da prošlost ostaje prisutna u čovjeku.",
        hotspots: [
            { id: "fotografija", name: "Stara fotografija", x: 28, y: 58, text: "Fotografija simbolizira prošlost i porodične tragove." },
            { id: "kljuc", name: "Ključ", x: 52, y: 62, text: "Ključ predstavlja dom, pripadnost i granice prostora." },
            { id: "pismo", name: "Pismo", x: 66, y: 45, text: "Pismo predstavlja neizgovorene misli i unutrašnji glas." },
            { id: "papir", name: "Poderani papir", x: 58, y: 78, text: "Poderani papir pokazuje da se sjećanja često javljaju u fragmentima." }
        ]
    }
];

const exploredItems = new Set();
const totalItems = rooms.reduce((total, room) => total + room.hotspots.length, 0);
let activeRoomId = rooms[0].id;

const roomNav = document.getElementById("roomNav");
const memoryRoom = document.getElementById("memoryRoom");
const roomTitle = document.getElementById("roomTitle");
const roomIntro = document.getElementById("roomIntro");
const hotspotLayer = document.getElementById("hotspotLayer");
const exploredCount = document.getElementById("exploredCount");
const totalCount = document.getElementById("totalCount");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const modal = document.getElementById("discoveryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const completionMessage = document.getElementById("completionMessage");

function initDustParticles() {
    const container = document.getElementById("dustParticles");

    for (let i = 0; i < 34; i += 1) {
        const particle = document.createElement("span");
        particle.className = "dust-particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 14}s`;
        particle.style.animationDuration = `${12 + Math.random() * 10}s`;
        particle.style.opacity = String(0.2 + Math.random() * 0.5);
        container.appendChild(particle);
    }
}

function initTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const tabId = button.dataset.tab;

            buttons.forEach((item) => {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });
            button.classList.add("active");
            button.setAttribute("aria-current", "page");

            contents.forEach((content) => {
                content.classList.toggle("active", content.id === `tab-${tabId}`);
            });
        });
    });
}

function openHouseTab() {
    document.querySelector('[data-tab="kuca"]').click();
    document.getElementById("glavni-dio").scrollIntoView({ behavior: "smooth", block: "start" });
}

function initRoomNavigation() {
    rooms.forEach((room) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "room-card";
        button.dataset.room = room.id;
        button.textContent = room.title;
        button.addEventListener("click", () => renderRoom(room.id));
        roomNav.appendChild(button);
    });
}

function renderRoom(roomId) {
    const room = rooms.find((item) => item.id === roomId) || rooms[0];
    activeRoomId = room.id;

    document.querySelectorAll(".room-card").forEach((button) => {
        const isActive = button.dataset.room === room.id;
        button.classList.toggle("active", isActive);
        button.toggleAttribute("aria-current", isActive);
    });

    memoryRoom.style.setProperty("--room-image", `url('${room.image}')`);
    memoryRoom.style.setProperty("--room-position", room.position);
    memoryRoom.classList.remove("is-changing");
    void memoryRoom.offsetWidth;
    memoryRoom.classList.add("is-changing");

    roomTitle.textContent = room.title;
    roomIntro.textContent = room.intro;
    hotspotLayer.innerHTML = "";

    room.hotspots.forEach((hotspot) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "hotspot";
        button.dataset.item = hotspot.id;
        button.style.left = `${hotspot.x}%`;
        button.style.top = `${hotspot.y}%`;
        button.setAttribute("aria-label", `Otvori trag: ${hotspot.name}`);
        button.innerHTML = `<span>${hotspot.name}</span>`;

        if (exploredItems.has(hotspot.id)) {
            button.classList.add("explored");
        }

        button.addEventListener("click", () => revealHotspot(hotspot, button));
        hotspotLayer.appendChild(button);
    });
}

function revealHotspot(hotspot, button) {
    if (!exploredItems.has(hotspot.id)) {
        exploredItems.add(hotspot.id);
        button.classList.add("explored");
        updateProgress();
        checkCompletion();
    }

    modalTitle.textContent = hotspot.name;
    modalText.textContent = hotspot.text;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function updateProgress() {
    const count = exploredItems.size;
    const percent = Math.round((count / totalItems) * 100);

    exploredCount.textContent = count;
    totalCount.textContent = totalItems;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
}

function checkCompletion() {
    if (exploredItems.size === totalItems) {
        window.setTimeout(() => {
            completionMessage.classList.add("show");
            completionMessage.setAttribute("aria-hidden", "false");
        }, 500);
    }
}

function resetExploration() {
    exploredItems.clear();
    updateProgress();
    completionMessage.classList.remove("show");
    completionMessage.setAttribute("aria-hidden", "true");
    renderRoom(activeRoomId);
}

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

function initEvents() {
    document.getElementById("startBtn").addEventListener("click", openHouseTab);
    document.getElementById("resetBtn").addEventListener("click", resetExploration);
    document.getElementById("modalClose").addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    completionMessage.addEventListener("click", (event) => {
        if (event.target === completionMessage) {
            completionMessage.classList.remove("show");
            completionMessage.setAttribute("aria-hidden", "true");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
            completionMessage.classList.remove("show");
            completionMessage.setAttribute("aria-hidden", "true");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initDustParticles();
    initTabs();
    initRoomNavigation();
    initEvents();
    updateProgress();
    renderRoom(activeRoomId);
});
