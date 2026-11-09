
document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile navigation menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. Collection location search
    const locatorForm = document.getElementById("locatorForm");
    const cityInput = document.getElementById("city");
    const locatorResults = document.getElementById("locatorResults");

    if (locatorForm && cityInput && locatorResults) {
        locatorForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const city = cityInput.value.trim();

            if (!city) {
                locatorResults.textContent =
                    "Please enter your city or area.";
                return;
            }

            const heading = document.createElement("h3");
            heading.textContent = "Search options for " + city;

            const message = document.createElement("p");
            message.textContent =
                "These searches may show relevant facilities, but " +
                "their medicine collection services have not been verified.";

            const medicineLink = document.createElement("a");
            medicineLink.className = "btn";
            medicineLink.textContent = "Search Medicine Disposal";
            medicineLink.href =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent("medicine disposal collection " + city);
            medicineLink.target = "_blank";
            medicineLink.rel = "noopener noreferrer";

            const pharmacyLink = document.createElement("a");
            pharmacyLink.className = "btn btn-outline";
            pharmacyLink.textContent = "Search Pharmacies";
            pharmacyLink.href =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent("pharmacies " + city);
            pharmacyLink.target = "_blank";
            pharmacyLink.rel = "noopener noreferrer";

            const resultCard = document.createElement("div");
            resultCard.className = "card";
            resultCard.append(heading, message, medicineLink, pharmacyLink);

            locatorResults.replaceChildren(resultCard);
        });
    }

    // 3. Contact form demonstration
    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");

    if (contactForm && contactStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            contactStatus.textContent =
                "Demo complete. Your message has not been sent or saved. " +
                "A backend is required to receive submissions.";

            contactForm.reset();
        });
    }

    // 4. Medicine awareness quiz
    const questions = [
        {
            question: "1. What should you do with unwanted medicines?",
            options: [
                "Throw every medicine into any bin",
                "Ask a pharmacist about an accepted disposal option",
                "Give them to another person"
            ],
            answer: 1,
            explanation:
                "A pharmacist can help you identify an appropriate disposal route."
        },
        {
            question: "2. Should you routinely pour medicines into drains?",
            options: [
                "Yes, always",
                "Only when the bottle is empty",
                "No, follow product-specific and local guidance"
            ],
            answer: 2,
            explanation:
                "Do not routinely pour medicines into sinks or drains."
        },
        {
            question: "3. Where should unwanted medicines be kept temporarily?",
            options: [
                "Within reach of children",
                "Securely away from children and pets",
                "Mixed with food"
            ],
            answer: 1,
            explanation:
                "Secure storage reduces accidental exposure."
        },
        {
            question: "4. Does every pharmacy accept expired medicines?",
            options: [
                "Yes, all pharmacies do",
                "No, confirm with the pharmacy first",
                "Only on weekends"
            ],
            answer: 1,
            explanation:
                "Collection services differ between facilities."
        },
        {
            question: "5. What should you do with loose used needles?",
            options: [
                "Place them in ordinary recycling",
                "Leave them where others can find them",
                "Follow approved sharps disposal guidance"
            ],
            answer: 2,
            explanation:
                "Sharps require suitable handling and disposal arrangements."
        }
    ];

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const progressElement = document.getElementById("quizProgress");
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("nextQuestion");
    const resultElement = document.getElementById("quizResult");
    const scoreText = document.getElementById("scoreText");
    const restartButton = document.getElementById("restartQuiz");

    if (
        questionElement && answersElement && progressElement &&
        feedbackElement && nextButton && resultElement &&
        scoreText && restartButton
    ) {
        let currentQuestion = 0;
        let score = 0;
        let answered = false;

        function showQuestion() {
            answered = false;

            const item = questions[currentQuestion];

            progressElement.textContent =
                "Question " + (currentQuestion + 1) +
                " of " + questions.length;

            questionElement.textContent = item.question;
            feedbackElement.textContent = "";
            answersElement.replaceChildren();

            nextButton.hidden = true;
            resultElement.hidden = true;
            questionElement.hidden = false;
            answersElement.hidden = false;
            progressElement.hidden = false;

            item.options.forEach(function (option, index) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "answer-option";
                button.textContent = option;

                button.addEventListener("click", function () {
                    if (answered) return;
                    answered = true;

                    const correct = index === item.answer;

                    if (correct) {
                        score++;
                        button.classList.add("correct");
                        feedbackElement.textContent =
                            "Correct! " + item.explanation;
                    } else {
                        button.classList.add("incorrect");
                        feedbackElement.textContent =
                            "Not quite. " + item.explanation;
                    }

                    Array.from(answersElement.children).forEach(
                        function (answerButton, answerIndex) {
                            answerButton.disabled = true;

                            if (answerIndex === item.answer) {
                                answerButton.classList.add("correct");
                            }
                        }
                    );

                    nextButton.textContent =
                        currentQuestion === questions.length - 1
                            ? "View Results"
                            : "Next Question";

                    nextButton.hidden = false;
                });

                answersElement.appendChild(button);
            });
        }

        nextButton.addEventListener("click", function () {
            if (!answered) return;

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                questionElement.hidden = true;
                answersElement.hidden = true;
                progressElement.hidden = true;
                feedbackElement.textContent = "";
                nextButton.hidden = true;
                resultElement.hidden = false;

                scoreText.textContent =
                    "You scored " + score + " out of " +
                    questions.length + ". " +
                    (score === questions.length
                        ? "Excellent work!"
                        : "Review the disposal guide and try again.");
            }
        });

        restartButton.addEventListener("click", function () {
            currentQuestion = 0;
            score = 0;
            showQuestion();
        });

        showQuestion();
    }
});
