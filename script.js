// login page
const issueContainer = document.getElementById("issueContainer")

let allIssues = []

// LOGIN
// user === "admin" && pass === "admin123"

function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user === "0" && pass === "0"){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("mainPage").classList.remove("hidden")

loadIssues()

}
else{
alert("Invalid credentials")
}

}

// login page end

// spinner
function showSpinner(){
document.getElementById("spinner").classList.remove("hidden")
}
function hideSpinner(){
document.getElementById("spinner").classList.add("hidden")
}

// LOAD ALL ISSUES
async function loadIssues(){
showSpinner()
const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json()
allIssues = data.data
hideSpinner()
displayIssues(allIssues)

}


// DISPLAY ISSUES
function displayIssues(issues){

issueContainer.innerHTML = ""

document.getElementById("issueCount").innerText =
`${issues.length} Issues`

// issue.labels[0]?issue.labels[0] : "none"
issues.forEach(issue => {
const div = document.createElement("div");
const borderColor =issue.status === "open" ? "border-green-500" : "border-purple-500";
const img =issue.status === "open"? "assets/Open-Status.png":"assets/Closed- Status .png";
div.className =
`card bg-white shadow border-t-4 ${borderColor}`
div.innerHTML =

`
<div class="card-body">

<div class="flex justify-between items-center">
  <div><img src="${img}" alt=""></div>
  <div>
    <button class="bg-[#FEECEC] text-[#EF4444] rounded-full py-1 px-5">
      ${issue.priority}
    </button>
  </div>
</div>

<h2 class="card-title cursor-pointer text-[#1F2937]"
onclick="showModal(${issue.id})">${issue.title}</h2>

<p class="line-clamp-2">${issue.description}</p>

<div class="flex gap-2 border-b-2 border-gray-400 p-6">

  ${issue.labels[0] ? `
  <button class="flex items-center gap-1 px-3 py-1 border bg-[#FEECEC] text-[#EF4444] rounded-full">
    ${issue.labels[0]}
  </button>` : ""}

  ${issue.labels[1] ? `
  <button class="flex items-center gap-1 border bg-[#FDE68A] text-[#D97706] rounded-full">
    ${issue.labels[1]}
  </button>` : ""}

</div>

<p class="text-sm">#${issue.id} by ${issue.author}</p>
<p class="text-sm">${issue.createdAt.split("T")[0]}</p>

</div>
`

issueContainer.appendChild(div)

})

}

// FILTER

function filterIssues(status){

const filtered = allIssues.filter(issue => issue.status === status)

displayIssues(filtered)

}

// btn-2
function filterOpen(){
const openIssues =
allIssues.filter(issue => issue.status === "open")

displayIssues(openIssues)

}

// btn-3
function filterClosed(){

const closedIssues =
allIssues.filter(issue => issue.status === "closed")

displayIssues(closedIssues)

}

function setActive(btn){

document.querySelectorAll(".tab").forEach(tab => {
tab.classList.remove("bg-primary","text-white")
})

btn.classList.add("bg-primary","text-white")

}

// SEARCH

async function searchIssue(){

const text = document.getElementById("searchInput").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}


// MODAL card

async function showModal(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data
document.getElementById("modalTitle").innerText = issue.title
document.getElementById("statusBtn").innerText = issue.status
document.getElementById("AssigneeBy").innerText = `${issue.status} by  ${issue.assignee || "Fahim Ahmed"} ${issue.createdAt}`
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

issue.labels[0] ? btn1.innerText = issue.labels[0] : btn1.style.display = "none";
issue.labels[1] ? btn2.innerText = issue.labels[1] : btn2.style.display = "none";
document.getElementById("modalDescription").innerText = issue.description
document.getElementById("AssigneePerson").innerText = `${issue.assignee || "Fahim Ahmed"}`
document.getElementById("PriorityLevel").innerText = issue.priority

document.getElementById("issueModal").showModal()

}
