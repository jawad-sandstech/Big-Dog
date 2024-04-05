const extractMentionsFromComment = (commentText) => {
  const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
  let match = mentionRegex.exec(commentText);
  const mentions = [];

  while (match !== null) {
    const displayName = match[1];
    const userId = match[2];
    mentions.push({ displayName, userId });
    match = mentionRegex.exec(commentText);
  }

  return mentions;
};

module.exports = extractMentionsFromComment;
