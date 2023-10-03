

// page context console logging
let pageContext = window.location.pathname;

console.log('client load script running on location pathname: ', pageContext)

//rawupload scripts
document.addEventListener('DOMContentLoaded', function () {
  // Listener for checkboxes
  const checkboxes = document.querySelectorAll('.category-checkbox');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      let row = this.closest('.transaction-row');
      if (this.checked) {
        row.classList.remove('unchecked');
      } else {
        row.classList.add('unchecked');
      }
    });
  });
});

// Function to send transactions in chunks
async function sendTransactionsInChunks(transactions, chunkSize) {
  const numChunks = Math.ceil(transactions.length / chunkSize);
  let overallResponse = '';
  for (let i = 0; i < numChunks; i++) {
    const chunkStart = i * chunkSize;
    const chunkEnd = chunkStart + chunkSize;
    const transactionChunk = transactions.slice(chunkStart, chunkEnd);

    try {
      const response = await fetch('/trans/loadTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionChunk),
      });
      overallResponse += await response.text() + ' ';
      if (!response.ok) {
        throw new Error('Error in chunk ' + (i + 1));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  alert(`Transactions processing complete. ${overallResponse}`);
  window.location.href = '/';
}

// Add listener for load button
const loadBtn = document.querySelector('#load-btn');
if (!loadBtn) {// {do  nothing}
}
else {
  loadBtn.addEventListener('click', function () {
    console.log('load button clicked')
    let rows = document.querySelectorAll('.transaction-row');
    let transactions = [];
    rows.forEach((row) => {
      if (row.querySelector('.loadflag').checked) {
        const accountNameInput = row.querySelector('.account-name');
        const typeInput = row.querySelector('.type');
        const detailsInput = row.querySelector('.details');
        const particularsInput = row.querySelector('.particulars');
        const codeInput = row.querySelector('.code');
        const referenceInput = row.querySelector('.reference');
        const amountInput = row.querySelector('.amount');
        const transactionDateInput = row.querySelector('.transaction-date');
        const categorySelect = row.querySelector('.transaction-category');

        let transaction = {};

        transaction.accountName = accountNameInput.textContent;
        transaction.type = typeInput.textContent;
        transaction.details = detailsInput.textContent;
        transaction.particulars = particularsInput.textContent;
        transaction.code = codeInput.textContent;
        transaction.reference = referenceInput.textContent;
        transaction.amount = amountInput.textContent;
        transaction.date = parseDate(transactionDateInput.textContent);
        transaction.category = categorySelect.options[categorySelect.selectedIndex].value;
        transaction.hasDuplicateTransactionStamp = row.children[11].innerHTML;

        transactions.push(transaction);
      } else {
        console.log('skip row not checked');
      }
    }
    );
    console.log('transactions array = ', transactions)
    // Send transactions to server in chunks
    sendTransactionsInChunks(transactions, 100);
  });
}


// Add listeners for table headers
const headers = document.querySelectorAll("th");
headers.forEach((header, index) => {
  header.addEventListener('click', function () {
    sortTable(index);
  });
});

let sortDirection = 1; // 1 for ascending, -1 for descending

function sortTable(n) {
  const startTime = new Date();

  let table = document.querySelector("table");
  let rows = Array.from(table.querySelectorAll("tbody tr"));

  // Prepare data
  const rowData = rows.map(row => {
    let content = row.getElementsByTagName("TD")[n].innerHTML.toLowerCase();
    let date = parseDate(content);
    let number = parseFloat(content);
    console.log("content = ", content, "date = ", date, "number = ", number)
    return { row, content, date, number };
  });

  // Sorting function
  rowData.sort((a, b) => {
    if (!isNaN(a.date) && !isNaN(b.date)) {
      return sortDirection * (new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (!isNaN(a.number) && !isNaN(b.number)) {
      return sortDirection * (a.number - b.number);
    } else {
      return sortDirection * a.content.localeCompare(b.content);
    }
  });

  // Toggle sort direction
  sortDirection *= -1;

  // Append sorted rows back to the DOM
  const tbody = table.querySelector("tbody");
  rowData.forEach(({ row }) => tbody.appendChild(row));

  const endTime = new Date();
  console.log("sorting took " + (endTime - startTime) + " milliseconds");
}

function parseDate(dateString) {
  let parts = dateString.split("/");
  // note that the month is zero-based, so we subtract 1
  return new Date(parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10));
}

// modal scripts
document.addEventListener('DOMContentLoaded', () => {
  // NodeList of modal containers and content containers
  const modal = document.querySelector('.modal-for-category-edits'); // assuming there's only one modal

  // NodeList of all the show modal buttons
  const openModelBtn = document.querySelectorAll('.show-category-edit-modal-btn');

  // Loop through each show modal button and add event listener
  openModelBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      let dynamicHtml = ''; // Declare here to be accessible in both try and catch blocks
      try {
        const categoryId = btn.getAttribute('data-category-id');
        console.log('categoryId = ', categoryId)

        const response = await fetch(`/category/edit-as-modal/${categoryId}`);
        const data = await response.json();

        // Deconstruct the JSON object for easier referencing 
        const categoryViewObj = data.categoryViewObj;
        console.log(categoryViewObj)
        // Populate the preview span elements with the category data
        document.getElementById('category_name').innerText = categoryViewObj.category_name;
        document.getElementById('category_type').innerText = categoryViewObj.category_type;
        document.getElementById('category_frequency').innerText = categoryViewObj.category_frequency;
        document.getElementById('category_group').innerText = categoryViewObj.category_group;
        document.getElementById('category_description').innerText = categoryViewObj.category_description;
        document.getElementById('category_keywords').innerText = categoryViewObj.category_keywords;
    
        document.getElementById('category_name_default').value = categoryViewObj.category_name;  
      
        document.getElementById('category_description_default').value = categoryViewObj.category_description;

        document.getElementById('category_keywords_default').value = categoryViewObj.category_keywords;

        function populateDropdown(dropdownId, optionsArray, selectedValue) {
          const dropdown = document.getElementById(dropdownId);
          dropdown.innerHTML = '';  // Clear existing options
        
          optionsArray.forEach((optionObj) => {
            const optionElement = document.createElement('option');
            optionElement.value = optionObj.id;
            optionElement.textContent = optionObj.type || optionObj.frequency_name || optionObj.group_name;
            
            // If this option is the currently selected one
            console.log('condition variables: optionObj.id',optionObj.id,' selectedValue', selectedValue)
            if (selectedValue === optionObj.type || selectedValue === optionObj.frequency_name || selectedValue === optionObj.group_name) {
              optionElement.selected = true;
            }
            dropdown.appendChild(optionElement);
          });
        }

        // Populate the dropdowns with the category data
        populateDropdown('category_type_dropdown', categoryViewObj.catTypeNames, categoryViewObj.category_type);
        populateDropdown('category_frequencies_dropdown', categoryViewObj.category_frequencies, categoryViewObj.category_frequency);
        populateDropdown('category_group_dropdown', categoryViewObj.category_groups, categoryViewObj.category_group); 

        document.querySelector('.edit-form form').action = `/category/edit-from-modal/${categoryViewObj.category_id}`;

        modal.style.display = 'block';
      } catch (err) {
        console.error(err);
      }
    });
  });


  // make the category edit modal draggable
    const modalContent = document.querySelector('.modal-content');
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    modalContent.addEventListener('mousedown', (event) => {
      isDragging = true;
      dragOffset.x = event.clientX - modalContent.offsetLeft;
      dragOffset.y = event.clientY - modalContent.offsetTop;
    });
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        modalContent.style.left = (event.clientX - dragOffset.x) + 'px';
        modalContent.style.top = (event.clientY - dragOffset.y) + 'px';
      }
    });
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
});


