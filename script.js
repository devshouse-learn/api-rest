// ===========================
// VARIABLES GLOBALES
// ===========================
let currentUser = null;
let userProgress = {
    completedLessons: [],
    quizScores: {},
    achievements: [],
    totalTime: 0,
    startTime: null
};

// ===========================
// DATOS DE QUIZZES
// ===========================
const quizData = {
    quiz1: [
        {
            question: "¿Qué significa REST en el contexto de APIs?",
            options: [
                "Remote Execution State Transfer",
                "Representational State Transfer",
                "Real Estate Service Technology",
                "Resource Execution Service Tool"
            ],
            correct: 1,
            explanation: "REST significa Representational State Transfer, un estilo arquitectónico para sistemas distribuidos."
        },
        {
            question: "¿Qué método HTTP se usa para OBTENER información?",
            options: ["POST", "GET", "PUT", "DELETE"],
            correct: 1,
            explanation: "GET se utiliza para recuperar información sin modificar el servidor."
        },
        {
            question: "¿Qué código de estado HTTP indica éxito?",
            options: ["404", "500", "200", "301"],
            correct: 2,
            explanation: "200 OK indica que la petición fue exitosa."
        },
        {
            question: "¿Qué formato de datos es más común en APIs REST?",
            options: ["XML", "JSON", "CSV", "TXT"],
            correct: 1,
            explanation: "JSON (JavaScript Object Notation) es el formato más utilizado en APIs REST modernas."
        },
        {
            question: "¿Qué característica define a REST como 'stateless'?",
            options: [
                "El servidor no guarda información de sesión",
                "No se pueden hacer múltiples peticiones",
                "Solo funciona con bases de datos",
                "Requiere autenticación siempre"
            ],
            correct: 0,
            explanation: "Stateless significa que cada petición contiene toda la información necesaria y el servidor no guarda estado de sesión."
        }
    ],
    quiz2: [
        {
            question: "¿Qué método HTTP se usa para CREAR un nuevo recurso?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correct: 1,
            explanation: "POST se utiliza para crear nuevos recursos en el servidor."
        },
        {
            question: "¿Cuál es la diferencia principal entre PUT y PATCH?",
            options: [
                "PUT actualiza completo, PATCH actualiza parcial",
                "No hay diferencia",
                "PATCH es más lento",
                "PUT requiere autenticación"
            ],
            correct: 0,
            explanation: "PUT reemplaza el recurso completo, mientras que PATCH actualiza solo campos específicos."
        },
        {
            question: "¿Qué header HTTP se usa para autenticación con token?",
            options: ["Content-Type", "Accept", "Authorization", "Cookie"],
            correct: 2,
            explanation: "Authorization es el header estándar para enviar tokens de autenticación."
        },
        {
            question: "¿Qué significa JWT?",
            options: [
                "JavaScript Web Token",
                "JSON Web Token",
                "Java Web Technology",
                "Just Web Tool"
            ],
            correct: 1,
            explanation: "JWT significa JSON Web Token, un estándar para tokens de autenticación."
        },
        {
            question: "¿Qué código HTTP indica 'No autorizado'?",
            options: ["400", "401", "403", "404"],
            correct: 1,
            explanation: "401 Unauthorized indica que se requiere autenticación."
        }
    ],
    quiz3: [
        {
            question: "¿Qué es OAuth 2.0?",
            options: [
                "Un lenguaje de programación",
                "Un protocolo de autorización",
                "Una base de datos",
                "Un servidor web"
            ],
            correct: 1,
            explanation: "OAuth 2.0 es un protocolo de autorización para aplicaciones de terceros."
        },
        {
            question: "¿Dónde se almacena típicamente un JWT en el navegador?",
            options: ["Base de datos", "LocalStorage o Cookie", "Cache", "Servidor"],
            correct: 1,
            explanation: "Los JWT se almacenan comúnmente en LocalStorage o en cookies HTTP-only."
        },
        {
            question: "¿Qué header indica el tipo de contenido que se envía?",
            options: ["Accept", "Content-Type", "Authorization", "Cache-Control"],
            correct: 1,
            explanation: "Content-Type especifica el tipo de contenido que se está enviando."
        },
        {
            question: "¿Qué método de versionamiento es más común?",
            options: [
                "Query Parameter",
                "Header Versioning",
                "URL Path Versioning",
                "Cookie Versioning"
            ],
            correct: 2,
            explanation: "URL Path Versioning (ej: /api/v1/users) es el método más común y visible."
        },
        {
            question: "¿Qué código HTTP indica 'Recurso creado exitosamente'?",
            options: ["200", "201", "204", "301"],
            correct: 1,
            explanation: "201 Created indica que se creó un nuevo recurso exitosamente."
        }
    ],
    quiz4: [
        {
            question: "¿Qué significa CORS?",
            options: [
                "Cross-Origin Resource Sharing",
                "Common Origin Resource System",
                "Central Origin Remote Service",
                "Core Origin Resource Standard"
            ],
            correct: 0,
            explanation: "CORS significa Cross-Origin Resource Sharing, un mecanismo de seguridad para peticiones entre diferentes orígenes."
        },
        {
            question: "¿Qué header permite peticiones desde cualquier dominio?",
            options: [
                "Access-Control-Allow-Methods: *",
                "Access-Control-Allow-Origin: *",
                "Access-Control-Allow-Headers: *",
                "Content-Type: *"
            ],
            correct: 1,
            explanation: "Access-Control-Allow-Origin: * permite peticiones desde cualquier dominio."
        },
        {
            question: "¿Qué header indica qué tipo de respuesta espera el cliente?",
            options: ["Content-Type", "Accept", "Authorization", "User-Agent"],
            correct: 1,
            explanation: "Accept especifica qué tipo de contenido el cliente puede procesar."
        },
        {
            question: "¿Qué petición HTTP envía el navegador antes de una petición CORS compleja?",
            options: ["GET", "POST", "OPTIONS", "HEAD"],
            correct: 2,
            explanation: "El navegador envía una petición OPTIONS (preflight) antes de peticiones CORS complejas."
        },
        {
            question: "¿Qué header permite enviar cookies en peticiones CORS?",
            options: [
                "Access-Control-Allow-Cookies",
                "Access-Control-Allow-Credentials",
                "Content-Type",
                "Set-Cookie"
            ],
            correct: 1,
            explanation: "Access-Control-Allow-Credentials: true permite el envío de cookies en peticiones CORS."
        }
    ],
    quiz5: [
        {
            question: "¿Qué es Rate Limiting?",
            options: [
                "Un método de autenticación",
                "Limitar el número de peticiones en un tiempo",
                "Un tipo de base de datos",
                "Un protocolo de seguridad"
            ],
            correct: 1,
            explanation: "Rate Limiting limita el número de peticiones que un cliente puede hacer en un período de tiempo."
        },
        {
            question: "¿Qué código HTTP indica 'Demasiadas peticiones'?",
            options: ["400", "401", "429", "500"],
            correct: 2,
            explanation: "429 Too Many Requests indica que se excedió el límite de peticiones."
        },
        {
            question: "¿Qué es HATEOAS?",
            options: [
                "Un servidor web",
                "Hypermedia As The Engine Of Application State",
                "Un lenguaje de programación",
                "Un tipo de base de datos"
            ],
            correct: 1,
            explanation: "HATEOAS es un principio REST que incluye hipervínculos en las respuestas para navegar la API."
        },
        {
            question: "¿Qué herramienta se usa comúnmente para documentar APIs?",
            options: ["GitHub", "Swagger/OpenAPI", "Docker", "Jenkins"],
            correct: 1,
            explanation: "Swagger/OpenAPI es el estándar más usado para documentar APIs REST."
        },
        {
            question: "¿Cuál es una mejor práctica para URLs de API?",
            options: [
                "Usar verbos: /getUsers",
                "Usar sustantivos en plural: /users",
                "Usar números: /123",
                "Usar mayúsculas: /USERS"
            ],
            correct: 1,
            explanation: "Las mejores prácticas recomiendan usar sustantivos en plural para los recursos."
        }
    ]
};

