// js/reservations.js

// 1. RESERVATION DATA (SIMULATING A DATABASE)
let bookedTables = [
    // Simulating existing bookings: [date, time, size]
    { date: '2025-10-15', time: '19:00', size: 4 },
    { date: '2025-10-15', time: '18:30', size: 2 },
    { date: '2025-10-16', time: '20:00', size: 6 }
];
const totalTables = 10;
const tableCapacityPerTimeSlot = 3; // Max number of bookings allowed in one exact time slot

// 2. AVAILABILITY CHECK LOGIC
function checkAvailability(date, time, partySize) {
    const requestedTime = `${date} ${time}`;

    // A simple simulation: count how many bookings exist for the exact time
    const conflicts = bookedTables.filter(booking => 
        `${booking.date} ${booking.time}` === requestedTime
    );

    if (partySize > 10) {
        return { available: false, message: "Sorry, we cannot accommodate parties larger than 10." };
    }
    
    if (conflicts.length >= tableCapacityPerTimeSlot) {
        return { available: false, message: "Sorry, that exact time slot is fully booked." };
    }

    return { available: true, message: "Table available! Proceeding with your reservation." };
}

// 3. FORM SUBMISSION HANDLER
document.getElementById('reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const size = parseInt(document.getElementById('res-size').value);
    const name = document.getElementById('res-name').value;
    const email = document.getElementById('res-email').value;

    const result = checkAvailability(date, time, size);
    const messageElement = document.getElementById('res-message');

    if (result.available) {
        // SIMULATE BOOKING: add to array
        bookedTables.push({ date, time, size, name, email });
        messageElement.textContent = `Reservation Success! ${name}, your table for ${size} on ${date} at ${time} is confirmed.`;
        messageElement.style.color = 'green';
        e.target.reset(); // Clear the form
    } else {
        messageElement.textContent = `Reservation Failed: ${result.message}`;
        messageElement.style.color = 'red';
    }
});