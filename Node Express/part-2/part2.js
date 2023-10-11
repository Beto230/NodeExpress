const drawCardButton = document.getElementById("drawCardButton");
const cardDisplay = document.getElementById("cardDisplay");

let deckId = null;

async function createNewDeck() {
    try {
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data = await response.json();
        deckId = data.deck_id;
    } catch (error) {
        console.error("Error creating a new deck:", error);
    }
}

async function drawCard() {
    if (deckId) {
        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            if (data.cards.length > 0) {
                const card = data.cards[0];
                const cardText = `${card.value} of ${card.suit}`;
                cardDisplay.textContent = cardText;
            } else {
                cardDisplay.textContent = "No cards remaining in the deck.";
                drawCardButton.disabled = true;
            }
        } catch (error) {
            console.error("Error drawing a card:", error);
        }
    } else {
        console.log("No deck available. Please create a new deck first.");
    }
}

drawCardButton.addEventListener("click", drawCard);

createNewDeck();
