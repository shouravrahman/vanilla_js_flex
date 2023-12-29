"use strict";
//get elements from document
const body = document.querySelector("body");
const checkbox = document.querySelector(".switch input");

const select = document.querySelector(".content select");
const searchBtn = document.querySelector(".search");
const input = document.querySelector("form input[type='text']");
const wordHeading = document.querySelector(".word");
const phonetics = document.querySelector(".phonetics");
const ul_noun = document.querySelector(".result_meanings_noun");
const ul_verb = document.querySelector(".result_meanings_verb");
const noun = document.querySelector(".result_noun > h3");
const verb = document.querySelector(".result_verb > h3");
const syn = document.querySelector(".result_synonyms");
const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

//add event listener to the checkbox for dark and light mode toggle
checkbox.addEventListener("click", () => {
	body.classList.toggle("dark");
});
// Add an event listener for the form's submit event
input.addEventListener("submit", (e) => {
	// Prevent the default form submission behavior
	e.preventDefault();

	// Your existing code to perform the search
	if (input.value !== "") {
		search(input.value);
	}
});
//add event listener to the select for font change
select.addEventListener("change", (e) => {
	let font = e.target.value;
	body.style.fontFamily = font;
});

searchBtn.addEventListener("click", () => {
	if (input.value !== "") {
		search(input.value);
	}
});

async function search(word) {
	try {
		const data = await fetch(API_URL + word);
		const result = await data.json();
		console.log(result);
		console.log(word);
		if (result) {
			wordHeading.innerText = result[0].word;
			phonetics.textContent = result[0].phonetic;
			noun.textContent = result[0].meanings[0].partOfSpeech;
			verb.textContent = result[0].meanings[1].partOfSpeech;

			const li = `
			  <li>${result[0].meanings[0].definitions[0].definition}</li>
			  <li>${result[0].meanings[0].definitions[1].definition}</li>
			  <li>${result[0].meanings[0].definitions[2].definition}</li>
			
			`;
			const li2 = `
			  <li>${result[0].meanings[1].definitions[0].definition}</li>
			
			`;

			ul_noun.innerHTML = li;
			ul_verb.innerHTML = li2;
			const synonym = result[0].meanings[0].synonyms;
			syn.textContent = "";
			if (synonym.length === 0) {
				syn.textContent = "No Synonyms";
			}
			for (let i = 0; i < synonym.length; i++) {
				let span = document.createElement("div");
				span.textContent += synonym[i] + " ";
				span.style.backgroundColor = "#0a0a0a";
				span.style.padding = "5px";
				span.style.borderRadius = "10px";
				// syn.textContent += synonym[i] + " ";
				syn.appendChild(span);
			}
		}
	} catch (error) {
		console.log(error);
	}
}
