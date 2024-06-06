$(document).ready(function() {
    const taskList = $('#ft_list');
    const addTaskBtn = $('#addTaskBtn');
    const newTaskInput = $('#newTask');

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
        $('.task span').each(function() {
            tasks.push($(this).text());
        });
        setCookie('tasks', JSON.stringify(tasks), 365);
    }

    function addTaskToDOM(taskText) {
        const task = $('<div>', { class: 'task' });
        const taskContent = $('<span>').text(taskText);
        const removeBtn = $('<button>', { class: 'remove-btn' }).html('&times;');
        
        removeBtn.click(function() {
            if (confirm('Você deseja remover esta tarefa?')) {
                task.remove();
                saveTasks();
            }
        });

        task.append(taskContent, removeBtn);
        taskList.prepend(task);
    }

    addTaskBtn.click(function() {
        const taskText = newTaskInput.val();
        if (taskText && taskText.trim() !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            newTaskInput.val('');
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
