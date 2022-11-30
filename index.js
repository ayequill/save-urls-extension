let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {

  chrome.tabs.query ({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
  })
})
function render(leads) {
  let listItems = " "
  for (let i = 0; i < leads.length; i++) {
    // ulEl.innerHTML += "<li>" + myLeads [i] + "</li>"
    // usage of template literals or strings
    listItems += `
            <li>
                  <a target="_blank" href="${leads[i]}">
                   ${leads[i]}
                   </a>
             </li>`
  }
  ulEl.innerHTML = listItems
}
// create an event that triggers when the button is clicked
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = ""
  // create and saving array to strings using stringify
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
})

delBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = []
  render(myLeads)
})