// ===========================
// DATOS DEL GLOSARIO
// ===========================
const glossaryTerms = [
    {
        term: "API REST",
        definition: "Application Programming Interface que sigue el estilo arquitectónico REST. Permite la comunicación entre sistemas usando HTTP."
    },
    {
        term: "HTTP",
        definition: "HyperText Transfer Protocol. Protocolo de comunicación usado en la web para transferir datos."
    },
    {
        term: "JSON",
        definition: "JavaScript Object Notation. Formato ligero de intercambio de datos, fácil de leer y escribir."
    },
    {
        term: "Recurso",
        definition: "Cualquier información que puede ser nombrada en REST (usuarios, productos, pedidos, etc.)."
    },
    {
        term: "Endpoint",
        definition: "URL específica en una API donde se puede acceder a un recurso (ej: /api/users)."
    },
    {
        term: "JWT (JSON Web Token)",
        definition: "Estándar abierto para crear tokens de acceso que afirman un número de reclamos."
    },
    {
        term: "CORS",
        definition: "Cross-Origin Resource Sharing. Mecanismo que permite solicitudes de recursos desde un dominio diferente."
    },
    {
        term: "Stateless",
        definition: "Sin estado. Cada petición HTTP contiene toda la información necesaria, el servidor no guarda sesión."
    },
    {
        term: "Idempotente",
        definition: "Operación que produce el mismo resultado sin importar cuántas veces se ejecute (ej: GET, PUT, DELETE)."
    },
    {
        term: "Rate Limiting",
        definition: "Técnica para controlar la cantidad de peticiones que un usuario puede hacer en un período de tiempo."
    },
    {
        term: "OAuth",
        definition: "Protocolo de autorización que permite a aplicaciones de terceros acceso limitado a recursos del usuario."
    },
    {
        term: "Payload",
        definition: "Datos enviados en el cuerpo de una petición HTTP, típicamente en formato JSON."
    },
    {
        term: "Status Code",
        definition: "Código numérico en la respuesta HTTP que indica el resultado de la petición (200, 404, 500, etc.)."
    },
    {
        term: "Header",
        definition: "Metadatos adicionales enviados con peticiones y respuestas HTTP (Content-Type, Authorization, etc.)."
    },
    {
        term: "HATEOAS",
        definition: "Hypermedia As The Engine Of Application State. Principio REST que incluye hipervínculos en respuestas."
    }
];

