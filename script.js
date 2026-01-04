let cache = [];

function add() {
    let key = document.getElementById("key").value;

    if (key === "") return;

    let index = cache.indexOf(key);
    if (index !== -1) {
        cache.splice(index, 1);
    }

    cache.push(key);

    if (cache.length > 3) {
        cache.shift();
    }

    document.getElementById("output").innerText =
        "Cache: " + cache.join(" → ");

    document.getElementById("key").value = "";
}