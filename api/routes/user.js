const User = require("../models/User");

const router = require("express").Router();

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER WISHLIST
router.get("/:id/wishlist", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD PRODUCT TO WISHLIST
router.post("/:id/wishlist", async (req, res) => {
  const productId = req.body.productId; // Assuming the product ID is sent in the request body
  try {
    const user = await User.findById(req.params.id);
    user.wishlist.push(productId);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD FRIEND TO FRIENDS LIST
router.post("/:id/friends", async (req, res) => {
  const friendId = req.body.friendId; // Assuming the friend's ID is sent in the request body
  try {
    const user = await User.findById(req.params.id);
    user.friends.push(friendId);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER FRIENDS
router.get("/:id/friends", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;