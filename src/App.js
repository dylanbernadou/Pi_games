import React, {useEffect} from 'react';
import useSound from 'use-sound';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import check from './sound/check.mp3';
import right_answer from './sound/right-answer.mp3';
import wrong_answer from './sound/wrong-answer.mp3';
import clock from './sound/clock.mp3';
import './App.css';

function App() {
	const [printed_numbers, set_printed_numbers] = React.useState("3,");
	const [score, set_score] = React.useState(0);
	const [max_score, set_max_score] = React.useState(0);
	const [number_to_print, set_number_to_print] = React.useState("?");
	const [step, set_step] = React.useState(3);
	const [disabled_button, set_disabled_button] = React.useState(false);

	const pi = "3,14159265358979323846264338327950288419716939937510582";

	const [playCheck] = useSound(check);
	const [playRightAnswer] = useSound(right_answer);
	const [playWrongAnswer] = useSound(wrong_answer);
	const [playClock] = useSound(clock);

	useEffect(() => {
	    if (max_score === 0 && (localStorage.getItem('max_score')))
	    	set_max_score(localStorage.getItem('max_score'));
	}, []);

	const showNumbers = (howMuchPrint) => {
		set_disabled_button(true);
		let pi_array = pi.split('', howMuchPrint + 3);
		pi_array.push("?");
		let i = 0;
		pi_array.forEach(function(number) {
			(function(i) {
		      setTimeout(function() {
		      	playClock();
		        set_number_to_print(number);
		      }, 1000 * i)
		    })(i++)
		});
		setTimeout(function() {
			set_disabled_button(false);
		}, 1000*(pi_array.length-1));
	};

	const updatePrintedNumbers = (e) => {
		let new_printed_numbers = printed_numbers + e;
		//Je vérifie que la décimale rentrée est bien celle attendue
		if (disabled_button === true)
			return;
		if (new_printed_numbers === pi.substr(0, new_printed_numbers.length)) {
			//Si oui, j'augmente le score
			set_printed_numbers(printed_numbers + e);
			if (new_printed_numbers.length === step) {
				playRightAnswer();
				set_score(score + 1);
				if (score + 1 > max_score){
					localStorage.setItem('max_score', score + 1);
				  	set_max_score(score + 1);
				}
			  	set_printed_numbers("3,");
				showNumbers(score+1);
				set_step(step+1);
			} else
				playCheck();
		}
		else {
			playWrongAnswer();
			set_score(0);
			set_step(3);
			set_printed_numbers("3,");
		}
	}

    return (
	    <div className="contain row mt-5">
		    <KeyboardEventHandler
		    	handleKeys={['numeric']}
		    	onKeyEvent={(key, e) => updatePrintedNumbers(key)} >
		  	</KeyboardEventHandler>
		    <div className="score offset-1 col-3 p-5">
		      <h1 className="text-center underline mb-5">Increase your memory with Pi</h1>
		      <h2>Best score : {max_score}</h2>
		      <hr className="my-5" />
		      <h2>Current score : {score}</h2>
		    </div>
		    <div className="offset-1 col-6 text-center">
		    	<div className="number_to_print p-5">
		    		<p>{number_to_print}</p>
		    	</div>
		      	<div className="screen p-5 my-5">
		          <p>{printed_numbers}</p>
		      	</div>
		        <div className="calculatrice px-5 py-2">
			        <div className="row d-flex justify-content-between my-2">
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(7)}}>7</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(8)}}>8</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(9)}}>9</button>
			        </div>
			        <div className="row d-flex justify-content-between my-2">
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(4)}}>4</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(5)}}>5</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(6)}}>6</button>
			        </div>
			        <div className="row d-flex justify-content-between my-2">
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(1)}}>1</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(2)}}>2</button>
			          <button className="col-3 my-5" disabled={disabled_button} onClick={() => {updatePrintedNumbers(3)}}>3</button>
			        </div>
			    </div>
		    </div>
		</div>
    );
}

export default App;