export function separateTextAndProcessYouTubeLink(message) {
  const regexUrl = /(https?:\/\/[^\s]+)/g;

  // Adicionando padrão para links de YouTube Live
  const youtubeVideoRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const youtubeLiveRegex = /youtube\.com\/live\/([a-zA-Z0-9_-]+)/;

  const urls = message.match(regexUrl);
  const text = message.replace(regexUrl, "").trim();

  let processedLink = null;
  let isYouTubeLink = false;

  if (urls) {
    urls.forEach((url) => {
      let videoId;
      if (youtubeVideoRegex.test(url)) {
        videoId = url.match(youtubeVideoRegex)[1];
        processedLink = `https://www.youtube.com/embed/${videoId}`;
        isYouTubeLink = true;
      } else if (youtubeLiveRegex.test(url)) {
        videoId = url.match(youtubeLiveRegex)[1];
        processedLink = `https://www.youtube.com/embed/live_stream?channel=${videoId}`;
        isYouTubeLink = true;
      } else if (!processedLink) {
        processedLink = url;
      }
    });
  }

  return {
    text: text,
    link: processedLink,
    isYouTubeLink: isYouTubeLink,
  };
}
