
document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // 1. TYPING ANIMATION
    // =========================
    const typingElement = document.getElementById("typing");

    if (typingElement) {
        const titles = [
            "Aspiring Software Developer",
            "Computer Science Student",
            "Cybersecurity Enthusiast",
            "Problem Solver"
        ];

        let titleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeWriter() {
            const currentTitle = titles[titleIndex];

            if (!deleting) {
                typingElement.textContent =
                    currentTitle.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentTitle.length) {
                    deleting = true;
                    setTimeout(typeWriter, 1400);
                    return;
                }
            } else {
                typingElement.textContent =
                    currentTitle.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {
                    deleting = false;
                    titleIndex = (titleIndex + 1) % titles.length;
                }
            }

            setTimeout(typeWriter, deleting ? 40 : 85);
        }

        typeWriter();
    }

    // =========================
    // 2. NAVIGATION HIGHLIGHTING
    // =========================
    const sections = document.querySelectorAll(
        ".content section[id]"
    );

    const navLinks = document.querySelectorAll(
        "#navigation a[href^='#']"
    );

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 150) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            if (isActive) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();

    // =========================
    // 3. PROJECT DATA
    // =========================
    const projectData = {
        web: [
            {
                title: "Personal Portfolio",
                desc: "A personal portfolio website showcasing my skills, education, and projects. Built with HTML, CSS, and JavaScript.",
                live: "https://muhlurimd.github.io/Portfolio/",
                github: "https://github.com/MuhluriMd/Portfolio"
            },
            {
                title: "MUWACE Online Shop",
                desc: "An online fashion store project featuring multiple product categories. Currently under development.",
                github: "https://github.com/MuhluriMd/Muwace-Web-Application"
            }
        ],

        group: [
            {
                title: "VigilantAid",
                desc: "A mobile application project designed to support visually impaired people with greater independence. Technologies include Android Studio and PostgreSQL.",
                github: "https://github.com/K-Moeti/VigilantAid"
            },
            {
                title: "Library Management System",
                desc: "A library management application for managing books and members, using Java, MySQL, and JavaFX.",
                github: "https://github.com/MuhluriMd/Library-Management-System"
            }
        ],

        java: [
            {
                title: "First Code",
                desc: "A beginner Java program that prints Hello, World! to the console.",
                github: "https://github.com/MuhluriMd/FirstCode/blob/main/Hello/src/hello/Hello.java"
            },
            {
                title: "Marital Status Checker",
                desc: "A Java exercise that accepts a character representing marital status and displays the corresponding status.",
                github: "https://github.com/MuhluriMd/Marital-Status-Check"
            }
        ],

        python: [
            {
                title: "Count Words in a Text File",
                desc: "A Python project that counts words in text and identifies repeated words.",
                github: "https://github.com/MuhluriMd/CountWords/blob/main/WordCount.py"
            }
        ]
    };

    // =========================
    // 4. PROJECT MODAL
    // =========================
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeButton = document.querySelector(".close");

    if (!modal || !modalTitle || !modalBody) {
        return;
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    function addExternalLink(container, url, label) {
        if (!url) return;

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = label;

        container.appendChild(link);
    }

    document.querySelectorAll(".view-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const projects = projectData[category] || [];
            const heading =
                button.parentElement.querySelector("h3");

            modalTitle.textContent = heading
                ? heading.textContent
                : "Projects";

            modalBody.replaceChildren();

            projects.forEach((project) => {
                const card = document.createElement("article");
                card.className = "modal-project";

                const heading = document.createElement("h4");
                heading.textContent = project.title;

                const description = document.createElement("p");
                description.textContent = project.desc;

                const links = document.createElement("div");
                links.className = "project-links";

                addExternalLink(
                    links,
                    project.live,
                    "🌐 Live Demo"
                );

                addExternalLink(
                    links,
                    project.github,
                    "💻 GitHub"
                );

                card.append(heading, description, links);
                modalBody.appendChild(card);
            });

            modal.style.display = "block";
            document.body.style.overflow = "hidden";

            if (closeButton) {
                closeButton.focus();
            }
        });
    });

    if (closeButton) {
        closeButton.setAttribute("role", "button");
        closeButton.setAttribute("tabindex", "0");
        closeButton.setAttribute("aria-label", "Close projects");

        closeButton.addEventListener("click", closeModal);

        closeButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                closeModal();
            }
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" &&
            modal.style.display === "block") {
            closeModal();
        }
    });
});