// ===========================
// BASE DE CONOCIMIENTO PARA IA
// ===========================
const aiKnowledgeBase = {
    "api rest": "Una API REST es un servicio web que sigue el estilo arquitectónico REST (Representational State Transfer). Utiliza métodos HTTP estándar como GET, POST, PUT y DELETE para realizar operaciones CRUD. Es stateless, lo que significa que cada petición contiene toda la información necesaria.",
    
    "get vs post": "GET se usa para OBTENER datos del servidor sin modificarlo. POST se usa para CREAR nuevos recursos o enviar datos que modifican el estado del servidor. GET es idempotente y seguro, POST no lo es. Los parámetros de GET van en la URL, los de POST en el body.",
    
    "jwt": "JWT (JSON Web Token) es un estándar abierto (RFC 7519) para crear tokens de acceso. Está compuesto por tres partes: Header (algoritmo), Payload (datos), y Signature (firma). Se usa comúnmente para autenticación en APIs REST. Ejemplo: Authorization: Bearer eyJhbGci...",
    
    "cors": "CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que permite o restringe peticiones HTTP desde diferentes orígenes. Los navegadores bloquean peticiones entre dominios diferentes por seguridad. CORS usa headers como Access-Control-Allow-Origin para permitirlas.",
    
    "códigos de estado": "Los códigos HTTP indican el resultado de una petición:\n• 2xx (Éxito): 200 OK, 201 Created, 204 No Content\n• 4xx (Error Cliente): 400 Bad Request, 401 Unauthorized, 404 Not Found\n• 5xx (Error Servidor): 500 Internal Server Error, 503 Service Unavailable",
    
    "métodos http": "Los métodos HTTP principales son:\n• GET: Obtener datos\n• POST: Crear recursos\n• PUT: Actualizar completo\n• PATCH: Actualizar parcial\n• DELETE: Eliminar recursos\n• OPTIONS: Ver opciones disponibles",
    
    "autenticación": "Formas comunes de autenticación en APIs:\n1. API Keys: Clave única simple\n2. Bearer Token (JWT): Token firmado con información\n3. OAuth 2.0: Protocolo complejo para aplicaciones de terceros\n4. Basic Auth: Usuario y contraseña en Base64 (menos seguro)",
    
    "rate limiting": "Rate Limiting controla cuántas peticiones puede hacer un cliente en un tiempo. Previene abuso y sobrecarga del servidor. Headers típicos:\n• X-RateLimit-Limit: Máximo permitido\n• X-RateLimit-Remaining: Peticiones restantes\n• X-RateLimit-Reset: Cuándo se reinicia\nResponde con 429 Too Many Requests cuando se excede.",
    
    "versionamiento": "Métodos para versionar APIs:\n1. URL Path: /api/v1/users (más común)\n2. Query Parameter: /api/users?version=1\n3. Header: Accept: application/vnd.api.v1+json\nEl versionamiento permite cambios sin romper clientes existentes.",
    
    "mejores prácticas": "Mejores prácticas para APIs REST:\n• Usa sustantivos en plural: /users no /user\n• Usa métodos HTTP correctos\n• Devuelve códigos de estado apropiados\n• Implementa paginación para listas grandes\n• Documenta con Swagger/OpenAPI\n• Usa HTTPS siempre\n• Implementa rate limiting\n• Versiona desde el inicio"
};

