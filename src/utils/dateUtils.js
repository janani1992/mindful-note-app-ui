export const formateDate = (date) => {
    return new Date(date).toLocaleDateString();
};

export const formateDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
};

export const getRelativeTime = (dateTime) => {
    const date = new Date(dateTime);
    const current = new Date();

    const diff = Math.floor((current-date)/1000*60*60);

    if(diff < 1) return 'Now';
    if(diff < 24) return `${diff}h ago`;
    if(diff < 48) return 'Yesterday';

    const diffDays = Math.floor(diff/24);

    if(diffDays<7) return `${diffDays} days ago`;

    return formateDate(dateTime);
}