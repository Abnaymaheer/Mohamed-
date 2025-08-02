const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});








  const ctx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: 'Monthly Sales ($)',
        data: [3200, 4500, 3800, 6000, 5300, 7200],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#222',
            font: {
              size: 14
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#444'
          }
        },
        y: {
          ticks: {
            color: '#444'
          },
          beginAtZero: true
        }
      }
    }
  });






  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");

  // Load tasks from localStorage on load
  window.addEventListener("DOMContentLoaded", loadTasks);

  // Add new task
  addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      input.value = "";
    }
  });

  // Add task on Enter key
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  // Function to add task and save to localStorage
  function addTask(text) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <button onclick="removeTask(this)"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(li);
    saveTasks();
  }

  // Remove task
  function removeTask(btn) {
    btn.parentElement.remove();
    saveTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    list.querySelectorAll("li span").forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    tasks.forEach(task => addTask(task));
  }












  const form = document.querySelector('.add-client-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const company = document.getElementById('client-company').value.trim();

    if (!name || !email) return alert('Please enter required fields.');

    const client = { name, email, phone, company };
    let clients = JSON.parse(localStorage.getItem('clients')) || [];

    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));

    alert('Client added successfully!');
    form.reset();
  });
  
  
  
  
  
  
  
  

  const clientsList = document.getElementById('clientsList');
  const searchInput = document.getElementById('searchClient');

  function loadClients() {
    clientsList.innerHTML = '';
    let clients = JSON.parse(localStorage.getItem('clients')) || [];

    const searchTerm = searchInput.value.toLowerCase();
    clients = clients.filter(c => c.name.toLowerCase().includes(searchTerm));

    if (clients.length === 0) {
      clientsList.innerHTML = '<p>No clients found.</p>';
      return;
    }

    clients.forEach((client, index) => {
      const card = document.createElement('div');
      card.className = 'client-card';

      card.innerHTML = `
        <div class="client-info">
          <p><strong>Name:</strong> ${client.name}</p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone || '-'}</p>
          <p><strong>Company:</strong> ${client.company || '-'}</p>
        </div>
        <button class="delete-btn" onclick="deleteClient(${index})">Delete</button>
      `;

      clientsList.appendChild(card);
    });
  }

  function deleteClient(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
  }

  searchInput.addEventListener('input', loadClients);
  window.addEventListener('DOMContentLoaded', loadClients);









  const notesArea = document.getElementById('projectNotes');

  // Load saved notes
  window.addEventListener('DOMContentLoaded', () => {
    const savedNotes = localStorage.getItem('projectNotes');
    if (savedNotes) {
      notesArea.value = savedNotes;
    }
  });

  // Save notes on input
  notesArea.addEventListener('input', () => {
    localStorage.setItem('projectNotes', notesArea.value);
  });










