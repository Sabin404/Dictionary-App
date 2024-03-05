const input = document.querySelector('#inputText');
const button = document.querySelector('#btn');
const error = document.querySelector('.error');
const result = document.querySelector('.result');


async function getData() {
  try {
    let inputVal = input.value;
    if (inputVal === '') {
      error.innerHTML = "Enter word :)"
    } else {
      const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal}`;
      let response = await fetch(URL);
      let data = await response.json();
      console.log(data);

      error.innerHTML = "Loading...."
      let additionalExample = '';
      if (data[0].meanings[0].definitions[0].example) {
        additionalExample = data[0].meanings[0].definitions[0].example;
      } else {
        additionalExample = 'No example available';
      }
      setTimeout(() => {
        result.innerHTML = `
        <div class="word">
          <h3>Word: ${inputVal}</h3>
        </div>
        <div class="details">
          <p>Part of speech : ${data[0].meanings[0].partOfSpeech}</p>
        </div>
        <p>Defination : ${data[0].meanings[0].definitions[0].definition}</p>
        <p style="margin-top: 30px; border-left: solid 2px gray; font-style: italic; padding: 5px;">${additionalExample}</p>
      </div>
    `
    error.innerHTML = ' ';
  }, 1000);
  
  
}
} catch (err) {
  error.innerHTML = `<h4>Couldn't find this word :(`
}
result.innerHTML=' '
}


button.addEventListener('click', getData);

