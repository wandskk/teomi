export function separateTextAndProcessYouTubeLink(message) {
    // Regex to identify URLs
    const regexUrl = /(https?:\/\/[^\s]+)/g;

    // Regex to check if URL is from YouTube
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;

    // Find the URL in the message
    const urls = message.match(regexUrl);

    // Remove the URL from the message text
    const text = message.replace(regexUrl, '').trim();

    // Initialize the processed link
    let processedLink = null;
    let isYouTubeLink = false;

    // Process the URLs
    if (urls) {
        urls.forEach(url => {
            if (youtubeRegex.test(url)) {
                // If the URL is from YouTube, convert it to embed format
                const videoId = url.match(youtubeRegex)[1];
                processedLink = `https://www.youtube.com/embed/${videoId}`;
                isYouTubeLink = true;
            } else if (!processedLink) {
                // Keep the first non-YouTube URL
                processedLink = url;
            }
        });
    }

    return {
        text: text,
        link: processedLink,
        isYouTubeLink: isYouTubeLink
    };
}