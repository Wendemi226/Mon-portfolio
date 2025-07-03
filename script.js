document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');

  // Toggle chatbot open/close
  chatbotToggle.addEventListener('click', () => {
    if (chatbot.classList.contains('chatbot-closed')) {
      chatbot.classList.remove('chatbot-closed');
      chatbot.classList.add('chatbot-open');
    } else {
      chatbot.classList.remove('chatbot-open');
      chatbot.classList.add('chatbot-closed');
    }
  });

  // Add message to chat window
  function addMessage(message, sender = 'user') {
    const messageElem = document.createElement('div');
    messageElem.classList.add('chatbot-message', sender);
    messageElem.textContent = message;
    chatbotMessages.appendChild(messageElem);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Enhanced bot response logic
  function botResponse(userMessage) {
    let response = "Désolé, je n'ai pas compris. Pouvez-vous reformuler ?";
    const msg = userMessage.toLowerCase();

    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello')) {
      response = "Bonjour! Comment puis-je vous aider aujourd'hui ?";
    } else if (msg.includes('projet') || msg.includes('projets')) {
      response = "Je travaille sur plusieurs projets comme Buudu, Authentiq, SkillUp, Studio 226, Protect, et Djam.";
    } else if (msg.includes('contact') || msg.includes('contacter')) {
      response = "Vous pouvez me contacter via email, WhatsApp, Facebook, LinkedIn ou télécharger mon CV depuis la section Contact.";
    } else if (msg.includes('services') || msg.includes('service')) {
      response = "Je propose des services en développement web, e-commerce, design web, développement sur mesure, gestion de contenu (CMS) et optimisation SEO.";
    } else if (msg.includes('digital') || msg.includes('numérique')) {
      response = "Le digital est ma passion, et je m'engage à créer des solutions innovantes pour le développement local en Afrique.";
    } else if (msg.includes('cv') || msg.includes('curriculum')) {
      response = "Vous pouvez télécharger mon CV depuis la section Contact en cliquant sur l'icône correspondante.";
    } else if (msg.includes('merci') || msg.includes('thank')) {
      response = "Avec plaisir! N'hésitez pas à poser d'autres questions.";
    } else if (msg.includes('qui es-tu') || msg.includes('qui êtes-vous') || msg.includes('présentation')) {
      response = "Je suis Wendémi Fabrice KABORE, un passionné du digital, fondateur de Buudu, et étudiant en communication et journalisme à l’IPERMIC.";
    } else if (msg.includes('infini') || msg.includes('∞')) {
      response = "Le symbole de l'infini représente ma conviction que l'innovation n'a pas de limites.";
    } else if (msg.includes('aide') || msg.includes('support')) {
      response = "Je suis là pour vous aider. Posez-moi vos questions sur mes projets, services ou comment me contacter.";
    } else if (msg.includes('horaires') || msg.includes('disponibilité')) {
      response = "Je suis généralement disponible en semaine, n'hésitez pas à me contacter pour convenir d'un rendez-vous.";
    } else if (msg.includes('localisation') || msg.includes('où es-tu')) {
      response = "Je suis basé au Burkina Faso, engagé dans le développement digital en Afrique francophone.";
    } else if (msg.includes('formation') || msg.includes('études')) {
      response = "Je suis étudiant en communication et journalisme à l’IPERMIC, et je me forme continuellement au digital.";
    }

    return response;
  }

  // Handle form submit for chatbot
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    chatbotInput.value = '';

    setTimeout(() => {
      const response = botResponse(userMessage);
      addMessage(response, 'bot');
    }, 500);
  });

  // Handle appointment form submission if on appointment.html
  const appointmentForm = document.getElementById('appointment-form');
  const appointmentMessage = document.getElementById('appointment-message');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation (already required in HTML)
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      if (!name || !email || !date || !time) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
      }

      // Here you could add code to send the data to a server or email service
      // For now, just show a thank you message
      appointmentMessage.style.display = 'block';

      // Optionally reset the form
      appointmentForm.reset();
    });
  }
});
