window.correct = function(prompt) {
    return new Promise((resolve, reject) => {

        const callbackName = `jsonpCallback_${Date.now()}`;

        const url = `https://cloudflare-serverless.pages.dev/lpAutoCorrect?prompt=${encodeURIComponent(prompt)}&callback=${callbackName}`;

        const script = document.createElement('script');
        script.src = url;

        window[callbackName] = function(data) {
            resolve(data);
            delete window[callbackName];
            document.body.removeChild(script);
        };

        script.onerror = function() {
            reject(new Error('Fetch error'));
            delete window[callbackName];
            document.body.removeChild(script);
        };

        document.body.appendChild(script);
    });
};
