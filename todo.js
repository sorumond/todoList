document.querySelector('.new-todo').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        const isInputEmpty = document.querySelector('.new-todo').value;
        if (isInputEmpty) {
            const liElement = `<li class="todo-item"><div class ='view'>
                <input class='toggle' type="checkbox">
<label>${document.querySelector('.new-todo').value}</label>
<button class="destroy"></button>
</div></li>`;
            document.querySelector('.todo-list').innerHTML += liElement;
            document.querySelector('.new-todo').value = '';
            showMenu();
        }
    }
});

document.addEventListener('click', (event) => {
    const isRemoveButton = event.target.matches('.destroy');
    const isCheckButton = event.target.matches('.toggle');
    const isCheckAllButton = event.target.matches('.toggle-all');
    const isActiveButton = event.target.matches('.active');
    const isCompletedButton = event.target.matches('.done');
    const isAllButton = event.target.matches('.all');
    const isRemoveAllButton = event.target.matches('.clear-completed');

    if (isRemoveButton) {
        event.target.closest('.todo-item').remove();
        showMenu();

    } else if (isCheckButton) {
        event.target.closest('.todo-item').classList.toggle('completed');
        if (isAllChecked()) {
            document.querySelector('.toggle-all').checked = true;
        } else {
            document.querySelector('.toggle-all').checked = false;
        }

    } else if (isCheckAllButton) {
        if (!isAllChecked()) {

            [...document.querySelectorAll('.todo-item')].forEach((toDoItem) => {
                toDoItem.classList.add('completed');
            });

            [...document.querySelectorAll('.toggle')].forEach((toggle) => {
                toggle.checked = true;
            })
        } else {
            [...document.querySelectorAll('.toggle')].forEach((toggle) => {
                toggle.checked = false;
            });

            [...document.querySelectorAll('.todo-item')].forEach((toDoItem) => {
                toDoItem.classList.remove('completed')
            });
        }

    } else if (isActiveButton) {
        showActive();
        [...document.querySelector('.filters').children].forEach((filter) => {
            filter.querySelector('a').classList.remove('selected');
        });
        event.target.classList.add('selected');

    } else if (isCompletedButton) {
        showCompleted();
        [...document.querySelector('.filters').children].forEach((filter) => {
            filter.querySelector('a').classList.remove('selected');
        });
        event.target.classList.add('selected');

    } else if (isAllButton) {
        showAll();
        [...document.querySelector('.filters').children].forEach((filter) => {
            filter.querySelector('a').classList.remove('selected');
        });
        event.target.classList.add('selected');

    } else if (isRemoveAllButton) {
        removeCompleted();
        showMenu();
    }


});

document.addEventListener('dblclick', (event) => {
    const isTextField = event.target.matches('label');

    if (isTextField) {
        let liItem = event.target.closest('.todo-item');
        liItem.classList.add('editing');
        liItem.innerHTML += `<input class='edit' autofocus>`;
        let input = liItem.querySelector('.edit');
        input.focus();
        input.value = liItem.querySelector('label').innerHTML;
        changeToDo(liItem);
        addBlur(liItem);
    }
});

function addBlur(li) {
    let input = li.querySelector('.edit');
    console.log('blur');
    if (input) {

    }
}

function changeToDo(li) {
    let input = li.querySelector('.edit');
    input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            console.log('Гуси');
            li.querySelector('label').innerHTML = input.value;
            li.classList.remove('editing');
            input.remove();
            if (input.value === '') {
                li.remove();
                showMenu();
            }
            return true;
        } else if (event.keyCode === 27) {
            console.log('Dva Gusya');
            li.classList.remove('editing');
            input.remove();
            return true;
        }
    });
    input.addEventListener('blur', (event) => {
        console.log('BlurГуси');
        li.querySelector('label').innerHTML = input.value;
        li.classList.remove('editing');
        input.remove();
        if (input.value === '') {
            li.remove();
            showMenu();
        }
    })
}

function showMenu() {
    const isToDoListEmpty = document.querySelector('.todo-list').firstChild;
    if (isToDoListEmpty) {
        document.querySelector('.main').style.display = 'block';
    } else {
        document.querySelector('.main').style.display = 'none';
    }
}

function isAllChecked() {
    let isSomeThingUnchked;
    let toDoItems = [...document.querySelectorAll('.todo-item')];
    for (let i = 0; i < toDoItems.length; i++) {
        if (!toDoItems[i].matches('.completed')) {
            isSomeThingUnchked = false;
            break;
        } else {
            isSomeThingUnchked = true;
        }
    }
    return isSomeThingUnchked;
}

function showActive() {
    [...document.querySelectorAll('.todo-item')].forEach((item) => {
        if (item.matches('.completed')) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    })
}

function showCompleted() {
    [...document.querySelectorAll('.todo-item')].forEach((item) => {
        if (!item.matches('.completed')) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    })
}

function showAll() {
    [...document.querySelectorAll('.todo-item')].forEach((item) => {
        item.style.display = '';
    })
}

function removeCompleted() {
    [...document.querySelectorAll('.todo-item')].forEach((item) => {
        if (item.matches('.completed')) {
            item.remove();
        }
    })
}


