// Sample data for projects
const projects = [
  { name: "CashTab", logo: "assets/images/CashTab-course.png", website: "https://cashtab.com", description: "CashTab is an open source, secure, non-custodial official web wallet for eCash (XEC) & eTokens. CashTab is a fast, secure & easy to use XEC web wallet." },
  
  // Add more projects here
];

// Function to display projects on the webpage
function displayProjects() {
  const projectsContainer = document.getElementById("projectsContainer");
  projectsContainer.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");

    const logo = document.createElement("img");
    logo.src = project.logo;
    card.appendChild(logo);

    const projectName = document.createElement("h3");
    projectName.textContent = project.name;
    card.appendChild(projectName);

    const description = document.createElement("div");
    description.classList.add("description");

    const shortDescription = document.createElement("p");
    shortDescription.classList.add("short-description");
    shortDescription.textContent = project.description.substring(0, 100) + "...";
    description.appendChild(shortDescription);

    const fullDescription = document.createElement("p");
    fullDescription.classList.add("full-description");
    fullDescription.textContent = project.description;
    description.appendChild(fullDescription);

    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.classList.add("learn-more-btn");
    learnMoreBtn.textContent = "Learn More";
    description.appendChild(learnMoreBtn);

    card.appendChild(description);

    const websiteLink = document.createElement("a");
    websiteLink.href = project.website;
    websiteLink.textContent = "Visit Website";
    websiteLink.target = "_blank";
    card.appendChild(websiteLink);

    projectsContainer.appendChild(card);
  });
}

// Event listener for "Learn More" button click
function handleLearnMoreClick(event) {
  const card = event.target.closest('.card');
  card.classList.toggle('expanded');

  const description = card.querySelector('.description');
  const btn = card.querySelector('.learn-more-btn');
  if (card.classList.contains('expanded')) {
    description.style.maxHeight = description.scrollHeight + 'px';
    btn.textContent = 'Show Less';
  } else {
    description.style.maxHeight = '125px'; // Set initial short description height
    btn.textContent = 'Learn More';
  }
}

// Event listener for "Learn More" button click
document.querySelectorAll('.learn-more-btn').forEach(btn => {
  btn.addEventListener('click', handleLearnMoreClick);
});

// Display projects when the page loads
window.addEventListener("load", displayProjects);
