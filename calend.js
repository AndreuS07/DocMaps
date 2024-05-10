document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let currentYear, currentMonth;

    function renderCalendar(year, month) {
        currentYear = year || new Date().getFullYear();
        currentMonth = month || new Date().getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay();
        const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const monthYear = `${months[currentMonth]} ${currentYear}`;

        let days = '';

        // Añadir espacios para los días de la semana antes del primer día del mes
        for (let i = firstDayIndex; i > 0; i--) {
            days += `<div class="day prev-month"></div>`;
        }

        // Añadir los días del mes actual
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === new Date().getDate() && currentMonth === new Date().getMonth();
            const events = getEvents(currentYear, currentMonth, i);
            days += `
                <div class="day ${isToday ? 'today' : ''}" data-day="${i}">
                    ${i}
                    ${events.map((event, index) => `
                        <div class="event" data-index="${index}">${event}</div>
                    `).join('')}
                </div>`;
        }

        // Añadir espacios para los días de la semana después del último día del mes
        for (let i = lastDayIndex + 1; i < 7; i++) {
            days += `<div class="day next-month"></div>`;
        }

        // Añadir el domingo al principio del calendario
        days = `<div class="day-name">Dom</div>` + days;

        calendar.innerHTML = `
            <div class="month">${monthYear}</div>
            <div class="day-name">Lun</div>
            <div class="day-name">Mar</div>
            <div class="day-name">Mié</div>
            <div class="day-name">Jue</div>
            <div class="day-name">Vie</div>
            <div class="day-name">Sáb</div>
            ${days}
        `;
    }

    function getEvents(year, month, day) {
        const eventKey = `event_${year}_${month}_${day}`;
        const events = JSON.parse(localStorage.getItem(eventKey)) || [];
        return events;
    }

    renderCalendar();

    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    calendar.addEventListener('click', (event) => {
        const day = event.target.closest('.day');
        if (day) {
            const eventText = prompt('Anotación:');
            if (eventText) {
                const dayNumber = day.dataset.day;
                const eventKey = `event_${currentYear}_${currentMonth}_${dayNumber}`;
                const existingEvents = JSON.parse(localStorage.getItem(eventKey)) || [];
                existingEvents.push(eventText);
                localStorage.setItem(eventKey, JSON.stringify(existingEvents));
                renderCalendar(currentYear, currentMonth); // Actualizar el calendario después de añadir la cita
            }
        }

        const eventDiv = event.target.closest('.event');
        if (eventDiv) {
            const day = eventDiv.parentElement;
            const dayNumber = day.dataset.day;
            const eventIndex = eventDiv.dataset.index;
            const eventKey = `event_${currentYear}_${currentMonth}_${dayNumber}`;
            const existingEvents = JSON.parse(localStorage.getItem(eventKey)) || [];
            existingEvents.splice(eventIndex, 1);
            localStorage.setItem(eventKey, JSON.stringify(existingEvents));
            renderCalendar(currentYear, currentMonth); // Actualizar el calendario después de eliminar la cita
        }
    });
});
