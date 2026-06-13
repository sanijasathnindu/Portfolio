/**
 * Premium Portfolio System
 * Static Version
 */

const projects = [

    {
        project_id: 'project-1',

        title: 'Portfolio SaaS',

        short_description:
            'Enterprise portfolio platform.',

        detailed_description:
            'Complete portfolio SaaS with project management, reviews, floating highlights, premium glass UI, advanced project modal system, dashboard integration and dynamic content management.',

        category: 'SaaS',

        status: 'Production Ready',

        year: '2025',

        client: 'Internal Product',

        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'Figma'
        ],

        project_link: '#',

        github_link: '#',

        documentation_link: '#',

        case_study_link: '#',

        media: [
            {
                media_type: 'image',
                media_url: 'assets/projects/project1/1.jpg'
            },
            {
                media_type: 'image',
                media_url: 'assets/projects/project1/2.jpg'
            }
        ]
    },

    {
        project_id: 'project-2',

        title: 'CRM Dashboard',

        short_description:
            'Modern customer management system.',

        detailed_description:
            'Enterprise CRM dashboard featuring customer lifecycle tracking, sales analytics, reporting, workflow automation and management tools.',

        category: 'Dashboard',

        status: 'Completed',

        year: '2025',

        client: 'Demo Corporation',

        technologies: [
            'React',
            'CSS3',
            'JavaScript',
            'Figma'
        ],

        project_link: '#',

        github_link: '#',

        documentation_link: '#',

        case_study_link: '#',

        media: [
            {
                media_type: 'image',
                media_url: 'assets/projects/project2/1.jpg'
            },
            {
                media_type: 'image',
                media_url: 'assets/projects/project2/2.jpg'
            }
        ]
    },

    {
        project_id: 'project-3',

        title: 'Booking Platform',

        short_description:
            'Appointment booking application.',

        detailed_description:
            'Booking platform with appointment scheduling, notifications, customer management and admin dashboard.',

        category: 'Web Application',

        status: 'Completed',

        year: '2024',

        client: 'Appointment Solutions',

        technologies: [
            'Angular',
            'CSS3',
            'JavaScript'
        ],

        project_link: '#',

        github_link: '#',

        documentation_link: '#',

        case_study_link: '#',

        media: [
            {
                media_type: 'image',
                media_url: 'assets/projects/project3/1.jpg'
            }
        ]
    },

    {
        project_id: 'project-4',

        title: 'Restaurant Website',

        short_description:
            'Modern restaurant showcase.',

        detailed_description:
            'Restaurant website with menu management, online reservations, location integration and responsive design.',

        category: 'Business Website',

        status: 'Completed',

        year: '2024',

        client: 'Restaurant Client',

        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript'
        ],

        project_link: '#',

        github_link: '#',

        documentation_link: '#',

        case_study_link: '#',

        media: [
            {
                media_type: 'image',
                media_url: 'assets/projects/project4/1.jpg'
            }
        ]
    },

    {
        project_id: 'project-5',

        title: 'E-Commerce Store',

        short_description:
            'Online shopping experience.',

        detailed_description:
            'Premium ecommerce storefront with product catalog, shopping cart, checkout flow and responsive customer experience.',

        category: 'E-Commerce',

        status: 'Production Ready',

        year: '2025',

        client: 'Retail Brand',

        technologies: [
            'React',
            'CSS3',
            'JavaScript',
            'Figma'
        ],

        project_link: '#',

        github_link: '#',

        documentation_link: '#',

        case_study_link: '#',

        media: [
            {
                media_type: 'image',
                media_url: 'assets/projects/project5/1.jpg'
            },
            {
                media_type: 'image',
                media_url: 'assets/projects/project5/2.jpg'
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    renderProjectGrid(projects);

    renderFloatingProjects(projects);

    initializeProjectFilters();

    spawnAbstractCanvasElements();
});

/* ==========================
   PROJECT GRID
========================== */

function renderProjectGrid(projectList) {

    const grid = document.getElementById('projectsGrid');

    if (!grid) return;

    grid.innerHTML = '';

    projectList.forEach((project, index) => {

        const card = document.createElement('button');

        card.type = 'button';
        card.className = 'grid-card';

        card.style.animationDelay =
            `${index * 0.05}s`;

        card.innerHTML = `
            <span>

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <p>
                    ${escapeHTML(project.short_description)}
                </p>

                <div class="project-tags">
                    ${(project.technologies || [])
                        .slice(0, 4)
                        .map(tag =>
                            `<span class="mini-tag">${escapeHTML(tag)}</span>`
                        )
                        .join('')}
                </div>

            </span>

            <span class="card-meta">
                View Details
            </span>
        `;

        card.onclick = () =>
            launchProjectPresenter(project);

        grid.appendChild(card);
    });
}

/* ==========================
   FLOATING PROJECT BAND
========================== */

function renderFloatingProjects(projectList) {

    const band =
        document.getElementById('dynamicFloatBand');

    const lane =
        document.getElementById('floatingProjects');

    if (!band || !lane) return;

    if (projectList.length <= 4) {

        band.style.display = 'none';

        return;
    }

    band.style.display = 'block';

    lane.innerHTML = '';

    [...projectList, ...projectList].forEach(project => {

        const item =
            document.createElement('div');

        item.className = 'float-project';

        item.innerHTML = `
            <h3>
                ${escapeHTML(project.title)}
            </h3>

            <p>
                ${escapeHTML(project.short_description)}
            </p>
        `;

        item.onclick = () =>
            launchProjectPresenter(project);

        lane.appendChild(item);
    });
}

/* ==========================
   FILTERS
========================== */

function initializeProjectFilters() {

    const buttons =
        document.querySelectorAll('.filter-pill');

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            buttons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            const filter =
                button.dataset.filter;

            if (filter === 'all') {

                renderProjectGrid(projects);

                return;
            }

            const filtered =
                projects.filter(project => {

                    const tech =
                        project.technologies || [];

                    return tech.includes(filter);
                });

            renderProjectGrid(filtered);
        });
    });
}

/* ==========================
   GLASS BACKGROUND
========================== */

function spawnAbstractCanvasElements() {

    const matrix =
        document.getElementById('matrixGlow');

    if (!matrix) return;

    matrix.innerHTML = '';

    for (let i = 0; i < 18; i++) {

        const node =
            document.createElement('div');

        node.className =
            'floating-glass-node';

        const size =
            Math.random() * 120 + 80;

        node.style.width =
            `${size}px`;

        node.style.height =
            `${size}px`;

        node.style.left =
            `${Math.random() * 100}vw`;

        node.style.animationDelay =
            `${Math.random() * 12}s`;

        node.style.animationDuration =
            `${Math.random() * 12 + 16}s`;

        matrix.appendChild(node);
    }
}

/* ==========================
   MODAL HELPERS
========================== */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add('is-open');

    modal.setAttribute(
        'aria-hidden',
        'false'
    );
}

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove('is-open');

    modal.setAttribute(
        'aria-hidden',
        'true'
    );
}

/* ==========================
   SECURITY
========================== */

function escapeHTML(value = '') {

    return String(value).replace(
        /[&<>"']/g,
        character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[character])
    );
}