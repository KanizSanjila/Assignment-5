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


// LOAD ALL ISSUES

async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

}


// DISPLAY ISSUES

function displayIssues(issues){

issueContainer.innerHTML = ""

issues.forEach(issue => {

const div = document.createElement("div")

const borderColor =
issue.status === "open" ? "border-green-500" : "border-purple-500"

div.className =
`card bg-white shadow border-t-4 ${borderColor}`

div.innerHTML =

`
<div class="card-body">

<h2 class="card-title cursor-pointer text-blue-600"
onclick="showModal(${issue.id})">

${issue.title}

</h2>

<p>${issue.description}</p>

<p class="text-sm">Author: ${issue.author}</p>

<p class="text-sm">Priority: ${issue.priority}</p>

<p class="text-sm">Status: ${issue.status}</p>

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


// SEARCH

async function searchIssue(){

const text = document.getElementById("searchInput").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}


// MODAL

async function showModal(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data

document.getElementById("modalTitle").innerText = issue.title

document.getElementById("modalDescription").innerText = issue.description

document.getElementById("modalInfo").innerText =
`Author: ${issue.author} | Priority: ${issue.priority}`

document.getElementById("issueModal").showModal()

}