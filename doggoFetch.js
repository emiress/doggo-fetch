document.addEventListener("DOMContentLoaded", () => {
    const imageFrame = document.getElementById("image-frame");
    const optionsContainer = document.getElementById("options");

    async function fetchDogImage() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        return data.message;
    }

    async function loadQuiz() {
        const imageUrl = await fetchDogImage();
        const breed = imageUrl.split("/")[4].replace("-", " "); 

      
        imageFrame.innerHTML = `<img src="${imageUrl}" alt="Random Doggo">`;

        
        const breeds = [breed, "golden retriever", "bulldog", "poodle"];
        const shuffledBreeds = breeds.sort(() => Math.random() - 0.5);

        optionsContainer.innerHTML = shuffledBreeds.map(choice => 
            `<button class="option-btn" onclick="checkAnswer('${choice}', '${breed}')">${choice}</button>`
        ).join("");
    }

    window.checkAnswer = (selected, correct) => {
        alert(selected === correct ? "Correct!" : `Wrong! It's a ${correct}.`);
        loadQuiz(); 
    };

    loadQuiz();
});