export function convert64ToUrl(text64) {
    const blob = new Blob([atob(text64)], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
}