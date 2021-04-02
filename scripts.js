// define the poke repo function
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; //this is where the pokemon data is coming from

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

    function addListItem(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            let row = $(".row");

            let card = $(
                '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
            );
            let image = $('<img class="card-img-top mx-auto" alt="..." style="width: 50%">');
            let title = $('<h5 class="card-title">' + pokemon.name + "</h5>");
            image.attr("src", pokemon.imageUrlFront);
            let body = $('<div class="card-body" style="text-align: center;"></div>');
            let button = $(
                '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
            );

            //append
            row.append(card);
            card.append(image);
            card.append(body);
            body.append(title);
            body.append(button);

            button.on("click", function(event) {
                showDetails(pokemon);
            });
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
        let nameElement = $("<h1>" + pokemon.name + "</h1>");
        //create an image in modal content
        let imageElementFront = $('<img class="modal-img" style="width:55%">');
        imageElementFront.attr("src", pokemon.imageUrl);
        let imageElementBack = $('<img class="modal-img" style="width:20%">');
        imageElementBack.attr("src", pokemon.imageUrlBack);
        //create height element within the modal content
        let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
        //create weight element within the modal content
        let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
        // create element for type in the modal content
        let typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
        //create element for abilities in the modal content
        let abilitiesElement = $("<p>" + "types: " + pokemon.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);

        if (pokemon.types.includes("grass")) {
            $(".modal-header").css("background-color", "rgb(120, 200, 80)");
        } else if (pokemon.types.includes("fire")) {
            $(".modal-header").css("background-color", "rgb(240, 128, 48)");
        } else if (pokemon.types.includes("poison")) {
            $(".modal-header").css("background-color", "rgb(168, 144, 240)");
        } else if (pokemon.types.includes("water")) {
            $(".modal-header").css("background-color", "rgb(104, 144, 240)");
        } else if (pokemon.types.includes("bug")) {
            $(".modal-header").css("background-color", "rgb(168, 184, 32)");
        } else if (pokemon.types.includes("water")) {
            $(".modal-header").css("background-color", "rgb(69, 120, 237)");
        } else if (pokemon.types.includes("ice")) {
            $(".modal-header").css("background-color", "rgb(66, 174, 174)");
        } else if (pokemon.types.includes("electric")) {
            $(".modal-header").css("background-color", "rgb(252, 234, 161)");
        } else if (pokemon.types.includes("ground")) {
            $(".modal-header").css("background-color", "rgb(219, 181, 77)");
        } else if (pokemon.types.includes("fairy")) {
            $(".modal-header").css("background-color", "rgb(232, 120, 144)");
        } else if (pokemon.types.includes("ghost")) {
            $(".modal-header").css("background-color", "rgb(100, 78, 136)");
        } else if (pokemon.types.includes("normal")) {
            $(".modal-header").css("background-color", "rgb(156, 156, 99)");
        }
    }


    function loadList() {
        return fetch(apiUrl).then(function(response) { //using a promise to load the pokemon
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name.toUpperCase(),
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
                item.imageUrlFront = details.sprites.other.dream_world.front_default;
                item.imageUrlBack = details.sprites.versions["generation-v"]["black-white"].animated.back_default;
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
//search function used in
function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName("");
    li = ul.querySelectorAll(".card");
    // console.log(li[0].querySelector(".card-body").querySelector(".card-title"));
    for (i = 0; i < li.length; i++) {
        // a = li[i].getElementsByTagName("a")[0];
        a = li[i].querySelector(".card-body").querySelector(".card-title");
        console.log(a.innerText);
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}