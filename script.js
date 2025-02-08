//fetchData();

async function fetchData() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemonSprite2 = data.sprites.front_shiny;
        const img = document.getElementById("pokemonSprite");
        const img2 = document.getElementById("pokemonSprite2");
        img.src = pokemonSprite;
        img.style.display = "block";

        img2.src = pokemonSprite2;
        img2.style.display = "block";

        console.log(data);

    }
    catch(error){
        console.error(error);
    }
    
}