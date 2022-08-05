let states = [];
const arr = new Array();
let speed;
  
function sp() {
    
    let v = document.getElementById("inputspeed").value;
    // document.getElementById("speed").innerHTML = v;
    return parseInt(v);
}
  
function disallow() {
    lst = document.querySelectorAll(".btn");
    lst?.forEach((element) => {
      element.disabled = true;
    });
}
function allow() {
    lst = document.querySelectorAll(".btn");
    lst?.forEach((element) => {
      element.disabled = false;
    });
}
function randomgenerator() {
    randomNumber = 1 + Math.floor(Math.random() * 10);

    return randomNumber;
}
async function print(arr) {
    // console.log(arr);
    speed = sp();
    n = arr.length;
    let body = document.getElementById("body");
    body.innerHTML = "";
    for (let i = 0; i < n; i++) {
      let x = arr[i];
      let node = document.createElement("div");
      node.setAttribute("class", "bar");
      node.style.height = `${x * 50}px`;
      if (n <= 60) {
        node.style.width = "20px";
      } else if (n > 60 && n <= 200) {
        let w = `${Math.floor(1140 / n)}px`;
        node.style.width = w;
      } else if (n > 200 && n <= 350) {
        
        node.style.width = "2px";
      } else if (n > 350 && n <= 500) {
        
        node.style.width = "1px";
      } else {
        node.style.width = "1px";
        node.style.margin = "0px";
      }

      if (states[i] == 0) {
        node.style.backgroundColor = "red";
        states[i] = -1;
      } else if (states[i] == 1) {
        node.style.backgroundColor = "green";
      }
     

      body.appendChild(node);
    }
}
function add() {
    
    states.length = 0;
    arr.length = 0;

    let input = document.getElementById("n");
    let label = document.getElementById("inputlabel");

    if (input.value == "") {
      alert("Enter the number of elements!");
      return;
    }
    label.innerHTML = n;

    n = parseInt(input.value);
   
    speed = sp();
    
    let body = document.getElementById("body");
    body.innerHTML = "";

    for (let i = 0; i < n; i++) {
      let x = randomgenerator();
      arr.push(x);
      states.push(-1);

     
    }
    print(arr);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
 
async function swap(arr, x, y) {
    states[x] = 0;
    states[y] = 0;
    await sleep(speed);
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
async function bsort() {
    disallow();

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
          print(arr);
        }
      }
      states[arr.length - i - 1] = 1;
    }
    states.map((i) => 1);
    print(arr);
    allow();
}

async function qsort() {
    disallow();
    await quicksort(arr, 0, arr.length - 1);
    states.fill(1);

    await print(arr);
    allow();
}
async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        await swap(arr, i, j);

        print(arr);
      }
    }
    i++;
    await swap(arr, i, high);

    return i;
}
async function quicksort(arr, low, high) {
    if (low < high) {
      let p = await partition(arr, low, high);

      await Promise.all([
        quicksort(arr, low, p - 1),

        quicksort(arr, p + 1, high),
      ]);

      
    }
}
async function isort() {
    disallow();
    let i, key, j;
    n = arr.length;
    for (i = 1; i < n; i++) {
      key = arr[i];
      j = i - 1;
      await sleep(speed);
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];

        j = j - 1;
        states[j + 1] = 0;
        states[j] = 0;
        await sleep(speed);
        print(arr);
        states[j + 1] = 1;
        states[j] = 1;
      }
      arr[j + 1] = key;
    }
    states.fill(1);
    print(arr);
    allow();
}
async function ssort() {
    disallow();
    n = arr.length;
    var i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
      min_idx = i;      
      for (j = i + 1; j < n; j++) if (arr[j] < arr[min_idx]) min_idx = j;      
      

      await swap(arr, min_idx, i);
      states[i] = 1;

      print(arr);
    }
    states.fill(1);
    print(arr);
    allow();
}