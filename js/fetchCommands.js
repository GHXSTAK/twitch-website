fetch(`../data/commands.json`)
	.then(res => res.json())
	.then(data => {
		const tbody = document.getElementById(`Commands`)
		tbody.innerHTML = '';
		
		data.forEach((item) => {
			const tr = document.createElement('tr');
			
			const cmdText = item.Command
			const tdCom = document.createElement('td');
			tdCom.innerHTML = `<span class="cmd-prefix">!</span>${cmdText.slice(1)}`;
			tr.appendChild(tdCom);
			
			const tdRole = document.createElement('td');
			tdRole.textContent = item.Role;
			tr.appendChild(tdRole);
			
			const tdDes = document.createElement('td');
			const ogDes = item.Description;
			tdDes.textContent = item.Description;
			tr.appendChild(tdDes);
			
			let showingResponse = false;
			tr.addEventListener('click', () => {
				if (!showingResponse) {
					tdDes.textContent = item.Response || item.Description;
					showingResponse = true;
				}
			});
			tr.addEventListener('mouseleave', () => {
				if (showingResponse) {
					tdDes.textContent = item.Description;
					showingResponse = false;
				}
			});
			
			tbody.appendChild(tr);
		})
	})
	.catch(err => {
		console.error(`Error loading commands.json:`, err);
	});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
	const searchTerm = searchInput.value.toLowerCase();
	const rows = document.querySelectorAll("#Commands tr");

	rows.forEach(row => {
		const cells = Array.from(row.children);
		const matches = cells.some(cell =>
			cell.textContent.toLowerCase().includes(searchTerm)
		);

		row.style.display = matches ? "" : "none";
	});
});

function filterTable() {
const selectedRole = selectedSpan.textContent.trim();
	const rows = document.querySelectorAll('#Commands tr');

	rows.forEach(row => {
		const roleCell = row.children[1]; // Permission column (index 1)
		if (!roleCell) return;

		const roleText = roleCell.textContent.trim();

		// Show all if "Everyone" is selected, otherwise filter
		if (selectedRole === "Everyone" || roleText === selectedRole) {
			row.style.display = "";
		} else {
			row.style.display = "none";
		}
	});
}

const roleFilterBtn = document.getElementById('role-filter');
const roleOptions = roleFilterBtn.querySelector('.role-filter-options');
const selectedSpan = roleFilterBtn.querySelector('.selected-role');

roleFilterBtn.addEventListener('click', (e) => {
	e.stopPropagation();
	const isOpen = roleFilterBtn.classList.toggle('open');
	roleOptions.style.display = isOpen ? "block" : "none";
});

roleOptions.querySelectorAll('li').forEach(li => {
	li.addEventListener('click', (e) => {
		selectedSpan.textContent = e.target.textContent;
		roleFilterBtn.classList.remove('open');
		roleOptions.style.display = "none";
		filterTable();
	});
});

document.addEventListener('click', () => {
	roleFilterBtn.classList.remove('open');
	roleOptions.style.display = "none";
});

