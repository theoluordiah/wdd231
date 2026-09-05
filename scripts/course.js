const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming. It will introduce the building blocks of programming.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to the World Wide Web and to the tools used in web development with a focus on HTML and CSS.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 becomes even more useful when you realize that functions are at the root of much of computer programming.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level.",
        technology: ["C#"],
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Introduces the concepts needed for the design, implementation, and testing of web pages.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience with Web Fundamentals and programming.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const courseCards = document.getElementById("course-cards");
const totalCredits = document.getElementById("total-credits");

function displayCourses(filter = "all") {
    const filteredCourses = filter === "all"
        ? courses
        : courses.filter(course => course.subject === filter);

    courseCards.innerHTML = "";

    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        const courseTitle = document.createElement("h3");
        courseTitle.textContent = `${course.subject} ${course.number}`;

        courseCard.appendChild(courseTitle);

        courseCards.appendChild(courseCard);
    });

    const credits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = credits;
}

document.getElementById("all-courses").addEventListener("click", (event) => {
    setActiveButton(event.target);
    displayCourses("all");
});

document.getElementById("wdd-courses").addEventListener("click", (event) => {
    setActiveButton(event.target);
    displayCourses("WDD");
});

document.getElementById("cse-courses").addEventListener("click", (event) => {
    setActiveButton(event.target);
    displayCourses("CSE");
});

function setActiveButton(button) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

displayCourses("all");
