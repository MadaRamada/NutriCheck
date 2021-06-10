let searchButton = document.querySelector("#search")
let searchBar = document.querySelector('#recipe')

window.addEventListener('load', async function () {
  let app_id = "b8bf64e7"
  let app_key = "cf4eb672fd649591ca5f0e5ba56f7078"
  let option = ['grill', 'fish', 'noodle', 'beef']
  let query = option[Math.floor(Math.random() * option.length)]
  let api = await fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${query}`)
  let data = await api.json()
  getFoodCarousel(data)
  console.log(data)
})

searchButton.addEventListener("click", () => {
  sendApiRequest()
})

searchBar.addEventListener('keypress', (e) => {
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
    output += `
    <div class="col-lg-3 col-md-4 col-sm-6 mt-5" >
      <div class="testimonial-item mx-auto">
        <img class="img-fluid rounded mb-3" src="${data.hits[i].recipe.image}" alt="image" />
        <a href="${data.hits[i].recipe.url}"><h5>${data.hits[i].recipe.label}</h5></a>
        <p class="font-weight-light mb-2"><b>${Math.round(data.hits[i].recipe.calories / data.hits[i].recipe.yield)} kcal/serving</b></p>
        <button class="btn btn-success btn-sm" onclick="getNutrients('${data.hits[i].recipe.label}',
          'Carbs : ${Math.round(data.hits[i].recipe.totalNutrients.CHOCDF.quantity / data.hits[i].recipe.yield)} g',
          'Cholesterol : ${Math.round(data.hits[i].recipe.totalNutrients.CHOLE.quantity / data.hits[i].recipe.yield)} mg',
          'Fat : ${Math.round(data.hits[i].recipe.totalNutrients.FAT.quantity / data.hits[i].recipe.yield)} g',
          'Protein : ${Math.round(data.hits[i].recipe.totalNutrients.PROCNT.quantity / data.hits[i].recipe.yield)} g')">
          Nutrients
        </button>
      </div>
    </div>
    `
  }
  if (data.hits.length == 0) {
    document.querySelector("#content").innerHTML = `
    <h2 class="mb-5">Recipe not found</h2>
    `
  } else {
    document.querySelector("#content").innerHTML = `
    <h2 class="mb-5">Here are your results</h2>
    <div class="row">${output}</div>
    `
  }
}

function getFoodCarousel(data) {
  let output = ''
  for (let i = 0; i < data.hits.length; i++) {
    output += `
    <div class="col-lg-3 col-md-4 col-sm-6 mt-5" >
      <div class="testimonial-item mx-auto">
        <img class="img-fluid rounded mb-3" src="${data.hits[i].recipe.image}" alt="image" />
        <a href="${data.hits[i].recipe.url}"><h5>${data.hits[i].recipe.label}</h5></a>
        <p class="font-weight-light mb-2"><b>${Math.round(data.hits[i].recipe.calories / data.hits[i].recipe.yield)} kcal/serving</b></p>
        <button class="btn btn-success btn-sm" onclick="getNutrients('${data.hits[i].recipe.label}',
          'Carbs : ${Math.round(data.hits[i].recipe.totalNutrients.CHOCDF.quantity / data.hits[i].recipe.yield)} g',
          'Cholesterol : ${Math.round(data.hits[i].recipe.totalNutrients.CHOLE.quantity / data.hits[i].recipe.yield)} mg',
          'Fat : ${Math.round(data.hits[i].recipe.totalNutrients.FAT.quantity / data.hits[i].recipe.yield)} g',
          'Protein : ${Math.round(data.hits[i].recipe.totalNutrients.PROCNT.quantity / data.hits[i].recipe.yield)} g')">
          Nutrients
        </button>
      </div>
    </div>
    `
  }
  document.querySelector("#foodCarousel").innerHTML = `
  <div class="row">${output}</div>
  `
}

function getNutrients(la, ca, ch, fa, pr) {
  let title = '<h2>' + la + "'s nutrients" + '</h2>'
  let message = '<h4>' + ca + '<br>' + ch + '<br>' + fa + '<br>' + pr + '</h4>'
  alertify.alert(title, message).set('label', 'Close')
}