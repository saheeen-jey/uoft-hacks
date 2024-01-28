app.get("/download/:ID", function (req, res) {
  console.log(req.params.ID);
  res.redirect("https://ipfs.io/ipfs/" + req.params.ID);
});
