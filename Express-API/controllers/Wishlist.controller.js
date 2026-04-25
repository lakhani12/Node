const wishlistService = require("../services/wishlist.service");

// add items into wishlist
module.exports.AddToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body;

    const wishlist = await wishlistService.AddToWishlist({ userId, item });

    if (!wishlist) {
      return res.status(404).json({ message: "Failed To Add Into Wishlist !" });
    }

    return res
      .status(200)
      .json({ message: "Added Into Wishlist Successfully !", wishlist });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
