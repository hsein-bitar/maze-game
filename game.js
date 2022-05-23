
window.onload = () => {
    const status = document.getElementById('status');
    const start = document.getElementById('start');
    const boundaries = document.querySelectorAll('.boundary');
    const scoreDiv = document.getElementsByClassName('score')[0];
    const end = document.getElementById('end');
    //timers
    let live = document.getElementById('live');
    let last = document.getElementById('last');
    let best = document.getElementById('best');
    let pause = true;
    let start_time;
    let elapsed_time
    let best_time = Number.MAX_VALUE;


    let score = 0

    // event handlers
    let resetHandler = (e) => {
        best_time = Number.MAX_VALUE;
        last.innerText = best.innerText = '0:00'
        pause = false;
        requestAnimationFrame(liveTimer);
        //reset maze state, no red boundaries,
        boundaries.forEach(b => b.classList.remove('youlose'))
        boundaries.forEach((b) => b.addEventListener('mouseover', failHandler));
        //reset score
        score = 0;
        scoreDiv.innerText = `Your score is: ${score}`
        // reset game state
        status.innerText = 'Game On! Move cursor to the end.';
        end.addEventListener('mouseover', endHandler);
    }

    let startHandler = (e) => {
        start_time = new Date();
        pause = false;
        requestAnimationFrame(liveTimer);
        //reset maze state, no red boundaries,
        boundaries.forEach(b => b.classList.remove('youlose'))
        boundaries.forEach((b) => b.addEventListener('mouseover', failHandler));
        //reset score
        // score = 0;
        scoreDiv.innerText = `Your score is: ${score}`
        // reset game state
        status.innerText = 'Game On! Move cursor to the end.';
        end.addEventListener('mouseover', endHandler);
    }

    let stateHandler = (msg) => {
        status.innerText = msg;
    }

    let failHandler = function (e) {
        pause = true;
        stateHandler('You Lost, try again');
        boundaries.forEach((b) => b.classList.add('youlose'));
        score = score - 10;
        scoreDiv.innerText = `Your score is: ${score}`
        boundaries.forEach((b) => b.removeEventListener('mouseover', failHandler));
        end.removeEventListener('mouseover', endHandler)
        //remove end handler

    }


    let endHandler = () => {
        pause = true;
        last.innerText = timeConvertToText(elapsed_time);
        if (elapsed_time < best_time) {
            best_time = elapsed_time;
            best.innerText = timeConvertToText(elapsed_time);
        }
        // TODO put score in last, if new best, put in best
        stateHandler('You Won, Do it Again');
        //remove boudaries handler
        boundaries.forEach((b) => b.removeEventListener('mouseover', failHandler));
        score = score + 5;
        scoreDiv.innerText = `Your score is: ${score}`

        end.removeEventListener('mouseover', endHandler)

    }

    let timeConvertToText = (elapsed) => {
        return `${Math.floor(elapsed / 60000)}:${((elapsed % 60000) / 1000).toFixed(1)}`

    }

    start.addEventListener('click', resetHandler);
    start.addEventListener('mouseover', startHandler);
    end.addEventListener('mouseover', endHandler);

    function liveTimer() {
        elapsed_time = new Date - start_time;
        live.innerText = timeConvertToText(elapsed_time);
        console.log('jejekek');
        if (pause) {
            return;
        }

        requestAnimationFrame(liveTimer)
    }
}

