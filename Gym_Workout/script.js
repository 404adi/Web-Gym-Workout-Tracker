
let currentMuscle="";

const exercises={

chest:[
"Bench Press",
"Incline Bench Press",
"Decline Bench Press",
"Dumbbell Press",
"Cable Fly",
"Push Ups"
],

back:[
"Pull Ups",
"Lat Pulldown",
"Barbell Row",
"Deadlift",
"Seated Cable Row"
],

legs:[
"Squats",
"Leg Press",
"Lunges",
"Leg Curl",
"Leg Extension",
"Calf Raises"
],

arms:[
"Barbell Curl",
"Dumbbell Curl",
"Hammer Curl",
"Tricep Pushdown",
"Skull Crushers"
]

};


function showExercises(muscle, element){

currentMuscle=muscle;

document.querySelectorAll(".muscle-card")
.forEach(card=>card.classList.remove("active-muscle"));

element.classList.add("active-muscle");

document.getElementById("exerciseTitle").innerText=
muscle.toUpperCase()+" Exercises";

let container=document.getElementById("exerciseContainer");

container.innerHTML="";

exercises[muscle].forEach(ex=>{

let div=document.createElement("div");

div.className="exercise";

div.innerText=ex;

div.onclick=function(){
addWorkout(muscle,ex);
};

container.appendChild(div);

});

}



function addWorkout(muscle,exercise){

let today=getTodayDate();

let data=JSON.parse(localStorage.getItem("gymData")) || {};

if(!data[today]){
data[today]={};
}

if(!data[today][muscle]){
data[today][muscle]=[];
}

data[today][muscle].push(exercise);

localStorage.setItem("gymData",JSON.stringify(data));

loadWorkouts();

}



function loadWorkouts(){

let container=document.getElementById("workoutSections");

container.innerHTML="";

let data=JSON.parse(localStorage.getItem("gymData")) || {};

let dates=Object.keys(data).sort().reverse();

dates.forEach(date=>{

let dateDiv=document.createElement("div");

dateDiv.innerHTML=`<h2 style="margin-top:30px;color:#ff7b00">${date}</h2>`;

container.appendChild(dateDiv);

for(let muscle in data[date]){

let section=document.createElement("div");

section.className="workout-muscle";

section.innerHTML=`<h3>${muscle.toUpperCase()}</h3>`;

let ul=document.createElement("ul");

data[date][muscle].forEach((ex,index)=>{

let li=document.createElement("li");

li.innerHTML=`
<span>${ex}</span>
<i class="fa-solid fa-xmark delete-icon"
onclick="deleteExercise('${date}','${muscle}',${index})"></i>
`;

ul.appendChild(li);

});

section.appendChild(ul);

container.appendChild(section);

}

});

}



function deleteExercise(date,muscle,index){

let data=JSON.parse(localStorage.getItem("gymData"));

data[date][muscle].splice(index,1);

localStorage.setItem("gymData",JSON.stringify(data));

loadWorkouts();

}



function getTodayDate(){

let d=new Date();

return d.toLocaleDateString();

}



/* BMI POPUP */

function openBMI(){
document.getElementById("bmiPopup").style.display="flex";
}

function closeBMI(){
document.getElementById("bmiPopup").style.display="none";
}

function calculateBMI(){

let height=document.getElementById("height").value/100;

let weight=document.getElementById("weight").value;

let bmi=weight/(height*height);

let result="";

if(bmi<18.5){
result="Underweight";
}
else if(bmi<25){
result="Normal";
}
else{
result="Overweight";
}

document.getElementById("bmiResult").innerText=
"Your BMI: "+bmi.toFixed(2)+" ("+result+")";

}



window.onload=function(){
loadWorkouts();
};
