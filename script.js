async function loadData() {
    try {
        const subjectsResponse = await fetch('subjects.json');
        const descriptorsResponse = await fetch('descriptors.json');
        const subjectsData = await subjectsResponse.json();
        const descriptorsData = await descriptorsResponse.json();
        return {
            subjects: subjectsData.subjects,
            descriptors: descriptorsData.descriptors
        };
    } catch (error) {
        console.error('Error loading JSON files:', error);
        return { subjects: [], descriptors: [] }; // Fallback
    }
}

async function generatePrompts() {
    const count = parseInt(document.getElementById("count").value);
    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous output

    if (!count || count < 1 || count > 30) {
        output.innerHTML = "<li>Please enter a number between 1 and 30.</li>";
        return;
    }

    const data = await loadData();
    if (data.subjects.length === 0 || data.descriptors.length === 0) {
        output.innerHTML = "<li>Error: Could not load prompt data.</li>";
        return;
    }

    for (let i = 0; i < count; i++) {
        const subject = data.subjects[Math.floor(Math.random() * data.subjects.length)];
        const descriptor = data.descriptors[Math.floor(Math.random() * data.descriptors.length)];
        const prompt = `Day ${i + 1}: A ${descriptor} ${subject}`;
        const li = document.createElement("li");
        li.textContent = prompt;
        output.appendChild(li);
    }
}
