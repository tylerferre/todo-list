// Get Request
getData = () =>{
    axios.get("https://api.vschool.io/tylerferre/todo")
        .then(res => listData(res.data))
        .catch(err => console.log(err))
        
}

const todoForm = document.todoForm

listData = (data) =>{
    
    clearList()

    // Title
    for(let i = 0; i < data.length; i++){
        const p = document.createElement('li')
        p.textContent = data[i].title
        p.style.marginLeft = "30px"
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('titleDiv').appendChild(p)

        if(data[i].completed === true){
                p.style.textDecoration = 'line-through 2.5px'
        }
    }

    // Description
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
    
    // Price
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

    // Status - Buttons
    for(let i = 0; i < data.length; i++){
        
        //Created Elements
        const p = document.createElement('p')
        p.textContent = "Completed: " + data[i].completed + " "
        p.style.textAlign = 'center'
        p.style.marginTop = '50px'
        p.style.height = '50px'
        document.getElementById('statusDiv').appendChild(p)

        const b = document.createElement('button')
        b.textContent = 'Check'
        b.style.height = '35px'
        b.style.fontSize = '15px'
        p.appendChild(b)

        const e = document.createElement('button')
        e.textContent = 'Edit'
        e.style.height = '35px'
        e.style.fontSize = '15px'
        p.appendChild(e)

        const x = document.createElement('button')
        x.textContent = 'X'
        x.style.height = '35px'
        x.style.fontSize = '16px'
        p.appendChild(x)

        if(data[i].completed === true){
            p.style.color = 'green'
        }

        const id = data[i]._id
        let editClicked = false

    // Button logic

        // Check Button - Put Request 1
        b.addEventListener('click', () =>{
            const complete = {
                completed: true
            }

            const incomplete = {
                completed: false
            }

            if(data[i].completed === false){
                axios.put("https://api.vschool.io/tylerferre/todo" + "/" + id, complete)
                    .then(res => getData())
                    .catch(err => console.log(err))
            }else if(data[i].completed === true){
                axios.put("https://api.vschool.io/tylerferre/todo" + "/" + id, incomplete)
                    .then(res => getData())
                    .catch(err => console.log(err))
            }
        })

        b.addEventListener('mouseover', () =>{
            b.style.color = 'green'
        })

        b.addEventListener('mouseleave', () =>{
            b.style.color = 'black'
        })

        // Edit Button - Put Request 2
        e.addEventListener('click', () =>{
            if(editClicked === false){
                todoForm.title.value = data[i].title
                todoForm.description.value = data[i].description
                todoForm.price.value = data[i].price
                todoForm.img.value = data[i].imgUrl
                e.textContent = 'Save'
                e.style.color = 'green'
                editClicked = true
            }else if(editClicked === true){
                const save = {
                    title: todoForm.title.value,
                    description: todoForm.description.value,
                    price: todoForm.price.value,
                    imgUrl: todoForm.img.value
                }
                
                axios.put("https://api.vschool.io/tylerferre/todo" + "/" + id, save)
                .then(res => getData())
                .catch(err => console.log(err))
                todoForm.title.value = ""
                todoForm.description.value = ""
                todoForm.price.value = ""
                todoForm.img.value = ""
                editClicked = false
                e.textContent = 'Edit'
                e.style.color = 'black'
            } 
        })

        e.addEventListener('mouseover', () =>{
            if(editClicked === false){
                e.style.color = 'blue'
            }else if(editClicked === true){
                e.style.color = 'green'
            }
        })
        
        e.addEventListener('mouseleave', () =>{
            if(editClicked === false){
                e.style.color = 'black'
            }else if(editClicked === true){
                e.style.color = 'green'
            }
        })

        // Delete Button - Delete Request
        x.addEventListener('click', () =>{

            x.style.color = 'red'
            axios.delete("https://api.vschool.io/tylerferre/todo" + "/" + id)
            .then(res => getData())
            .catch(err => console.log(err))
        })

        x.addEventListener('mouseover', () =>{
            x.style.color = 'red'
        })

        x.addEventListener('mouseleave', () =>{
            x.style.color = 'black'
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

// Clear Function
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

// Post Request
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