const cache = new Map();

const CACHE_DURATION = 30 * 60 * 1000;

export const getCachedNews = (key) => {
    const cached = cache.get(key);

    if (!cached) {
        return null;
    }

    const isExpired =
        Date.now() - cached.timestamp > CACHE_DURATION;

    if (isExpired) {
        cache.delete(key);
        return null;
    }

    return cached.data;
};

export const setCachedNews = (key, data) => {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
};

export const appendCachedNews = (key, newData) => {
    const cached = cache.get(key);

    if (!cached) {
        setCachedNews(key, newData);
        return newData;
    }

    const existingData = cached.data;

    const combined = [
        ...existingData,
        ...newData
    ];

    cache.set(key, {
        data: combined,
        timestamp: cached.timestamp,
    });

    return combined;
};

export const deleteCachedNews = (key) => {
    cache.delete(key);
};