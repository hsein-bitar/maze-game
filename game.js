
window.onload = () => {
    const status = document.getElementById('status');
    const start = document.getElementById('start');
    const boundaries = document.querySelectorAll('.boundary');
    const scoreDiv = document.getElementsByClassName('example')[0];
    const end = document.getElementById('end');
    console.log(boundaries);

    let score = 0

    // event handlers
    let startHandler = (e) => {
        //reset maze state, no red boundaries,
        boundaries.forEach(b => b.classList.remove('youlose'))
        boundaries.forEach((b) => b.addEventListener('mouseover', failHandler));
        //reset score
        // score = 0;
        scoreDiv.innerText = `Score: ${score}`
        // reset game state
        status.innerText = 'Begin by moving your mouse over the "S".';
        end.addEventListener('mouseover', endHandler);
    }

    let stateHandler = (msg) => {
        status.innerText = msg;
    }

    let failHandler = function (e) {
        stateHandler('You Lost, try again');
        boundaries.forEach((b) => b.classList.add('youlose'));
        score = score - 10;
        scoreDiv.innerText = `Score: ${score}`
        boundaries.forEach((b) => b.removeEventListener('mouseover', failHandler));
        end.removeEventListener('mouseover', endHandler)
        //remove end handler

    }


    let endHandler = () => {
        stateHandler('You Won, Do it Again');
        //remove boudaries handler
        boundaries.forEach((b) => b.removeEventListener('mouseover', failHandler));
        score = score + 5;
        scoreDiv.innerText = `Score: ${score}`

        end.removeEventListener('mouseover', endHandler)

    }
    start.addEventListener('click', startHandler);
    end.addEventListener('mouseover', endHandler)

}


