const ticketType = document.getElementById("ticket-type")
let ticketPrice = +ticketType.value
const busBody = document.querySelector(".bus-body")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
let count = document.getElementById("total-selected-seats")
let total = document.getElementById("total-amount")

// Initial rendering
populateUi()
calculateTotal()

// Populate data from local storage
function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedTicketIndex = localStorage.getItem("selectedTicketIndex")

    if(selectedTicketIndex !== null) {
        ticketType.selectedIndex = selectedTicketIndex
    }

    const selectedTicketPrice = localStorage.getItem("selectedTicketPrice")

    if(selectedTicketPrice !== null) {
        ticketPrice = +selectedTicketPrice
    }
}

// Save ticket information to local storage
function setTicketData(ticketIndex, ticketPrice) {
    localStorage.setItem("selectedTicketIndex", ticketIndex)
    localStorage.setItem("selectedTicketPrice", ticketPrice)
}

// Update selected seats and total
function calculateTotal() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    count.textContent = selectedSeatsCount
    total.textContent = selectedSeatsCount * ticketPrice
}

// Ticket type select event
ticketType.addEventListener("change", function(e) {
    ticketPrice = +e.target.value

    setTicketData(e.target.selectedIndex, e.target.value)
    calculateTotal()
})

// Seat event listener
busBody.addEventListener("click", function(e) {

    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")

        calculateTotal()
    }
})