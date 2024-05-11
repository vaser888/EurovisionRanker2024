window.onload = function() {
    if (localStorage.getItem("countryAndSong2024") == null){
        console.log("hey"); 
        for(i=0; i<runnerList.length; i++){
            createCountyRank(i+1,runnerList[i][0], runnerList[i][1], runnerList[i][2], "rankArea")
        }
    }
    else {
        loadData()
    }
    
    document.querySelectorAll("#rankNumber").forEach((e)=>{

        e.addEventListener("change", function (event){

            var listItemArray = document.querySelectorAll(".listItem");
            var oldValue = this.getAttribute("data");
            var currentItem = this.parentElement;
            var destinationValue = this.value;
            console.log(oldValue, destinationValue)
            if (destinationValue > oldValue){ // if the original value is less than the newer value location
                //console.log(this.parentElement);
                var destinationItem = listItemArray[destinationValue-1];
                console.log("o:"+oldValue, "d:"+destinationValue, "t:"+this.value ,listItemArray[destinationValue-1])
                currentItem.parentNode.insertBefore(currentItem,destinationItem.nextSibling);
            }
            else{
                //console.log(this.parentElement);
                var destinationItem = listItemArray[destinationValue-1];
                console.log("o:"+oldValue, "d:"+destinationValue, "t:"+this.value ,listItemArray[destinationValue-1])
                //console.log(this.value ,listItemArray[destinationValue]);
                currentItem.parentNode.insertBefore(currentItem,destinationItem);
            }

            reoderValues();
            save();


        })
    })
    
}

function reoderValues() {
    inputValueArray = document.querySelectorAll("#rankNumber");
    for (i=0; i<inputValueArray.length; i++){
        inputValueArray[i].value = i + 1;
        inputValueArray[i].setAttribute("data", i + 1)
    }
}


function loadData(){
    var c = localStorage.getItem("countryAndSong2024").split(",");
    var s = localStorage.getItem("aliasName2024").split(",");
    var n = localStorage.getItem("yourNotes2024").split(",");
    //console.log(c,s,n);
    for (i=0; i<runnerList.length; i++){
        createCountyRank(i+1,c[i], s[i], n[i], "rankArea")
    }
}



function createCountyRank(rankNum, country, songName, notes, id){
    var div = document.createElement("div");
    div.setAttribute("class", "listItem");
    //div.setAttribute("value", rankNum)
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "stop(this.parentElement)")
    var div1 = document.createElement("input");
    div1.setAttribute("class", "rankNumber");
    div1.setAttribute("id", "rankNumber");
    div1.setAttribute("data", rankNum);
    div1.setAttribute("autocomplete", "off");
    div1.value = rankNum;
    form.appendChild(div1);

    var div2 = document.createElement("div");
    var button1 = document.createElement("button");
    var button2 = document.createElement("button");
    div2.setAttribute("class", "moveButtons");
    button1.innerText = "^";
    button1.setAttribute("onclick", "up(this.parentElement)");
    button2.innerText = "v";
    button2.setAttribute("onclick", "down(this.parentElement)");
    div2.appendChild(button1);
    div2.appendChild(button2);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "div3")

    var div3_1 = document.createElement("div");
    div3_1.innerHTML = country ;
    div3.appendChild(div3_1);
    var input1 = document.createElement("input");
    input1.setAttribute("class", "alias")
    input1.value = songName;
    
    var textarea = document.createElement("textarea");
 
    textarea.value = notes;
    div3.appendChild(input1);
    div3.appendChild(textarea);

 
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    //div.appendChild(input);
    document.getElementById(id).appendChild(div);
}

function up(a){
    if(a.parentElement.previousElementSibling){
        var firstNum = a.previousSibling.value
        var secondNum = a.parentElement.previousElementSibling.firstChild.value
        a.parentElement.previousElementSibling.firstChild.value = firstNum;
        a.previousSibling.value = secondNum;
        a.parentElement.parentNode.insertBefore(a.parentElement, a.parentElement.previousElementSibling);
        save();
    }
}

function down(a){
    console.log(a.parentElement);
    console.log(a.parentElement.nextElementSibling);
    if(a.parentElement.nextElementSibling){
        var firstNum = a.previousSibling.value
        var secondNum = a.parentElement.nextElementSibling.firstChild.value
        console.log(firstNum, secondNum);
        a.parentElement.nextElementSibling.firstChild.value = firstNum;
        a.previousSibling.value = secondNum;
        a.parentElement.parentNode.insertBefore(a.parentElement.nextElementSibling, a.parentElement);
        save();
    }
}

function stop(a){
    event.preventDefault();
    //var firstNum = a.previousSibling.value
    //console.log(a, firstNum);
}

var country = [];
var songName = [];
var notes = [];

function saveDataToLocalStorage(){
    var data = document.getElementById("rankArea")
    var country = [];
    var songName = [];
    var notes = [];
    for (i = 0; i<data.children.length; i++){
        country.push(data.children[i].children[2].children[0].textContent)
        songName.push(data.children[i].children[2].children[1].value)
        notes.push(data.children[i].children[2].children[2].value)
    }
    //console.log(country);
    //console.log(songName);
    //console.log(notes);
    localStorage.setItem("countryAndSong2024", country);
    localStorage.setItem("aliasName2024", songName);
    localStorage.setItem("yourNotes2024", notes);
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};


function save(){
    saveDataToLocalStorage();
}


var runnerList = [
    ["1. 🇸🇪 Sweden - Unforgettable","",""],
    ["2. 🇺🇦 Ukraine - Teresa & Maria","",""],
    ["3. 🇩🇪 Germany - Always On The Run","",""],
    ["4. 🇱🇺 Luxembourg - Fighter","",""],
    ["5. 🇳🇱 Netherlands - Europapa","",""],
    ["6. 🇮🇱 Israel - Hurricane","",""],
    ["7. 🇱🇹 Lithuania - Luktelk","",""],
    ["8. 🇪🇸 Spain - ZORRA","",""],
    ["9. 🇪🇪 Estonia - (nendest) narkootikumidest ei tea me (küll) midagi","",""],
    ["10. 🇮🇪 Ireland - Doomsday Blue","",""],
    ["11. 🇱🇻 Latvia - Hollow","",""],
    ["12. 🇬🇷 Greece - ZARI","",""],
    ["13. 🇬🇧 United Kingdom - Dizzy","",""],
    ["14. 🇳🇴 Norway - Ulveham","",""],
    ["15. 🇮🇹 Italy - La Noia","",""],
    ["16. 🇷🇸 Serbia - RAMONDA","",""],
    ["17. 🇫🇮 Finland - No Rules! ","",""],
    ["18. 🇵🇹 Portugal - Grito","",""],
    ["19. 🇦🇲 Armenia - Jako","",""],
    ["20. 🇨🇾 Cyprus - Liar","",""],
    ["21. 🇨🇭 Switzerland - The Code","",""],
    ["22. 🇸🇮 Slovenia - Veronika","",""],
    ["23. 🇭🇷 Croatia - Rim Tim Tagi Dim","",""],
    ["24. 🇬🇪 Georgia - Firefighter","",""],
    ["25. 🇫🇷 France - Mon Amour","",""],
    ["26. 🇦🇹 Austria - We Will Rave","",""]];