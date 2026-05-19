const blogContainer = document.getElementById("blogContainer");

fetch("./posts/posts.json")
  .then(response => response.json())
  .then(data => {

    data.posts.reverse().forEach(post => {

      const card = document.createElement("div");

      card.classList.add("blog-card");

      card.innerHTML = `
      
        <img src="${post.image}" alt="">
        
        <div class="blog-content">
          <h2>${post.title}</h2>
          <p>${post.description}</p>
        </div>
      
      `;

      blogContainer.appendChild(card);

    });

  });