let searchButton = document.querySelector("#search")
let searchBar = document.querySelector('#recipe')

searchButton.addEventListener("click", () => {
  sendApiRequest()
})

searchBar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendApiRequest()
  }
})

async function sendApiRequest() {
  let app_id = "b8bf64e7"
  let app_key = "cf4eb672fd649591ca5f0e5ba56f7078"
  let query = document.getElementById('recipe').value
  let api = await fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${query}`)
  let data = await api.json()
  useApiData(data)
}

function useApiData(data) {
  let output = ''
  for (let i = 0; i < data.hits.length; i++) {
    output = output + `
    <div class="col-lg-3 col-md-4 col-sm-6 mt-5">
      <div class="testimonial-item mx-auto">
        <img class="img-fluid rounded mb-3" src="${data.hits[i].recipe.image}" alt="..." />
        <a href="${data.hits[i].recipe.url}"><h5>${data.hits[i].recipe.label}</h5></a>
        <p class="font-weight-light mb-0"><b>${Math.round((data.hits[i].recipe.calories) / data.hits[i].recipe.yield)} kcal/serving</b></p>
      </div>
    </div>
    `
  }
  if (data.hits.length == 0) {
    document.querySelector("#content").innerHTML = `
    <h2 class="mb-5">Recipe not found . . .</h2>
    `
  } else {
    document.querySelector("#content").innerHTML = `
    <h2 class="mb-5">Here are your results . . .</h2>
    <div class="row">${output}</div>
    `
  }
}