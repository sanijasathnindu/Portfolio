import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyAYDoguZWWRjuHYvpGzy1s6b1AKVxnMNdM",

    authDomain: "portfolio-reviews-ssj.firebaseapp.com",

    projectId: "portfolio-reviews-ssj",

    storageBucket: "portfolio-reviews-ssj.firebasestorage.app",

    messagingSenderId: "721561668499",

    appId: "1:721561668499:web:73a213a993c92d684b3666"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* =====================================
   SUBMIT REVIEW
===================================== */

window.submitReview = async function () {

    const name =
        document.getElementById("reviewName").value.trim();

    const profileUrl =
        document.getElementById("reviewProfile").value.trim();

    const imageUrl =
        document.getElementById("reviewImage").value.trim();

    const review =
        document.getElementById("reviewMessage").value.trim();

    const rating =
        Number(
            document.querySelector(
                'input[name="reviewRating"]:checked'
            )?.value || 0
        );

    if (
    !name ||
    !review ||
    !rating
)
{
    alert(
        "Please complete all required fields."
    );

    return;
}

    try {

        await addDoc(
            collection(db, "reviews"),
            {

                name,

                profileUrl,

                imageUrl,

                review,

                rating,

                approved: false,

                verified: false,

                createdAt:
                    serverTimestamp()
            }
        );

        alert(
            "Review submitted successfully. Awaiting approval."
        );

        document
            .getElementById("reviewForm")
            .reset();

        closeReviewModal();

    }
    catch (error) {

        console.error(error);

        alert(
            "Failed to submit review."
        );
    }
};

/* =====================================
   LOAD REVIEWS
===================================== */

window.allReviews = [];

window.loadReviews = async function () {

    const reviewTrack =
        document.getElementById("reviewTrack");

    if (!reviewTrack) return;

    reviewTrack.innerHTML = "";

    try {

        const reviewsQuery = query(
            collection(db, "reviews"),
            where("approved", "==", true),
            orderBy("createdAt", "desc")
        );

        const snapshot =
            await getDocs(reviewsQuery);

        window.allReviews = [];

        snapshot.forEach(docSnap => {

            window.allReviews.push({
                id: docSnap.id,
                ...docSnap.data()
            });

        });

        if (!window.allReviews.length) {

            reviewTrack.innerHTML = `
                <div class="review-empty-state">
                    No approved reviews yet.
                </div>
            `;

            return;
        }

        /* =====================================
           Homepage Marquee Limited To 8
        ===================================== */

        const homepageReviews =
            window.allReviews.slice(0, 8);

        homepageReviews.forEach(data => {

            const avatar =
                data.imageUrl &&
                data.imageUrl.trim() !== ''
                    ? data.imageUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}`;

            const stars =
                "★".repeat(data.rating || 5);

            const hasProfile =
                data.profileUrl &&
                data.profileUrl.trim() !== '';

            const nameHTML = hasProfile
                ? `
                    <a
                        href="${data.profileUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="review-profile-link">
                        ${data.name}
                    </a>
                `
                : `
                    <span class="review-profile-link">
                        ${data.name}
                    </span>
                `;

            const card =
                document.createElement("div");

            card.className =
                "review-card";

            card.innerHTML = `

                <div class="review-top">

                    <img
                        src="${avatar}"
                        alt="${data.name}"
                        class="review-avatar"

                        onerror="
                            this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}';
                        "
                    >

                    <div class="review-user-info">

                        <h4>

                            ${nameHTML}

                            ${
                                data.verified === true
                                    ? `
                                    <span class="verified-badge">
                                        ✓ Verified
                                    </span>
                                    `
                                    : ''
                            }

                        </h4>

                        <div class="review-stars">
                            ${stars}
                        </div>

                    </div>

                </div>

                <p class="review-text">
                    ${data.review || ''}
                </p>

            `;

            reviewTrack.appendChild(card);

        });

    }
    catch (error) {

        console.error(
            "Review loading failed:",
            error
        );

        reviewTrack.innerHTML = `
            <div class="review-empty-state">
                Unable to load reviews.
            </div>
        `;
    }
};

/* =====================================
   Load Reviews
===================================== */

window.addEventListener(
    "DOMContentLoaded",
    () => {
        loadReviews();
    }
);

/* =====================================
   Drawer Functions
===================================== */

window.openAllReviewsModal =
    async function(){

        document
            .getElementById(
                "reviewsDrawer"
            )
            .classList.add("open");

        document
            .getElementById(
                "drawerOverlay"
            )
            .classList.add("open");

        loadAllReviews();
};

window.closeAllReviewsModal =
    function(){

        document
            .getElementById(
                "reviewsDrawer"
            )
            .classList.remove("open");

        document
            .getElementById(
                "drawerOverlay"
            )
            .classList.remove("open");
};

/* =====================================
   Load ALL Reviews
===================================== */

function loadAllReviews(){

    const container =
        document.getElementById(
            "allReviewsContainer"
        );

    container.innerHTML = "";

    window.allReviews.forEach(data => {

        const profileLink =
            data.profileUrl?.trim();

        const avatar =
            data.imageUrl?.trim()
            ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`;

        const card =
            document.createElement("div");

        card.className =
            "review-card-full";

        card.innerHTML = `

            <div class="review-top">

                <img
                    src="${avatar}"
                    class="review-avatar">

                <div>

                    <h4>

                        ${
                            profileLink
                            ?
                            `
                            <a
                                href="${profileLink}"
                                target="_blank"
                                rel="noopener">

                                ${data.name}

                            </a>
                            `
                            :
                            data.name
                        }

                        ${
                            data.verified
                            ?
                            `
                            <span class="verified-badge">
                                ✓ Verified
                            </span>
                            `
                            :
                            ''
                        }

                    </h4>

                    <div class="review-stars">
                        ${"★".repeat(data.rating)}
                    </div>

                </div>

            </div>

            <p>
                ${data.review}
            </p>
        `;

        container.appendChild(card);

    });
}

window.openReviewModal = function () {

    document
        .getElementById("reviewModal")
        ?.classList.add("open");
};

window.closeReviewModal = function () {

    document
        .getElementById("reviewModal")
        ?.classList.remove("open");
};