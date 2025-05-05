// Example logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = '/';  // Redirect to login page after logout
}

function login() {
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = '/';  // Redirect to login page after logout
}

function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';  // Assuming you're storing login status in localStorage
}


function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Submit handler that appends entries to an array in localStorage
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("myForm");
  const imageFile = form.imageInput.files[0];

  try {
    const base64Image = await convertImageToBase64(imageFile);

    const newEntry = {
      option: form.selectList.value,
      text: form.textInput.value,
      image: base64Image,
      date: form.dateInput.value
    };

    // Get existing entries or initialize new array
    const existingData = JSON.parse(localStorage.getItem("myFormDataArray")) || [];
    existingData.push(newEntry);

    localStorage.setItem("myFormDataArray", JSON.stringify(existingData));
    alert("Form data saved to local storage!");

    form.reset();
    document.getElementById("previewImage").classList.add("hidden");
  } catch (error) {
    console.error("Error handling form submission:", error);
    alert("An error occurred while saving the form.");
  }
}

function renderFormEntries() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = ''; // Clear existing

  const data = JSON.parse(localStorage.getItem("myFormDataArray")) || [];

  if (data.length === 0) {
    container.innerHTML = '<p class="text-gray-500 col-span-full">Sin registros Cargados</p>';
    return;
  }

  data.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-md";

    card.innerHTML = `
      <figure><img src="${entry.image}" alt="Uploaded Image" class="object-cover h-48 w-full" /></figure>
      <div class="card-body">
        <h2 class="card-title">${entry.option}</h2>
        <p>${entry.text}</p>
        <p class="text-sm text-gray-500">${entry.date}</p>
        <div class="card-actions justify-end">
          <button onclick="deleteEntry(${index})" class="btn btn-sm btn-error btn-outline">Delete</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function deleteEntry(index) {
  const data = JSON.parse(localStorage.getItem("myFormDataArray")) || [];
  data.splice(index, 1);
  localStorage.setItem("myFormDataArray", JSON.stringify(data));
  renderFormEntries(); // Refresh UI
}


