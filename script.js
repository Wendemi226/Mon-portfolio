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
  function addMessage(message, sender = 'user', isHTML = false) {
    const messageElem = document.createElement('div');
    messageElem.classList.add('chatbot-message', sender);
    if (isHTML) {
      messageElem.innerHTML = message;
    } else {
      messageElem.textContent = message;
    }
    chatbotMessages.appendChild(messageElem);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Enhanced bot response logic with detailed info and links

  // Function to calculate Levenshtein distance between two strings
  function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Function to check if a word is approximately in the message
  function approxIncludes(message, word, maxDistance = 2) {
    const words = message.split(/\s+/);
    for (const w of words) {
      if (levenshtein(w, word) <= maxDistance) {
        return true;
      }
    }
    return false;
  }

  function botResponse(userMessage) {
    let response = "Désolé, je n'ai pas compris. Pouvez-vous reformuler ou poser une autre question ?";
    const msg = userMessage.toLowerCase();

    if (approxIncludes(msg, 'bonjour') || approxIncludes(msg, 'salut') || approxIncludes(msg, 'hello')) {
      response = "Bonjour! Comment puis-je vous aider aujourd'hui ?";
    } else if (approxIncludes(msg, 'projet') || approxIncludes(msg, 'projets')) {
      response = `Je travaille sur plusieurs projets comme <a href="buudu.html" target="_blank">Buudu</a>, <a href="fabrice.html" target="_blank">Fabrice</a>, <a href="skillup.html" target="_blank">SkillUp</a>, Studio 226, Protect, et Djam (application de gestion médicale).`;
    } else if (approxIncludes(msg, 'contact') || approxIncludes(msg, 'contacter')) {
      response = `Vous pouvez me contacter via <a href="mailto:kfabrice292@gmail.com">email</a>, WhatsApp, Facebook, LinkedIn ou télécharger mon <a href="Mon cv.pdf" target="_blank">CV</a> depuis la section Contact.`;
    } else if (approxIncludes(msg, 'services') || approxIncludes(msg, 'service')) {
      response = `Je propose des services en développement web, e-commerce, design web, développement sur mesure, gestion de contenu (CMS) et optimisation SEO. Plus de détails sont disponibles dans la section Services.`;
    } else if (approxIncludes(msg, 'digital') || approxIncludes(msg, 'numérique')) {
      response = `Le digital est ma passion, et je m'engage à créer des solutions innovantes pour le développement local en Afrique.`;
    } else if (approxIncludes(msg, 'cv') || approxIncludes(msg, 'curriculum')) {
      response = `Vous pouvez télécharger mon CV depuis la section Contact en cliquant sur l'icône correspondante.`;
    } else if (approxIncludes(msg, 'merci') || approxIncludes(msg, 'thank')) {
      response = `Avec plaisir! N'hésitez pas à poser d'autres questions.`;
    } else if (approxIncludes(msg, 'qui es-tu') || approxIncludes(msg, 'qui êtes-vous') || approxIncludes(msg, 'présentation')) {
      response = `Je suis Wendémi Fabrice KABORE, un passionné du digital, fondateur de Buudu, et étudiant en communication et journalisme à l’IPERMIC.`;
    } else if (approxIncludes(msg, 'infini') || approxIncludes(msg, '∞')) {
      response = `Le symbole de l'infini représente ma conviction que l'innovation n'a pas de limites.`;
    } else if (approxIncludes(msg, 'aide') || approxIncludes(msg, 'support')) {
      response = `Je suis là pour vous aider. Posez-moi vos questions sur mes projets, services ou comment me contacter.`;
    } else if (approxIncludes(msg, 'horaires') || approxIncludes(msg, 'disponibilité')) {
      response = `Je suis généralement disponible en semaine, n'hésitez pas à me contacter pour convenir d'un rendez-vous.`;
    } else if (approxIncludes(msg, 'localisation') || approxIncludes(msg, 'où es-tu')) {
      response = `Je suis basé au Burkina Faso, engagé dans le développement digital en Afrique francophone.`;
    } else if (approxIncludes(msg, 'formation') || approxIncludes(msg, 'études')) {
      response = `Je suis étudiant en communication et journalisme à l’IPERMIC, et je me forme continuellement au digital.`;
    } else if (approxIncludes(msg, 'valeurs') || approxIncludes(msg, 'vision')) {
      response = `Mes valeurs sont sobriété, détermination, engagement, partage, apprentissage continu et impact local. Ma vision est que le digital est un outil de transformation et de liberté.`;
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
      // Detect if response contains HTML links
      const isHTML = /<a\s+href=/.test(response);
      addMessage(response, 'bot', isHTML);
    }, 500);
  });

  // Handle appointment form submission if on appointment.html
  const appointmentForm = document.getElementById('appointment-form');
  const appointmentMessage = document.getElementById('appointment-message');

  if (appointmentForm) {
    // Remove JavaScript form submission handler to allow Formspree to handle submission
  }
});
