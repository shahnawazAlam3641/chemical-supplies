let data = [
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 3525.92,
    viscosity: 60.63,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 6495.18,
  },
  {
    id: 2,
    chemicalName: "Caustic Potash",
    vendor: "Formosa",
    density: 3172.15,
    viscosity: 48.22,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 8751.9,
  },
  {
    id: 3,
    chemicalName: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: 8435.37,
    viscosity: 12.62,
    packaging: "Barrel",
    packSize: 75,
    unit: "L",
    quantity: 5964.61,
  },
  {
    id: 4,
    chemicalName: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: 1597.65,
    viscosity: 76.51,
    packaging: "Bag",
    packSize: 105,
    unit: "kg",
    quantity: 8183.73,
  },
  {
    id: 5,
    chemicalName: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: 364.04,
    viscosity: 14.9,
    packaging: "Bag",
    packSize: 105,
    unit: "kg",
    quantity: 4154.33,
  },
  {
    id: 6,
    chemicalName: "n-Pentane",
    vendor: "Sinopec",
    density: 4535.26,
    viscosity: 66.76,
    packaging: "N/A",
    packSize: 0,
    unit: "t",
    quantity: 6272.34,
  },
  {
    id: 7,
    chemicalName: "Glycol Ether PM",
    vendor: "LG Chem",
    density: 6495.18,
    viscosity: 72.12,
    packaging: "Bag",
    packSize: 250,
    unit: "kg",
    quantity: 8749.54,
  },
  {
    id: 8,
    chemicalName: "Acetic Acid",
    vendor: "BASF",
    density: 1049.84,
    viscosity: 18.12,
    packaging: "Drum",
    packSize: 50,
    unit: "L",
    quantity: 5000,
  },
  {
    id: 9,
    chemicalName: "Sodium Hypochlorite",
    vendor: "DowDuPont",
    density: 1230.12,
    viscosity: 15.8,
    packaging: "Barrel",
    packSize: 60,
    unit: "L",
    quantity: 4000,
  },
  {
    id: 10,
    chemicalName: "Benzene",
    vendor: "Shell Chemicals",
    density: 876.5,
    viscosity: 12.3,
    packaging: "Drum",
    packSize: 200,
    unit: "L",
    quantity: 2300,
  },
];

let selectedRows = new Set();

// Function to check for duplicate ID
function isDuplicateId(id) {
  return data.some((item) => item.id === id);
}

// Generate a unique ID
function generateUniqueId() {
  let newId = data.length + 1; // Start from the length + 1
  while (isDuplicateId(newId)) {
    newId++; // Increment ID until a unique one is found
  }
  return newId;
}

// Function to add a new row with unique ID
function addRow() {
  const newId = generateUniqueId(); // Generate a unique ID

  const newRow = {
    id: newId, // Use the unique ID
    chemicalName: "",
    vendor: "",
    density: 0,
    viscosity: 0,
    packaging: "",
    packSize: 0,
    unit: "",
    quantity: 0,
  };

  data.push(newRow);
  loadTableData(data); // Reload table with the new row
}

// Function to load the data into the table
function loadTableData(data) {
  const tableBody = document
    .getElementById("chemicalTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((item, index) => {
    const row = tableBody.insertRow();

    // Checkbox for row selection
    const checkboxCell = row.insertCell(0);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = (event) => {
      selectRow(row, item.id, event.target.checked);
    };
    checkboxCell.appendChild(checkbox);

    // Populate cells with data
    row.insertCell(1).innerHTML = item.id;
    row.insertCell(2).innerHTML = item.chemicalName;
    row.insertCell(3).innerHTML = item.vendor;
    row.insertCell(4).innerHTML = item.density;
    row.insertCell(5).innerHTML = item.viscosity;
    row.insertCell(6).innerHTML = item.packaging;
    row.insertCell(7).innerHTML = item.packSize;
    row.insertCell(8).innerHTML = item.unit;
    row.insertCell(9).innerHTML = item.quantity;

    // double-click event for cell editing
    for (let i = 2; i < row.cells.length; i++) {
      row.cells[i].ondblclick = () => editCell(row, i, item);
    }

    // Highlight selected row
    if (selectedRows.has(item.id)) {
      row.classList.add("selected");
    }
  });
}

// Move selected row up
function moveRowUp() {
  selectedRows.forEach((selectedId) => {
    const index = data.findIndex((item) => item.id === selectedId);
    if (index > 0) {
      const temp = data[index];
      data[index] = data[index - 1];
      data[index - 1] = temp;
    }
  });
  loadTableData(data);
}

// Move selected row down
function moveRowDown() {
  selectedRows.forEach((selectedId) => {
    const index = data.findIndex((item) => item.id === selectedId);
    if (index < data.length - 1) {
      const temp = data[index];
      data[index] = data[index + 1];
      data[index + 1] = temp;
    }
  });
  loadTableData(data);
}

// Toolbar Functions for Deleting Rows
function deleteSelectedRows() {
  selectedRows.forEach((selectedId) => {
    data = data.filter((item) => item.id !== selectedId); // Remove from data
  });
  selectedRows.clear(); // Clear selection
  loadTableData(data); // Reload table
}

function saveTable() {
  alert("Data saved!");
  // Here you would typically save data to a server or local storage
}

// Edit Cell Function
function editCell(row, cellIndex, item) {
  const cell = row.cells[cellIndex];
  const currentValue = cell.innerHTML;
  cell.innerHTML = `<input type='text' value='${currentValue}' />`;
  cell.firstChild.focus(); // Focus on the input field
  cell.firstChild.onblur = () => {
    const newValue = cell.firstChild.value;
    cell.innerHTML = newValue; // Update cell value on blur

    // Update the data object
    switch (cellIndex) {
      case 2:
        item.chemicalName = newValue;
        break;
      case 3:
        item.vendor = newValue;
        break;
      case 4:
        item.density = parseFloat(newValue);
        break;
      case 5:
        item.viscosity = parseFloat(newValue);
        break;
      case 6:
        item.packaging = newValue;
        break;
      case 7:
        item.packSize = parseInt(newValue);
        break;
      case 8:
        item.unit = newValue;
        break;
      case 9:
        item.quantity = parseFloat(newValue);
        break;
    }
  };
}

// Function to select a row
function selectRow(row, id, isSelected) {
  if (isSelected) {
    selectedRows.add(id); // Add to selected rows
    row.classList.add("selected");
  } else {
    selectedRows.delete(id); // Remove from selected rows
    row.classList.remove("selected");
  }
}

// Initial Load
loadTableData(data);
