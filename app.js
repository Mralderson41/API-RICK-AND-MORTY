 

//espera que cargue el dom
document.addEventListener("DOMContentLoaded", () => {
    fetchApi() // se ejecutara siempre y cuando se termine de cargar el dom
})

// para hacer la solicitud de API, usamos async y await
const fetchApi =  async () => {
   // console.log("obteniendo datos...");
   // como hacemos para capturar rl error!!
   try {
       loadingData(true)
    //aqui va la solicitud a nuesta api, practicado el fetch y el await q es una promesa
    const respuesta = await fetch("https://rickandmortyapi.com/api/character")
    const data = await respuesta.json();

    //console.log(data)
    pintarCard(data)

   } catch (error) {
    console.log(error)
    // habiendo o no error con finally nos aseguramos que se ejecute
   } finally {
        loadingData(false)
   }
}   
const pintarCard = data => {
    const cards = document.getElementById("card-dinamicas")
    const templateCard = document.getElementById("template-card").content
    const fragment = document.createDocumentFragment()
   // console.log(data)
    data.results.forEach(item => {
        //console.log(item)
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name
        clone.querySelector("p").textContent = item.species
        clone.querySelector("img").setAttribute("src", item.image)
        
        // guardamops en el fragment para evitar el reflow
        fragment.appendChild(clone)
    });
    cards.append(fragment)
}


//aqui hacemos q el loading desaparesca cunado ya cargo la info
//pintar el loading
const loadingData = estado => {
    const loading = document.getElementById("loading") 
    if(estado){
        loading.classList.remove("d-none")
    } else {
        loading.classList.add("d-none")
    }
}



