//fetchData();

function clear2(){
    const img = document.getElementById("pokemonSprite");
    img.style.visibility = "hidden";
    //alert('Hey');
}



async function fetchData() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); 

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        console.log(data);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
        const speciesData = await speciesResponse.json();

        console.log(speciesData);

        showDexEntry(speciesData);

        const pokemonSprite = data.sprites.front_default;
        const pokemonSprite2 = data.sprites.front_shiny;
        const dscrpItem = data.stats;
        const img = document.getElementById("pokemonSprite");
       // const img2 = document.getElementById("pokemonSprite2");
        const dscrp = document.getElementById("dscp");
        dscrp.src = dscrpItem;
        
        img.src = pokemonSprite;
        img.style.visibility = "visible";
        img.style.display = "block";

        showStats(data.stats)

        //img2.src = pokemonSprite2;
       // img2.style.display = "block";

        // console.log(data);

    }
    catch(error){
        console.error(error);
    }
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
        .filter(entry => entry.language.name === 'en' && entry.version.name === 'red')

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




async function backDefault() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const defRear = data.sprites.back_default;

        const img = document.getElementById("pokemonSprite");

        img.src = defRear;

        console.log(data);
    }

    catch(error){
        console.error(error);
    }
    
}



async function frontShiny() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const defRear = data.sprites.front_shiny;

        const img = document.getElementById("pokemonSprite");

        img.src = defRear;

        console.log(data);
    }

    catch(error){
        console.error(error);
    }
    
}


async function backShiny() {

    try{

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const defRear = data.sprites.back_shiny;

        const img = document.getElementById("pokemonSprite");

        img.src = defRear;

        console.log(data);
    }

    catch(error){
        console.error(error);
    }
    
}

async function desc(){
    try {
        
    } catch (error) {
        console.error(error);
    }
}

