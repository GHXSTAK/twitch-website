const leaderboardTypes = ['chat', 'daily', 'watchtime'];

leaderboardTypes.forEach(type => {
	fetch(`../data/${type}.json`)
		.then(res => res.json())
		.then(data => {
			const tbody = document.getElementById(`${type}Leaderboard`);
			tbody.innerHTML = '';

			data.forEach((item, index) => {
				const tr = document.createElement('tr');

				const tdRank = document.createElement('td');
				tdRank.textContent = index + 1;
				tr.appendChild(tdRank);
				
				const tdUser = document.createElement('td');
				tdUser.textContent = item.UserName;
				tr.appendChild(tdUser);

				
				const tdValue = document.createElement('td');
				if (type === 'watchtime') {
					const minutes = (item.Value / 60).toFixed(0);
					if (minutes >= 60) {
						const hours = (item.Value / 3600).toFixed(1);
						tdValue.textContent = `${hours}h`;
					} else {
						tdValue.textContent = `${minutes}min`;
					}
				} else {
					tdValue.textContent = item.Value;
				}
				tr.appendChild(tdValue);

				tbody.appendChild(tr);
			});
		})
		.catch(err => {
			console.error(`Error loading ${type}.json:`, err);
		});
});

function showTable(type) {
	const containers = document.querySelectorAll('.table-container');
	containers.forEach((container) => {
		const table = container.querySelector('table');
		if (window.innerWidth < 768) {
			const leaderboard = container.querySelector(`#${type}Leaderboard`);
			container.style.display = leaderboard ? 'block' : 'none';
		} else {
			container.style.display = 'block'
		}
	});
}
window.addEventListener('resize', () => {
	if (window.innerWidth >= 768) {
		document.querySelectorAll('.table-container').forEach(c => {
			c.style.display = 'block';
	});
	} else {
		showTable('chat');
	}
});

if (window.innerWidth < 768) {
	showTable('chat');
}

document.querySelectorAll('.table-switch-buttons button').forEach((btn, index) => {
	btn.addEventListener('click', () => {
		const type = leaderboardTypes[index];
		showTable(type);
	});
});