const blogContainer = document.getElementById("blogContainer");

const posts = [
  {
    title: "Nike Air Max 2026",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Modern comfort meets street fashion."
  },

  {
    title: "Adidas Street Runner",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    description: "Perfect sneakers for everyday movement."
  },

  {
    title: "Puma Elite Sport",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    description: "A bold design for energetic lifestyles."
  }
];

posts.forEach(post => {

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