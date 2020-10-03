///start form here///
const dictForm = document.querySelector('.search-box')
const srchElement = document.querySelector('.input-box')


const YourQ = document.getElementById('mssg-1')
const meaning = document.getElementById('mssg-2')
const example = document.getElementById('mssg-3')
const audio = document.querySelector('audio')



dictForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const x = srchElement.value
    YourQ.textContent = 'searching..'
    meaning.textContent = ''
    example.textContent = ''

    fetch('/dict?word=' + x).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                if (data.error.message) {
                    YourQ.innerText = data.error.message
                } else {
                    YourQ.innerText = data.error

                }
            } else {
                audio.setAttribute("src", data.body[0].phonetics[0].audio);
                audio.play();
                YourQ.innerText = data.body[0].word;
                meaning.innerText = data.body[0].meanings[0].definitions[0].definition;
                if (data.body[0].meanings[0].definitions[0].example) {
                    example.innerText = "example: " + data.body[0].meanings[0].definitions[0].example;
                }
            }
        })
    })
})