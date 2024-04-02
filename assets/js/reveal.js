let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
let currentStep = 1;
if (currentStep = 1){
    document.getElementById("step1").classList.add("active");
}

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});
sr.reveal('.hero-text', { delay: 200, origin: 'top' });
sr.reveal('.hero-img', { delay: 450, origin: 'top' });
sr.reveal('.icons', { delay: 200, origin: 'left' });
sr.reveal('.back-top-btn', { delay: 200, origin: 'right' });

// ecosystem

function goForward() {
    if (currentStep < 4) {
        document.getElementById(`step${currentStep}`).classList.remove("active");
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add("active");
    }
}

function goBack() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove("active");
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add("active");
    }
}

function addProject() {
    const projectName = document.getElementById("projectName").value;
    const projectLogo = document.getElementById("projectLogo").value;
    const projectWebsite = document.getElementById("projectWebsite").value;
    const projectDescription = document.getElementById("projectDescription").value;

    // Here you can perform further actions like sending data to a server, etc.
    console.log("Project Name:", projectName);
    console.log("Project Logo URL:", projectLogo);
    console.log("Project Website URL:", projectWebsite);
    console.log("Project Description:", projectDescription);

    // For demonstration, you can redirect to another page after adding the project
    window.location.href = "ecosystem.html";
}

// Initialize the first step
document.getElementById("step1").classList.add("active");
