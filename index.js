const form = document.getElementById('user-form');
const tableBody = document.querySelector('#user-entries tbody');

// Set age range for DOB input
const dobInput = document.getElementById('dob');
const today = new Date();
const minAge = new Date(today.getFullYear() - 54, today.getMonth(), today.getDate());
const maxAge = new Date(today.getFullYear() - 19, today.getMonth(), today.getDate());
dobInput.min = minAge.toISOString().split('T')[0];
dobInput.max = maxAge.toISOString().split('T')[0];

// Retrieve entries
function getEntries() {
  const entries = localStorage.getItem('user-entries');
  return entries ? JSON.parse(entries) : [];
}

// Display entries in table
function displayEntries() {
  const entries = getEntries();
  tableBody.innerHTML = entries.map(entry => `
    <tr>
      <td class="border p-2">${entry.name}</td>
      <td class="border p-2">${entry.email}</td>
      <td class="border p-2">${entry.password}</td>
      <td class="border p-2">${entry.dob}</td>
      <td class="border p-2">${entry.acceptedTerms}</td>
    </tr>
  `).join('');
}

// Validate name and email
function isValid(name, email) {
  const nameValid = name.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return nameValid && emailValid;
}

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('acceptTerms').checked;

  if (!isValid(name, email)) {
    alert('Please enter a valid name and email.');
    return;
  }

  if (!acceptedTerms) {
    alert('You must accept the Terms & Conditions to submit the form.');
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem('user-entries', JSON.stringify(entries));

  displayEntries();
  form.reset();
});

// Initial load
displayEntries();
