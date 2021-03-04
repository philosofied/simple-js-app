// pokedex is an array with three items where each item has key value, name, height and weight and the type is another array water, grass poison etc... 
let pokedex = [
    {name: 'Bulbasaur', height: 11, weight: 12, type:['grass', 'poison']},
    {name: 'Squirtle', height: 15, weight: 16, type:['water']},
    {name: 'Charmander', height: 11, weight: 100, type:['Fire']}
]; //closes the array



//for loop begins iterating at 0 and continues to loop (i ++) so long as the length of the array: pokedex is less than its length 
for (let i = 0; i < pokedex.length; i++){
    if (pokedex[i].weight > 10 && pokedex[i].weight < 15){ // checks the weight of an item in the iteration  and writes out the below
        document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs its a lil heavy<br/> <br/>`);// this line is using the placeholders (${...}) for each item in the array, and then these are inside the template literals  indicated by backticks `...`
    }else if (pokedex[i].weight > 15 && pokedex[i].weight < 20) {
        document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs its getting heavier<br/> <br/>`);
    }else {
        document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs its a heavy boi<br/> <br/>`);
    }
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