document.addEventListener('DOMContentLoaded', () => {
  // Get the factory reset button
  const factoryResetBtn = document.querySelector('#factory-reset-btn');
  if (factoryResetBtn) {
    // Add event listener to factory reset button
    factoryResetBtn.addEventListener('click', async (e) => {
      console.log("factory reset button found, and clicked event =", e.target, e.target.id)
      // Prompt user for confirmation before resetting database
      const confirmation = prompt("Are you sure you want to reset the database? This action will delete all transactions and reset all account balances to their initial values. Type 'yes' to confirm.");
      if (confirmation === 'yes') {
        await fetch('/dataed');
      }
    });
  } else {
    console.log("factory reset button not found")
  }
});

// Get the hamburger menu and nav elements
const nav = document.getElementById("nav");
const hamburgerMenu = document.getElementById("hamburger-menu");
// Function to toggle the nav and hamburger menu
function toggleNav() {
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    hamburgerMenu.classList.remove("open");
  } else {
    nav.classList.add("open");
    hamburgerMenu.classList.add("open");
  }
}

// Add event listener to nav element to toggle nav and hamburger menu
if (nav || hamburgerMenu) {
  nav.addEventListener('click', (e) => {
    toggleNav();
  });
}

// If search button is found, add event listener to log "search not active" on click
if (document.querySelector('#search-btn')) {
  document.querySelector('#search-btn').addEventListener('click', (e) => {
    console.log("search not active")
  });
};



