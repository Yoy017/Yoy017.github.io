const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;
const comets = [];
const numComets = 5; // Nombre de comètes visibles en même temps

// Création des étoiles
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.5
    });
}

// Création des comètes
for (let i = 0; i < numComets; i++) {
    createComet();
}

// Fonction pour créer une nouvelle comète
function createComet() {
    comets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5, // Elles apparaissent en haut de l'écran
        speed: Math.random() * 2 + 1, // Vitesse moyenne
        size: Math.random() * 3 + 1,
        angle: Math.random() * (Math.PI / 3) + Math.PI / 6, // Direction diagonale
        tail: [] // Stocke les positions pour l'effet de traînée
    });
}

// Animation principale
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les étoiles
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Effet de scintillement
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.2) star.alpha = 0.2;
        if (star.alpha > 1) star.alpha = 1;

        // Déplacement des étoiles
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }

    // Dessiner les comètes
    for (let comet of comets) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(comet.x, comet.y, comet.size, 0, 2 * Math.PI);
        ctx.fill();

        // Ajout de la traînée
        comet.tail.unshift({ x: comet.x, y: comet.y });
        if (comet.tail.length > 10) {
            comet.tail.pop();
        }

        for (let i = 0; i < comet.tail.length; i++) {
            let opacity = (1 - i / comet.tail.length) * 0.5;
            ctx.beginPath();
            ctx.arc(comet.tail[i].x, comet.tail[i].y, comet.size * (1 - i / comet.tail.length), 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
        }

        // Déplacement de la comète
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        // Si elle sort de l'écran, recréer une nouvelle comète
        if (comet.x > canvas.width || comet.y > canvas.height) {
            comets.splice(comets.indexOf(comet), 1);
            createComet();
        }
    }

    requestAnimationFrame(animateStars);
}

// Ajuster la taille du canvas si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Lancer l'animation
animateStars();