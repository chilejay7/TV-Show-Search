// Be sure to create the id on the form element, not the input, to prevent default and listen.

const form = document.querySelector('#tv-search')

// This has to be an async function to use the await keyword and wait for the response from the API's server.
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // This will get the input value entered into the search box.  This was found using console.dir(form) and it was the elements property.  tvQuery is the name attribute given to the search input.
    console.dir(form.elements.tvQuery.value);
    const searchTerm = form.elements.tvQuery.value;

    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

    // By logging the response we can then check the properties of the response data.  We'll use the image and medium properties for now.
    console.log(response.data);
    console.log(response.data[0].show.image.medium);

    const img = document.createElement('img');
    img.src = response.data[0].show.image.medium;
    document.body.append(img)
});