// Get the back button
const backBtn = document.querySelector('#back-button');
if (backBtn) {
  // Add event listener to back button to go back in history
  document.querySelector('#back-button').addEventListener('click', () => {
    window.history.back();;
  });
} else {
  console.log("back button not found")
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the table and add event listeners to filter table on input keyup
  const table = document.querySelector('.display-list table tbody');
  if (table) {
    document.querySelectorAll('thead input').forEach(input => {
      input.addEventListener('keyup', () => {
        filterTable(input);
      });
    });
  } else {
    console.log("no table found")
  }

  // Function to filter table based on input value
  function filterTable(input) {
    const filterValue = input.value.toLowerCase();
    const index = Array.prototype.indexOf.call(input.parentNode.parentNode.children, input.parentNode);

    for (const row of table.rows) {
      const cell = row.cells[index];
      if (cell) {
        const cellValue = cell.textContent || cell.innerText;
        if (cellValue.toLowerCase().indexOf(filterValue) > -1) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }
  }
});

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the category select element and add event listener to redirect to weekly summary page on change
  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    document.getElementById('categorySelect').addEventListener('change', function () {
      let category = categorySelect.value;
      if (category) {
        window.location.href = '/reports/weekly/summary/' + category;
      }
    });
  }
});

// Code for chart object
// Get style variables from CSS
let style = getComputedStyle(document.documentElement);
let primaryColor = style.getPropertyValue('--primary-color');
let textColor = style.getPropertyValue('--text-color');
let primaryFont = style.getPropertyValue('--primary-font');
let baseTextSize = style.getPropertyValue('--base-text-size');
let midTextSize = style.getPropertyValue('--mid-text-size');
let backgroundColorUltraDark = style.getPropertyValue('--background-color-ultra-dark');

// Calculate a rolling average
function calculateRollingAverage(data, labels) {
  const timeBetweenDataPoints = labels.map((label, idx, labels) => {
    if (idx === 0) {
      return 0;
    }
    const prevLabel = labels[idx - 1];
    const prevDate = new Date(prevLabel);
    const currDate = new Date(label);
    const timeDiff = currDate.getTime() - prevDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff;
  });

  const period = Math.round(7 / (timeBetweenDataPoints.reduce((acc, val) => acc + val, 0) / timeBetweenDataPoints.length));
  return data.map((_, idx, data) => {
    const start = Math.max(0, idx - period + 1);
    const end = idx + 1;
    const slice = data.slice(start, end);
    const sortedSlice = slice.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedSlice.length / 2);
    const median = sortedSlice.length % 2 !== 0 ? sortedSlice[middleIndex] : (sortedSlice[middleIndex - 1] + sortedSlice[middleIndex]) / 2;
    const filteredSlice = slice.filter(val => Math.abs(val - median) < 3 * (sortedSlice[sortedSlice.length - 1] - sortedSlice[0]) / (sortedSlice.length - 1));
    const sum = filteredSlice.reduce((acc, val) => acc + val, 0);
    return sum / filteredSlice.length;
  });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // If chart object is not found, return
  if (!document.getElementById('chart-object')) {
    return;
  }

  // Use hidden elements in DOM to get chart data
  const chartElement = document.getElementById('chartData');
  const labels = JSON.parse(chartElement.getAttribute('data-labels'));
  const data = JSON.parse(chartElement.getAttribute('data-data'));
  const title = chartElement.getAttribute('data-chart-name');
  console.log('title: ', title)

  // Calculate a rolling average 
  let rollingAverageData = calculateRollingAverage(data, labels);
  console.log('the rolling average function returns: ', rollingAverageData)

  // Get chart object and create new chart
  let ctx = document.getElementById('chart-object').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Amount',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderWidth: 1,
          color: 'rgb(247, 225, 184, .5)',
        },
        {
          label: 'Rolling Average',
          data: rollingAverageData,
          type: 'line',
          borderColor: 'rgba(255, 69, 0, 1)',
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            color: textColor.trim(),
            font: {
              size: parseInt(baseTextSize.trim()),
              family: primaryFont.trim(),
            },
          },
          grid: {
            color: backgroundColorUltraDark.trim(),
          },
        },
        x: {
          ticks: {
            color: textColor.trim(),
            font: {
              size: parseInt(baseTextSize.trim()),
              family: primaryFont.trim(),
            },
          },
          grid: {
            color: backgroundColorUltraDark.trim(),
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
          color: textColor.trim(),
          font: {
            size: parseInt(midTextSize.trim()),
            family: primaryFont.trim(),
          },
        },
        legend: {
          labels: {
            color: textColor.trim(),
            font: {
              size: parseInt(baseTextSize.trim()),
              family: primaryFont.trim(),
            },
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
      responsive: true,
      maintainAspectRatio: false,
      onResize: function (chart, size) {
        const data = chart.data.datasets[0].data;
        const sum = data.reduce((acc, val) => acc + val, 0);
        const avg = sum / data.length;
        const min = Math.min(...data);
        const max = Math.max(...data);
        chart.options.scales.y.min = (min);
        chart.options.scales.y.max = (max);
        chart.update();
      },
    },
  });
});