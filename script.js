class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    showCache() {
        return Array.from(this.cache.entries());
    }
}

// Initialize cache with capacity 3
const cache = new LRUCache(3);

// DOM Elements
const keyInput = document.getElementById('key');
const valueInput = document.getElementById('value');
const addBtn = document.getElementById('add-btn');
const showBtn = document.getElementById('show-btn');
const cacheList = document.getElementById('cache-list');

// Add item
addBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    if (key && value) {
        cache.put(key, value);
        keyInput.value = '';
        valueInput.value = '';
        alert(`Added (${key}, ${value}) to cache`);
    } else {
        alert('Please enter both key and value');
    }
});

// Show cache
showBtn.addEventListener('click', () => {
    cacheList.innerHTML = '';
    const items = cache.showCache();
    if (items.length === 0) {
        cacheList.innerHTML = '<li>Cache is empty</li>';
    } else {
        items.forEach(([k, v]) => {
            const li = document.createElement('li');
            li.textContent = `${k} : ${v}`;
            cacheList.appendChild(li);
        });
    }
});