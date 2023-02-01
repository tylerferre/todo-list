getData = () =>{
    axios.get("https://api.vschool.io/tylerferre/todo")
        .then(res => listData(res.data))
        .catch(err => console.log(err))
        
}

listData = (data) =>{
    
    clearList()

    for(let i = 0; i < data.length; i++){
        const p = document.createElement('p')
        p.textContent = data[i].title
        p.style.marginLeft = "30px"
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('titleDiv').appendChild(p)

        if(data[i].completed === true){
                p.style.textDecoration = 'line-through 2.5px'
        }
    }

    for(let i = 0; i < data.length; i++){
        const p = document.createElement('p')
        p.textContent = data[i].description
        p.style.textAlign = 'center'
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('descriptionDiv').appendChild(p)

        if(data[i].completed === true){
            p.style.textDecoration = 'line-through 2.5px'
    }
    }
    
    for(let i = 0; i < data.length; i++){
        const p = document.createElement('p')
        p.textContent = data[i].price
        p.style.textAlign = 'center'
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('priceDiv').appendChild(p)

        if(data[i].completed === true){
            p.style.textDecoration = 'line-through 2.5px'
    }
    }

    for(let i = 0; i < data.length; i++){
        const p = document.createElement('p')
        p.textContent = "Completed: " + data[i].completed + " "
        p.style.textAlign = 'center'
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('statusDiv').appendChild(p)

        const b = document.createElement('button')
        b.textContent = 'Done'
        b.style.height = '35px'
        b.style.fontSize = '15px'
        p.appendChild(b)

        const x = document.createElement('button')
        x.textContent = 'X'
        x.style.height = '35px'
        x.style.fontSize = '16px'
        p.appendChild(x)

        if(data[i].completed === true){
            p.style.color = 'green'
        }

        const id = data[i]._id

        b.addEventListener('click', () =>{
            const complete = {
                completed: true
            }

            console.log(data[i].url)

            axios.put("https://api.vschool.io/tylerferre/todo" + "/" + id, complete)
            .then(res => getData())
            .catch(err => console.log(err))
        })

        x.addEventListener('click', () =>{

            axios.delete("https://api.vschool.io/tylerferre/todo" + "/" + id)
            .then(res => getData())
            .catch(err => console.log(err))
        })
    }

    for(let i = 0; i < data.length; i++){
        const img = document.createElement('img')
        img.src = data[i].imgUrl
        img.style.height = '90px'
        img.style.marginTop = "5px"
        img.style.width = '100px'
        document.getElementById('imgDiv').appendChild(img)
    }

}

clearList = () =>{
    const titleEl = document.getElementById('titleDiv')
    while(titleEl.firstChild){
        titleEl.removeChild(titleEl.firstChild)
    }

    const desEl = document.getElementById('descriptionDiv')
    while(desEl.firstChild){
        desEl.removeChild(desEl.firstChild)
    }

    const priEl = document.getElementById('priceDiv')
    while(priEl.firstChild){
        priEl.removeChild(priEl.firstChild)
    }

    const imgEl = document.getElementById('imgDiv')
    while(imgEl.firstChild){
        imgEl.removeChild(imgEl.firstChild)
    }

    const statEl = document.getElementById('statusDiv')
    while(statEl.firstChild){
        statEl.removeChild(statEl.firstChild)
    }

}

getData()


const todoForm = document.todoForm

todoForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const newTodo = {
        title: todoForm.title.value,
        description: todoForm.description.value,
        price: todoForm.price.value,
        imgUrl: todoForm.img.value,
        completed: false
    }

    todoForm.title.value = ""
    todoForm.description.value = ""
    todoForm.price.value = ""
    todoForm.img.value = ""

    axios.post("https://api.vschool.io/tylerferre/todo", newTodo)
        .then(res => getData())
        .catch(err => console.log(err))
})