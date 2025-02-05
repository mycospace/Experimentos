// Speichert die Hypothese & das Experiment gemeinsam im Archiv
function saveExperiment() {
    let hypText = document.getElementById("hypothese").value;
    let expText = document.getElementById("experiment").value;

    if (!hypText || !expText) {
        alert("Bitte beide Felder ausfüllen!");
        return;
    }

    // Archivstruktur erstellen & speichern
    let archive = localStorage.getItem("experimentArchive");
    let archiveArray = archive ? JSON.parse(archive) : [];

    let entry = {
        date: new Date().toLocaleString(),
        hyp: hypText,
        exp: expText
    };

    archiveArray.push(entry);
    localStorage.setItem("experimentArchive", JSON.stringify(archiveArray));

    // Feedback geben
    let feedback = document.createElement("p");
    feedback.innerText = "✅ Gespeichert!";
    feedback.classList.add("feedback");
    document.querySelector("main").appendChild(feedback);

    setTimeout(() => feedback.remove(), 2000);
}

// Zeigt das Archiv mit Datum & gespeicherten Einträgen
function showArchive() {
    let archive = localStorage.getItem("experimentArchive");
    if (!archive) {
        alert("Keine archivierten Einträge gefunden.");
        return;
    }

    let archiveArray = JSON.parse(archive);
    if (archiveArray.length === 0) {
        alert("Keine archivierten Einträge gefunden.");
        return;
    }

    // Modal erstellen
    let overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    let modal = document.createElement("div");
    modal.className = "modal";

    let title = document.createElement("h2");
    title.innerText = "📂 Archivierte Mini-Experimente";
    modal.appendChild(title);

    let list = document.createElement("ul");
    archiveArray.forEach(entry => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${entry.date}</strong><br>
                        <b>Hypothese:</b> ${entry.hyp}<br>
                        <b>Experiment:</b> ${entry.exp}`;
        list.appendChild(li);
    });

    modal.appendChild(list);

    // Schließen-Button
    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Schließen";
    closeBtn.onclick = () => overlay.remove();
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
