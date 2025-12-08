document.addEventListener("DOMContentLoaded", () => {
  // ==================== Typing effect ====================
  const typingElement = document.getElementById("typing");

  if (typingElement) {
    const text = "Aspiring Software Developer (Student)";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }

    typingElement.textContent = ""; // clear before typing starts
    typeWriter();
  }


  // ==================== Scroll spy for nav links ====================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navigation a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // ==================== Project modal setup ====================
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close");

const projectData = {
  web: [
    {
      title: "Personal Portfolio",
      desc: "This is a my profile portfolio, built using HTML, CSS, and JS. ",
      live: "https://muhlurimd.github.io/Portfolio/", 
      github: "https://github.com/MuhluriMd/Portfolio", 
    },
    {
      title: "MUWACE Online Shop",
      desc: "Fashion store website with multiple categories.",
      live: "#", 
      github: "https://github.com/MuhluriMd/Muwace-Web-Application", 
    },
  ],
  group: [
    {
      title: "Vigilant Aid",
      desc: "VigilantAids is a mobile application designed to empower visually impaired individuals to move through the world with greater confidence, safety, and independence.Techonologies used: Android Studio, PostgreSQL",
      github: "https://github.com/K-Moeti/VigilantAid",
    },
  ],
  java: [
    {
      title: "Voucher Generator",
      desc: "A Java app that creates time-limited vouchers.",
      github: "https://github.com/MuhluriMd/VoucherGenerator",
    },
    {
      title: "Bookstore System",
      desc: "Manages books, customers, and orders using JDBC.",
      github: "https://github.com/MuhluriMd/BookstoreSystem",
    },
  ],
  python: [
    {
      title: "Weather App",
      desc: "Fetches live weather data using an API.",
      github: "https://github.com/MuhluriMd/WeatherApp",
    },
    
  ],
};

// Handle "View" button click
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const projects = projectData[category] || [];

    modalTitle.textContent = btn.parentElement.querySelector("h3").textContent;

    modalBody.innerHTML = projects
      .map((p) => {
        // Build links dynamically
        let linksHTML = "";
        if (p.live) {
          linksHTML += `<a href="${p.live}" target="_blank" style="margin-right: 10px; color: #007bff; text-decoration: none;">🌐 Live Demo</a>`;
        }
        if (p.github) {
          linksHTML += `<a href="${p.github}" target="_blank" style="color: #333; text-decoration: none;">💻 GitHub</a>`;
        }

        // Render project card
        return `
          <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
            <h4>${p.title}</h4>
            <p>${p.desc.replace(/\n/g, "<br>")}</p>
            <div style="margin-top: 8px;">
              ${linksHTML}
            </div>
          </div>
        `;
      })
      .join("");

    modal.style.display = "block";
  });
});


// Close modal when clicking X or outside the modal
if (closeModal) {
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


});