//fetchData();
let pokeData;


function clear2(){
    const img = document.getElementById("pokemonSprite");
    img.style.visibility = "hidden";
    const box = document.getElementById("txtBox");
    const box2 = document.getElementById("txtBox2");
    const typingBox = document.getElementById("pokeName");
    
    box.innerHTML = "";
    box2.innerHTML = "";
    typingBox.value = "";

    document.querySelector('button[onclick="playAudio"]').disabled = false;
    //alert('Hey');
}

function defaultButton(pokeData){
    try{

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }
        // const defRear = pokeData.sprites.back_default;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
}

async function fetchData() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); 

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();

        pokeData = data;

        // data is the main piece
        console.log(pokeData);

        // backDefault(data);
        // frontShiny(data);
        // backShiny(data);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
        const speciesData = await speciesResponse.json();

        console.log(speciesData);

        showDexEntry(speciesData);

        const pokemonSprite = pokeData.sprites.front_default; 

        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default;
        // const pokemonSprite2 = data.sprites.front_shiny;
        // const dscrpItem = data.stats;
        const img = document.getElementById("pokemonSprite");
       // const img2 = document.getElementById("pokemonSprite2");
        // const dscrp = document.getElementById("dscp");
        // dscrp.src = dscrpItem;
        
        // img.src = pokemonSprite;
        img.src = pokemonAnmSpirite
        img.style.visibility = "visible";
        img.style.display = "block";

        showStats(pokeData.stats)

        //img2.src = pokemonSprite2;
       // img2.style.display = "block";

        // console.log(data);

        // document.querySelector('button[onclick="playAudio"]').disabled = false;

    }
    catch(error){

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const message = `${pokemonName} , this pokemon doesn't exist in this database`

        showError(message);
        // console.error(error);
    }
}

async function playAudio(pokeData){

    try {
        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        // if(!pokemonName) return;
        // // don't proceed if no pokemon is entered


        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const pokemonID = pokeData.id;

        const audio = new Audio();

        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonID}.ogg`

    audio.onerror = () => {
        console.log("audio not found for", pokemonName);
    }

        audio.play().catch(error => {
            showError("couldn't play the audio");
        });
    } catch(error) {
        console.log(error);
    }
    


}

function showError(message){
    const popup = document.getElementById('errorPopup');
    popup.querySelector('p').textContent = message;
    popup.style.display = 'block';
}

function closeError() {
    document.getElementById('errorPopup').style.display = 'none';
}

function showStats(stats){
    const statsContainer = document.getElementById("txtBox");

    //clear any stats
    statsContainer.innerHTML = "";

    //first stat
    for(let i = 0; i < stats.length; i++){
        let statsItem = stats[i];
        let statElement = document.createElement("p");
        statElement.textContent = `${statsItem.stat.name}: ${statsItem.base_stat}`;
        statsContainer.appendChild(statElement);
    }

    // if(stats.length > 0){
    //     const firstStat = stats[0];
    //     const statElement = document.createElement("p");
    //     statElement.textContent = `${firstStat.stat.name}: ${firstStat.base_stat}`;
    //     statsContainer.appendChild(statElement);
    // }
}

function showDexEntry(speciesData){
    const dexContainer = document.getElementById("txtBox2");

    dexContainer.innerHTML = "";

    //get the english flavor text
    const englishEntries = speciesData.flavor_text_entries
        .filter(entry => entry.language.name === 'en' && entry.version.name === 'y')

    if(englishEntries.length > 0){
        const firstElement = document.createElement("p");
        firstElement.textContent = englishEntries[0].flavor_text;
        dexContainer.appendChild(firstElement);
    } else {
        const noEntry = document.createElement("p");
        noEntry.textContent = "No Pokédex entry available.";
        dexContainer.appendChild(noEntry);
    }

    // const firstDexEntry = speciesData[0];
    // const firstElement = document.createElement("p");
    // firstElement.textContent = firstDexEntry.flavor_text
    // dexContainer.appendChild(firstElement);
}




function backDefault(pokeData) {

    try{

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();
        const defRear = pokeData.sprites.back_default;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.back_default;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}



function frontShiny(pokeData) {

    try{

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const defRear = pokeData.sprites.front_shiny;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_shiny;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite;

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}


function backShiny(pokeData) {

    try{

        // const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // if(!response.ok){
        //     throw new Error("Could not fetch resource");
        // }
        
        // const data = await response.json();

        if(!pokeData){
            throw new Error("Pokemon doesn't exist");
        }

        const defRear = pokeData.sprites.back_shiny;
        const pokemonAnmSpirite = pokeData.sprites.versions['generation-v']['black-white'].animated.back_shiny;

        const img = document.getElementById("pokemonSprite");

        // img.src = defRear;
        img.src = pokemonAnmSpirite;

        console.log(pokeData);
    }

    catch(error){
        console.error(error);
    }
    
}

// async function desc(){
//     try {
        
//     } catch (error) {
//         console.error(error);
//     }
// }

