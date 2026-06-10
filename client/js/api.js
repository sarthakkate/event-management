// API Configuration and Helper Functions
const API_BASE_URL = 'http://localhost:5000/api';

// API Utility Functions
const api = {
  async request(method, endpoint, data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid - logout user
          this.logout();
          window.location.href = '/pages/login.html';
        }
        throw new Error(result.message || 'API Error');
      }

      return result;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  },

  // Auth Endpoints
  register(data) {
    return this.request('POST', '/auth/register', data);
  },

  login(data) {
    return this.request('POST', '/auth/login', data);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getMe() {
    return this.request('GET', '/auth/me');
  },

  updateProfile(data) {
    return this.request('PUT', '/auth/profile', data);
  },

  changePassword(data) {
    return this.request('PUT', '/auth/change-password', data);
  },

  // Event Endpoints
  getEvents(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/events${params ? '?' + params : ''}`);
  },

  getEvent(id) {
    return this.request('GET', `/events/${id}`);
  },

  createEvent(data) {
    return this.request('POST', '/events', data);
  },

  updateEvent(id, data) {
    return this.request('PUT', `/events/${id}`, data);
  },

  deleteEvent(id) {
    return this.request('DELETE', `/events/${id}`);
  },

  getCategories() {
    return this.request('GET', '/events/categories');
  },

  // Registration Endpoints
  registerEvent(eventId) {
    return this.request('POST', '/registrations', { eventId });
  },

  getUserRegistrations(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/registrations/user${params ? '?' + params : ''}`);
  },

  cancelRegistration(id) {
    return this.request('DELETE', `/registrations/${id}`);
  },

  getEventRegistrations(eventId, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/registrations/event/${eventId}${params ? '?' + params : ''}`);
  },

  markAttendance(registrationId) {
    return this.request('PUT', `/registrations/${registrationId}/attendance`);
  },

  // Admin Endpoints
  getDashboard() {
    return this.request('GET', '/admin/dashboard');
  },

  getAllUsers(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/admin/users${params ? '?' + params : ''}`);
  },

  getAllRegistrations(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/admin/registrations${params ? '?' + params : ''}`);
  },

  deleteUser(id) {
    return this.request('DELETE', `/admin/users/${id}`);
  },

  updateUserRole(id, data) {
    return this.request('PUT', `/admin/users/${id}/role`, data);
  },
};

// Storage Management
const storage = {
  setToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  },
};

// Toast Notification
class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} toast-enter`;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      max-width: 400px;
      z-index: 10000;
      animation: slideInUp 0.3s ease-in-out;
    `;
    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      toast.style.animation = 'slideOutDown 0.3s ease-in-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static success(message) {
    this.show(message, 'success');
  }

  static error(message) {
    this.show(message, 'error');
  }

  static warning(message) {
    this.show(message, 'warning');
  }

  static info(message) {
    this.show(message, 'info');
  }
}

// Form Validation
class FormValidator {
  static validate(data, rules) {
    const errors = {};

    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];

      if (rule.required && (!value || value.trim() === '')) {
        errors[field] = `${rule.label || field} is required`;
        continue;
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      }

      if (rule.email && value && !this.isValidEmail(value)) {
        errors[field] = 'Invalid email format';
      }

      if (rule.match && value && rule.match.pattern && !rule.match.pattern.test(value)) {
        errors[field] = rule.match.message || `Invalid ${field}`;
      }

      if (rule.custom && value) {
        const customError = rule.custom(value);
        if (customError) {
          errors[field] = customError;
        }
      }
    }

    return errors;
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static showErrors(form, errors) {
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('input.error, textarea.error, select.error').forEach(el => {
      el.classList.remove('error');
    });

    // Show new errors
    for (const [field, message] of Object.entries(errors)) {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.textContent = message;
        input.parentElement.appendChild(errorEl);
      }
    }
  }

  static clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('input.error, textarea.error, select.error').forEach(el => {
      el.classList.remove('error');
    });
  }
}

// Date Utilities
const dateUtils = {
  formatDate(date) {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  },

  formatDateTime(date) {
    return `${this.formatDate(date)} ${new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  },

  formatTime(time) {
    return time;
  },

  isPastDate(date) {
    return new Date(date) < new Date();
  },

  isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  isTomorrow(date) {
    const d = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return d.toDateString() === tomorrow.toDateString();
  },

  getDaysUntil(date) {
    const d = new Date(date);
    const today = new Date();
    const diff = d - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
};

// Page Navigation
const page = {
  navigate(path) {
    if (storage.isAuthenticated()) {
      window.location.href = path;
    } else {
      window.location.href = '/pages/login.html';
    }
  },

  isAuthenticated() {
    return storage.isAuthenticated();
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/login.html';
    }
  },

  requireAdmin() {
    if (!storage.isAdmin()) {
      window.location.href = '/pages/index.html';
    }
  },
};

// Loading Indicator
class Loading {
  static show(element) {
    if (!element) element = document.body;
    const loader = document.createElement('div');
    loader.id = 'loading-indicator';
    loader.innerHTML = '<div class="loading"><div class="loader"></div><p class="loading-text">Loading</p></div>';
    element.appendChild(loader);
  }

  static hide() {
    const loader = document.getElementById('loading-indicator');
    if (loader) loader.remove();
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { api, storage, Toast, FormValidator, dateUtils, page, Loading };
}
