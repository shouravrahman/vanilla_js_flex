const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
	"Jeff Bezos",
	"Mark Zuckerberg",
	"Bill Gates",
	"Elon Musk",
	"Mukesh A",
	"Leah Gotty",
];

const listItems = [];

let dragStartIndex;

function dragStart() {
	dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
	this.classList.add("over");
}
//swap the items
function swapItems(fromIndex, toIndex) {
	const itemOne = listItems[fromIndex].querySelector(".draggable");
	const itemTwo = listItems[toIndex].querySelector(".draggable");
	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
}
function dragDrop() {
	const dragEndIndex = +this.getAttribute("data-index");
	swapItems(dragStartIndex, dragEndIndex);
	this.classList.remove("over");
}
function dragOver(e) {
	e.preventDefault();
}
function dragLeave() {
	this.classList.remove("over");
}

const addEventListeners = () => {
	const draggables = document.querySelectorAll(".draggable");
	const dragListItems = document.querySelectorAll(".draggable-list li");

	draggables.forEach((draggable) => {
		draggable.addEventListener("dragstart", dragStart);
	});
	dragListItems.forEach((item) => {
		item.addEventListener("dragover", dragOver);
		item.addEventListener("drop", dragDrop);
		item.addEventListener("dragenter", dragEnter);
		item.addEventListener("dragleave", dragLeave);
	});
};

//insert listitems into dom

const createList = () => {
	[...richestPeople]
		.map((a) => ({ value: a, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value)
		.forEach((item, idx) => {
			console.log(item);
			const listItem = document.createElement("li");
			listItem.setAttribute("data-index", idx);
			listItem.innerHTML = `
			
		<span class="number">${idx + 1}</span>
      <div class="draggable" draggable="true">
         <p class="name">${item}</p>
      </div>   `;
			listItems.push(listItem);

			draggableList.appendChild(listItem);
		});

	addEventListeners();
};
createList();

//check the order
function checkOrder() {
	listItems.forEach((listItem, index) => {
		const name = listItem.querySelector(".draggable").innerText.trim();
		if (name !== richestPeople[index]) {
			listItem.classList.add("wrong");
		} else {
			listItem.classList.remove("wrong");
			listItem.classList.add("right");
		}
	});
}

check.addEventListener("click", checkOrder);
