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

function getYearsSince(date) {
    const now = new Date();
    const then = new Date(date);
    const diffInYears = (now - then) / (1000 * 60 * 60 * 24 * 365.25); // Using 365.25 to account for leap years
    return Math.floor(diffInYears);
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function initializeRelativeDates() {
    // Handle regular relative dates
    document.querySelectorAll('time').forEach(timeElement => {
        const isoDate = timeElement.getAttribute('datetime');
        const relativeDate = getRelativeTimeString(isoDate);
        timeElement.title = new Date(isoDate).toLocaleDateString();
        timeElement.textContent = relativeDate;
    });

    // Handle dynamic year calculations
    document.querySelectorAll('[data-years-since]').forEach(element => {
        const startDate = element.getAttribute('data-years-since');
        const years = getYearsSince(startDate);
        element.textContent = `${years}+`;
    });

    // Handle copyright year
    document.querySelectorAll('[data-current-year]').forEach(element => {
        element.textContent = getCurrentYear();
    });
}

document.addEventListener('DOMContentLoaded', initializeRelativeDates); 
