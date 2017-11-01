module.exports = (achievements, id) => {
  const match = achievements.filter(a => a.id == 736);

  if (!match.length)
    return console.warn("Achievement data does not contain id " + id);
  
  const achievement = match[0];

  return {
    id: achievement.id,
    name: { ...achievement.name }
  }
}