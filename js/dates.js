function getRelativeTimeString(date) {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now - then) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
        return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    } else if (diffInMonths > 0) {
        return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    } else if (diffInDays > 0) {
        return diffInDays === 1 ? 'yesterday' : `${diffInDays} days ago`;
    } else {
        return 'today';
    }
}

function initializeRelativeDates() {
    document.querySelectorAll('time').forEach(timeElement => {
        const isoDate = timeElement.getAttribute('datetime');
        const relativeDate = getRelativeTimeString(isoDate);
        timeElement.title = new Date(isoDate).toLocaleDateString();
        timeElement.textContent = relativeDate;
    });
}

document.addEventListener('DOMContentLoaded', initializeRelativeDates); 
