  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getDatabase ,ref, set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCUYafhVqgMaOKM-wgKlJaZNKpYda-zx_0",
    authDomain: "todoapp-d8006.firebaseapp.com",
    databaseURL: "https://todoapp-d8006-default-rtdb.firebaseio.com",
    projectId: "todoapp-d8006",
    storageBucket: "todoapp-d8006.appspot.com",
    messagingSenderId: "356282095973",
    appId: "1:356282095973:web:c9deb8262103d75f14a98c",
    measurementId: "G-2T7RNMNKXH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();

// =============================================================================================
// =============================================================================================
// ============================================================================================
var inp = document.getElementById('inp')
var ul = document.getElementById('ul')
            window.addTask = function () {
            var idref = push(ref(database,"Todos/")).key
            var obj = {
                input: inp.value,
                id : idref
            }
            var todoref = ref(database,`Todos/${idref}/`)
            set(todoref,obj)    
            inp.value = "";    
        }
function nowValue (){

    var todoref = ref(database,"Todos")
    onValue(todoref,function(pushDataGet){
        var arry = Object.values(pushDataGet.val())
        showData(arry);        
    })
}
nowValue()
function showData(arry){
    ul.innerHTML= ""
    for(var i = 0 ; i < arry.length;i++){
        ul.innerHTML += `
        <li class = "li">${arry[i].input}
        <button onclick="clearVal('${arry[i].id}')" class = "del" style = "color: white; background-color:red">Delete</button>
        <button onclick="editVal('${arry[i].input}','${arry[i].id}')" class = "edit" style = "color: white; background-color:green">Edit</button>
        </li>`       
    }
}
window.clearVal = function(del) {
    remove(ref(database,`Todos/${del}`))
    nowValue();    
    
}
window.delAll = function (){
    remove(ref(database,"Todos"))
    ul.innerHTML = ""
}
window.editVal = function (input ,del) {   
    inp.value = input  
    remove(ref(database,`Todos/${del}`))
    nowValue()
}