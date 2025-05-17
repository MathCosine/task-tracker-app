document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // Initialize confetti (if using a library like canvas-confetti)
    // Make sure to include the library in your HTML or install via npm if using a bundler
    // For this example, we'll assume you've included it via a <script> tag
    // and it makes a global `confetti` function available.
    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                // Shoot confetti!
                shootConfetti();
                completeButton.textContent = 'Undo';
            } else {
                completeButton.textContent = 'Complete';
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = ''; // Clear input field
    }

    function shootConfetti() {
        myConfetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // --- How to include canvas-confetti ---
    // 1. Download: Go to https://github.com/catdad/canvas-confetti and download the script.
    //    Then include it in your HTML: <script src="confetti.browser.min.js"></script>
    // 2. CDN: <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
    //    (Always check for the latest version on a CDN)
});
