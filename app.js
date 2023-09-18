// Be sure to create the id on the form element, not the input, to prevent default and listen.

const form = document.querySelector('#tv-search')

// This has to be an async function to use the await keyword and wait for the response from the API's server.
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // This will get the input value entered into the search box.  This was found using console.dir(form) and it was the elements property.  tvQuery is the name attribute given to the search input.
    console.dir(form.elements.tvQuery.value);
    const searchTerm = form.elements.tvQuery.value;

    await executeSearch(searchTerm);

    // By logging the response we can then check the properties of the response data.  We'll use the image and medium properties for now.
    // console.log(response.data);
    // console.log(response.data[0].show.image.medium);
    
    appendImages(response.data);

});

const executeSearch = async (query) => {
    // Axios provides a method of requesting a base url and then adding in config parameters.  The variable below was created to use this feature.  This allows for easily adding multiple search paramters to the URL instead of trying to always manipulate the URL.  It will accept multiple entries such as {q: searchTerm, timezone: 'mountain'}
    const config = {params: {q: query, timezone: 'mountain'}}

    return response = await axios.get(`https://api.tvmaze.com/search/shows`, config);

    console.log(response);

    // form.reset() would also work here.
    form.elements.tvQuery.value = ''

    // return response;
}

// This function accepts an array as argument.  It will allow looping over search results for each show found.  The results are an array that includes all shows.
const appendImages = (shows) => {
    for (let result of shows) {
        // An if statement was needed because some shows do not have an image and would return an error.
        if(result.show.image) {
        console.log(result);
        const img = document.createElement('img');
        img.src = result.show.image.medium;
        document.body.append(img)
        }
    }
}
    
    
