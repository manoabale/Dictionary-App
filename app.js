document.getElementById("searchBtn").addEventListener("click", searchWord);

async function searchWord() {
  const word = document.getElementById("wordInput").value;

  if (!word) {
    alert("Please enter a word");
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.title === "No Definitions Found") {
      document.getElementById("result").innerHTML = "<p>No definition found.</p>";
      return;
    }

    const meaning = data[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example || "No example available.";
    const partOfSpeech = meaning.partOfSpeech;

    const audio = data[0].phonetics[0]?.audio || "";

    document.getElementById("result").innerHTML = `
      <h2>${data[0].word}</h2>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
      ${audio ? `<audio controls src="${audio}"></audio>` : "<p>No audio available.</p>"}
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = "<p>Error fetching definition.</p>";
  }
}