document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const uploadForm = document.querySelector(".upload-form");
  const uploadedFilesList = document.querySelector(".uploaded-files ul");
  
  // استرجاع الملفات من localStorage أو إنشاء مصفوفة جديدة
  let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
  
  // دالة لتحديث عرض الملفات في الواجهة
  function renderFiles() {
    uploadedFilesList.innerHTML = "";
    if (uploadedFiles.length === 0) {
      uploadedFilesList.innerHTML = "<li>No files uploaded yet.</li>";
      return;
    }
    uploadedFiles.forEach((file, index) => {
      const li = document.createElement("li");
      
      // تحديد أيقونة حسب نوع الملف (pdf, image, docx, or generic)
      let iconClass = "fa-file-alt";
      if (file.name.endsWith(".pdf")) iconClass = "fa-file-pdf";
      else if (/\.(jpe?g|png|gif|svg)$/i.test(file.name)) iconClass = "fa-file-image";
      else if (/\.(docx|doc)$/i.test(file.name)) iconClass = "fa-file-word";
      
      li.innerHTML = `
        <i class="fas ${iconClass} icon-left"></i> ${file.name}
        <button class="delete-btn" data-index="${index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      
      uploadedFilesList.appendChild(li);
    });
  }
  
  // حذف ملف من القائمة
  uploadedFilesList.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
      const index = e.target.closest(".delete-btn").dataset.index;
      uploadedFiles.splice(index, 1);
      localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
      renderFiles();
    }
  });
  
  // رفع ملف (إضافة اسمه للقائمة وتخزينه)
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }
    
    // إضافة الملف للمصفوفة
    uploadedFiles.push({ name: file.name, size: file.size });
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    
    // إعادة عرض الملفات وتفريغ اختيار الملف
    renderFiles();
    fileInput.value = "";
  });
  
  // أول مرة عرض الملفات المحفوظة
  renderFiles();
});






document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("docSearch");
  const docs = document.querySelectorAll(".doc-list li");
  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    docs.forEach(doc => {
      const text = doc.textContent.toLowerCase();
      doc.style.display = text.includes(query) ? "" : "none";
    });
  });
});














document.addEventListener("DOMContentLoaded", () => {
  const budgetForm = document.getElementById("budgetForm");
  const itemName = document.getElementById("itemName");
  const itemAmount = document.getElementById("itemAmount");
  const itemType = document.getElementById("itemType");
  const budgetList = document.querySelector(".budget-list");
  const totalIncomeEl = document.getElementById("totalIncome");
  const totalExpenseEl = document.getElementById("totalExpense");
  const balanceEl = document.getElementById("balance");
  
  let items = JSON.parse(localStorage.getItem("budgetItems")) || [];
  
  function renderItems() {
    budgetList.innerHTML = "";
    let totalIncome = 0;
    let totalExpense = 0;
    
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add(item.type);
      li.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.amount.toFixed(2)}</span>
        <button data-index="${index}" title="Delete"><i class="fas fa-trash-alt"></i></button>
      `;
      budgetList.appendChild(li);
      
      if (item.type === "income") totalIncome += item.amount;
      else totalExpense += item.amount;
    });
    
    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
    balanceEl.textContent = `$${(totalIncome - totalExpense).toFixed(2)}`;
  }
  
  function saveItems() {
    localStorage.setItem("budgetItems", JSON.stringify(items));
  }
  
  budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = itemName.value.trim();
    const amount = parseFloat(itemAmount.value);
    const type = itemType.value;
    
    if (!name || isNaN(amount) || !type) {
      alert("Please fill in all fields correctly.");
      return;
    }
    
    items.push({ name, amount, type });
    saveItems();
    renderItems();
    
    budgetForm.reset();
  });
  
  budgetList.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
      const index = e.target.closest("button").dataset.index;
      items.splice(index, 1);
      saveItems();
      renderItems();
    }
  });
  
  renderItems();
});












  














document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-log");
  
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const entry = button.closest(".audit-entry");
      if (entry) {
        entry.remove();
      }
    });
  });
});








// Drag and Drop Files JS
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  fileList.innerHTML = '';
  for (const file of files) {
    const li = document.createElement('li');
    li.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
    fileList.appendChild(li);
  }
}




// استدعاء العناصر
const envRadios = document.querySelectorAll('input[name="environment"]');
const statusMessage = document.querySelector('.env-status-message strong');

// وظيفة لتحديث رسالة الحالة
function updateEnvironmentStatus() {
  const selectedEnv = document.querySelector('input[name="environment"]:checked').value;
  let envText = '';
  
  switch (selectedEnv) {
    case 'dev':
      envText = 'Development';
      break;
    case 'test':
      envText = 'Testing';
      break;
    case 'prod':
      envText = 'Production';
      break;
  }
  
  statusMessage.textContent = envText;
}

// ربط التغيير بالحدث change لكل الراديو بوتونز
envRadios.forEach(radio => {
  radio.addEventListener('change', updateEnvironmentStatus);
});

// تحديث أولي عند تحميل الصفحة
updateEnvironmentStatus();





