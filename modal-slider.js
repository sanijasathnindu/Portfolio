let currentSlideIndex = 0;
let totalSlidesCount = 0;
let automaticRotationTimer = null;

function launchProjectPresenter(project) {

    clearInterval(automaticRotationTimer);

    document.getElementById('modalTitle').textContent =
        project.title || 'Project';

    document.getElementById('modalDesc').textContent =
        project.detailed_description ||
        project.short_description ||
        'Project details are being prepared.';

    /* ======================
       TECH STACK
    ====================== */

    const techStack =
        document.getElementById('modalTechStack');

    if (techStack) {

        techStack.innerHTML =
            (project.technologies || [])
                .map(tech => `
                    <span class="tech-pill">
                        ${tech}
                    </span>
                `)
                .join('');
    }

    /* ======================
       META INFO
    ====================== */

    const meta =
        document.getElementById('modalMeta');

    if (meta) {

        meta.innerHTML = `
            ${project.category ?
                `<span>${project.category}</span>` : ''}

            ${project.status ?
                `<span>${project.status}</span>` : ''}
        `;
    }

    /* ======================
       LINKS
    ====================== */

    const linksBin =
        document.getElementById('modalLinks');

    linksBin.innerHTML = '';

    if (project.project_link) {

        linksBin.innerHTML += `
            <a href="${project.project_link}"
               target="_blank"
               rel="noopener"
               class="btn-premium-glass">

                Live Project

            </a>
        `;
    }

    if (project.github_link) {

        linksBin.innerHTML += `
            <a href="${project.github_link}"
               target="_blank"
               rel="noopener"
               class="btn-premium-glass secondary">

                Source Code

            </a>
        `;
    }

    if (project.documentation_link) {

        linksBin.innerHTML += `
            <a href="${project.documentation_link}"
               target="_blank"
               rel="noopener"
               class="btn-premium-glass secondary">

                Documentation

            </a>
        `;
    }

    if (project.case_study_link) {

        linksBin.innerHTML += `
            <a href="${project.case_study_link}"
               target="_blank"
               rel="noopener"
               class="btn-premium-glass secondary">

                Case Study

            </a>
        `;
    }

    /* ======================
       MEDIA
    ====================== */

    const rail =
        document.getElementById('sliderRail');

    const orbits =
        document.getElementById('mediaOrbits');

    rail.innerHTML = '';

    if (orbits) {
        orbits.innerHTML = '';
    }

    currentSlideIndex = 0;

    let media =
        Array.isArray(project.media)
            ? project.media
            : [];

    if (!media.length) {
        media = buildFallbackMedia(project);
    }

    totalSlidesCount = media.length;

    media.forEach((item, index) => {

        const frame =
            document.createElement('div');

        frame.className = 'slide-frame';

        const src =
            item.media_url || item.url;

        const type =
            item.media_type || item.type;

        if (type === 'video') {

            frame.innerHTML = `
                <video
                    src="${src}"
                    autoplay
                    muted
                    loop
                    playsinline>
                </video>
            `;

        } else {

            frame.innerHTML = `
                <img
                    src="${src}"
                    alt="${project.title}">
            `;

            if (orbits) {

                const thumb =
                    document.createElement('img');

                thumb.className =
                    'media-orbit-thumb';

                thumb.src = src;

                thumb.style.left =
                    `${12 + (index * 23) % 70}%`;

                thumb.style.top =
                    `${12 + (index * 17) % 66}%`;

                thumb.style.animationDelay =
                    `${index * 0.4}s`;

                orbits.appendChild(thumb);
            }
        }

        rail.appendChild(frame);
    });

    renderSlidePosition();

    if (totalSlidesCount > 1) {
        initiateAutoRotation();
    }

    openModal('projectModal');
}

function closeProjectModal() {
    clearInterval(automaticRotationTimer);
    document.querySelectorAll('#sliderRail video').forEach(video => video.pause());
    closeModal('projectModal');
}

function renderSlidePosition() {
    document.getElementById('sliderRail').style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

function shiftSlide(direction) {
    if (!totalSlidesCount) return;
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlidesCount) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlidesCount - 1;
    renderSlidePosition();
}

function initiateAutoRotation() {
    automaticRotationTimer = setInterval(() => shiftSlide(1), 5200);
}

function buildFallbackMedia(project) {
    const title = encodeURIComponent(project.title || 'Project');
    const description = encodeURIComponent(project.short_description || 'Premium portfolio showcase');
    const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='850' viewBox='0 0 1200 850'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230a1424'/%3E%3Cstop offset='.52' stop-color='%23192a3d'/%3E%3Cstop offset='1' stop-color='%23091116'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='850' fill='url(%23g)'/%3E%3Ccircle cx='965' cy='150' r='165' fill='%23ff4d8d' opacity='.28'/%3E%3Ccircle cx='210' cy='695' r='210' fill='%232ee6d6' opacity='.23'/%3E%3Crect x='132' y='142' width='936' height='566' rx='24' fill='rgba(255,255,255,.08)' stroke='rgba(255,255,255,.24)'/%3E%3Ctext x='600' y='390' text-anchor='middle' font-family='Arial' font-size='64' font-weight='700' fill='white'%3E${title}%3C/text%3E%3Ctext x='600' y='462' text-anchor='middle' font-family='Arial' font-size='28' fill='rgba(255,255,255,.75)'%3E${description}%3C/text%3E%3C/svg%3E`;
    return [{ media_url: svg, media_type: 'image' }];
}
