document.addEventListener("DOMContentLoaded", function () {
  const recordForm = document.getElementById("record-form");
  const recordList = document.getElementById("record-list");
  const editIndex = document.getElementById("edit-index");

  let records = [];

  recordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const medicineName = document.getElementById("medicine-name").value;
    const dosage = document.getElementById("dosage").value;
    const frequency = document.getElementById("frequency").value;

    if (editIndex.value !== "-1") {
      // If edit mode, update the existing record
      const index = parseInt(editIndex.value);
      records[index] = { medicineName, dosage, frequency };
      editIndex.value = "-1";
    } else {
      // If not in edit mode, add a new record
      records.push({ medicineName, dosage, frequency });
    }

    displayRecords();
    recordForm.reset();
  });

  function displayRecords() {
    recordList.innerHTML = "";
    records.forEach(function (record, index) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${record.medicineName}</td>
        <td>${record.dosage}</td>
        <td>${record.frequency}</td>
        <td><button onclick="editRecord(${index})">Edit</button></td>
        <td><button onclick="deleteRecord(${index})">Delete</button></td>
      `;
      recordList.appendChild(tr);
    });
  }

  window.editRecord = function (index) {
    const record = records[index];
    document.getElementById("medicine-name").value = record.medicineName;
    document.getElementById("dosage").value = record.dosage;
    document.getElementById("frequency").value = record.frequency;
    editIndex.value = index;
  };

  window.deleteRecord = function (index) {
    records.splice(index, 1);
    displayRecords();
  };
});
