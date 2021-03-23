// define the poke repo function
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; //this is where the pokemon data is coming from
    let modalContainer = document.querySelector('#modal-container') // where details will be displayed

    function getAll(){
        return pokemonList; //just adds pokemon to a list
    }
    function hideDetails(){
        modalContainer.querySelector.classList.remove('is-visible') //applies css to the modal/details screen to close it
    }
    //loading message goes here when figured out

    function addEventListener(button, pokemon){ //cosnider renaming this function?
        button.addEventListener('click', function(){
            showDetails(pokemon) //when the button is clicked the show details function will reveal the pokemon
        });
    }

    //the list for the pokedex
    function addListItem(pokemon){ //the pokemon in the list will appear as a ul, and each pokemon as an item in that ul with its own button to click on
        let pokedexList = document.querySelector('ul');
        let listItem = document.querySelector('li');
        let button = document.createElement('button');

        //takes the pokemon name adds it to a button
        button.innerText = pokemon.name
        button.classList.add('pokedex-list__item') //see BEM styles in styles.css
        addEventListener(button, pokemon);

        //adds a new list item as child and a (child) button
        listItem.appendChild(button); 
        pokedexList.appendChild(listItem); //come back to explain this better
    }
    //end list for the pokedex
    //begin modal display for any one selected pokemon
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            modalContainer.innerHTML = ''; //the modal will continue to load new items, unless cleared??
            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer){
                    hideDetails(); //if the modal container is clicked it will be closed
                }
            });
            //modal generator begins
            let modal = document.createElement('div');
            modal.classList.add('modal');
            //modal content generator begins
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal__close', 'top-right'); //positioning??
            closeButtonElement.addEventListener('click', ()=> { 
                hideDetails(); //clicking x closes the modal
            })
            //begin detail items in the modal
            let pokemonPicture = document.createElement('img');
            pokemonPicture.classList.add('modal__image');
            pokemonPicture.src = pokemon.imageUrl;

            let modalDetails = document.createElement('div');
            modalDetails.classList.add('modal__details');

            let pokemonName = document.createElement('h1');
            pokemonName.classList.add('modal__details--item');
            pokemonName.innerHTML = pokemon.name;

            let pokemonSpeciesType = document.createElement('h1');
            pokemonSpeciesType.classList.add('modal__details--item');
            pokemonSpeciesType.innerHTML = pokemon.name;

            let pokemonWeight = document.createElement('h1');
            pokemonWeight.classList.add('modal__details--item');
            pokemonWeight.innerHTML = `Weight: ${pokemon.weight} kg`;
            
            let pokemonHeight = document.createElement('h1');
            pokemonHeight.classList.add('modal__details--item');
            pokemonHeight.innerHTML = `Height: ${pokemon.height} m`;

            let pokemonType = document.createElement('h1');
            pokemonType.classList.add('modal__details--item');
            pokemonType.innerHTML = pokemon.types;

            let pokemonDescription = document.createElement('h1');
            pokemonDescription.classList.add('modal__details--item');
            pokemonDescription.innerHTML = pokemon.flavorText;
            //end detail items in the modal
            //begin modal detail items to add
            modalDetails.append(pokemonName, pokemonSpeciesType, pokemonHeight, pokemonWeight, pokemonType) //add these items to the modal details
            modal.append(closeButtonElement, pokemonPicture, modalDetails, pokemonDescription)//then add these items to just outside the modal
            modalContainer.append(modal) //take the above elements and lay them into the modal container

            modalContainer.classList.add('is-visible') //adds the appropriate css to make the modal visible
            //end modal detail items to add
            
            //handle the escape key
            window.addEventListener('keydown', (e) =>{
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                    hideDetails() // escape key closes the modal so long as modal is visible
                }
            });
            //end escape handler            
            //modal content generator ends            
            //modal generator ends
        });
    }
    //pokemonList array and validation // this does seem like it would validate anything in the response from the api, so is this vestigial? it seems if we wanted to validate api responses that would need to happen int he loadList function, no?
    function addEntry(pokemon){
        if(typeof(pokemon) === 'object'){
            pokemonList.push(pokemon);
        } else {
            return console.log('Pokemon is not a proper object')
        }
    }
    //end pokemonList array
    //search pokemon
    //end search
    //correction for returned pokemon appear as lower case
    //end correction
    //load pokemon from the PokeAPI
    function loadList(){
        return fetch(apiUrl).then(function(response){//using a promise to load the pokemon
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                addEntry(pokemon); //when the promise is fulfilled
            });
        }).catch(function(e) {
            console.log(e); //when the promise fails
        });
    }
    //end load pokemon from the PokeAPI
    //load pokemon details from PokeAPI
    function loadDetails(pokemon){
        let url = pokemon.detailsUrl;

        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            let rawTypes = [] //convert types to a comma separated string
            details.types.forEach(pokemon =>{
                rawTypes.push(pokemon.type.name)
            });

            let types = rawTypes.join(', ');

            //an object for the additional details
            pokemon.entry = details.id.toString().padStart(3, '0')//not sure what this is for yet...
            pokemon.imageUrl = detais.sprites.front_default;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = types;

            //fetch the other details about species 
            return fetch(details.species.url);
        }).then(function(response){
            return response.json();
        }).then(function(details){
            let rawFlavorText = details.flavor_text_entries.filter(
                pEntry => ( pEntry.langauge.name === 'en') && (pEntry.version.name === 'red'));
                // use .replace to remove the special characters
                //add reamining details to pokemon object
                pokemon.speciesType = details.genera[7].genus;
                pokemon.flavorText = flavorText;
                //end remaineders
        }).catch(function(e){
            console.error(e);
        });
    }
    //end load pokemon details from PokeAPI
    return {
        getAll: getAll,
        addEventListener: addEventListener,
        addListItem: addListItem,
        showDetails: showDetails,
        addEntry: addEntry,
        // find: find,
        // toProperCase: toProperCase,
        loadList: loadList,
        loadDetails: loadDetails,
    };

    //end modal display for any one selected pokemon
}) (); // iife ends the poke repo

//an iterator to load each pokemon into the list
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});