// ===========================
// AUTENTICACIÓN
// ===========================
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Verificar si el usuario existe en localStorage
    const savedUser = localStorage.getItem('user_' + username);
    
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.password === password) {
            login(username);
        } else {
            showMessage('error', 'Contraseña incorrecta');
        }
    } else {
        showMessage('error', 'Usuario no encontrado');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Verificar si el usuario ya existe
    if (localStorage.getItem('user_' + username)) {
        showMessage('error', 'El usuario ya existe');
        return;
    }
    
    // Crear nuevo usuario
    const newUser = {
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user_' + username, JSON.stringify(newUser));
    showMessage('success', 'Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
    
    // Limpiar formulario y cambiar a login
    document.getElementById('registerForm').reset();
    setTimeout(() => switchTab('login'), 2000);
});

function showMessage(type, text) {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.className = 'message ' + type;
    messageDiv.textContent = text;
    
    setTimeout(() => {
        messageDiv.className = 'message';
        messageDiv.textContent = '';
    }, 5000);
}

function login(username) {
    currentUser = username;
    document.getElementById('userName').textContent = username;
    
    // Cargar progreso del usuario
    const savedProgress = localStorage.getItem('progress_' + username);
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    } else {
        userProgress = {
            completedLessons: [],
            quizScores: {},
            achievements: [],
            totalTime: 0,
            startTime: Date.now()
        };
    }
    
    updateUserStats();
    
    // Cambiar a pantalla principal
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
    
    // Iniciar contador de tiempo
    userProgress.startTime = Date.now();
}

function logout() {
    // Guardar tiempo total
    if (userProgress.startTime) {
        userProgress.totalTime += (Date.now() - userProgress.startTime) / 1000 / 3600; // en horas
    }
    
    // Guardar progreso
    saveProgress();
    
    // Resetear
    currentUser = null;
    userProgress = {
        completedLessons: [],
        quizScores: {},
        achievements: [],
        totalTime: 0,
        startTime: null
    };
    
    // Volver a login
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    
    // Limpiar formularios
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

function saveProgress() {
    if (currentUser) {
        localStorage.setItem('progress_' + currentUser, JSON.stringify(userProgress));
    }
}

// ===========================
// NAVEGACIÓN
// ===========================
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Scroll al inicio
    document.querySelector('.main-content').scrollTop = 0;
    
    // Inicializar contenido específico de la sección
    if (sectionId === 'dashboard') {
        updateDashboard();
    } else if (sectionId === 'glossary') {
        renderGlossary();
    } else if (sectionId.startsWith('lesson')) {
        const lessonNum = sectionId.replace('lesson', '');
        loadQuiz(lessonNum);
    }
}

