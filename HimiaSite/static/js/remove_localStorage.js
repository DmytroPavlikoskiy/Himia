var keysToKeep = ['name', 'phone', 'email', 'surname'];

if (localStorage.length > 0) {

    for (var i = localStorage.length - 1; i >= 0; i--) {
        var key = localStorage.key(i);


        if (!keysToKeep.includes(key)) {

            localStorage.removeItem(key);
        }
    }
} else {
    console.log("LocalStorage is empty.");
}