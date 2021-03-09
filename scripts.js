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
    return { //returns an object, key is add and value is add
        add: add,
        getAll: getAll
    };
})(); //calls the IIFE
pokemonRepo.add({ name: 'Pikachu', height: 5, types: ['electric'] });
pokemonRepo.add({ name: 'Raichu', height: 5, types: ['electric'] });
console.log(pokemonRepo.getAll());



pokemonRepo.getAll().forEach(function(pokemon) { // the forEach method takes each pokemon from the array of pokedex
    let size = ' '
    if (pokemon.height > 9) {
        size = 'thats a big pokemon'
    } else if (pokemon.height < 5) {
        size = 'this a smaller pokemon'
    } else {
        size = 'this is a medium pokemon'
    }
    document.write(pokemon.name + ' (height : ' + pokemon.height + ') ' + size + '<br>' + pokemon.types + '<br>'); //a check of pokemon.height 


}); //(); calls the function to execute the forEach