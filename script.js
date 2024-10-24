document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const query = document.getElementById("search-input").value;
    const resultsDiv = document.getElementById("results");
    console.log(query.split(" ").join(","));
    let queryModified = query.split(" ").join(",");

    resultsDiv.innerHTML = ""; // Réinitialise le contenu

    const apiKey = "be85e323c185479992772500aebaa745";
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryModified}&number=100&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Vérifie si des résultats ont été retournés
      if (data.length > 0) {
        // Crée un conteneur pour les résultats
        const resultContainer = document.createElement("div");
        resultContainer.classList.add("result-container"); // Applique la classe pour le style

        data.forEach((recipe) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("result-item");

          
          const viewMoreButton = document.createElement("button");
          viewMoreButton.textContent = "Voir plus";
          viewMoreButton.classList.add("view-more-button"); // Ajoute une classe pour le style
          
          const recipeId = recipe.id;
          let summaryLink = `https://api.spoonacular.com/recipes/${recipeId}/summary`;
            // console.log(recipeId);
            
          // Ajouter une action au bouton (facultatif)
          viewMoreButton.addEventListener("click", () => {
            viewMoreButton = summaryLink;
            viewMoreButton.style.opacity = 1;
            
          });

          // Créer un élément pour l'image
          const img = document.createElement("img");
          img.src = recipe.image; // URL de l'image fournie par l'API
          img.alt = recipe.title; // Texte alternatif pour l'image
          img.style.width = "150%"; // Largeur fixe pour l'image
          img.style.height = "70%"; // Largeur fixe pour l'image
          img.style.objectFit = "cover";
          if (
            img.src === "https://img.spoonacular.com/recipes/157994-312x231.jpg"
          ) {
            img.src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoqXNBexRgew6h0arAAE_I2MF136z7KzWjdA&s`;
          } // l'url fourni par l'api ne fonctionne pas donc j'applique un "if" pour changer le lien de l'image lorque la recherche mene a ce premier lien

          // Ajouter le titre de la recette
          const title = document.createElement("div");
          title.textContent = recipe.title;
          title.classList.add("recipeTitle");
          // Ajouter l'image et le titre à l'élément resultItem
          resultItem.appendChild(img);
          resultItem.appendChild(title);

          // Ajouter resultItem à resultContainer
          resultContainer.appendChild(resultItem);
        });

        // Ajouter le conteneur des résultats au div principal
        resultsDiv.appendChild(resultContainer);
      } else {
        resultsDiv.textContent = "Aucun résultat trouvé.";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
      resultsDiv.textContent = "Erreur de récupération des résultats.";
    }
    results;
  });
