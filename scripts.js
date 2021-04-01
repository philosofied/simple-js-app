// define the poke repo function
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; //this is where the pokemon data is coming from
    let modalContainer = document.querySelector('modal-container') // where details will be displayed

    function getAll() {
        return pokemonList; //just adds pokemon to a list
    }

    function add(pokemon) { //validate that the pokemon is an object with the name and details
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("add an object");
        }
    }

    //handles the list items for the pokedex
    function addListItem(pokemon) { //the pokemon in the list will appear as a ul, and each pokemon as an item in that ul with its own button to click on
        let pokedexList = document.querySelector('ul');
        let listItem = document.createElement('li');
        listItem.classList.add("group-list-item")
        let button = document.createElement('button');

        //takes the pokemon name adds it to a button
        button.innerText = pokemon.name
        button.classList.add('pokedex-list__item') //see BEM styles in styles.css

        //adds a new list item as child and a (child) button
        listItem.appendChild(button);
        pokedexList.appendChild(listItem);

        button.addEventListener('click', function() {
            showDetails(pokemon) //when the button is clicked the show details function will reveal the pokemon
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            console.log(pokemon);
            showModal(pokemon);
        });
    }
    // show the modal content 
    function showModal(pokemon) {

        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        modalTitle.empty();
        modalBody.empty();
        
        //create element for name in the modal content
        let nameElement =$("<h1>" + pokemon.name + "</h1>");
        //create an image in modal content
        let imageElementFront = $('<img class="modal-img" style="width:50%>');
        imageElementFront.attr("src", pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%>');
        imageElementBack.attr("src", pokemon.imageUrlBack);
        //create height element within the modal content
        let heightElement = $("<p>" + "height :" + pokemon.height + "</p>");
        //create weight element within the modal content
        let weightElement = $("<p>" + "weight :" + pokemon.weight + "</p>");
        // create element for type in the modal content
        let typesElement = $("<p>" + "types:" + pokemon.types + "</p>");
        //create element for abilities in the modal content
        let abilitiesElement = $("<p>" + "types:" + pokemon.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);



        // let $modalContainer = document.querySelector("#modal-container");
        // //clear existing content of the model
        // $modalContainer.innerHTML = "";
        // //creating div element in DOM
        // let modal = document.createElement("div");
        // //adding class to div DOM element
        // modal.classList.add("modal");
        // //creating closing button in modal content
        // let closeButtonElement = document.createElement("button");
        // closeButtonElement.classList.add("modal-close");
        // closeButtonElement.innerText = "Close";
        // // adding event listener to close modal when clicked on button
        // closeButtonElement.addEventListener("click", hideModal);
        // //creating element for name in modal content
        // let nameElement = document.createElement("h1");
        // nameElement.innerText = pokemon.name;
        // // creating img in modal content
        // let imageElement = document.createElement("img");
        // imageElement.classList.add("modal-img");
        // imageElement.setAttribute("src", pokemon.imageUrl);
        // //creating element for height in modal content
        // let heightElement = document.createElement("p");
        // heightElement.innerText = "height : " + pokemon.height;
        // //creating element for weight in modal content
        // let weightElement = document.createElement("p");
        // weightElement.innerText = "weight : " + pokemon.weight;
        // //creating element for type in modal content
        // let typesElement = document.createElement("p");
        // typesElement.innerText = "types : " + pokemon.types;
        // //creating element for abilities in modal content
        // // let abilitiesElement = document.createElement("p");
        // // abilitiesElement.innerText = "abilities : " + pokemon.abilities;
        // //appending modal content to webpage
        // modal.appendChild(closeButtonElement);
        // modal.appendChild(nameElement);
        // modal.appendChild(imageElement);
        // modal.appendChild(heightElement);
        // modal.appendChild(weightElement);
        // modal.appendChild(typesElement);
        // // modal.appendChild(abilitiesElement);
        // $modalContainer.appendChild(modal);
        // //adds class to show the modal
        // $modalContainer.classList.add("is-visible");

        if (pokemon.types.includes("grass")) {
            document.getElementById("modal-container").style.background =
                "lightgreen";
        } else if (pokemon.types.includes("fire")) {
            document.getElementById("modal-container").style.background = "red";
        } else if (pokemon.types.includes("psychic")) {
            document.getElementById("modal-container").style.background =
                "#FF69B4";
        } else if (pokemon.types.includes("poison")) {
            document.getElementById("modal-container").style.background =
                "purple";
        } else if (pokemon.types.includes("water")) {
            document.getElementById("modal-container").style.background = "blue";
        } else if (pokemon.types.includes("bug")) {
            document.getElementById("modal-container").style.background =
                "#3f000f";
        } else if (pokemon.types.includes("rock")) {
            document.getElementById("modal-container").style.background =
                "#BC8F8F";
        } else if (pokemon.types.includes("flying")) {
            document.getElementById("modal-container").style.background =
                "#2F4F4F";
        } else if (pokemon.types.includes("electric")) {
            document.getElementById("modal-container").style.background = "gold";
        } else if (pokemon.types.includes("ice")) {
            document.getElementById("modal-container").style.background =
                "#4169E1";
        } else if (pokemon.types.includes("ghost")) {
            document.getElementById("modal-container").style.background =
                "#8B008B";
        } else if (pokemon.types.includes("ground")) {
            document.getElementById("modal-container").style.background =
                "#D2B48C";
        } else if (pokemon.types.includes("fairy")) {
            document.getElementById("modal-container").style.background =
                "#EE82EE";
        } else if (pokemon.types.includes("steel")) {
            document.getElementById("modal-container").style.background =
                "#708090";
        }
    }
    //hides modal when clicked on close button
    // function hideModal() {
    //     let $modalContainer = document.querySelector("#modal-container");
    //     $modalContainer.classList.remove("is-visible");
    // }
    //hides modal when clicked on ESC on keyboard
    // window.addEventListener("keydown", (e) => {
    //     let $modalContainer = document.querySelector("#modal-container");
    //     if (
    //         e.key === "Escape" &&
    //         $modalContainer.classList.contains("is-visible")
    //     ) {
    //         hideModal();
    //     }
    // });
    //hides modal if clicked outside of it
    // let $modalContainer = document.querySelector("#modal-container");
    // $modalContainer.addEventListener("click", (e) => {
    //     let target = e.target;
    //     if (target === $modalContainer) {
    //         hideModal();
    //     }
    // });

    function loadList() {
        return fetch(apiUrl).then(function(response) { //using a promise to load the pokemon
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon); //when the promise is fulfilled
            });
        }).catch(function(e) {
            console.log(e); //when the promise fails
        });
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                //loop for each ofthe pokemon types.
                //Also changing the background color depend on each pokemon type.
                item.types = [];
                for (var i = 0; i < details.types.length; i++) {
                    item.types.push(details.types[i].type.name);
                }
                //loop to get the abilities of a selected pokemon
                item.abilities = [];
                for (var i = 0; i < details.abilities.length; i++) {
                    item.abilities.push(details.abilities[i].ability.name);
                    // item.abilities.push('slot: ' + details.abilities[i].slot);
                    // item.abilities.push('is_hidden: ' + details.abilities[i].is_hidden);
                }

                item.weight = details.weight;
            })
            .catch(function(e) {
                console.error(e);
            });
    }
    //end load pokemon details from PokeAPI
    return {
        getAll: getAll,
        addEventListener: addEventListener,
        addListItem: addListItem,
        showDetails: showDetails,
        add: add,
        //hideModal: hideModal,
        loadList: loadList,
        loadDetails: loadDetails,
    };

    //end modal display for any one selected pokemon
})(); // iife ends the poke repo

//an iterator to load each pokemon into the list
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});