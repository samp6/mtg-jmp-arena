let jsonString = "";
var fr = new FileReader();
fr.onload = () => {
    jsonString = fr.result;
}
let jsonString = fr.readAsText("decks.json");

print(jsonString)