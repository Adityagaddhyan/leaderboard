exports.getGame = (req, res) => {
  const games = [
    { id: 1, name: "game 1" },
    { id: 2, name: "game 2" },
    { id: 3, name: "game 2" },
  ];

  res.json({games});
};
