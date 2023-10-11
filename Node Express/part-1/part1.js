
const favoriteNumber = 7; 
const numberOfFacts = 4; 

async function getNumberFacts(number, numberOfFacts) {
  try {
    const response = await fetch(`http://numbersapi.com/${number}/?json&limit=${numberOfFacts}`);
    const data = await response.json();
    
    const numberFactsDiv = document.getElementById("numberFacts");

    data.forEach((fact) => {
      const factText = fact.text;
      const factElement = document.createElement("p");
      factElement.textContent = factText;
      numberFactsDiv.appendChild(factElement);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

getNumberFacts(favoriteNumber, numberOfFacts);
