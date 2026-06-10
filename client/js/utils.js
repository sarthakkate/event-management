// Utility Functions
const utils = {
  // Generate unique ID
  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  },

  // Debounce function
  debounce(func, delay) {
    let timeoutId;
    return function debounced(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function throttled(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Deep clone object
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Merge objects
  merge(...objects) {
    return Object.assign({}, ...objects);
  },

  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  // Format number with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Truncate text
  truncate(text, length = 100) {
    if (text.length <= length) return text;
    return text.substr(0, length) + '...';
  },

  // Capitalize string
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Remove HTML tags
  stripHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  },

  // Check if string is JSON
  isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  },

  // Get URL parameters
  getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = {};
    params.forEach((value, key) => {
      paramsObj[key] = value;
    });
    return paramsObj;
  },

  // Copy text to clipboard
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      Toast.success('Copied to clipboard!');
    });
  },

  // Sleep for milliseconds
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      if (utils.isInViewport(img)) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  },

  // Request animation frame helper
  onNextFrame(callback) {
    requestAnimationFrame(callback);
  },

  // Scroll to element
  scrollToElement(element, smooth = true) {
    element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  },

  // Get random item from array
  randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  // Shuffle array
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Group array by property
  groupBy(array, property) {
    return array.reduce((groups, item) => {
      const key = item[property];
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  },

  // Filter unique values
  unique(array, property = null) {
    if (!property) {
      return [...new Set(array)];
    }
    const seen = new Set();
    return array.filter(item => {
      const value = item[property];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },
};

// Event delegation helper
class EventManager {
  constructor() {
    this.events = {};
  }

  on(element, eventType, selector, handler) {
    if (!selector) {
      handler = selector;
      element.addEventListener(eventType, handler);
      return;
    }

    element.addEventListener(eventType, e => {
      if (e.target.matches(selector)) {
        handler.call(e.target, e);
      }
    });
  }

  off(element, eventType, handler) {
    element.removeEventListener(eventType, handler);
  }

  once(element, eventType, handler) {
    element.addEventListener(eventType, function onceHandler(e) {
      handler.call(this, e);
      element.removeEventListener(eventType, onceHandler);
    });
  }

  trigger(element, eventType, detail = null) {
    const event = new CustomEvent(eventType, { detail });
    element.dispatchEvent(event);
  }
}

const eventManager = new EventManager();

// DOM manipulation helper
class DOM {
  static create(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstElementChild;
  }

  static query(selector) {
    return document.querySelector(selector);
  }

  static queryAll(selector) {
    return document.querySelectorAll(selector);
  }

  static addClass(element, className) {
    element.classList.add(className);
  }

  static removeClass(element, className) {
    element.classList.remove(className);
  }

  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  static setText(element, text) {
    element.textContent = text;
  }

  static setHTML(element, html) {
    element.innerHTML = html;
  }

  static on(element, event, handler) {
    element.addEventListener(event, handler);
  }

  static off(element, event, handler) {
    element.removeEventListener(event, handler);
  }

  static show(element) {
    element.style.display = '';
  }

  static hide(element) {
    element.style.display = 'none';
  }

  static toggle(element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }

  static remove(element) {
    element.remove();
  }

  static append(parent, child) {
    parent.appendChild(child);
  }

  static prepend(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  }

  static attr(element, name, value = null) {
    if (value === null) {
      return element.getAttribute(name);
    }
    element.setAttribute(name, value);
  }

  static data(element, key, value = null) {
    if (value === null) {
      return element.dataset[key];
    }
    element.dataset[key] = value;
  }

  static empty(element) {
    element.innerHTML = '';
  }

  static replaceClass(element, oldClass, newClass) {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
  }
}

// HTTPClient for making requests
class HTTPClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(method, endpoint, data = null, customHeaders = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...customHeaders };

    const token = storage.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        storage.clearUser();
        window.location.href = '/pages/login.html';
      }
      throw new Error(result.message || 'HTTP Error');
    }

    return result;
  }

  get(endpoint) {
    return this.request('GET', endpoint);
  }

  post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }

  put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  }

  delete(endpoint) {
    return this.request('DELETE', endpoint);
  }

  patch(endpoint, data) {
    return this.request('PATCH', endpoint, data);
  }
}

// Create default HTTP client instance
const http = new HTTPClient();
