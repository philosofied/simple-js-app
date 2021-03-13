let pokemonRepo = (function() {
    let pokedex = [ //funciton scope
        { name: 'Bulbasaur', height: 4, weight: 12, types: ['grass', 'poison'] },
        { name: 'Squirtle', height: 4, weight: 16, types: ['water'] },
        { name: 'Charmander', height: 11, weight: 100, types: ['Fire'] }
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            pokedex.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokedex
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    function addListItem(pokemon){
        let listOfPokemon = document.querySelector(".pokemon-list");
        let listedPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name; // the pokemon will appear as a button
        button.classList.add("button-class");
        button.addEventListener('click', function (event){ // event here the function passed as the second param for the event listener function when it is clicked (the first param of the event listener function)
            showDetails(pokemon);
        });
        listedPokemon.appendChild(button);
        listOfPokemon.appendChild(listedPokemon);
    
    }
    return { //returns an object of functions
        add: add,
        getAll: getAll,
        addListItem: addListItem
        //showDetails: showDetails
    };
})(); //calls the IIFE
pokemonRepo.add({ name: 'Pikachu', height: 5, types: ['electric'] });
pokemonRepo.add({ name: 'Raichu', height: 5, types: ['electric'] });
console.log(pokemonRepo.getAll());



pokemonRepo.getAll().forEach(function(pokemon) { // the forEach method takes each pokemon from the array of pokemonRepo   
    pokemonRepo.addListItem(pokemon); //uses the addListItem function to render each pokemon as a list item
}); 

// let button = document.querySelector("button");
// button.addEventListener('click', function (event){ // event here the function passed as the second param for the event listener function when it is clicked (the first param of the event listener function)
//     console.log(event);
// });