// pokedex is an array with three items where each item has key value, name, height and weight and the type is another array water, grass poison etc... 
let pokedex = [
    {name: 'Bulbasaur', height: 7, weight: 12, types:['grass', 'poison']},
    {name: 'Squirtle', height: 15, weight: 16, types:['water']},
    {name: 'Charmander', height: 11, weight: 100, types:['Fire']}
]; //closes the array

for (let i = 0; i < pokedex.length; i++){
    let size = " " //setting size to empty for use with each iteration over the loop, so that each item can be loaded into 'size' and then displayed in the document.write
    if (pokedex[i].height < 10){
        size = "this is a small pokemon"
    } else if (pokedex[i].height > 13){
        size = "this is a big pokemon"
    } else {
        size = " this is a medium pokemon"
    }
    document.write(pokedex[i].name + 
        " ( height: " + 
        pokedex[i].height +
        ")"+
        "<br/>" +
        size +
        "<br/>"+
        pokedex[i].types +
        "<br/>")
}




// replacing wet code with dry code https://codinglead.github.io/javascript/what-is-DRY-code
//https://careerfoundry.com/en/course/full-stack-immersion/exercise/javascript-basics-1#primitive-data-types
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

