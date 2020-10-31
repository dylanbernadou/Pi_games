import React from 'react';
import './App.css';

function App() {
	const [printed_numbers, set_printed_numbers] = React.useState("3,");
	const [score, set_score] = React.useState(0);
	const [max_score, set_max_score] = React.useState(0);
	const [number_to_print, set_number_to_print] = React.useState("?");
	const [step, set_step] = React.useState(3);
	const pi = "3,14159265358979323846264338327950288419716939937510582";

	let check = new Audio("../public/sound/check.mp3");
	let right_answer = new Audio("../public/sound/right-answer.mp3");
	let wrong_answer = new Audio("../public/sound/wrong-answer.mp3");
	let clock = new Audio("../public/sound/clock.mp3");

	const showNumbers = (howMuchPrint) => {
		let pi_array = pi.split('', howMuchPrint + 3);
		pi_array.push("?");
		let i = 0;
		clock.play();
		pi_array.forEach(function(number) {
			(function(i) {
		      setTimeout(function() {
		        set_number_to_print(number);
		      }, 1000 * i)
		    })(i++)
		});
		clock.pause();
		clock.currentTime = 0;
	};

	const updatePrintedNumbers = (e) => {
		let new_printed_numbers = printed_numbers + e;

		//Je vérifie que la décimale rentrée est bien celle attendue
		if (new_printed_numbers === pi.substr(0, new_printed_numbers.length)) {
			//Si oui, j'augmente le score
			set_printed_numbers(printed_numbers + e);
			if (new_printed_numbers.length === step) {
				right_answer.play();
				set_score(score + 1);
				if (score > max_score)
			  		set_max_score(score);
			  	set_printed_numbers("3,");
				showNumbers(score+1);
				set_step(step+1);
			} else {
				check.play();
			}
		}
		else {
			wrong_answer.play();
			set_score(0);
			set_printed_numbers("3,");
		}
	}

    return (
	    <div className="contain row mt-5">
		    <div className="score offset-1 col-3 p-5">
		      <h1 className="text-center underline mb-5"><u>MemorizePi</u></h1>
		      <h2>Meilleurs scores</h2>
		      <h4 className="mt-5 myb-4">1.  Dylan : 23</h4>
		      <h4 className="my-4">2.  Dylan : 21</h4>
		      <h4 className="my-4">3.  Dylan : 17</h4>
		      <h4 className="my-4">4.  Dylan : 16</h4>
		      <h4 className="my-4">5.  Dylan : 15</h4>
		      <h4 className="my-4">6.  Dylan : 12</h4>
		      <h4 className="my-4">7.  Dylan :  8</h4>
		      <h4 className="my-4">8.  Dylan :  3</h4>
		      <h4 className="my-4">9.  Dylan :  2</h4>
		      <h4 className="my-4">10. Dylan :  1</h4>
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
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(7)}}>7</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(8)}}>8</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(9)}}>9</button>
			        </div>
			        <div className="row d-flex justify-content-between my-2">
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(4)}}>4</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(5)}}>5</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(6)}}>6</button>
			        </div>
			        <div className="row d-flex justify-content-between my-2">
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(1)}}>1</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(2)}}>2</button>
			          <button className="col-3 my-5" onClick={() => {updatePrintedNumbers(3)}}>3</button>
			        </div>
			    </div>
		    </div>
		</div>
    );
}

export default App;