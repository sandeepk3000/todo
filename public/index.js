
const addTemplateBtn = document.querySelector(".btn")
const templateName = document.querySelector(".templateName")
const discription = document.querySelector(".discription")
const userId = window.location.search.split("=")[1]
const container = document.querySelector(".container")
const setEventsOn = (todo, remove_todo, edit_todo) => {
    remove_todo.forEach((element) => {
        element.addEventListener("click", (event) => {
            const index = Array.prototype.indexOf.call(remove_todo, event.target)
            const todoId = todo[index].getAttribute("id")
            console.log(index, todoId);
            removeTemplate(todoId, index, todo)

        })
    })
    edit_todo.forEach((element) => {
        element.addEventListener("click", (event) => {
            const index = Array.prototype.indexOf.call(edit_todo, event.target)
            editTodo(index, todo)
        })
    })

}
const intialization = () => {
    const todo = document.querySelectorAll(".todo")
    const remove_todo = document.querySelectorAll(".remove_todo")
    const edit_todo = document.querySelectorAll(".edit_todo")
    console.log(edit_todo);
    setEventsOn(todo, remove_todo, edit_todo)
    eventHandler(true)
}
if (container.children.length !== 0) {
    intialization()
}
const removeTemplate = async (todoId, index, todo) => {
    console.log(todoId, index);

    try {
        const res = await fetch(`/updateTemplate?q=${userId}&&todoId=${todoId}`, { method: "DELETE" })
        console.log(res);
        if (res) {
            todo[index].remove()
            intialization()
        }
    } catch (error) {
        console.log("error in removeTemplate");
    }
}
async function addTemplate() {
    eventHandler(false)
    const index = document.querySelector(".container").children.length
    const todoId = `@user:todo:id:${index}`
    console.log(todoId);
    const res = await upLoadTemplate(todoId)
    console.log(await res.json());
    if (res) {
        let list = `<div class="todo" id="${todoId}">
        <div class="content">
            <div class="task_name">
                <h1 class="todo_heading">${templateName.value}</h1>
            </div>
            <div class="task_discription">
                <p class="todo_paragragh">${discription.value}</p>
            </div>
        </div>
        <div class="todo_btns">
            <button class="remove_todo">Delete</button>
            <button class="edit_todo">Edit</button>
        </div>
         <div class="editor_toast">
            <div class="editor_input">
                <input class="edit_input" type="text">
            </div>
            <div class="editor_btns">
                <button class="cancel_editor">Cancel</button>
                <button class="save_editor">Save</button>
            </div>
        </div>
    </div>`
        container.innerHTML += list
        intialization()
    }
}
function eventHandler(eventFlag) {
    console.log(eventFlag);
    if (eventFlag) {
        console.log(eventFlag);
        addTemplateBtn.addEventListener("click", addTemplate)
    }
    else {
        console.log(eventFlag);
        addTemplateBtn.removeEventListener("click", addTemplate)
    }

}
eventHandler(true)
const upLoadTemplate = async (todoId) => {
    try {
        const json = {
            templateName: templateName.value,
            discription: discription.value
        }
        const options = {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
            }
        }
        return await fetch(`/updateTemplate?q=${userId}&&todoId=${todoId}`, options)

    } catch (error) {
        console.log("error in uploadTemplate");
    }
}

async function editTodo(index, todo) {
    console.log(index);
    const save_editor = document.querySelectorAll(".save_editor")
    const cancel_editor = document.querySelectorAll(".cancel_editor")
    const edit_input = document.querySelectorAll(".edit_input")
    const todo_heading = document.querySelectorAll(".todo_heading")
    const todoId = todo[index].getAttribute("id")
    todo[index].classList.add("editor_active")
    edit_input[index].addEventListener("keypress", (inputEvent) => {
        if (inputEvent.key === "Enter") {
            todo_heading[index].innerHTML = edit_input[index].value
            todo[index].classList.remove("editor_active")
        }
    })
    save_editor[index].addEventListener("click", (saveEvent) => {
        todo_heading[index].innerHTML = edit_input[index].value
        console.log(edit_input[index].value);
        todo[index].classList.remove("editor_active")
    })
    cancel_editor[index].addEventListener("click", (cancelEvent) => {
        todo[index].classList.remove("editor_active")
    })

    console.log(todoId);
}





