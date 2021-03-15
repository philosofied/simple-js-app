let pokemonRepo = (function() {
    let pokemonList = [];
    let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function add(pokemon) { //validation function
        if (
            typeof pokemon === "object" &&
            "name" in pokemon /*&&
            "detailsUrl" in pokemon
            "height" in pokemon &&
            "types" in pokemon */
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() { //gets the pokemon
        return pokemonList
    }

    function addListItem(pokemon){ // function for dom manipulation to list pokemon as button
        let listOfPokemon = document.querySelector(".pokemon-list");
        let listedPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name; // the pokemon will appear as a button
        button.classList.add("button-class");
        button.addEventListener('click', function (event){ // event here the function passed as the second param for the event listener function when it is clicked (the first param of the event listener function)
            showDetails(pokemon)
        });
        listedPokemon.appendChild(button);
        listOfPokemon.appendChild(listedPokemon);
    
    }
    //ajax functions begin
    //fuction to get the details of the pokemon uses a promise to fetch that data from api
    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            //now add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types =  details.types;
        }).catch (function(e){
            console.error(e);
        });
    }
    //fuction to load the details for each pokemon
    function loadList(){ //function to contact apiUrl defined above
        return fetch(apiUrl).then(function (response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });    
        }).catch (function(e){
            console.log(e);
        })
    }
    //function to log the details of the pokemon
    function showDetails(pokemon){ //gets called when a pokemon is clicked
        loadDetails(pokemon).then(function(){ //is a promise to console log pokemon details of img url, height and types
            console.log(pokemon);
        });   
    }
    //ajax functions end
    
    return { //returns an object of functions
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
        showDetails: showDetails
    }

})();
console.log(pokemonRepo.getAll());


pokemonRepo.loadList().then(function() {
    pokemonRepo.getAll().forEach(function(pokemon) { // the forEach method takes each pokemon from the pokemonRepo   
        pokemonRepo.addListItem(pokemon); //uses the addListItem function to render each pokemon as a list item
    }); 
});
