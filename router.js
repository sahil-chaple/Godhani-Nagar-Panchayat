const routes = {
    'home': {
        title: 'Home',
        content: `
            <h2 class="section-title">Latest Updates & Notices</h2>
            <div class="card-grid">
                <div class="glass-card">
                    <h3>Notice Board</h3>
                    <ul class="notice-list">
                        <li class="notice-item">
                            <span class="new-badge">NEW</span>
                            <a href="https://godhani.netlify.app/">Happy Street Event Successfully Organized in Godhani</a>
                        </li>
                        <li class="notice-item">
                            <span class="new-badge">NEW</span>
                            <a href="#">PIL-155 Court Decision regarding Unauthorized Hoarding.</a>
                        </li>
                        <li class="notice-item">
                            <a href="#">Government decision regarding hoarding banner space.</a>
                        </li>
                    </ul>
                </div>
                <div class="glass-card">
                    <h3>Administrative Head</h3>
                    <div class="officer-profile" style="text-align: center; margin-top: 20px;">
                        <div class="profile-img-placeholder" style="width: 120px; height: 120px; background: #eee; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #ccc;"><img src="profile img.jpeg" alt="profile_image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"></div>
                        <h4 style="color: var(--primary); font-size: 1.2rem;">Mr. Sahil S. Chaple</h4>
                        <p style="font-size: 0.9rem; color: #666;">Administrator / Chief Officer</p>
                    </div>
                </div>
            </div>
            <div class="glass-card" style="margin-top: 30px;">
                <h3>Mission Statement</h3>
                <p>To provide high-quality urban infrastructure and services to the residents of Godhani, ensuring a sustainable and prosperous environment for all. We strive for transparency, efficiency, and citizen-centric governance.</p>
            </div>
        `
    },
    'administration': {
        title: 'Administration',
        content: `
            <h2 class="section-title">Administration Details</h2>
            <div class="glass-card">
                <h3>Chief Officers</h3>
                <p>Details about the administrative structure and key officials of the Nagar Panchayat.</p>
                <ul class="notice-list" style="margin-top: 20px;">
                    <li class="notice-item"><strong>President:</strong> Elected Representative</li>
                    <li class="notice-item"><strong>Chief Officer:</strong> Mr. Sahil S. Chaple</li>
                    <li class="notice-item"><strong>Department Heads:</strong> Engineering, Health, Finance</li>
                </ul>
            </div>
        `
    },
    'budget': {
        title: 'Budget & Planning',
        content: `
            <h2 class="section-title">Budget & Financial Planning</h2>
            <div class="glass-card">
                <h3>Annual Budget 2025-26</h3>
                <p>Transparency in financial planning is our priority. View the detailed budget reports below.</p>
                <div class="notice-item" style="margin-top: 20px;">
                    <a href="#" class="nav-btn" style="display: inline-block;">Download Budget Report (PDF)</a>
                </div>
            </div>
        `
    },
    'gallery': {
        title: 'Photo Gallery',
        content: `
            <h2 class="section-title">Photo Gallery</h2>
            <div class="card-grid">
                <div class="glass-card" style="height: 200px; background: #eee; display: flex; align-items: center; justify-content: center;">Project Image 1</div>
                <div class="glass-card" style="height: 200px; background: #eee; display: flex; align-items: center; justify-content: center;">Project Image 2</div>
                <div class="glass-card" style="height: 200px; background: #eee; display: flex; align-items: center; justify-content: center;">Project Image 3</div>
                <div class="glass-card" style="height: 200px; background: #eee; display: flex; align-items: center; justify-content: center;">Project Image 4</div>
            </div>
        `
    },
    'tenders': {
        title: 'Tenders & Advertisements',
        content: `
            <h2 class="section-title">Tenders & Advertisements</h2>
            <div class="glass-card">
                <h3>Open Tenders</h3>
                <ul class="notice-list">
                    <li class="notice-item"><a href="#">Tender for Road Construction - Sector 4</a></li>
                    <li class="notice-item"><a href="#">Supply of Medical Equipment - PHC</a></li>
                    <li class="notice-item"><a href="#">IT Infrastructure Upgrade Tender</a></li>
                </ul>
            </div>
        `
    },
    'citizen': {
        title: 'Citizen Corner',
        content: `
            <h2 class="section-title">Citizen Corner</h2>
            <div class="card-grid">
                <div class="glass-card">
                    <h3>Online Services</h3>
                    <ul>
                        <li><a href="#">Birth & Death Registration</a></li>
                        <li><a href="#">Property Tax Payment</a></li>
                        <li><a href="#">Water Connection Request</a></li>
                    </ul>
                </div>
                <div class="glass-card">
                    <h3>Grievance Redressal</h3>
                    <p>Submit your complaints online and track their status.</p>
                    <a href="#" class="nav-btn" style="margin-top: 15px; display: inline-block;">File a Complaint</a>
                </div>
            </div>
        `
    },
    'audit': {
        title: 'Audit Report',
        content: `
            <h2 class="section-title">Audit Reports</h2>
            <div class="glass-card">
                <h3>Annual Audit Details</h3>
                <p>View the financial audit reports for the previous fiscal years.</p>
                <ul class="notice-list">
                    <li class="notice-item"><a href="#">Audit Report 2023-24 (PDF)</a></li>
                    <li class="notice-item"><a href="#">Audit Report 2022-23 (PDF)</a></li>
                </ul>
            </div>
        `
    },
    'minutes': {
        title: 'Minutes of Meeting',
        content: `
            <h2 class="section-title">Minutes of Meeting</h2>
            <div class="glass-card">
                <h3>General Body Meetings</h3>
                <ul class="notice-list">
                    <li class="notice-item"><a href="#">Minutes of Meeting - Oct 2025</a></li>
                    <li class="notice-item"><a href="#">Minutes of Meeting - Sept 2025</a></li>
                    <li class="notice-item"><a href="#">Minutes of Meeting - Aug 2025</a></li>
                </ul>
            </div>
        `
    },
    'mission': {
        title: 'Mission & Projects',
        content: `
            <h2 class="section-title">Mission & Ongoing Projects</h2>
            <div class="card-grid">
                <div class="glass-card">
                    <h3>Our Mission</h3>
                    <p>To transform Godhani into a model Nagar Panchayat through sustainable development and citizen participation.</p>
                </div>
                <div class="glass-card">
                    <h3>Ongoing Projects</h3>
                    <ul>
                        <li>Smart Street Lighting</li>
                        <li>Solar Water Supply System</li>
                        <li>Green Belt Development</li>
                    </ul>
                </div>
            </div>
        `
    }
};

function navigate() {
    const hash = window.location.hash.substring(1) || 'home';
    const route = routes[hash] || routes['home'];

    const contentArea = document.getElementById('content-area');

    // Loading transition
    contentArea.style.opacity = '0';

    setTimeout(() => {
        contentArea.innerHTML = route.content;
        contentArea.style.opacity = '1';

        // Update active state in nav
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${hash}`) {
                btn.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
