/*=============== SIMPLE FAQ CHATBOT ===============*/
(function () {
  const PHONE = '+233 567889543';
  const EMAIL = 'Nelsonic45@yahoo.com';

  const faq = [
    {
      keywords: ['service', 'services', 'offer', 'help with', 'do you do'],
      answer: 'We offer three core services: Property Acquisition Advice, Survey Work, and Deed Presentation. You can see details of each in the Services section above.',
    },
    {
      keywords: ['book', 'appointment', 'consultation', 'schedule', 'meet'],
      answer: 'You can book a consultation using the "Book a Consultation" button or the appointment form further down the page. Pick a weekday between 7:00 AM and 6:00 PM, and your request will be sent for approval.',
    },
    {
      keywords: ['price', 'cost', 'fee', 'charge', 'how much'],
      answer: "Pricing depends on the specifics of your case, so it's best discussed during your booked consultation. Go ahead and book a session and we'll go over the details with you.",
    },
    {
      keywords: ['survey', 'surveying', 'boundary', 'boundaries', 'land size'],
      answer: 'Our survey work confirms the exact boundaries, size, and legal status of a plot before you commit to buying it.',
    },
    {
      keywords: ['deed', 'documentation', 'document', 'title', 'paperwork'],
      answer: 'Deed presentation covers preparing and presenting the necessary documents on your behalf, handled correctly from start to finish.',
    },
    {
      keywords: ['acquisition', 'acquire', 'buy', 'buying', 'purchase'],
      answer: 'Property acquisition advice helps you evaluate and safely acquire land or property, so you avoid disputes and hidden risks.',
    },
    {
      keywords: ['hour', 'hours', 'open', 'available', 'time'],
      answer: 'Appointments are available Monday to Friday, 7:00 AM to 6:00 PM.',
    },
    {
      keywords: ['contact', 'phone', 'call', 'number', 'email', 'reach'],
      answer: `You can reach us directly at ${PHONE} or ${EMAIL}.`,
    },
    {
      keywords: ['hi', 'hello', 'hey'],
      answer: "Hello! I'm here to help with quick questions about our services. What would you like to know?",
    },
    {
      keywords: ['thank', 'thanks'],
      answer: "You're welcome! Let me know if there's anything else.",
    },
  ];

  const fallback = `I'm not sure about that one. For anything specific, please reach us directly at ${PHONE} or ${EMAIL}, or use the "Book a Consultation" button above.`;

  const quickReplies = [
    'What services do you offer?',
    'How do I book an appointment?',
    'What are your contact details?',
  ];

  function findAnswer(text) {
    const lower = text.toLowerCase();
    for (const entry of faq) {
      if (entry.keywords.some((k) => lower.includes(k))) {
        return entry.answer;
      }
    }
    return fallback;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <i class='bx bxs-buildings'></i>
          <div>
            <div class="chatbot-header-title">Real Estate Consultancy</div>
            <div class="chatbot-header-sub">Ask me a quick question</div>
          </div>
        </div>
        <div class="chatbot-body" id="chatbot-body"></div>
        <div class="chatbot-quick-replies" id="chatbot-quick-replies"></div>
        <div class="chatbot-input-row">
          <input type="text" id="chatbot-input" placeholder="Type a question...">
          <button class="chatbot-send" id="chatbot-send" aria-label="Send">
            <i class='bx bx-send'></i>
          </button>
        </div>
      </div>
      <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat">
        <i class='bx bxs-buildings'></i>
        <i class='bx bx-x'></i>
      </button>
    `;
    document.body.appendChild(root);

    const body = document.getElementById('chatbot-body');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chipsContainer = document.getElementById('chatbot-quick-replies');

    function addMessage(text, sender) {
      const msg = document.createElement('div');
      msg.classList.add('chatbot-msg', sender);
      msg.textContent = text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    function renderChips() {
      chipsContainer.innerHTML = '';
      quickReplies.forEach((reply) => {
        const chip = document.createElement('button');
        chip.classList.add('chatbot-chip');
        chip.textContent = reply;
        chip.addEventListener('click', () => handleUserMessage(reply));
        chipsContainer.appendChild(chip);
      });
    }

    function handleUserMessage(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      input.value = '';
      setTimeout(() => {
        addMessage(findAnswer(text), 'bot');
      }, 300);
    }

    sendBtn.addEventListener('click', () => handleUserMessage(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserMessage(input.value);
    });

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('chatbot-open');
    });

    addMessage("Hi! I'm here to help with quick questions about our services and booking.", 'bot');
    renderChips();
  });
})();