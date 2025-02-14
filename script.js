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
        // console.log(data);
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

        //img2.src = pokemonSprite2;
       // img2.style.display = "block";

        console.log(data);

    }
    catch(error){
        console.error(error);
    }
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

