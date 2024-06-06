document.addEventListener('DOMContentLoaded', (event) => {
    const taskList = document.getElementById('ft_list');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTask');

    function loadTasks() {
        const tasks = getCookie('tasks');
        if (tasks) {
            const taskArray = JSON.parse(tasks);
            taskArray.forEach(task => {
                addTaskToDOM(task);
            });
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task span').forEach(taskElement => {
            tasks.push(taskElement.innerText);
        });
        setCookie('tasks', JSON.stringify(tasks), 365);
    }

    function addTaskToDOM(taskText) {
        const task = document.createElement('div');
        task.className = 'task';

        const taskContent = document.createElement('span');
        taskContent.innerText = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', () => {
            if (confirm('Você deseja remover esta tarefa?')) {
                task.remove();
                saveTasks();
            }
        });

        task.appendChild(taskContent);
        task.appendChild(removeBtn);
        taskList.insertBefore(task, taskList.firstChild);
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value;
        if (taskText && taskText.trim() !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            newTaskInput.value = '';
        }
    });

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    loadTasks();
});
