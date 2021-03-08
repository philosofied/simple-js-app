// pokedex is an array with three items where each item has key value, name, height and weight and the type is another array water, grass poison etc... 
let pokedex = [
    {name: 'Bulbasaur', height: 4, weight: 12, types:['grass', 'poison']},
    {name: 'Squirtle', height: 4, weight: 16, types:['water']},
    {name: 'Charmander', height: 11, weight: 100, types:['Fire']}
]; //closes the array

let pokemonRepo = (function() { 
    return{
        add: function(pokemon){ 
            if (typeof pokemon === 'object' && typeof pokemon !== null){
                pokedex.push(pokemon);
                console.log(Object.values(pokemon))
            } else {
                console.log(pokemon + ' needs to be an object')
            }
        },
        getAll: function(){
            return pokedex;
        }
    };
})();//calls the IIFE
pokemonRepo.add({ name: 'Pikachu', height: 5, types:['electric']});
pokemonRepo.add({ name: 'Raichu', height: 5, types:['electric']}); 
console.log(pokemonRepo.getAll());


(function (){
    pokedex.forEach(function(pokemon){// the forEach method takes each pokemon from the array of pokedex
        let pokemonName = pokemon.name //forEach uses the dot notion to access the items in the array. in this case the pokemon.name is accessed and loaded into pokemonName variable each iteration through the loop
        let pokemonHeight = pokemon.height
        if (pokemonHeight < 5){
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')' + ' this is a lil dude<br>');//a check of pokemon.height 
        } else {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')'+' this is a bigger dude <br>');
        }
    });
})();//(); calls the function to execute the forEach