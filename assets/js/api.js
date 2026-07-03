// chrisdebacademy.com.ng/assets/js/api.js

// ============================================
// API Configuration
// ============================================

const API_CONFIG = {
    baseUrl: 'https://acad.com.ng/chrisdeb/api/public',
    schoolId: 8,
};

// ============================================
// Gallery API Functions
// ============================================

async function fetchGallery(albumId = null, limit = 20, offset = 0) {
    try {
        let url = `${API_CONFIG.baseUrl}/gallery.php?school_id=${API_CONFIG.schoolId}&limit=${limit}&offset=${offset}`;
        if (albumId) {
            url += `&album_id=${albumId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return { status: 'error', message: 'Failed to load gallery' };
    }
}

async function fetchAlbums() {
    try {
        const url = `${API_CONFIG.baseUrl}/gallery.php?school_id=${API_CONFIG.schoolId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        return { status: 'error', message: 'Failed to load albums' };
    }
}

// ============================================
// Announcements API Functions
// ============================================

async function fetchAnnouncements(category = null, limit = 10, featured = null) {
    try {
        let url = `${API_CONFIG.baseUrl}/announcements.php?school_id=${API_CONFIG.schoolId}&limit=${limit}`;
        if (category) {
            url += `&category=${encodeURIComponent(category)}`;
        }
        if (featured) {
            url += `&featured=${featured}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return { status: 'error', message: 'Failed to load announcements' };
    }
}

async function fetchAnnouncementById(id) {
    try {
        const url = `${API_CONFIG.baseUrl}/announcements.php?school_id=${API_CONFIG.schoolId}&id=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching announcement:', error);
        return { status: 'error', message: 'Failed to load announcement' };
    }
}

// ============================================
// News API Functions
// ============================================

async function fetchNews(category = null, limit = 10, offset = 0) {
    try {
        let url = `${API_CONFIG.baseUrl}/news.php?school_id=${API_CONFIG.schoolId}&limit=${limit}&offset=${offset}`;
        if (category) {
            url += `&category=${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { status: 'error', message: 'Failed to load news' };
    }
}

async function fetchNewsById(id) {
    try {
        const url = `${API_CONFIG.baseUrl}/news.php?school_id=${API_CONFIG.schoolId}&id=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { status: 'error', message: 'Failed to load news' };
    }
}

async function fetchNewsBySlug(slug) {
    try {
        const url = `${API_CONFIG.baseUrl}/news.php?school_id=${API_CONFIG.schoolId}&slug=${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { status: 'error', message: 'Failed to load news' };
    }
}

async function submitComment(newsId, name, email, comment) {
    try {
        const formData = new FormData();
        formData.append('school_id', API_CONFIG.schoolId);
        formData.append('news_id', newsId);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('comment', comment);

        const response = await fetch(`${API_CONFIG.baseUrl}/comments.php`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting comment:', error);
        return { status: 'error', message: 'Failed to submit comment' };
    }
}

// ============================================
// Utility Functions
// ============================================

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric'
    });
}

function formatDateFull(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }) + ' at ' + d.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getImageUrl(path, type = 'image') {
    const baseUrl = 'https://acad.com.ng/chrisdeb/uploads/';
    if (type === 'gallery') {
        return `${baseUrl}gallery/${API_CONFIG.schoolId}/${path}`;
    } else if (type === 'gallery_thumb') {
        return `${baseUrl}gallery/${API_CONFIG.schoolId}/thumbnails/${path}`;
    } else if (type === 'announcement') {
        return `${baseUrl}announcements/${API_CONFIG.schoolId}/${path}`;
    } else if (type === 'news') {
        return `${baseUrl}news/${API_CONFIG.schoolId}/${path}`;
    }
    return path;
}

// ============================================
// Initialize on Page Load
// ============================================

// Auto-initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any components that need auto-loading
    // Individual pages will call their own init functions
});