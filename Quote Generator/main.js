const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter");

// random quote function

function randomQuote(){
	quoteBtn.classList.add("Loading");
	quoteBtn.innerText = "Loading Quote ....."
	fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
		console.log(result);
		quoteText.innerText = result.content;
		authorName.innerText = result.author;
		quoteBtn.innerText = "New Quote";
		quoteBtn.classList.remove("Loading");
	});
}

soundBtn.addEventListener("click", ()=>{
	let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
	SpeechSynthesis.sound(utterance);
});

copyBtn.addEventListener("click", ()=>{
	navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
	let twittUrl = `link needed ${quoteText.innerText}`
	window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);