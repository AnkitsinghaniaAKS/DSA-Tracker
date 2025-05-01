// const tracker = document.getElementById('tracker');
// const savedProgress = JSON.parse(localStorage.getItem("dsaProgress")) || {};

// function renderTopics(data) {
//   const searchTerm = document.getElementById("searchBox").value.toLowerCase();
//   const difficultyFilter = document.getElementById("difficultyFilter").value;
//   tracker.innerHTML = '';

//   for (let topic in data) {
//     const filteredProblems = data[topic].filter(problem =>
//       problem.name.toLowerCase().includes(searchTerm) &&
//       (difficultyFilter === '' || problem.difficulty === difficultyFilter)
//     );

//     if (filteredProblems.length === 0) continue;

//     const section = document.createElement('div');
//     section.className = 'topic';

//     const title = document.createElement('h2');
//     title.textContent = topic;

//     const total = filteredProblems.length;
//     const completed = filteredProblems.filter(p => savedProgress[p.id]).length;
//     const percent = Math.round((completed / total) * 100);

//     const progressContainer = document.createElement('div');
//     progressContainer.className = 'progress-bar';
//     progressContainer.innerHTML = `
//       <div class="bar">
//         <div class="fill" style="width: ${percent}%"></div>
//       </div>
//       <small>${completed} / ${total} completed</small>
//     `;

//     section.appendChild(title);
//     section.appendChild(progressContainer);

//     filteredProblems.forEach(problem => {
//       const problemDiv = document.createElement('div');
//       problemDiv.className = 'problem';

//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.checked = savedProgress[problem.id] || false;

//       const label = document.createElement('label');
//       label.textContent = `${problem.name} (${problem.difficulty})`;

//       checkbox.addEventListener('change', () => {
//         savedProgress[problem.id] = checkbox.checked;
//         localStorage.setItem("dsaProgress", JSON.stringify(savedProgress));
//         renderTopics(data);
//       });

//       problemDiv.appendChild(checkbox);
//       problemDiv.appendChild(label);
//       section.appendChild(problemDiv);
//     });

//     tracker.appendChild(section);
//   }
// }

// document.getElementById("searchBox").addEventListener("input", () => {
//   renderTopics(dsaData);
// });

// document.getElementById("difficultyFilter").addEventListener("change", () => {
//   renderTopics(dsaData);
// });

// document.getElementById("resetBtn").addEventListener("click", () => {
//   if (confirm("Are you sure you want to reset all progress?")) {
//     localStorage.removeItem("dsaProgress");
//     location.reload();
//   }
// });

// renderTopics(dsaData);

const tracker = document.getElementById("tracker");
const savedProgress = JSON.parse(localStorage.getItem("dsaProgress")) || {};

function renderTopics(data) {
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();
  tracker.innerHTML = "";

  for (let topic in data) {
    const filteredProblems = data[topic].filter(problem =>
      problem.name.toLowerCase().includes(searchTerm)
    );

    if (filteredProblems.length === 0) continue;

    const section = document.createElement("div");
    section.className = "topic";

    const title = document.createElement("h2");
    title.textContent = topic;

    const total = filteredProblems.length;
    const completed = filteredProblems.filter(p => savedProgress[p.id]).length;
    const percent = Math.round((completed / total) * 100);

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-bar";

    progressContainer.innerHTML = `
      <div class="bar">
        <div class="fill" style="width: ${percent}%"></div>
      </div>
      <small>${completed} / ${total} completed</small>
    `;

    section.appendChild(title);
    section.appendChild(progressContainer);

    filteredProblems.forEach(problem => {
      const problemDiv = document.createElement("div");
      problemDiv.className = "problem";

      const label = document.createElement("label");
      label.textContent = `${problem.name} (${problem.difficulty})`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = savedProgress[problem.id] || false;

      checkbox.addEventListener("change", () => {
        savedProgress[problem.id] = checkbox.checked;
        localStorage.setItem("dsaProgress", JSON.stringify(savedProgress));
        renderTopics(data);
      });

      problemDiv.appendChild(label);
      problemDiv.appendChild(checkbox);
      section.appendChild(problemDiv);
    });

    tracker.appendChild(section);
  }
}

document.getElementById("searchBox").addEventListener("input", () => {
  renderTopics(dsaData);
});

document.addEventListener("DOMContentLoaded", () => {
  renderTopics(dsaData);
});
