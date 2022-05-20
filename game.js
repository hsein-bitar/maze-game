window.onload = () => {
    const start = document.getElementById('start');
    const status = document.getElementById('status');
    start.addEventListener('click', startHandler);
}


// event handlers
let startHandler = (e) => {
    //reset maze state, no red boundaries,
    //reset score
    // reset game state
    console.log(e.target.innerText);
}
