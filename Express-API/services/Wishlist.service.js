const wishlistModel = require("../models/Wishlist.model");

// add into Wishlist
module.exports.AddToWishlist = async ({ userId, item }) => {
    let wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
        wishlist = new wishlistModel({ userId, productIds: [] });
    }
    wishlist.productIds.push({item});
    return await wishlist.save();
};