// ===========================
// EJEMPLOS DE CÓDIGO
// ===========================
function showCode(exampleId, language) {
    const container = document.querySelector(`#code-${exampleId}-${language}`).parentElement;
    const codeBlocks = container.querySelectorAll('.code-block');
    const tabs = container.previousElementSibling.querySelectorAll('.code-tab');
    
    // Ocultar todos los bloques
    codeBlocks.forEach(block => block.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar el seleccionado
    document.getElementById(`code-${exampleId}-${language}`).classList.add('active');
    event.target.classList.add('active');
}

// ===========================
// SISTEMA DE QUIZZES
// ===========================
function loadQuiz(lessonNum) {
    const quizKey = 'quiz' + lessonNum;
    const quizContainer = document.getElementById(quizKey);
    
    if (!quizContainer || quizContainer.hasChildNodes()) return;
    
    const questions = quizData[quizKey];
    if (!questions) return;
    
    let quizHTML = '';
    
    questions.forEach((q, index) => {
        quizHTML += `
            <div class="question" id="question-${lessonNum}-${index}">
                <div class="question-text">${index + 1}. ${q.question}</div>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <div class="option" onclick="selectOption(${lessonNum}, ${index}, ${optIndex})">
                            <input type="radio" name="q${lessonNum}-${index}" id="q${lessonNum}-${index}-${optIndex}" value="${optIndex}">
                            <label for="q${lessonNum}-${index}-${optIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
                <div class="feedback" id="feedback-${lessonNum}-${index}"></div>
            </div>
        `;
    });
    
    quizHTML += `
        <div class="quiz-submit">
            <button class="btn-submit" onclick="submitQuiz(${lessonNum})">Enviar Respuestas</button>
        </div>
        <div class="quiz-result" id="quiz-result-${lessonNum}"></div>
    `;
    
    quizContainer.innerHTML = quizHTML;
}

function selectOption(lessonNum, questionIndex, optionIndex) {
    const questionDiv = document.getElementById(`question-${lessonNum}-${questionIndex}`);
    const options = questionDiv.querySelectorAll('.option');
    
    options.forEach(opt => opt.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
}

function submitQuiz(lessonNum) {
    const questions = quizData['quiz' + lessonNum];
    let correctCount = 0;
    
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${lessonNum}-${index}"]:checked`);
        const questionDiv = document.getElementById(`question-${lessonNum}-${index}`);
        const feedbackDiv = document.getElementById(`feedback-${lessonNum}-${index}`);
        const options = questionDiv.querySelectorAll('.option');
        
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            
            if (answer === q.correct) {
                correctCount++;
                questionDiv.classList.add('correct');
                feedbackDiv.className = 'feedback show correct';
                feedbackDiv.innerHTML = `<strong>✓ Correcto!</strong> ${q.explanation}`;
                options[answer].classList.add('correct');
            } else {
                questionDiv.classList.add('incorrect');
                feedbackDiv.className = 'feedback show incorrect';
                feedbackDiv.innerHTML = `<strong>✗ Incorrecto.</strong> ${q.explanation}`;
                options[answer].classList.add('incorrect');
                options[q.correct].classList.add('correct');
            }
        }
    });
    
    const percentage = (correctCount / questions.length) * 100;
    const passed = percentage >= 70;
    
    // Guardar resultado
    userProgress.quizScores['quiz' + lessonNum] = {
        score: percentage,
        correct: correctCount,
        total: questions.length,
        passed: passed
    };
    
    // Mostrar resultado
    const resultDiv = document.getElementById(`quiz-result-${lessonNum}`);
    resultDiv.className = `quiz-result show ${passed ? 'passed' : 'failed'}`;
    resultDiv.innerHTML = `
        <h3>${passed ? '¡Felicitaciones! 🎉' : 'Sigue intentando 💪'}</h3>
        <p>Obtuviste ${correctCount} de ${questions.length} respuestas correctas</p>
        <div class="score">${percentage.toFixed(0)}%</div>
        <p>${passed ? 'Has aprobado esta lección y desbloqueado la siguiente.' : 'Necesitas al menos 70% para aprobar. Revisa el contenido e intenta de nuevo.'}</p>
    `;
    
    if (passed) {
        // Desbloquear siguiente lección
        if (!userProgress.completedLessons.includes(lessonNum)) {
            userProgress.completedLessons.push(lessonNum);
            unlockNextLesson(lessonNum);
            checkAchievements();
        }
    }
    
    saveProgress();
    updateUserStats();
    
    // Scroll al resultado
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function unlockNextLesson(currentLesson) {
    const nextLesson = parseInt(currentLesson) + 1;
    const nextBtn = document.getElementById(`lesson${nextLesson}Btn`);
    
    if (nextBtn) {
        nextBtn.disabled = false;
        
        // Animación de desbloqueo
        nextBtn.style.animation = 'pulse 1s ease-in-out 3';
        setTimeout(() => {
            nextBtn.style.animation = '';
        }, 3000);
    }
}

// ===========================
// ESTADÍSTICAS Y PROGRESO
// ===========================
function updateUserStats() {
    const completedCount = userProgress.completedLessons.length;
    const totalLessons = 5;
    const progressPercentage = (completedCount / totalLessons * 100).toFixed(0);
    
    // Calcular nivel basado en lecciones completadas
    const level = Math.min(completedCount + 1, totalLessons);
    
    document.getElementById('userLevel').textContent = level;
    document.getElementById('userProgress').textContent = progressPercentage + '%';
}

