const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "index.html";
}

const row = document.getElementById("storiesRow");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function scrollStories(dir) {
    row.scrollLeft += dir * 240;
}

function checkButtons() {
    prevBtn.classList.toggle("hide", row.scrollLeft <= 0);
    nextBtn.classList.toggle("hide",
        row.scrollLeft + row.clientWidth >= row.scrollWidth - 1,
    );
}

row.onscroll = checkButtons;
window.onload = checkButtons;




document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("loggedInUserName");

  if (currentUser && nameEl) {
    nameEl.textContent = `${currentUser.firstName} ${currentUser.surname}`;
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});


// ---------- Posts ----------


function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function createPost(post) {
    const template = document.getElementById("postTemplate");
    const card = template.content.firstElementChild.cloneNode(true);

    card.dataset.id = post.id;
    card.querySelector(".post-name").textContent = post.authorName;
    card.querySelector(".post-time").textContent = timeAgo(post.createdAt);
    card.querySelector(".like-count").textContent = post.likes.length;

    if (post.likes.includes(currentUser.email)) {
    card.querySelector(".like-icon").src = "icons/like-blue.png";
}

    const caption = card.querySelector(".post-caption");
    const image = card.querySelector(".post-image");
    const textBg = card.querySelector(".post-text-bg");

    if (post.image) {
        image.src = post.image;
        textBg.remove();

        if (post.text) {
            caption.textContent = post.text;
        } else {
            caption.remove();
        }
    } else {
        textBg.querySelector("p").textContent = post.text;
        caption.remove();
        image.remove();
    }

    return card;
}

function renderPosts() {
    const container = document.getElementById("postsContainer");
    const posts = getPosts();

    posts.sort(function (a, b) {
        return b.createdAt - a.createdAt;
    });

    container.innerHTML = "";

    posts.forEach(function (post) {
        container.appendChild(createPost(post));
    });
}

renderPosts();
setInterval(renderPosts, 60000);

// ---------- Like  Unlike ----------


document.getElementById("postsContainer").addEventListener("click", function (e) {
    const btn = e.target.closest(".like-btn");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const postId = Number(card.dataset.id);

    const posts = getPosts();
    const post = posts.find(function (p) {
        return p.id === postId;
    });
    if (!post) return;

    const index = post.likes.indexOf(currentUser.email);

    if (index === -1) {
        post.likes.push(currentUser.email);
    } else {
        post.likes.splice(index, 1);
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
});




function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    return days === 1 ? "1 day ago" : `${days} days ago`;
}

// ---------- Create post popup ----------


const postModal = document.getElementById("postModal");
const openPostBtn = document.getElementById("openPostBtn");
const closePostModal = document.getElementById("closePostModal");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const removeImage = document.getElementById("removeImage");
const postError = document.getElementById("postError");
const submitPost = document.getElementById("submitPost");

let selectedImage = "";

function openModal() {
    postModal.classList.add("show");
}

function resetModal() {
    postText.value = "";
    selectedImage = "";
    postImage.value = "";
    imagePreview.src = "";
    imagePreviewWrap.hidden = true;
    postError.textContent = "";
}

function closeModal() {
    postModal.classList.remove("show");
    resetModal();
}

openPostBtn.addEventListener("click", openModal);
closePostModal.addEventListener("click", closeModal);

// popup ke bahar (dhundle hisse par) click karne se band ho

postModal.addEventListener("click", function (e) {
    if (e.target === postModal) closeModal();
});

postImage.addEventListener("change", function () {
    const file = postImage.files[0];
    if (!file) return;

    postError.textContent = "";

    if (!file.type.startsWith("image/")) {
        postError.textContent = "Please choose an image file.";
        postImage.value = "";
        return;
    }

    if (file.size > 500 * 1024) {
        postError.textContent = "Image too large. Maximum size is 500KB.";
        postImage.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        selectedImage = reader.result;
        imagePreview.src = selectedImage;
        imagePreviewWrap.hidden = false;
    };
    reader.readAsDataURL(file);
});

removeImage.addEventListener("click", function () {
    selectedImage = "";
    postImage.value = "";
    imagePreview.src = "";
    imagePreviewWrap.hidden = true;
});

submitPost.addEventListener("click", function () {
    const text = postText.value.trim();

    if (text === "" && selectedImage === "") {
        postError.textContent = "Write something or add a photo.";
        return;
    }

    const post = {
        id: Date.now(),
        authorEmail: currentUser.email,
        authorName: `${currentUser.firstName} ${currentUser.surname}`,
        text: text,
        image: selectedImage,
        createdAt: Date.now(),
        likes: []
    };

    const posts = getPosts();
    posts.push(post);

    try {
        localStorage.setItem("posts", JSON.stringify(posts));
    } catch (err) {
        postError.textContent = "Storage is full. Could not save the post.";
        return;
    }

    closeModal();
    renderPosts();
});


// ---------- Likes list popup ----------


const likesModal = document.getElementById("likesModal");
const closeLikesModal = document.getElementById("closeLikesModal");
const likesList = document.getElementById("likesList");

document.getElementById("postsContainer").addEventListener("click", function (e) {
    const countBtn = e.target.closest(".like-count");
    if (!countBtn) return;

    const card = countBtn.closest(".post-card");
    const postId = Number(card.dataset.id);

    const post = getPosts().find(function (p) {
        return p.id === postId;
    });
    if (!post || post.likes.length === 0) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    likesList.innerHTML = "";

    post.likes.forEach(function (email) {
        const user = users.find(function (u) {
            return u.email === email;
        });

        const li = document.createElement("li");
        li.textContent = user ? `${user.firstName} ${user.surname}` : email;
        likesList.appendChild(li);
    });

    likesModal.classList.add("show");
});

closeLikesModal.addEventListener("click", function () {
    likesModal.classList.remove("show");
});

likesModal.addEventListener("click", function (e) {
    if (e.target === likesModal) {
        likesModal.classList.remove("show");
    }
});