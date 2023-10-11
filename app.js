// Be sure to create the id on the form element, not the input, to prevent default and listen.

const form = document.querySelector('#tv-search');
const images = document.querySelectorAll('img');
const gallery = document.getElementById('gallery');

// This has to be an async function to use the await keyword and wait for the response from the API's server.
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // This will get the input value entered into the search box.  This was found using console.dir(form) and it was the elements property.  tvQuery is the name attribute given to the search input.
    console.dir(form.elements.tvQuery.value);
    const searchTerm = form.elements.tvQuery.value;

    // The await keyword is needed before executing this function to ensure a response is received before continuing execution of the script.
    await executeSearch(searchTerm);

    // By logging the response we can then check the properties of the response data.  We'll use the image and medium properties for now.
    // console.log(response.data);
    // console.log(response.data[0].show.image.medium);
    
    // The response is returned from the 
    appendImages(response.data);
    form.reset();

});

const executeSearch = async (query) => {
    // Axios provides a method of requesting a base url and then adding in config parameters.  The variable below was created to use this feature.  This allows for easily adding multiple search paramters to the URL instead of trying to always manipulate the URL.  It will accept multiple entries such as {q: searchTerm, timezone: 'mountain'}
    const config = {params: {q: query, timezone: 'mountain'}}

    // Instead of defining a variable using const, return is needed to return the promise object(s) outside of the scope of this script.
    return response = await axios.get(`https://api.tvmaze.com/search/shows`, config);

    console.log(response);
};

// This function accepts an array as argument.  It will allow looping over search results for each show found.  The results are an array that includes all shows.
const appendImages = (shows) => {
    for (let result of shows) {
        // An if statement was needed because some shows do not have an image and would return an error.
        if(result.show.image) {
        console.log(result);
        const img = document.createElement('img');
        img.src = result.show.image.medium;
        img.title = result.show.name;

        // This makes the images clickable links.
        const imgLink = document.createElement('a');

        if (result.show.officialSite !== null) {
            imgLink.href = result.show.officialSite;
        };
       
        imgLink.target = '_blank';
        imgLink.appendChild(img);
        // document.body.append(img)
        gallery.append(imgLink)
        };
    }
};

gallery.addEventListener('click', function (e, shows) {
    if (e.target.tagName === 'IMG') {
        console.dir(e.target);
        const popWindow = document.createElement('div');

        const h1 = shows.show.name;
    }
});

    
    