function updateDashboard() {
    // Actualizar estadísticas
    const completedCount = userProgress.completedLessons.length;
    const quizzesPassed = Object.values(userProgress.quizScores).filter(q => q.passed).length;
    
    // Calcular promedio de puntuaciones
    const scores = Object.values(userProgress.quizScores).map(q => q.score);
    const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0) : 0;
    
    document.getElementById('completedLevels').textContent = completedCount;
    document.getElementById('totalQuizzes').textContent = quizzesPassed;
    document.getElementById('totalScore').textContent = avgScore + '%';
    document.getElementById('timeSpent').textContent = userProgress.totalTime.toFixed(1);
    
    // Actualizar detalle de lecciones
    renderLevelProgress();
    
    // Actualizar logros
    renderAchievements();
}

function renderLevelProgress() {
    const container = document.getElementById('levelProgressList');
    const lessons = [
        { num: 1, title: 'Fundamentos de API REST', desc: 'Métodos HTTP básicos' },
        { num: 2, title: 'Métodos HTTP', desc: 'GET, POST, PUT, DELETE en profundidad' },
        { num: 3, title: 'Autenticación', desc: 'JWT, OAuth y seguridad' },
        { num: 4, title: 'CORS y Headers', desc: 'Control de acceso entre orígenes' },
        { num: 5, title: 'Conceptos Avanzados', desc: 'Versionamiento y mejores prácticas' }
    ];
    
    let html = '';
    lessons.forEach(lesson => {
        const completed = userProgress.completedLessons.includes(lesson.num.toString());
        const quizScore = userProgress.quizScores['quiz' + lesson.num];
        
        let status = 'locked';
        let statusText = 'Bloqueado';
        
        if (completed) {
            status = 'completed';
            statusText = `Completado - ${quizScore ? quizScore.score.toFixed(0) + '%' : ''}`;
        } else if (lesson.num === 1 || userProgress.completedLessons.includes((lesson.num - 1).toString())) {
            status = 'in-progress';
            statusText = 'Disponible';
        }
        
        html += `
            <div class="level-progress-item">
                <div class="level-info">
                    <h3>Lección ${lesson.num}: ${lesson.title}</h3>
                    <p>${lesson.desc}</p>
                </div>
                <div class="level-status">
                    <span class="status-badge ${status}">${statusText}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ===========================
// SISTEMA DE LOGROS
// ===========================
function checkAchievements() {
    const achievements = [
        { id: 'first-lesson', name: 'Primer Paso', desc: 'Completa tu primera lección', condition: () => userProgress.completedLessons.length >= 1 },
        { id: 'halfway', name: 'A Mitad de Camino', desc: 'Completa 3 lecciones', condition: () => userProgress.completedLessons.length >= 3 },
        { id: 'graduate', name: 'Graduado', desc: 'Completa todas las lecciones', condition: () => userProgress.completedLessons.length >= 5 },
        { id: 'perfectionist', name: 'Perfeccionista', desc: 'Obtén 100% en cualquier quiz', condition: () => Object.values(userProgress.quizScores).some(q => q.score === 100) },
        { id: 'dedicated', name: 'Dedicado', desc: 'Pasa más de 2 horas estudiando', condition: () => userProgress.totalTime >= 2 }
    ];
    
    achievements.forEach(achievement => {
        if (achievement.condition() && !userProgress.achievements.includes(achievement.id)) {
            userProgress.achievements.push(achievement.id);
            showAchievementNotification(achievement);
        }
    });
}

function showAchievementNotification(achievement) {
    // Aquí podrías mostrar una notificación bonita
    console.log('¡Logro desbloqueado!', achievement.name);
}

function renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    const achievements = [
        { id: 'first-lesson', icon: 'fa-medal', name: 'Primer Paso', desc: 'Completa tu primera lección' },
        { id: 'halfway', icon: 'fa-star-half-alt', name: 'A Mitad de Camino', desc: 'Completa 3 lecciones' },
        { id: 'graduate', icon: 'fa-graduation-cap', name: 'Graduado', desc: 'Completa todas las lecciones' },
        { id: 'perfectionist', icon: 'fa-crown', name: 'Perfeccionista', desc: 'Obtén 100% en cualquier quiz' },
        { id: 'dedicated', icon: 'fa-clock', name: 'Dedicado', desc: 'Pasa más de 2 horas estudiando' }
    ];
    
    let html = '';
    achievements.forEach(achievement => {
        const unlocked = userProgress.achievements.includes(achievement.id);
        html += `
            <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                <i class="fas ${achievement.icon}"></i>
                <h3>${achievement.name}</h3>
                <p>${achievement.desc}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ===========================
// GLOSARIO
// ===========================
function renderGlossary() {
    const container = document.getElementById('glossaryGrid');
    
    let html = '';
    glossaryTerms.forEach(term => {
        html += `
            <div class="glossary-term" data-term="${term.term.toLowerCase()}">
                <h3>${term.term}</h3>
                <p>${term.definition}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filterGlossary() {
    const searchText = document.getElementById('glossarySearch').value.toLowerCase();
    const terms = document.querySelectorAll('.glossary-term');
    
    terms.forEach(term => {
        const termText = term.dataset.term;
        const definition = term.querySelector('p').textContent.toLowerCase();
        
        if (termText.includes(searchText) || definition.includes(searchText)) {
            term.style.display = 'block';
        } else {
            term.style.display = 'none';
        }
    });
}

// ===========================
// ASISTENTE IA
// ===========================
function sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Agregar mensaje del usuario
    addChatMessage('user', message);
    
    // Limpiar input
    input.value = '';
    
    // Simular "escribiendo..."
    setTimeout(() => {
        const response = getAIResponse(message);
        addChatMessage('bot', response);
    }, 500);
}

function addChatMessage(type, text) {
    const messagesContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    const messageHTML = `
        <div class="message ${type}">
            <div class="message-avatar">
                <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Buscar respuesta en la base de conocimiento
    for (const [key, answer] of Object.entries(aiKnowledgeBase)) {
        if (lowerQuestion.includes(key)) {
            return answer;
        }
    }
    
    // Respuestas para preguntas específicas
    if (lowerQuestion.includes('hola') || lowerQuestion.includes('ayuda')) {
        return "¡Hola! 👋 Estoy aquí para ayudarte con cualquier pregunta sobre APIs REST. Puedo explicarte sobre métodos HTTP, autenticación, CORS, códigos de estado y mucho más. ¿Qué te gustaría aprender?";
    }
    
    if (lowerQuestion.includes('gracias')) {
        return "¡De nada! 😊 Si tienes más preguntas sobre APIs REST, no dudes en preguntarme. Estoy aquí para ayudarte.";
    }
    
    // Respuesta por defecto
    return "Interesante pregunta. Te recomendaría revisar las lecciones para más información sobre este tema. Puedo ayudarte específicamente con: métodos HTTP, autenticación, JWT, CORS, códigos de estado, rate limiting, versionamiento y mejores prácticas. ¿Sobre qué tema específico te gustaría aprender?";
}

function askQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    document.getElementById('chatForm').dispatchEvent(new Event('submit'));
}

function clearChat() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = `
        <div class="message bot">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    ¡Hola! 👋 Soy tu asistente virtual especializado en APIs REST HTTP. Puedo ayudarte con cualquier duda sobre métodos HTTP, autenticación, CORS, buenas prácticas y más. ¿Qué te gustaría aprender hoy?
                </div>
                <div class="message-time">Ahora</div>
            </div>
        </div>
    `;
}

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay sesión guardada
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
        const savedUser = localStorage.getItem('user_' + lastUser);
        if (savedUser) {
            // Aquí podrías ofrecer auto-login
            console.log('Usuario previo encontrado:', lastUser);
        }
    }
    
    // Inicializar tooltips para términos
    document.querySelectorAll('.tooltip-term').forEach(term => {
        term.addEventListener('click', function() {
            const termName = this.dataset.term || this.textContent;
            const glossaryTerm = glossaryTerms.find(t => t.term.toLowerCase() === termName.toLowerCase());
            
            if (glossaryTerm) {
                alert(`${glossaryTerm.term}\n\n${glossaryTerm.definition}`);
            }
        });
    });
    
    // Guardar progreso cada 30 segundos
    setInterval(() => {
        if (currentUser && userProgress.startTime) {
            saveProgress();
        }
    }, 30000);
});

// Guardar progreso al cerrar la página
window.addEventListener('beforeunload', function() {
    if (currentUser && userProgress.startTime) {
        userProgress.totalTime += (Date.now() - userProgress.startTime) / 1000 / 3600;
        saveProgress();
    }
});
