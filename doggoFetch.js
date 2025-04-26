document.addEventListener("DOMContentLoaded", async function () {
    const imageFrame = document.getElementById("image-frame");
    const optionsContainer = document.getElementById("options");

   
    async function fetchDoggo() {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            const imageUrl = data.message;

           
            const breedName = imageUrl.split("/")[4].replace("-", " ");

           
            imageFrame.innerHTML = `<img src="${imageUrl}" alt="Random Doggo">`;

          
            generateOptions(breedName);
        } catch (error) {
            console.error("Error fetching dog image:", error);
            imageFrame.innerHTML = "<p>Failed to fetch dog image. Try again later.</p>";
        }
    }

    
    async function generateOptions(correctBreed) {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();
            const breeds = Object.keys(data.message);

            
            let options = [correctBreed];
            while (options.length < 4) {
                const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
                if (!options.includes(randomBreed)) options.push(randomBreed);
            }

            options = shuffleArray(options);

          
            optionsContainer.innerHTML = options.map(
                breed => `<button class="option">${breed}</button>`
            ).join("");

           
            document.querySelectorAll(".option").forEach(button => {
                button.addEventListener("click", () => {
                    if (button.textContent === correctBreed) {
                        alert("Correct!");
                    } else {
                        alert("Oops! Try again.");
                    }
                    fetchDoggo();
                });
            });

        } catch (error) {
            console.error("Error fetching breed list:", error);
        }
    }

  
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

   
    fetchDoggo();
});