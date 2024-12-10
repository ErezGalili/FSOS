document.querySelector("button").addEventListener("click", () => {
    const input = document.querySelector("input").value;
    const url = `https://pixabay.com/api/?key=47558262-4cb54b4cabe4d48091d3c3fdb&q=${input}&image_type=photo&pretty=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const container = document.querySelector(".container");
            container.innerHTML = '';

            data.hits.forEach(hit => {
                const div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = `
                    <h2>Tags: ${hit.tags}</h2>
                    <img src="${hit.webformatURL}" alt="${hit.tags}"><br>
                    <span class="download">Downloads: ${hit.downloads}</span>
                    <span class="like">Likes: ${hit.likes}</span>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

