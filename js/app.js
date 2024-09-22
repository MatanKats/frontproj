
// app.js

// Initialize an array to hold calorie entries
let calorieEntries = [];

// Function to add an entry
function addEntry(calories, category, description) {
  const entry = {
    id: Date.now(), // Unique ID based on timestamp
    calories,
    category,
    description,
  };
  calorieEntries.push(entry);
  showNotification("Entry added successfully!");
  updateReport();
}

// Function to show notifications
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Function to update the report
function updateReport() {
  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = ""; // Clear previous report
  calorieEntries.forEach(entry => {
    const entryDiv = document.createElement("div");
    entryDiv.textContent = `${entry.calories} calories - ${entry.category}: ${entry.description}`;
    reportDiv.appendChild(entryDiv);
  });
}

// Event listener for the form submission
document.getElementById("calorie-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload
  const calories = parseInt(document.getElementById("calories").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  addEntry(calories, category, description);

  // Clear form inputs
  this.reset();
});

// Event listener for the report generation
document.getElementById("generate-report").addEventListener("click", function() {
  const reportMonth = document.getElementById("report-month").value;
  const reportDiv = document.getElementById("report");

  // Filter entries by selected month (for simplicity, assuming entries are saved as date strings)
  const filteredEntries = calorieEntries.filter(entry => {
    const entryDate = new Date(entry.id);
    return entryDate.getFullYear() === new Date(reportMonth).getFullYear() &&
      entryDate.getMonth() === new Date(reportMonth).getMonth();
  });

  reportDiv.innerHTML = ""; // Clear previous report
  filteredEntries.forEach(entry => {
    const entryDiv = document.createElement("div");
    entryDiv.textContent = `${entry.calories} calories - ${entry.category}: ${entry.description}`;
    reportDiv.appendChild(entryDiv);
  });

  if (filteredEntries.length === 0) {
    reportDiv.textContent = "No entries found for this month.";
  }
});
