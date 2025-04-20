window.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatlog = document.getElementById("chatLog");

  sendBtn.disabled = false;
  sendBtn.style.opacity = 1;
  sendBtn.style.cursor = "pointer";

  sendBtn.addEventListener("click", handleMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleMessage();
  });

  async function handleMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";
    appendMessage("ai", detectLang(message) === "ar" ? "جاري البحث..." : "Searching...");

    try {
      const response = await fetch("/api/ask-palestine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });

      const data = await response.json();
      const reply = data.answer || (detectLang(message) === "ar"
        ? "عذرًا، لم أتمكن من العثور على إجابة."
        : "Sorry, I couldn’t find an answer.");

      updateLastAIMessage(reply);
    } catch (error) {
      updateLastAIMessage(detectLang(message) === "ar"
        ? "حدث خطأ في الاتصال بالخادم."
        : "There was an error connecting to the server.");
    }
  }

  function appendMessage(sender, text) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", sender);
    messageEl.textContent = text;
    chatlog.appendChild(messageEl);
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  function updateLastAIMessage(newText) {
    const aiMessages = chatlog.querySelectorAll(".message.ai");
    if (aiMessages.length) {
      aiMessages[aiMessages.length - 1].textContent = newText;
    }
  }

  function detectLang(text) {
    return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
  }
});
const suggestionButtons = document.querySelectorAll("#suggestions button");
suggestionButtons.forEach(button => {
  button.addEventListener("click", () => {
    userInput.value = button.textContent;
    handleMessage();
  });
});

// === gallery.js ===
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const fullscreenOverlay = document.getElementById("fullscreenOverlay");
  const fullscreenImage = document.getElementById("fullscreenImage");
  const closeButton = document.querySelector(".close-fullscreen");

  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      fullscreenImage.src = img.src;
      fullscreenOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    closeFullscreen();
  });

  fullscreenOverlay.addEventListener("click", closeFullscreen);
  fullscreenImage.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFullscreen();
  });

  function closeFullscreen() {
    fullscreenOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// === video.js ===
document.addEventListener("DOMContentLoaded", () => {
  const videoItems = document.querySelectorAll(".video-item video");
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  videoItems.forEach((video) => {
    video.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      modalVideo.src = video.querySelector("source")?.src || video.currentSrc;
      modalVideo.play();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideoModal();
  });

  function closeVideoModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
  }
});

// === articles.js ===
document.addEventListener("DOMContentLoaded", () => {
  const articles = document.querySelectorAll(".article");

  articles.forEach((article) => {
    for (let i = 0; i < 3; i++) {
      const drop = document.createElement("span");
      drop.classList.add("blood-drop");
      article.appendChild(drop);
    }

    const content = article.querySelector("p").innerHTML;
    const h3 = article.querySelector("h3").textContent;
    article.querySelector("p").classList.add("content-preview");

    const oldLink = article.querySelector("a");
    if (oldLink) oldLink.remove();

    const readMoreBtn = document.createElement("a");
    readMoreBtn.textContent = "اقرأ المزيد";
    readMoreBtn.href = "#";
    readMoreBtn.classList.add("read-more");
    article.appendChild(readMoreBtn);

    readMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const modal = document.createElement("div");
      modal.classList.add("article-modal");

      modal.innerHTML = `
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <h3 class="modal-title">${h3}</h3>
          <div class="modal-body">
            ${content}
            <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...</p>
          </div>
          <span class="blood-line blood-line-1"></span>
          <span class="blood-line blood-line-2"></span>
          <span class="blood-line blood-line-3"></span>
          <span class="blood-line blood-line-4"></span>
        </div>`;

      document.body.appendChild(modal);

      setTimeout(() => modal.classList.add("active"), 10);

      modal.querySelector(".modal-close").addEventListener("click", () => {
        modal.classList.remove("active");
        setTimeout(() => modal.remove(), 500);
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          setTimeout(() => modal.remove(), 500);
        }
      });

      document.addEventListener("keydown", function escClose(e) {
        if (e.key === "Escape" && document.querySelector(".article-modal.active")) {
          modal.classList.remove("active");
          setTimeout(() => modal.remove(), 500);
        }
      }, { once: true });
    });
  });

  const sectionTitle = document.querySelector(".articles h2");
  if (sectionTitle) {
    sectionTitle.addEventListener("mouseover", function () {
      this.style.textShadow = "2px 2px 10px rgba(153, 0, 0, 0.7)";
      this.style.transform = "scale(1.05)";
    });
    sectionTitle.addEventListener("mouseout", function () {
      this.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
      this.style.transform = "scale(1)";
    });
  }
});
