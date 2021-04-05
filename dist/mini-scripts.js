let pokemonRepository = function() { let e = [],
        t = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    function o(t) { "object" == typeof t && "name" in t && "detailsUrl" in t ? e.push(t) : console.log("add an object") }

    function n(e) { pokemonRepository.loadDetails(e).then(function() { console.log(e),
                function(e) { let t = $(".modal-body"),
                        o = $(".modal-title");
                    $(".modal-header");
                    o.empty(), t.empty(); let n = $("<h1>" + e.name + "</h1>"),
                        a = $('<img class="modal-img" style="width:55%">');
                    a.attr("src", e.imageUrl); let r = $('<img class="modal-img" style="width:20%">');
                    r.attr("src", e.imageUrlBack); let l = $("<p>height: " + e.height + "</p>"),
                        s = $("<p>weight: " + e.weight + "</p>"),
                        i = $("<p>types: " + e.types + "</p>"),
                        d = $("<p>types: " + e.abilities + "</p>");
                    o.append(n), t.append(a), t.append(r), t.append(l), t.append(s), t.append(i), t.append(d), e.types.includes("grass") ? $(".modal-header").css("background-color", "rgb(120, 200, 80)") : e.types.includes("fire") ? $(".modal-header").css("background-color", "rgb(240, 128, 48)") : e.types.includes("poison") ? $(".modal-header").css("background-color", "rgb(168, 144, 240)") : e.types.includes("water") ? $(".modal-header").css("background-color", "rgb(104, 144, 240)") : e.types.includes("bug") ? $(".modal-header").css("background-color", "rgb(168, 184, 32)") : e.types.includes("water") ? $(".modal-header").css("background-color", "rgb(69, 120, 237)") : e.types.includes("ice") ? $(".modal-header").css("background-color", "rgb(66, 174, 174)") : e.types.includes("electric") ? $(".modal-header").css("background-color", "rgb(252, 234, 161)") : e.types.includes("ground") ? $(".modal-header").css("background-color", "rgb(219, 181, 77)") : e.types.includes("fairy") ? $(".modal-header").css("background-color", "rgb(232, 120, 144)") : e.types.includes("ghost") ? $(".modal-header").css("background-color", "rgb(100, 78, 136)") : e.types.includes("normal") && $(".modal-header").css("background-color", "rgb(156, 156, 99)") }(e) }) } return { getAll: function() { return e }, addEventListener: addEventListener, addListItem: function(e) { pokemonRepository.loadDetails(e).then(function() { let t = $(".row"),
                    o = $('<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'),
                    a = $('<img class="card-img-top mx-auto" alt="..." style="width: 50%">'),
                    r = $('<h5 class="card-title">' + e.name + "</h5>");
                a.attr("src", e.imageUrlFront); let l = $('<div class="card-body" style="text-align: center;"></div>'),
                    s = $('<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>');
                t.append(o), o.append(a), o.append(l), l.append(r), l.append(s), s.on("click", function(t) { n(e) }) }) }, showDetails: n, add: o, loadList: function() { return fetch(t).then(function(e) { return e.json() }).then(function(e) { e.results.forEach(function(e) { o({ name: e.name.toUpperCase(), detailsUrl: e.url }) }) }).catch(function(e) { console.log(e) }) }, loadDetails: function(e) { var t = e.detailsUrl; return fetch(t).then(function(e) { return e.json() }).then(function(t) { e.imageUrl = t.sprites.front_default, e.imageUrlFront = t.sprites.other.dream_world.front_default, e.imageUrlBack = t.sprites.versions["generation-v"]["black-white"].animated.back_default, e.height = t.height, e.types = []; for (var o = 0; o < t.types.length; o++) e.types.push(t.types[o].type.name); for (e.abilities = [], o = 0; o < t.abilities.length; o++) e.abilities.push(t.abilities[o].ability.name);
                e.weight = t.weight }).catch(function(e) { console.error(e) }) } } }();

function search() { var e, t, o, n; for (e = document.getElementById("myInput").value.toUpperCase(), t = document.getElementById("myUL").querySelectorAll(".card"), n = 0; n < t.length; n++) o = t[n].querySelector(".card-body").querySelector(".card-title"), console.log(o.innerText), (o.textContent || o.innerText).toUpperCase().indexOf(e) > -1 ? t[n].style.display = "" : t[n].style.display = "none" }
pokemonRepository.loadList().then(function() { pokemonRepository.getAll().forEach(function(e) { pokemonRepository.addListItem(e) }) });