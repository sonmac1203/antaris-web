export function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const dateAtMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const diffInDays = Math.floor(
    (now.getTime() - dateAtMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `Yesterday at ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month} ${day} at ${hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  }
}
