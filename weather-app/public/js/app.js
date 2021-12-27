const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const input1 = document.querySelector('#message1');
const input2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  input1.innerHTML = 'Loading...';
  input2.innerHTML = '';
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        input1.innerHTML = `Something went wrong: ${data.error}`;
        return;
      }
      input1.innerHTML = `Weather for ${data.address}`;
      input2.innerHTML = `${data.weatherDescription}. It is ${data.temperature}&#8451 outside but feels like ${data.feelslike}&#8451.`;
    });
  });
});
