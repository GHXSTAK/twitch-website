document.addEventListener("DOMContentLoaded", () => {
    fetch('https://script.google.com/macros/s/AKfycbyxzTN76i9JWEZQSu_4qf6nSlz8tt5tND0RMHtlgbEviQKI7za5bMN7fJkxL1UGPeho/exec')
        .then(res => res.json())
        .then(data => {
            const week = document.getElementById("schedule-list");

            data.forEach(entry => {
                const day = entry.Day || 'Unknown Day';
                const time = entry.Time ? entry.Time : 'Offline';

                // Log for debugging
                console.log(`Day: ${day}, Time: ${time}`);

                // Create list item
                const eDay = document.createElement("li");
                eDay.innerHTML = `<strong>${day}</strong>: ${time}`;
                week.appendChild(eDay);
            });
        })
        .catch(error => console.error("Error loading schedule:", error));
    });